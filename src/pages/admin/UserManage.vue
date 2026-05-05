<template>
  <div class="min-h-screen bg-gray-100 p-4 lg:p-6 font-sans text-gray-800">
    
    <!-- Header Page -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Quản lý Học viên</h1>
        <p class="text-sm text-gray-500 mt-1">Kiểm soát tài khoản và tiến độ học tập trên hệ thống SkyLink</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
          <div class="p-1.5 bg-blue-100 text-blue-600 rounded-md"><Users :size="18" /></div>
          <div>
            <p class="text-xs text-gray-500 font-semibold">Tổng học viên</p>
            <p class="text-lg font-bold leading-none text-gray-900">{{ users.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      <!-- Toolbar: Search & Filter -->
      <div class="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between gap-4">
        <!-- Search -->
        <div class="relative w-full sm:w-80">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm theo tên hoặc email..." 
            class="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2b4c] focus:border-[#1a2b4c] outline-none"
          />
        </div>

        <!-- Filter -->
        <div class="flex items-center gap-2">
          <Filter class="text-gray-400 w-4 h-4" />
          <select 
            v-model="roleFilter"
            class="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1a2b4c] outline-none bg-white"
          >
            <option value="All">Tất cả vai trò</option>
            <option value="Admin">Quản trị viên (Admin)</option>
            <option value="User">Học viên (User)</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
              <th class="p-4">Học viên</th>
              <th class="p-4">Vai trò</th>
              <th class="p-4 w-64">Tiến độ học tập</th>
              <th class="p-4">Hoạt động gần nhất</th>
              <th class="p-4 text-center">Thao tác</th>
            </tr>
          </thead>
          
          <tbody v-if="isLoading">
            <tr>
              <td colspan="5" class="p-8 text-center text-gray-500">
                <RefreshCw class="w-6 h-6 animate-spin mx-auto mb-2 text-[#1a2b4c]" />
                Đang tải dữ liệu...
              </td>
            </tr>
          </tbody>

          <tbody v-else-if="filteredUsers.length === 0">
            <tr>
              <td colspan="5" class="p-8 text-center text-gray-500 font-medium">
                Không tìm thấy kết quả nào phù hợp.
              </td>
            </tr>
          </tbody>

          <tbody v-else class="divide-y divide-gray-100">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50/50 transition-colors">
              <!-- Cột Thông tin User -->
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold shrink-0">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-gray-900">{{ user.name }}</p>
                    <p class="text-xs text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Cột Vai trò -->
              <td class="p-4">
                <span 
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                >
                  <Shield v-if="user.role === 'Admin'" class="w-3 h-3" />
                  <User v-else class="w-3 h-3" />
                  {{ user.role }}
                </span>
              </td>

              <!-- Cột Tiến độ (Progress Bar) -->
              <td class="p-4">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="font-medium text-gray-700">Đã hoàn thành</span>
                  <span class="font-bold text-[#1a2b4c]">{{ user.progressPercent }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    class="bg-[#1a2b4c] h-2 rounded-full transition-all duration-500" 
                    :style="`width: ${user.progressPercent}%`"
                  ></div>
                </div>
                <p class="text-[10px] text-gray-500 mt-1 mt-1">{{ user.completedLessons }} / {{ totalLessons }} bài giảng</p>
              </td>

              <!-- Cột Hoạt động -->
              <td class="p-4">
                <p class="text-sm text-gray-700 font-medium">{{ formatDate(user.lastActive) }}</p>
                <p class="text-xs text-gray-500">Mở bài: {{ user.lastAccessedLessonName || 'Chưa học' }}</p>
              </td>

              <!-- Cột Thao tác -->
              <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button 
                    @click="viewDetails(user)"
                    class="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Xem chi tiết tiến độ"
                  >
                    <BookOpen class="w-4 h-4" />
                  </button>
                  <button 
                    @click="handleDeleteUser(user.id, user.name)"
                    class="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Xóa tài khoản"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Footer Pagination (Giả lập) -->
      <div class="p-4 border-t border-gray-200 bg-white flex items-center justify-between text-sm">
        <span class="text-gray-500">Đang hiển thị <span class="font-bold text-gray-900">{{ filteredUsers.length }}</span> học viên</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Search, Filter, Shield, User, Trash2, BookOpen, RefreshCw, Users } from 'lucide-vue-next';
import Swal from 'sweetalert2';
import api from '@/utils/apis/axios';

// --- STATE ---
const isLoading = ref(false);
const users = ref([]);
const searchQuery = ref('');
const roleFilter = ref('All');
// Biến totalLessons không cần gán cứng nữa vì BE đã trả về totalLessons cho từng user
// Nhưng để dùng chung cho modal, ta lấy giá trị từ user đầu tiên (nếu có)
const totalLessons = computed(() => users.value.length > 0 ? users.value[0].totalLessons : 0);

// --- 1. LẤY DỮ LIỆU TỪ BACKEND ---
const fetchUsersAndProgress = async () => {
  isLoading.value = true;
  try {
    // Đảm bảo route này khớp với cấu hình router trong Node.js của cậu
    const { data } = await api.get('/users/admin/users-progress'); 
    
    // Gán thẳng dữ liệu trả về từ BE vào state của Vue
    users.value = data;
  } catch (error) {
    console.error("Lỗi tải danh sách người dùng:", error);
    Swal.fire({
      title: "Lỗi kết nối",
      text: "Không thể lấy dữ liệu học viên từ máy chủ.",
      icon: "error",
      confirmButtonColor: "#1a2b4c",
      customClass: { popup: "rounded-2xl" }
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchUsersAndProgress);

// --- 2. TÍNH TOÁN LỌC ---
const filteredUsers = computed(() => {
  let result = users.value;

  // Lọc theo Role
  if (roleFilter.value !== 'All') {
    result = result.filter(u => u.role === roleFilter.value);
  }

  // Lọc theo Search (Tên hoặc Email)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      u => (u.name && u.name.toLowerCase().includes(query)) || 
           (u.email && u.email.toLowerCase().includes(query))
    );
  }

  return result;
});

// --- 3. HÀNH ĐỘNG ---
const formatDate = (dateString) => {
  if (!dateString) return 'Chưa có hoạt động';
  const d = new Date(dateString);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const viewDetails = (user) => {
  Swal.fire({
    title: `<span class="text-lg font-bold">Tiến độ của ${user.name}</span>`,
    html: `
      <div class="text-left text-sm mt-4 space-y-3">
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Vai trò:</strong> ${user.role}</p>
        <p><strong>Hoàn thành:</strong> ${user.completedLessons} / ${user.totalLessons} bài giảng</p>
        <p><strong>Lần cuối truy cập:</strong> ${formatDate(user.lastActive)}</p>
        <p><strong>Đang học:</strong> ${user.lastAccessedLessonName || 'Chưa bắt đầu'}</p>
      </div>
    `,
    icon: 'info',
    confirmButtonColor: '#1a2b4c',
    confirmButtonText: 'Đóng',
    customClass: { popup: 'rounded-2xl' }
  });
};

// --- 4. GỌI API XÓA USER ---
const handleDeleteUser = async (userId, userName) => {
  const result = await Swal.fire({
    title: "Xác nhận xóa tài khoản?",
    text: `Bạn đang xóa vĩnh viễn tài khoản "${userName}" và toàn bộ tiến độ học tập của người này!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33", 
    cancelButtonColor: "#64748b",
    confirmButtonText: "Xóa vĩnh viễn",
    cancelButtonText: "Hủy",
    reverseButtons: true,
    customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg", cancelButton: "rounded-lg" }
  });

  if (result.isConfirmed) {
    try {
      Swal.showLoading();

      // Gọi API xóa thực tế
      await api.delete(`/admin/users/${userId}`);
      
      // Lọc user bị xóa khỏi danh sách trên FE để giao diện cập nhật
      users.value = users.value.filter(u => u.id !== userId);
      
      Swal.fire({
        title: "Đã xóa!",
        text: "Tài khoản đã bị gỡ khỏi hệ thống.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: "rounded-2xl" }
      });
    } catch (error) {
      console.error("Lỗi xóa tài khoản:", error);
      Swal.fire({
        title: "Thất bại!",
        text: "Không thể xóa người dùng này. Vui lòng thử lại.",
        icon: "error",
        confirmButtonColor: "#1a2b4c",
        customClass: { popup: "rounded-2xl" }
      });
    }
  }
};
</script>