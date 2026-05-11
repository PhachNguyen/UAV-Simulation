<template>
  <div class="min-h-screen bg-gray-100 p-4 lg:p-6 font-sans text-gray-800">
    
    <!-- Header Page -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Bảng điều khiển</h1>
        <p class="text-sm text-gray-500 mt-1">Tổng quan hoạt động trên hệ thống SkyLink</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm text-sm font-medium text-gray-600 flex items-center gap-2">
          <Calendar class="w-4 h-4 text-[#1a2b4c]" />
          {{ currentDate }}
        </div>
        <button 
          @click="fetchDashboardData"
          class="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-500 hover:text-[#1a2b4c] hover:bg-blue-50 transition-colors"
          title="Làm mới dữ liệu"
        >
          <RefreshCw class="w-5 h-5" :class="{ 'animate-spin': isLoading }" />
        </button>
      </div>
    </div>

    <!-- 1. Stats Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Card 1: Tổng Học Viên -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:border-blue-300 transition-colors">
        <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
          <Users class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Tổng Học viên</p>
          <h3 class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</h3>
        </div>
      </div>

      <!-- Card 2: Tổng Bài Giảng -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:border-purple-300 transition-colors">
        <div class="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
          <BookOpen class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Bài giảng UAV</p>
          <h3 class="text-2xl font-bold text-gray-900">{{ stats.totalLessons }}</h3>
        </div>
      </div>
  <!-- Card 4: Đang truy cập -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:border-orange-300 transition-colors relative overflow-hidden">
        <div class="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
          <Activity class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Tổng số Drones</p>
          <div class="flex items-center gap-2">
            <h3 class="text-2xl font-bold text-gray-900">{{ stats.activeToday }}</h3>
            <span class="flex w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
      <!-- Card 3: Tỷ lệ Hoàn thành (Dạng Biểu đồ tròn) -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:border-emerald-300 transition-colors">
        <div>
          <p class="text-sm text-gray-500 font-medium">Tỷ lệ Hoàn thành</p>
          <p class="text-xs text-gray-400 mt-1 flex items-center gap-1">
             <CheckCircle class="w-3 h-3 text-emerald-500" /> Toàn hệ thống
          </p>
        </div>

        <!-- Khung vẽ biểu đồ SVG -->
        <div class="relative w-16 h-16 flex items-center justify-center shrink-0">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              class="text-emerald-50"
              stroke-width="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              class="text-emerald-500 transition-all duration-1000 ease-out drop-shadow-sm"
              stroke-width="3.5"
              :stroke-dasharray="`${stats.completionRate}, 100`"
              stroke-linecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div class="absolute flex flex-col items-center justify-center">
            <span class="text-sm font-bold text-gray-900">{{ stats.completionRate }}%</span>
          </div>
        </div>
      </div>

    
    </div>

    <!-- 2. Main Content Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Cột Trái: Biểu đồ & Thao tác nhanh (Chiếm 2 phần) -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Báo cáo Tiến độ Khóa học (Chart.js Line Chart) -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp class="w-5 h-5 text-[#1a2b4c]" /> Xu hướng tương tác các Chương
            </h2>
          </div>
          
          <!-- Khu vực vẽ biểu đồ, chiều cao tối thiểu để chart không bị bóp méo -->
          <div class="relative w-full h-[280px]">
            <!-- Thay <Bar> thành <Line> -->
            <Line v-if="!isLoading && chapterStats.length > 0" :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <!-- Quick Actions -->
        <!-- <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button @click="$router.push('/admin/users')" class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-all group">
            <div class="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform"><Users class="w-5 h-5" /></div>
            <span class="text-xs font-semibold text-gray-600">Quản lý User</span>
          </button>
          
          <button @click="$router.push('/admin/courses')" class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 hover:bg-purple-50 hover:border-purple-200 transition-all group">
            <div class="p-3 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform"><LayoutTemplate class="w-5 h-5" /></div>
            <span class="text-xs font-semibold text-gray-600">Soạn Bài giảng</span>
          </button>
          
          <button class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
            <div class="p-3 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform"><Settings class="w-5 h-5" /></div>
            <span class="text-xs font-semibold text-gray-600">Cài đặt</span>
          </button>

          <button class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 hover:bg-orange-50 hover:border-orange-200 transition-all group">
            <div class="p-3 bg-orange-100 text-orange-600 rounded-lg group-hover:scale-110 transition-transform"><Database class="w-5 h-5" /></div>
            <span class="text-xs font-semibold text-gray-600">Sao lưu DB</span>
          </button>
        </div> -->
      </div>

      <!-- Cột Phải: Hoạt động gần đây (Chiếm 1 phần) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
        <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
          <History class="w-5 h-5 text-[#1a2b4c]" /> Hoạt động gần đây
        </h2>

        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
          <div v-for="(log, i) in recentActivities" :key="i" class="flex gap-4 relative">
            <div v-if="i !== recentActivities.length - 1" class="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-gray-100"></div>
            
            <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10" :class="log.iconBg">
              <component :is="log.icon" class="w-4 h-4" :class="log.iconColor" />
            </div>

            <div>
              <p class="text-sm font-semibold text-gray-900">{{ log.user }} <span class="font-normal text-gray-600">{{ log.action }}</span></p>
              <p class="text-xs font-medium text-[#1a2b4c] mt-0.5">{{ log.target }}</p>
              <p class="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Clock class="w-3 h-3" /> {{ log.time }}
              </p>
            </div>
          </div>
        </div>
        
        <button class="mt-4 w-full py-2 text-sm font-semibold text-[#1a2b4c] hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
          Xem tất cả lịch sử &rarr;
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  Users, BookOpen, CheckCircle, Activity, TrendingUp, 
  Calendar, RefreshCw, LayoutTemplate, Settings, Database, 
  History, Clock, PlayCircle, UserPlus, Trophy
} from 'lucide-vue-next';

