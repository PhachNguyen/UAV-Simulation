<template>
  <div class="min-h-screen bg-gray-100 p-4 lg:p-6 font-sans text-gray-800">
    
    <!-- Header Page -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
        <p class="text-sm text-gray-500 mt-1">Kiểm soát tài khoản và tiến độ học tập trên hệ thống </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
          <div class="p-1.5 bg-blue-100 text-blue-600 rounded-md"><Users :size="18" /></div>
          <div>
            <p class="text-xs text-gray-500 font-semibold">Tổng số tài khoản</p>
            <p class="text-lg font-bold leading-none text-gray-900">{{ users.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      
      <!-- Toolbar: Search & Filter -->
      <div class="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between gap-4 shrink-0">
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
          <div class="px-3 py-2 border border-gray-300 rounded-lg bg-white">
            <Filter class="text-gray-400 w-4 h-4" />
          </div>
         
          <select 
            v-model="roleFilter"
            class="cursor-pointer text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1a2b4c] outline-none bg-white"
          >
            <option value="All">Tất cả vai trò</option>
            <option value="Admin">Quản trị viên (admin)</option>
            <option value="User">Người dùng (User)</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto flex-1">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
              <th class="p-4">Người dùng</th>
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

          <tbody v-else-if="paginatedUsers.length === 0">
            <tr>
              <td colspan="5" class="p-8 text-center text-gray-500 font-medium">
                Không tìm thấy kết quả nào phù hợp.
              </td>
            </tr>
          </tbody>

          <tbody v-else class="divide-y divide-gray-100">
            <!-- Đổi filteredUsers thành paginatedUsers -->
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50/50 transition-colors">
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

              <td class="p-4">
                <span 
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors"
                  :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                >
                  <Shield v-if="user.role === 'admin'" class="w-3 h-3" />
                  <User v-else class="w-3 h-3" />
                  <!-- {{ user.role }} --> Quản trị viên
                </span>
              </td>

              <td class="p-4">
                <div v-if="user.role === 'admin'" class="text-sm italic text-gray-400 flex items-center gap-1.5">
                  <Shield class="w-4 h-4 opacity-50" /> Quản trị viên hệ thống
                </div>
                
                <div v-else>
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
                  <p class="text-[10px] text-gray-500 mt-1">{{ user.completedLessons }} / {{ totalLessons }} bài giảng</p>
                </div>
              </td>

              <td class="p-4">
                <p class="text-sm text-gray-700 font-medium">{{ formatDate(user.lastActive) }}</p>
                <p class="text-xs text-gray-500" v-if="user.role !== 'admin'">
                  Mở bài: {{ user.lastAccessedLessonName || 'Chưa học' }}
                </p>
              </td>

              <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button 
                    @click="viewDetails(user)"
                    class="cursor-pointer p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Xem chi tiết"
                  >
                    <BookOpen class="w-4 h-4" />
                  </button>
                  
                  <button 
                    v-if="user.role !== 'admin'"
                    @click="handleDeleteUser(user.id, user.name)"
                    class="cursor-pointer p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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
      
      <!-- Footer Pagination (MỚI BỔ SUNG) -->
      <div v-if="filteredUsers.length > 0" class="p-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between text-sm gap-4 shrink-0">
        <span class="text-gray-500">
          Hiển thị <span class="font-bold text-gray-700">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
          - <span class="font-bold text-gray-700">{{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}</span>
          trong  <span class="font-bold text-gray-700">{{ filteredUsers.length }}</span> tài khoản
        </span>

        <div class="flex items-center gap-1.5">
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="cursor-pointer px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Trước
          </button>
          
          <div class="flex items-center px-1 gap-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors"
              :class="currentPage === page ? 'bg-[#1a2b4c] text-white' : 'text-gray-600 hover:bg-gray-100'"
            >
              {{ page }}
            </button>
          </div>

          <button 
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="cursor-pointer px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Search, Filter, Shield, User, Trash2, BookOpen, RefreshCw, Users } from 'lucide-vue-next';
import Swal from 'sweetalert2';
import api from '@/utils/apis/axios';

// --- 1. STATE & PAGINATION STATE ---
const isLoading = ref(false);
const users = ref([]);
const searchQuery = ref('');
const roleFilter = ref('All');
const totalLessons = computed(() => users.value.length > 0 ? users.value[0].totalLessons : 0);

// Thêm State Phân trang
const currentPage = ref(1);
const itemsPerPage = ref(2); // Cậu có thể đổi số này thành 5 hoặc 8 tùy ý

// Reset về trang 1 nếu người dùng Gõ tìm kiếm hoặc Đổi Filter
watch([searchQuery, roleFilter], () => {
  currentPage.value = 1;
});

// --- 2. LẤY DỮ LIỆU TỪ BACKEND ---
const fetchUsersAndProgress = async () => {
  isLoading.value = true;
  try {
    const { data } = await api.get('/users/admin/users-progress'); 
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

// --- 3. TÍNH TOÁN LỌC, SẮP XẾP & PHÂN TRANG ---
const filteredUsers = computed(() => {
  let result = [...users.value];

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

  // SẮP XẾP: Ép Admin lên đầu tiên
  result.sort((a, b) => {
    if (a.role === 'admin' && b.role !== 'admin') return -1;
    if (a.role !== 'admin' && b.role === 'admin') return 1;
    return a.name.localeCompare(b.name);
  });

  return result;
});

// Tính tổng số trang
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value) || 1;
});

// Cắt mảng người dùng theo Trang hiện tại
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

// --- 4. HÀNH ĐỘNG ---
const formatDate = (dateString) => {
  if (!dateString) return 'Chưa có hoạt động';
  const d = new Date(dateString);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const viewDetails = (user) => {
  const progressHtml = user.role === 'admin' 
    ? `<p class="text-gray-500 italic mt-2">Tài khoản Quản trị viên không ghi nhận tiến độ học tập.</p>`
    : `<p><strong>Hoàn thành:</strong> ${user.completedLessons} / ${user.totalLessons} bài giảng</p>
       <p><strong>Đang học:</strong> ${user.lastAccessedLessonName || 'Chưa bắt đầu'}</p>`;

  Swal.fire({
    title: `<span class="text-lg font-bold">Thông tin: ${user.name}</span>`,
    html: `
      <div class="text-left text-sm mt-4 space-y-3">
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Vai trò:</strong> ${user.role}</p>
        <p><strong>Lần cuối truy cập:</strong> ${formatDate(user.lastActive)}</p>
        <hr class="my-3 border-gray-200" />
        ${progressHtml}
      </div>
    `,
    icon: 'info',
    confirmButtonColor: '#1a2b4c',
    confirmButtonText: 'Đóng',
    customClass: { popup: 'rounded-2xl' }
  });
};

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

      await api.delete(`/users/admin/users/${userId}`);
      
      // Xóa khỏi danh sách FE
      users.value = users.value.filter(u => u.id !== userId);
      
      // MẸO UX: Nếu xóa phần tử cuối cùng của trang hiện tại, thì lùi về trang trước đó
      if (paginatedUsers.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
      }
      
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