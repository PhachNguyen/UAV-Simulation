<script setup>
import { ref, computed } from "vue";
import {
  Bell,
  Settings,
  Navigation,
  Cpu,
  Radar,
  Plane,
  History,
  Download,
  Compass,
  Share2,
  Globe,
  Box,
  ScanFace,
  Wifi,
  Zap,
  Video,
  Maximize2,
  ShieldCheck,
  Gauge,
  BatteryCharging,
  Radio,
  Thermometer,
  Ruler,
  Weight,
  CloudRain,
  Layers,
  Eye,
  Target,
  Award,
} from "lucide-vue-next";

// --- DATA CONSTANTS ---
// const NAVIGATION_LINKS = [
//   { name: "Thiết bị", active: true },
//   { name: "Viễn thám", active: false },
//   { name: "Điều khiển", active: false },
//   { name: "Lưu trữ", active: false },
// ];

// const SIDEBAR_MENU = [
//   { name: "Thông số chính", icon: Cpu, active: true },
//   { name: "Cảm biến", icon: Radar, active: false },
//   { name: "Hệ thống bay", icon: Navigation, active: false },
//   { name: "Nhật ký bay", icon: History, active: false },
// ];
const KEY_HIGHLIGHTS = [
  {
    title: "Vật liệu tàng hình",
    desc: "Khung carbon nguyên khối giúp giảm tiết diện phản xạ radar.",
    icon: ShieldCheck,
  },
  {
    title: "Trí tuệ nhân tạo",
    desc: "Chip AI Edge xử lý dữ liệu mục tiêu ngay trên thiết bị.",
    icon: Cpu,
  },
  {
    title: "Quang học hồng ngoại",
    desc: "Ống kính nhiệt độ phân giải cao cho tầm nhìn đêm tuyệt đối.",
    icon: Eye,
  },
];
const GALLERY = [
  {
    id: 1,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHTm_g-Z_UlmOLIxE_1meDprLiHuowDAma3k1R4x3eKCNWrKLQ95T2vEJ4Aj2jjOdLi4XxJMFcqmxv6B3EQtXBBZWlub129JFghFSe7Ypr_erfmqNXK1qp2L6XeJugqThQQMUxBdLesIUlhcZEiJSumzRIPHUeH3gOjD8LAX2axe86bVgyl1Sj7GmHJqUf6vDFPRZXWsSimQUEVbYHoWKPn2a0Q1iLxvRU1pah0lI7Kmpncl0YyFs-bPhwtRM_wel0KKPlz9g_WA",
    title: "Góc chính",
  },
  {
    id: 2,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyjco2QLgeJI6JoeDc1jBdiPSVjvRBJEPt-62gxn3Z4TNqPrJoCA1WZTh10NS2U9z_hm36gwUetdsxTCUpFag9uLvF2tzijvKtWVAZVmll8SpXXXWwNLZIumxAAyqrInU-RaMR1Jm6h1f38loLXXUw-wqQBWBcPkAtq75ZR0HdLOgsSWAQ-_ZWxUFyyRLEjmOHW-Z11OMTcCI-jCWr3niE7nUvoEZyw58y2U6dRTEIbmyk0FcsaPkfWw784UkK2qXl4b9nxr4SnQ",
    title: "Cận cảnh",
  },
  {
    id: 3,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuANaliALO5CtcmMhzAXCQZP8t3WhUrJ1DuuD9fPm47Xtby6yN9tp_YlWxMlXDj4049T9nspcejgsILLubJP1Z6ADRBP50VB-WsnPJEIIfC48_X04HA2HlbfrSwYpJyDg5tHK0SctdDSO_ciHEtA49RCTyGhx-8uUlhTdVAyg8qM1jyBgXstTAKGxSLBIV3TOVMlq4GIcfEJsM4pT-sIP_9nR4-40w_iSB1n71e7a-ORnzyjHUUqNO8MA1zz3ES3QNvrXkdGemcpBQ",
    title: "Cảm biến",
  },
  {
    id: 4,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6RJqWLrrK_9Fqn6sDIZTxZnjP3VdmrsCvsSky-IBAryVGfRjnMKrMFtLCleSQ4-vdkmjAxkKaQlMTTlt-BcV1EFN65rQOzhtVdi7mFHt5u1b-ADBP41py6ka9HwoUB8JXJX5xo7txDiAVYpdv9wnxZzkWaiAFmtOEtHLwsQgXsjgXVRn-y1wIlulpksVnWbcojrK2rZAIS4QwEmrm6pm2A3ufnx5WQ5TuHEUmWMakfybmEjPtV-qS2rISVEgEuQHaM6i4wAC70w",
    title: "Truyền tải",
  },
];