// --- IMPORT CHART.JS (Đổi sang Line Chart) ---
import { Line } from 'vue-chartjs'; // Đổi Bar thành Line
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'; // Đổi BarElement thành LineElement và PointElement

// Đăng ký các thành phần của Chart.js cho Line Chart
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// --- 1. STATE CƠ BẢN ---
const isLoading = ref(false);
const currentDate = ref(new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

const stats = ref({
  totalUsers: 0,
  totalLessons: 0,
  completionRate: 0,
  activeToday: 0
});

const chapterStats = ref([]);
const recentActivities = ref([]);

// --- 2. CẤU HÌNH BIỂU ĐỒ (CHART.JS - LINE CHART) ---
const chartData = computed(() => ({
  labels: chapterStats.value.map(c => c.title),
  datasets: [
    {
      label: 'Lượt học',
      data: chapterStats.value.map(c => c.views),
      borderColor: '#3b82f6', // Màu của đường line (Xanh dương)
      borderWidth: 3, // Độ dày của đường
      backgroundColor: '#3b82f6', // Màu nền (sử dụng nếu cậu bật fill: true)
      pointBackgroundColor: '#ffffff', // Màu nền của các điểm (trắng)
      pointBorderColor: '#3b82f6', // Viền của các điểm
      pointBorderWidth: 2, // Độ dày viền điểm
      pointRadius: 5, // Kích thước điểm khi bình thường
      pointHoverRadius: 7, // Kích thước điểm khi hover chuột vào
      tension: 0.4 // Độ cong của đường thẳng (0 là gãy khúc, 0.4 là cong mềm mại)
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a2b4c',
      padding: 12,
      titleFont: { size: 14, family: 'Inter, sans-serif' },
      bodyFont: { size: 13, family: 'Inter, sans-serif' },
      displayColors: false,
      callbacks: {
        label: (context) => `${context.parsed.y} lượt học`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: { size: 12, family: 'Inter, sans-serif' },
        callback: function(value, index) {
          const title = chartData.value.labels[index];
          return title.length > 15 ? title.substring(0, 15) + '...' : title;
        }
      }
    },
    y: {
      beginAtZero: true,
      border: { display: false }, 
      grid: { 
        color: '#f1f5f9',
        tickLength: 0
      },
      ticks: {
        stepSize: 50,
        font: { size: 12, family: 'Inter, sans-serif' }
      }
    }
  }
};

// --- 3. LẤY DỮ LIỆU (MOCK API) ---
const fetchDashboardData = () => {
  isLoading.value = true;
  
  setTimeout(() => {
    stats.value = {
      totalUsers: 145,
      totalLessons: 24,
      completionRate: 68,
      activeToday: 12
    };

    chapterStats.value = [
      { title: 'Chương 1: Khái niệm cơ bản về UAV', views: 320 },
      { title: 'Chương 2: Khí động học & Cấu tạo', views: 215 },
      { title: 'Chương 3: Điều khiển & Cảm biến', views: 150 },
      { title: 'Chương 4: Xử lý sự cố & Bảo trì', views: 85 },
    ];

    recentActivities.value = [
      { user: 'Nguyễn Văn A', action: 'vừa hoàn thành', target: 'Bài kiểm tra Chương 1', time: '10 phút trước', icon: Trophy, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
      { user: 'Trần Thị B', action: 'đang học', target: 'Mô hình 3D Động cơ', time: '35 phút trước', icon: PlayCircle, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
      { user: 'Lê Hoàng', action: 'vừa đăng ký', target: 'Tài khoản học viên', time: '2 giờ trước', icon: UserPlus, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
      { user: 'Phạm Minh', action: 'vừa hoàn thành', target: 'Thực hành mô phỏng bay', time: 'Hôm qua', icon: CheckCircle, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    ];

    isLoading.value = false;
  }, 800);
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #cbd5e1;
}
</style>