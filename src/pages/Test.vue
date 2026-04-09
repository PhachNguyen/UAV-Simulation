<script setup>
import { ref } from "vue";

// 1. Quản lý trạng thái tiến độ
const progress = ref(70);
const currentModule = ref("Mô-đun 02: Khí động học");

// 2. Dữ liệu chương trình đào tạo (Sidebar)
const curriculum = ref([
  {
    name: "Mô-đun 01: Cơ bản về lõi",
    lessons: [
      { title: "An toàn & Chuẩn bị", time: "04:15", status: "completed" },
      { title: "Bản đồ bộ điều khiển", time: "08:20", status: "completed" },
    ],
  },
  {
    name: "Mô-đun 02: Khí động học",
    lessons: [
      { title: "Điều hướng cột nhiệt", time: "18:20", status: "active" },
      { title: "Bù nhiễu loạn", time: "12:45", status: "locked" },
      { title: "Kỹ thuật hạ cánh chính xác", time: "15:10", status: "locked" },
    ],
  },
  {
    name: "Mô-đun 03: Đo từ xa",
    lessons: [
      { title: "Cảm biến & Luồng dữ liệu", time: "22:00", status: "locked" },
    ],
  },
]);

// 3. Tài nguyên đính kèm
const resources = ref([
  { name: "THERMAL_PHYSICS_V2.PDF", type: "PDF", color: "bg-[#0b1f3f]" },
  { name: "MISSION_LOG_SHEET.XLSX", type: "XLSX", color: "bg-green-700" },
]);

// 4. Nội dung chi tiết bài học (Dễ dàng mở rộng/API hóa)
const lessonDetails = ref([
  {
    id: "01",
    title: "Tổng quan về Khí động học Drone",
    paragraphs: [
      "Tìm hiểu về các lực tác động lên thiết bị bay không người lái trong quá trình vận hành. Khí động học đóng vai trò then chốt trong việc tối ưu hóa hiệu suất bay và tiết kiệm năng lượng pin. Trong phần này, chúng ta sẽ phân tích sâu về các dòng khí bao quanh cánh quạt và thân máy.",
      "Cơ chế tạo lực nâng (lift) và lực cản (drag) được giải thích thông qua các mô hình mô phỏng thực tế. Việc hiểu rõ các thông số này giúp phi công điều khiển thiết bị ổn định hơn trong các điều kiện môi trường khắc nghiệt như gió mạnh hoặc nhiễu động không khí cục bộ.",
    ],
  },
  {
    id: "02",
    title: "Kỹ thuật Điều hướng Cột nhiệt (Thermals)",
    paragraphs: [
      "Cột nhiệt là những luồng không khí nóng bốc lên từ mặt đất, thường xuất hiện trên các bề mặt hấp thụ nhiệt tốt như đường nhựa, mái nhà tôn hoặc cánh đồng khô hạn. Phi công nâng cao có thể tận dụng các cột nhiệt này để duy trì độ cao mà không cần sử dụng nhiều năng lượng từ động cơ.",
      "Để xác định cột nhiệt, phi công cần quan sát các dấu hiệu thị giác như sự di chuyển của chim săn mồi, sự hình thành của mây tích (cumulus) hoặc sử dụng cảm biến áp suất (barometer) có độ nhạy cao. Bài học này sẽ hướng dẫn quy trình xoay vòng (circling) để 'bám' vào tâm của cột nhiệt hiệu quả nhất.",
    ],
    note: "Lưu ý: Luôn duy trì quan sát đường chân trời và các vật cản xung quanh khi đang tập trung tìm kiếm luồng khí bốc.",
  },
  {
    id: "03",
    title: "Quản lý Năng lượng và Tối ưu hóa Pin",
    paragraphs: [
      "Một trong những kỹ năng quan trọng nhất của phi công drone chuyên nghiệp là khả năng quản lý dung lượng pin còn lại. Việc sử dụng cột nhiệt kết hợp với chế độ bay lượn (gliding) có thể tăng thời gian hoạt động lên tới 25-30% so với bay thông thường.",
      "Chúng ta sẽ nghiên cứu biểu đồ tiêu thụ điện năng dựa trên vận tốc gió và trọng lượng tải trọng. Các bài tập thực hành sẽ giúp bạn rèn luyện phản xạ tính toán khoảng cách an toàn để quay về điểm xuất phát (RTH - Return to Home) dựa trên các biến số môi trường thay đổi liên tục.",
    ],
  },
]);
</script>