const TECHNICAL_SPECS = {
  performance: [
    { label: "Tải trọng tối đa", value: "2.5 KG" },
    { label: "Hiệu suất động lực", value: "98%" },
    { label: "Vận tốc tối đa", value: "85 KM/H" },
  ],
  camera: [
    "Cảm biến CMOS 1 inch 20MP",
    "Quay video 4K HDR chuyển động chậm",
    "Hệ thống Zoom quang học 32x",
  ],
};
const DETAILED_SPECS = {
  flight: [
    { label: "Tải trọng tối đa", value: "2.5 KG" },
    { label: "Vận tốc tối đa", value: "85 KM/H" },
    { label: "Thời gian bay", value: "45 PHÚT" },
    { label: "Kháng gió", value: "Cấp 7 (15m/s)" },
  ],
  physical: [
    { label: "Trọng lượng", value: "4.2 KG", icon: Weight },
    { label: "Chỉ số IP", value: "IP55", icon: CloudRain },
    { label: "Nhiệt độ", value: "-20°C - 50°C", icon: Thermometer },
    { label: "Kích thước", value: "450x450x180mm", icon: Ruler },
  ],
  transmission: [
    { label: "Hệ thống", value: "AeroSync 4.0" },
    { label: "Khoảng cách", value: "15 KM" },
    { label: "Độ trễ", value: "28ms" },
    { label: "Tần số", value: "2.4 / 5.8 GHz" },
  ],
};
// --- STATE MANAGEMENT ---
const activeImage = ref(GALLERY[0].url);
const isSimulating = ref(false);
const activeTab = ref("specs"); // 'desc', 'specs', 'sim'

const selectImage = (url) => {
  activeImage.value = url;
};
const toggleSim = () => {
  isSimulating.value = !isSimulating.value;
};
</script>