<template>
  <div
    class="text-slate-800 antialiased min-h-screen flex flex-col font-inter bg-slate-50"
  >
    <!-- <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div
        class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-8">
          <a
            href="#"
            class="text-xl font-bold tracking-tight text-slate-900 font-mono"
            >AERO_HUD</a
          >
          <nav
            class="hidden md:flex items-center h-full space-x-6 text-sm font-semibold text-slate-600 uppercase tracking-wide"
          >
            <a href="#" class="hover:text-slate-900 transition-colors"
              >Bảng điều khiển</a
            >
            <a href="#" class="hover:text-slate-900 transition-colors"
              >Giới thiệu</a
            >
            <a
              href="#"
              class="text-slate-900 border-b-2 border-blue-900 h-16 flex items-center"
              >Khóa học</a
            >
            <a href="#" class="hover:text-slate-900 transition-colors"
              >Mô phỏng</a
            >
          </nav>
        </div>
        <div class="flex items-center gap-5 text-slate-500">
          <button class="hover:text-slate-900 relative">
            <i class="ph-fill ph-bell text-xl"></i>
            <span
              class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"
            ></span>
          </button>
          <button class="hover:text-slate-900">
            <i class="ph-fill ph-gear text-xl"></i>
          </button>
          <button
            class="w-8 h-8 rounded-full overflow-hidden border border-slate-200 ml-2"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header> -->

    <main
      class="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8 flex flex-col lg:flex-row gap-8"
    >
      <div class="flex-1 flex flex-col gap-8 min-w-0">
        <div>
          <h2
            class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono"
          >
            Mục tiêu nhiệm vụ // Các kỹ thuật bay nâng cao
          </h2>
          <h1 class="text-3xl font-bold text-slate-900">Khóa học Drone</h1>
        </div>

        <div
          class="relative bg-slate-900 rounded-lg overflow-hidden aspect-[16/9] shadow-sm border border-slate-200"
        >
          <img
            src="../assets/img/DJI Flip_thumbail_2.webp"
            alt="Drone View"
            class="w-full h-full object-cover opacity-70"
          />
          <!-- <video
            controls
            class="w-full rounded-2xl"
            style="margin-bottom: 16px"
          >
            <source src="../assets/videos/drone-intro.mp4" type="video/mp4" />
            Trình duyệt không hỗ trợ video
          </video> -->
          <div class="absolute inset-0 flex flex-col justify-between p-4">
            <div class="flex justify-between items-start">
              <div
                class="bg-slate-800/80 backdrop-blur border border-slate-600/50 rounded p-2 px-3 text-xs text-white font-mono flex items-center gap-2"
              >
                <i class="ph ph-target"></i> Tín hiệu: Ổn định
              </div>
              <div
                class="text-right text-xs text-white/80 font-mono drop-shadow-md"
              >
                <div>LAT: 45.5231 N</div>
                <div>LON: 122.6765 W</div>
              </div>
            </div>

            <div
              class="bg-[#0b1f3f]/95 backdrop-blur-sm border border-blue-900/50 rounded-lg p-3 flex items-center gap-4 text-white"
            >
              <button class="hover:text-blue-300 transition-colors">
                <i class="ph-fill ph-play text-xl"></i>
              </button>
              <div
                class="flex-1 h-1.5 bg-white/20 rounded-full relative overflow-hidden"
              >
                <div class="absolute inset-y-0 left-0 bg-white w-2/3"></div>
              </div>
              <div class="text-xs font-mono text-white/80">12:45 / 18:20</div>
              <button class="hover:text-blue-300">
                <i class="ph-fill ph-speaker-high text-lg"></i>
              </button>
              <button class="hover:text-blue-300">
                <i class="ph ph-corners-out text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3
              class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4"
            >
              Tóm tắt nhiệm vụ
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Mô-đun này đề cập đến các cơ chế quan trọng trong việc xác định và
              tận dụng luồng khí bốc nhiệt để kéo dài thời gian thực hiện nhiệm
              vụ. Chúng ta phân tích sự chênh lệch áp suất không khí và các dấu
              hiệu thị giác từ cảnh quan.
            </p>
            <div
              class="flex items-center gap-4 text-xs font-semibold text-slate-700"
            >
              <div class="flex items-center gap-1.5">
                <i class="ph-fill ph-clock text-slate-400"></i> 18m 20s
              </div>
              <div class="flex items-center gap-1.5">
                <i class="ph-fill ph-seal-check text-slate-400"></i> Level 4
                Cert
              </div>
            </div>
          </div>

          <div>
            <h3
              class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4"
            >
              Tài nguyên chiến thuật
            </h3>
            <div class="space-y-3">
              <div
                v-for="res in resources"
                :key="res.name"
                class="flex items-center justify-between p-3 bg-white rounded-md border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group shadow-sm"
              >
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      res.color,
                      'w-8 h-8 text-white rounded flex items-center justify-center text-[10px] font-bold',
                    ]"
                  >
                    {{ res.type }}
                  </div>
                  <span
                    class="text-sm font-bold text-slate-800 group-hover:text-blue-900"
                    >{{ res.name }}</span
                  >
                </div>
                <i
                  class="ph ph-download-simple text-slate-400 group-hover:text-blue-600"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <section
          class="bg-white border border-slate-200 rounded-lg p-8 shadow-sm"
        >
          <h2
            class="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-8"
          >
            Nội dung chi tiết bài học
          </h2>
          <div class="space-y-12">
            <div v-for="item in lessonDetails" :key="item.id">
              <h3
                class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"
              >
                <span
                  class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-mono text-slate-600"
                  >{{ item.id }}</span
                >
                {{ item.title }}
              </h3>
              <div class="space-y-4 text-slate-600 leading-relaxed">
                <p v-for="(p, index) in item.paragraphs" :key="index">
                  {{ p }}
                </p>
                <div
                  v-if="item.note"
                  class="bg-slate-50 border-l-4 border-[#0b1f3f] p-4 italic text-sm"
                >
                  "{{ item.note }}"
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside class="w-full lg:w-[400px] flex flex-col gap-6">
        <div
          class="bg-white rounded-lg p-5 border border-slate-200 flex items-center justify-between shadow-sm"
        >
          <div class="flex-1 mr-6">
            <div class="flex justify-between items-end mb-2">
              <span class="text-xs font-bold text-slate-700 uppercase"
                >Tiến độ khóa học</span
              >
              <span class="text-xs font-bold text-slate-900"
                >{{ progress }}%</span
              >
            </div>
            <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-[#0b1f3f] transition-all duration-500"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>
          <div class="text-right text-[10px]">
            <div class="text-slate-500 uppercase mb-1 font-semibold">
              Mô-đun hiện tại:
            </div>
            <div class="font-bold text-slate-800">{{ currentModule }}</div>
          </div>
        </div>

        <div
          class="bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden sticky top-24 shadow-md"
        >
          <div class="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3
              class="text-sm font-bold text-slate-800 uppercase tracking-wide"
            >
              Chương trình đào tạo bay
            </h3>
          </div>
          <div class="overflow-y-auto sidebar-scroll max-h-[500px]">
            <div v-for="mod in curriculum" :key="mod.name">
              <div
                class="bg-slate-50 px-5 py-3 border-y border-slate-100 sticky top-0 z-10"
              >
                <h4
                  class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                >
                  {{ mod.name }}
                </h4>
              </div>
              <div class="divide-y divide-slate-50">
                <div
                  v-for="lesson in mod.lessons"
                  :key="lesson.title"
                  :class="[
                    'p-4 pl-12 relative flex flex-col gap-1 transition-all',
                    lesson.status === 'active'
                      ? 'bg-blue-50 border-l-4 border-blue-900'
                      : 'hover:bg-slate-50 cursor-pointer',
                    lesson.status === 'locked'
                      ? 'opacity-50 cursor-not-allowed'
                      : '',
                  ]"
                >
                  <i
                    v-if="lesson.status === 'completed'"
                    class="ph-fill ph-check-circle text-blue-900 absolute left-5 top-[18px] text-lg"
                  ></i>
                  <i
                    v-else-if="lesson.status === 'active'"
                    class="ph-fill ph-play-circle text-blue-900 absolute left-[17px] top-[18px] text-lg"
                  ></i>
                  <i
                    v-else
                    class="ph-fill ph-lock-key text-slate-400 absolute left-5 top-[18px] text-lg"
                  ></i>

                  <div
                    :class="[
                      'text-sm font-semibold',
                      lesson.status === 'active'
                        ? 'text-blue-900'
                        : 'text-slate-800',
                    ]"
                  >
                    {{ lesson.title }}
                  </div>
                  <div class="text-[10px] text-slate-500 font-mono uppercase">
                    {{ lesson.time }}
                    <span v-if="lesson.status === 'active'">• Đang phát</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-slate-50 border-t border-slate-100">
            <button
              class="w-full bg-[#0b1f3f] hover:bg-slate-800 text-white text-xs font-bold uppercase py-4 rounded transition-all flex items-center justify-center gap-2"
            >
              Bài giảng tiếp theo <i class="ph-bold ph-arrow-right"></i>
            </button>
          </div>
        </div>
      </aside>
    </main>

    <footer class="bg-white border-t border-slate-200 mt-auto">
      <div
        class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono"
      >
        <div class="flex items-center gap-6">
          <span class="text-slate-900">SPEC-01 // HUD_OS</span>
          <a href="#" class="hover:text-blue-900 transition-colors"
            >Giao thức đo từ xa</a
          >
          <a href="#" class="hover:text-blue-900 transition-colors"
            >Điều khoản bay</a
          >
          <a href="#" class="hover:text-blue-900 transition-colors"
            >Trạng thái hệ thống</a
          >
        </div>
        <div>© 2026 TRÍ TUỆ HÀNG KHÔNG</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap");

.font-inter {
  font-family: "Inter", sans-serif;
}
.font-mono {
  font-family: "JetBrains Mono", monospace;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
* {
  scrollbar-width: thin;

  scrollbar-color: #cbd5e1 #f1f5f9;
}
</style>