<template>
  <div
    class="min-h-screen bg-white text-[#1a1a1a] font-sans antialiased selection:bg-[#0b1f3f] selection:text-white"
  >
    <main class="">
      <div class="mx-auto px-8 py-10 space-y-16">
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-7 space-y-4">
            <div
              class="bg-[#f8f9fa] rounded-2xl border border-[#dee2e6] overflow-hidden relative group"
            >
              <img
                :src="activeImage"
                alt="Main"
                class="w-full aspect-video object-contain p-12 transition-all duration-700"
              />
              <!-- <div
                class="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-sm border border-[#dee2e6] text-[9px] font-black uppercase tracking-widest text-[#0b1f3f]"
              >
                MOD: STUDIO_ENV
              </div> -->
            </div>
            <div class="grid grid-cols-4 gap-4">
              <button
                v-for="img in GALLERY"
                :key="img.id"
                @click="selectImage(img.url)"
                :class="[
                  activeImage === img.url
                    ? 'border-[#0b1f3f] shadow-md'
                    : 'border-[#dee2e6] opacity-60 hover:opacity-100',
                  'bg-[#f8f9fa] border-2 rounded-xl overflow-hidden aspect-video p-2 transition-all',
                ]"
              >
                <img :src="img.url" class="w-full h-full object-contain" />
              </button>
            </div>
          </div>

          <div class="lg:col-span-5 space-y-8">
            <div class="space-y-4">
              <p
                class="text-[#0b1f3f] font-bold text-[10px] tracking-[0.3em] uppercase opacity-60"
              >
                High-End Surveillance
              </p>
              <h1
                class="text-6xl font-black text-[#0b1f3f] leading-none tracking-tighter"
              >
                AeroGuardian<br />X9
              </h1>
            </div>
            <p class="text-[#4a4a4a] leading-relaxed text-sm font-medium">
              Giải pháp giám sát tầm xa tối giản và hiệu quả. AeroGuardian X9
              kết hợp thiết kế công nghiệp tinh tế với hệ thống truyền tải dữ
              liệu bảo mật AES-256.
            </p>
            <div class="flex flex-col gap-3">
              <button
                class="w-full py-4 bg-[#0b1f3f] text-white font-bold rounded flex items-center justify-center gap-3 text-[10px] tracking-widest uppercase hover:shadow-2xl transition-all"
              >
                <Download class="w-4 h-4" /> Tải mô phỏng
              </button>
              <button
                class="w-full py-4 border-2 border-[#0b1f3f] text-[#0b1f3f] font-bold rounded flex items-center justify-center gap-3 text-[10px] tracking-widest uppercase hover:bg-slate-50 transition-all"
              >
                <Compass class="w-4 h-4" /> Khám phá công nghệ
              </button>
            </div>
          </div>
        </section>
        <!-- Mô tả sản phẩm  -->
        <section class="py-16 border-y border-[#dee2e6] bg-white">
          <div class="grid lg:grid-cols-12 gap-16 items-start">
            <div class="lg:col-span-8 space-y-8">
              <div class="space-y-4">
                <div class="flex items-center gap-3 text-[#0b1f3f]">
                  <Layers class="w-5 h-5" />
                  <h2 class="text-2xl font-black uppercase tracking-tight">
                    Chi tiết hệ thống vận hành
                  </h2>
                </div>
                <div class="w-16 h-1 bg-[#0b1f3f]"></div>
              </div>

              <div
                class="space-y-6 text-[#4a4a4a] leading-relaxed text-lg font-medium"
              >
                <p>
                  <span
                    class="text-[#0b1f3f] font-black underline decoration-[#00bcd4] decoration-2 underline-offset-4"
                    >AeroGuardian X9</span
                  >
                  là tinh hoa của kỹ thuật hàng không hiện đại, được thiết kế để
                  trở thành một trung tâm dữ liệu di động trong mọi điều kiện
                  khắc nghiệt. Với khung vỏ cấu tạo từ sợi Carbon siêu bền cấp
                  độ quân sự, thiết bị có khả năng kháng chấn và vận hành ổn
                  định trong biên độ nhiệt độ từ -25°C đến 55°C.
                </p>

                <p>
                  Hệ thống điều khiển trung tâm sử dụng kiến trúc xử lý song
                  song, cho phép
                  <span class="text-[#0b1f3f] font-bold"
                    >tự động hóa lộ trình bay phức tạp</span
                  >
                  dựa trên bản đồ 3D thực tế mà không cần sự can thiệp liên tục
                  từ mặt đất. Điều này cho phép X9 thực hiện các nhiệm vụ tuần
                  tra biên giới, giám sát lưới điện và cứu hộ khẩn cấp với độ
                  chính xác sai số chỉ dưới 2cm.
                </p>

                <div
                  class="p-8 bg-[#f8f9fa] border-l-8 border-[#0b1f3f] rounded-r-2xl space-y-3 relative overflow-hidden group"
                >
                  <Target
                    class="absolute -right-4 -bottom-4 w-32 h-32 text-[#0b1f3f] opacity-[0.03] group-hover:scale-110 transition-transform"
                  />
                  <div class="flex items-center gap-2 text-[#0b1f3f]">
                    <Award class="w-4 h-4" />
                    <p
                      class="font-black uppercase text-[10px] tracking-[0.2em]"
                    >
                      Operational Standard //
                    </p>
                  </div>
                  <p
                    class="italic text-[#1a1a1a] text-xl font-semibold leading-snug"
                  >
                    "X9 không chỉ cung cấp hình ảnh; nó cung cấp sự an tâm tuyệt
                    đối nhờ hệ thống dự phòng kép cho mọi linh kiện trọng yếu
                    trên máy bay."
                  </p>
                </div>
              </div>
            </div>

            <div class="lg:col-span-4 space-y-6">
              <div
                class="bg-[#0b1f3f] rounded-3xl p-8 text-white shadow-2xl space-y-10 relative overflow-hidden"
              >
                <div
                  class="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"
                ></div>

                <h3
                  class="text-[10px] font-black uppercase tracking-[0.3em] text-[#00bcd4] opacity-80"
                >
                  Ưu thế cốt lõi
                </h3>

                <div class="space-y-8">
                  <div
                    v-for="item in KEY_HIGHLIGHTS"
                    :key="item.title"
                    class="flex gap-5 group"
                  >
                    <div
                      class="w-12 h-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#00bcd4] group-hover:text-[#0b1f3f] transition-all shadow-inner border border-white/5"
                    >
                      <component
                        :is="item.icon"
                        class="w-6 h-6 transition-transform group-hover:rotate-12"
                      />
                    </div>
                    <div class="space-y-1">
                      <h4
                        class="font-black uppercase text-xs tracking-widest text-white"
                      >
                        {{ item.title }}
                      </h4>
                      <p class="text-xs text-white/60 leading-relaxed">
                        {{ item.desc }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="pt-6 border-t border-white/10 flex items-center justify-between text-center"
                >
                  <div>
                    <p class="text-[8px] font-bold opacity-50 uppercase mb-1">
                      Mã hóa
                    </p>
                    <p class="text-lg font-black text-[#00bcd4]">AES-256</p>
                  </div>
                  <div class="w-px h-8 bg-white/10"></div>
                  <div>
                    <p class="text-[8px] font-bold opacity-50 uppercase mb-1">
                      Chuẩn bảo vệ
                    </p>
                    <p class="text-lg font-black text-[#00bcd4]">IP67</p>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 px-2">
                <span
                  v-for="tag in [
                    'Carbon Fiber',
                    'Stealth Tech',
                    'AI-Vision',
                    'LTE-Ready',
                  ]"
                  class="px-3 py-1 bg-[#f8f9fa] text-[#4a4a4a] text-[9px] font-black uppercase tracking-widest rounded border border-[#dee2e6] hover:border-[#0b1f3f] cursor-default transition-colors"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <!--  Thông số kỹ thuật -->
        <section class="space-y-12">
          <div class="space-y-8">
            <h2
              class="text-2xl font-black text-[#0b1f3f] uppercase tracking-tight flex items-center gap-3"
            >
              <span class="w-2 h-8 bg-[#0b1f3f]"></span>
              Thông số kỹ thuật chi tiết
            </h2>

            <div class="grid lg:grid-cols-2 gap-6">
              <div
                class="border border-[#dee2e6] rounded-2xl overflow-hidden shadow-sm bg-white"
              >
                <div
                  class="bg-[#f8f9fa] px-6 py-4 border-b border-[#dee2e6] flex items-center gap-3"
                >
                  <Gauge class="w-4 h-4 text-[#0b1f3f]" />
                  <h3
                    class="font-black text-[10px] uppercase tracking-[0.2em] text-[#0b1f3f]"
                  >
                    Hiệu suất vận hành
                  </h3>
                </div>
                <table class="w-full text-left border-collapse text-sm">
                  <tbody class="divide-y divide-[#dee2e6]">
                    <tr
                      v-for="(item, index) in DETAILED_SPECS.flight"
                      :key="index"
                      class="hover:bg-slate-50 transition-colors"
                    >
                      <th
                        class="px-6 py-4 bg-[#f8f9fa] font-bold uppercase text-[9px] text-[#4a4a4a] w-1/3"
                      >
                        {{ item.label }}
                      </th>
                      <td class="px-6 py-4 font-black text-[#0b1f3f]">
                        {{ item.value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                class="border border-[#dee2e6] rounded-2xl overflow-hidden shadow-sm bg-white"
              >
                <div
                  class="bg-[#f8f9fa] px-6 py-4 border-b border-[#dee2e6] flex items-center gap-3"
                >
                  <Radio class="w-4 h-4 text-[#0b1f3f]" />
                  <h3
                    class="font-black text-[10px] uppercase tracking-[0.2em] text-[#0b1f3f]"
                  >
                    Hệ thống truyền tải
                  </h3>
                </div>
                <table class="w-full text-left border-collapse text-sm">
                  <tbody class="divide-y divide-[#dee2e6]">
                    <tr
                      v-for="(item, index) in DETAILED_SPECS.transmission"
                      :key="index"
                      class="hover:bg-slate-50 transition-colors"
                    >
                      <th
                        class="px-6 py-4 bg-[#f8f9fa] font-bold uppercase text-[9px] text-[#4a4a4a] w-1/3"
                      >
                        {{ item.label }}
                      </th>
                      <td class="px-6 py-4 font-black text-[#0b1f3f]">
                        {{ item.value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="item in DETAILED_SPECS.physical"
                :key="item.label"
                class="p-6 border border-[#dee2e6] rounded-2xl bg-white flex flex-col items-center text-center gap-3 group hover:border-[#0b1f3f] transition-all"
              >
                <component
                  :is="item.icon"
                  class="w-6 h-6 text-[#4a4a4a] group-hover:text-[#0b1f3f]"
                />
                <span
                  class="text-[9px] font-bold uppercase text-[#4a4a4a] tracking-widest"
                  >{{ item.label }}</span
                >
                <span class="text-sm font-black text-[#0b1f3f]">{{
                  item.value
                }}</span>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div
                class="p-8 border border-[#dee2e6] rounded-2xl bg-white flex items-center justify-between group"
              >
                <div class="space-y-4">
                  <div class="flex items-center gap-2 text-[#0b1f3f]">
                    <Video class="w-4 h-4" />
                    <span
                      class="text-[9px] font-black uppercase tracking-widest"
                      >Hệ thống Camera</span
                    >
                  </div>
                  <p class="text-xs font-bold leading-relaxed max-w-[220px]">
                    CMOS 1 inch 20MP, 4K HDR 60fps, Zoom kỹ thuật số 32x, Chống
                    rung 3 trục.
                  </p>
                </div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANaliALO5CtcmMhzAXCQZP8t3WhUrJ1DuuD9fPm47Xtby6yN9tp_YlWxMlXDj4049T9nspcejgsILLubJP1Z6ADRBP50VB-WsnPJEIIfC48_X04HA2HlbfrSwYpJyDg5tHK0SctdDSO_ciHEtA49RCTyGhx-8uUlhTdVAyg8qM1jyBgXstTAKGxSLBIV3TOVMlq4GIcfEJsM4pT-sIP_9nR4-40w_iSB1n71e7a-ORnzyjHUUqNO8MA1zz3ES3QNvrXkdGemcpBQ"
                  class="h-20 w-32 object-contain bg-[#f8f9fa] rounded-lg border border-[#dee2e6] p-2 transition-transform group-hover:scale-110"
                />
              </div>

              <div
                class="p-8 border border-[#dee2e6] rounded-2xl bg-[#0b1f3f] text-white flex items-center justify-between group relative overflow-hidden"
              >
                <div
                  class="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform"
                >
                  <Radar class="w-32 h-32" />
                </div>
                <div class="space-y-4 relative z-10">
                  <div class="flex items-center gap-2 text-white/70">
                    <Radar class="w-4 h-4" />
                    <span
                      class="text-[9px] font-black uppercase tracking-widest"
                      >Cảm biến thông minh</span
                    >
                  </div>
                  <p class="text-xs font-medium leading-relaxed max-w-[220px]">
                    Hệ thống LiDAR thế hệ 2 & Radar 360 độ, phát hiện vật cản từ
                    khoảng cách 45m.
                  </p>
                </div>
                <div
                  class="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center animate-pulse relative z-10"
                >
                  <ShieldCheck class="w-8 h-8" />
                </div>
              </div>
            </div>

            <div
              class="p-8 border border-[#dee2e6] rounded-2xl bg-[#f8f9fa] flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div class="flex items-center gap-6">
                <div
                  class="w-16 h-16 bg-white rounded-2xl border border-[#dee2e6] flex items-center justify-center shadow-sm"
                >
                  <BatteryCharging class="w-8 h-8 text-[#0b1f3f]" />
                </div>
                <div>
                  <h4
                    class="text-[#0b1f3f] font-black text-lg uppercase tracking-tight"
                  >
                    Hệ thống Pin thông minh (BMS)
                  </h4>
                  <p class="text-[#4a4a4a] text-xs font-medium">
                    Dung lượng 15.000mAh | Điện áp 22.8V | Tự động sưởi ấm khi
                    bay vùng lạnh.
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <div
                  class="text-center px-6 py-3 bg-white rounded-xl border border-[#dee2e6]"
                >
                  <p class="text-[8px] font-bold text-[#4a4a4a] uppercase">
                    Sạc nhanh
                  </p>
                  <p class="text-lg font-black text-[#0b1f3f]">65 PHÚT</p>
                </div>
                <div
                  class="text-center px-6 py-3 bg-white rounded-xl border border-[#dee2e6]"
                >
                  <p class="text-[8px] font-bold text-[#4a4a4a] uppercase">
                    Chu kỳ pin
                  </p>
                  <p class="text-lg font-black text-[#0b1f3f]">500+ LẦN</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="space-y-8">
          <div class="flex items-center justify-between">
            <h2
              class="text-2xl font-black text-[#0b1f3f] uppercase flex items-center gap-3"
            >
              <ScanFace class="w-6 h-6" /> Mô phỏng vận hành
            </h2>
            <span
              class="text-[9px] font-black text-[#0b1f3f] bg-[#f8f9fa] px-4 py-1.5 rounded-full border border-[#dee2e6] uppercase tracking-widest"
              >Access: Enterprise</span
            >
          </div>
          <div
            class="relative aspect-[21/9] bg-[#0b1f3f] rounded-3xl overflow-hidden shadow-2xl group flex items-center justify-center"
          >
            <div class="hud-grid absolute inset-0 opacity-20"></div>
            <div
              v-if="!isSimulating"
              class="relative z-10 text-center space-y-6"
            >
              <div
                class="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin mx-auto"
              ></div>
              <p
                class="text-white font-black uppercase tracking-[0.4em] text-[10px]"
              >
                Initializing HUD_OS v4.0.1
              </p>
              <button
                @click="toggleSim"
                class="px-12 py-4 bg-white text-[#0b1f3f] font-black text-[10px] rounded uppercase tracking-[0.2em] hover:scale-110 transition-transform"
              >
                Bắt đầu mô phỏng
              </button>
            </div>
            <img
              v-else
              src="https://images.unsplash.com/photo-1473960104312-309fd64671fc?q=80&w=2000"
              class="w-full h-full object-cover opacity-60 animate-fade-in"
            />
          </div>
        </section>
      </div>
    </main>

    <!-- <footer
      class="mt-20 py-16 px-12 bg-[#f8f9fa] border-t border-[#dee2e6] flex flex-col md:flex-row justify-between items-center gap-10"
    >
      <div class="space-y-2 text-center md:text-left">
        <p
          class="text-[#0b1f3f] font-black text-2xl tracking-tighter uppercase"
        >
          AERO-X INTELLIGENCE
        </p>
        <p
          class="text-[10px] text-[#4a4a4a] font-bold uppercase tracking-widest"
        >
          © 2026 Advanced Drone Solutions. Bảo lưu mọi quyền.
        </p>
      </div>
      <div class="flex gap-4">
        <div
          v-for="Icon in [Share2, Globe]"
          class="w-12 h-12 border border-[#dee2e6] rounded flex items-center justify-center text-[#0b1f3f] hover:bg-[#0b1f3f] hover:text-white transition-all cursor-pointer"
        >
          <Icon class="w-5 h-5" />
        </div>
      </div>
    </footer> -->
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.font-headline {
  font-family: "Inter", sans-serif;
  font-weight: 900;
}
.hud-grid {
  background-size: 40px 40px;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}
.animate-fade-in {
  animation: fadeIn 1.5s ease-out forwards;
}
</style>
