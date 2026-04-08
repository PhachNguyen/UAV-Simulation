<script setup>
import { ref, computed } from "vue";

// 1. Quản lý bộ lọc (Filter)
const activeFilter = ref("Tất cả sản phẩm");
const filters = ["Tất cả sản phẩm", "FPV", "Điện ảnh", "Doanh nghiệp"];

// 2. Dữ liệu Đội bay (Fleet Data)
const fleet = ref([
  {
    id: 1,
    name: "Apex X1 - FPV",
    type: "FPV",
    tag: "CHIẾN ĐẤU - FPV",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyjco2QLgeJI6JoeDc1jBdiPSVjvRBJEPt-62gxn3Z4TNqPrJoCA1WZTh10NS2U9z_hm36gwUetdsxTCUpFag9uLvF2tzijvKtWVAZVmll8SpXXXWwNLZIumxAAyqrInU-RaMR1Jm6h1f38loLXXUw-wqQBWBcPkAtq75ZR0HdLOgsSWAQ-_ZWxUFyyRLEjmOHW-Z11OMTcCI-jCWr3niE7nUvoEZyw58y2U6dRTEIbmyk0FcsaPkfWw784UkK2qXl4b9nxr4SnQ",
    icon: "bolt",
    stats: {
      speed: "140 KM/H",
      duration: "22 PHÚT",
      extra: "4K/120FPS",
      extraLabel: "Camera",
    },
  },
  {
    id: 2,
    name: "Icarus V8 - Cinema",
    type: "Điện ảnh",
    tag: "ĐIỆN ẢNH - CINEMA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCliE97_vehbzlgJBC9x6iNKKFFXWRbAo_rIjYR3QR5S2-JwypRmRmFYM3Frk-YHCpfmKk5adhPAv143SbBvjTXwfy8JoPaaEmSo5Py-vuNkR2XwVtNyZLBrbZsJSnmofmDb0_JGtxi125AUtILvg4LOOaHX6R0Vs6XQ3Xr02AY76eEd5HxTvqb3CdW51Cfx9RWlbaxG5i1s8GB7hG4l0rtVsPKs-lbWogIKVbgCUrdYm-F9kIam6OMf6IHD1iomT7wwiipQs0RKw",
    icon: "videocam",
    stats: {
      speed: "75 KM/H",
      duration: "45 PHÚT",
      extra: "FULL FRAME",
      extraLabel: "Sensor",
    },
  },
  {
    id: 3,
    name: "Titan ",
    type: "Doanh nghiệp",
    tag: "KHẢO SÁT - INDUSTRIAL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDo9lbPc5I8xWawPPu5PMBS3p4qLE_sV3v-4bgcuAbycHURMcUU3ertNh-i55vo0R6SRC3zo5UH3omR7sybcuVe6uU0ETA-7cmOiifJxEDO2m9xWN0hfUoYuIEb-IYReX0Ck71gChvggKij4t5CfaR_4Lysknu8twC5U2qwKxM2qw7ZPi6OZgnIqgMshJJ0zQs3n2vraKkKU7JoeuOTfnA0SvJRchpTYsPaDv-kVrTullHOJ4pnb2pXte6OAwiPSFNmmowbjlDTgg",
    icon: "precision_manufacturing",
    stats: {
      speed: "50 KM/H",
      duration: "55 PHÚT",
      extra: "L1 PRECISION",
      extraLabel: "LiDAR",
    },
  },
]);

// 3. Logic lọc danh sách
const filteredFleet = computed(() => {
  if (activeFilter.value === "Tất cả sản phẩm") return fleet.value;
  return fleet.value.filter((drone) => drone.type === activeFilter.value);
});

// 4. Menu Điều hướng
const sidebarLinks = [
  { name: "Dashboard", icon: "grid_view", active: true },
  { name: "Mission Control", icon: "target", active: false },
  { name: "Drone Library", icon: "flight", active: false },
  { name: "Sensor Data", icon: "sensors", active: false },
  { name: "Flight Logs", icon: "history", active: false },
];
</script>

<template>
  <div class="bg-surface font-body text-on-surface min-h-screen">
    <!-- <header
      class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-outline-variant h-16 flex justify-between items-center px-8 font-headline tracking-tight shadow-sm"
    >
      <div class="text-2xl font-bold tracking-tighter text-corporate-blue">
        AeroHUD
      </div>
      <nav
        class="hidden md:flex items-center gap-8 text-sm uppercase font-bold tracking-widest"
      >
        <a class="text-primary border-b-2 border-primary pb-1" href="#"
          >Fleet</a
        >
        <a
          class="text-on-surface-variant hover:text-corporate-blue transition-colors"
          href="#"
          >Telemetry</a
        >
        <a
          class="text-on-surface-variant hover:text-corporate-blue transition-colors"
          href="#"
          >Academy</a
        >
        <a
          class="text-on-surface-variant hover:text-corporate-blue transition-colors"
          href="#"
          >Logistics</a
        >
      </nav>
      <div class="flex items-center gap-6">
        <button
          class="text-on-surface-variant hover:text-corporate-blue active:scale-95 transition-all"
        >
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <button
          class="text-on-surface-variant hover:text-corporate-blue active:scale-95 transition-all"
        >
          <span class="material-symbols-outlined">settings</span>
        </button>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkfxgclqGmi15vLKDmmvB5nGw1N36ZJw1cCMwhN-n-WMKotJmvhycUX9FsbkKWhGBQJw0OgS2njspVtf40ALqfEDBtoiLKCOjAD95nMyz84USNl7IT-rGqEyE-japq64ALjzqkdJP4MQpVa-g29r74ouet8jS-_M3ZvJRWP4dDDRzSRMCfGYetws54AZz-Ou6-WSi2eMOdlioWPErbpOIpJpz_S9dWsZQ9OuLjCcZ7VPA8Im7GPivSty2fjrQGX-3Xo7hCmhVZSw"
          alt="Pilot"
          class="w-8 h-8 rounded-full border border-outline-variant shadow-sm"
        />
      </div>
    </header> -->

    <!-- <aside
      class="hidden lg:flex flex-col pt-20 pb-8 h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-surface-container-low z-40"
    >
      <div class="px-6 mb-8">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-corporate-blue rounded flex items-center justify-center shadow-lg"
          >
            <span class="material-symbols-outlined text-white">rocket</span>
          </div>
          <div>
            <div
              class="text-corporate-blue font-black text-sm tracking-widest uppercase"
            >
              STRATOS-01
            </div>
            <div
              class="text-[10px] text-primary font-bold uppercase tracking-[0.2em]"
            >
              Active Protocol
            </div>
          </div>
        </div>
      </div>

      <nav
        class="flex-1 space-y-1 font-body text-[11px] font-bold uppercase tracking-widest"
      >
        <a
          v-for="link in sidebarLinks"
          :key="link.name"
          href="#"
          :class="[
            link.active
              ? 'bg-white border-l-4 border-corporate-blue text-corporate-blue shadow-sm'
              : 'text-on-surface-variant hover:bg-white/50 hover:text-corporate-blue',
            'px-6 py-4 flex items-center gap-4 transition-all',
          ]"
        >
          <span class="material-symbols-outlined text-xl">{{ link.icon }}</span>
          <span>{{ link.name }}</span>
        </a>
      </nav>

      <div class="px-6 mt-auto flex flex-col gap-4">
        <button
          class="bg-corporate-blue hover:bg-primary text-white font-bold py-4 rounded shadow-lg active:scale-95 transition-all text-[10px] tracking-[0.2em] uppercase"
        >
          INITIATE FLIGHT
        </button>
        <div
          class="flex flex-col text-[10px] uppercase font-bold tracking-widest text-on-surface-variant"
        >
          <a
            href="#"
            class="px-2 py-2 flex items-center gap-4 hover:text-corporate-blue"
            ><span class="material-symbols-outlined text-sm">help</span>
            Support</a
          >
          <a
            href="#"
            class="px-2 py-2 flex items-center gap-4 hover:text-red-600"
            ><span class="material-symbols-outlined text-sm">logout</span> Sign
            Out</a
          >
        </div>
      </div>
    </aside> -->

    <main class="">
      <section class="p-8 max-w-7xl mx-auto">
        <div
          class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h1
              class="text-on-surface-variant font-bold uppercase tracking-[0.4em] text-[10px] mb-2 opacity-60"
            >
              Hệ thống quản lý / Thiết bị
            </h1>
            <h2
              class="font-headline text-5xl font-bold tracking-tighter text-corporate-blue"
            >
              Khám phá thế giới Drone
            </h2>
          </div>

          <div
            class="flex flex-wrap gap-1 p-1 bg-surface-container rounded-lg border border-outline-variant"
          >
            <button
              v-for="f in filters"
              :key="f"
              @click="activeFilter = f"
              :class="[
                activeFilter === f
                  ? 'bg-[#0b1f3f] text-white  shadow-md'
                  : 'text-on-surface-variant hover:text-corporate-blue',
                'px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded transition-all',
              ]"
            >
              {{ f }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div
            v-for="drone in filteredFleet"
            :key="drone.id"
            class="group relative bg-white rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="h-60 overflow-hidden relative bg-slate-100">
              <img
                :src="drone.image"
                :alt="drone.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                class="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-sm border border-outline-variant shadow-sm"
              >
                <span
                  class="text-corporate-blue text-[9px] font-black tracking-[0.2em] uppercase"
                  >{{ drone.tag }}</span
                >
              </div>
            </div>

            <div class="p-6">
              <div class="flex justify-between items-start mb-6">
                <h3
                  class="font-headline text-2xl font-bold text-corporate-blue"
                >
                  {{ drone.name }}
                </h3>
                <span
                  class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
                  >{{ drone.icon }}</span
                >
              </div>

              <div
                class="grid grid-cols-3 gap-2 mb-8 border-t border-slate-50 pt-6"
              >
                <div class="flex flex-col">
                  <span
                    class="text-[9px] text-on-surface-variant uppercase font-black tracking-widest mb-1"
                    >Tốc độ</span
                  >
                  <span class="text-xs font-bold text-corporate-blue">{{
                    drone.stats.speed
                  }}</span>
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-[9px] text-on-surface-variant uppercase font-black tracking-widest mb-1"
                    >Thời gian</span
                  >
                  <span class="text-xs font-bold text-corporate-blue">{{
                    drone.stats.duration
                  }}</span>
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-[9px] text-on-surface-variant uppercase font-black tracking-widest mb-1"
                    >{{ drone.stats.extraLabel }}</span
                  >
                  <span class="text-xs font-bold text-corporate-blue">{{
                    drone.stats.extra
                  }}</span>
                </div>
              </div>

              <button
                class="w-full py-4 bg-[#0b1f3f] text-white font-bold text-[10px] uppercase tracking-[0.3em] rounded hover:bg-primary transition-all shadow-md"
              >
                XEM CHI TIẾT
              </button>
            </div>
          </div>
        </div>

        <section
          class="mt-24 mb-16 relative overflow-hidden rounded-3xl border border-outline-variant glass-panel shadow-2xl"
        >
          <div class="hud-grid absolute inset-0 opacity-40"></div>
          <div
            class="relative z-10 flex flex-col lg:flex-row items-center gap-12 p-12"
          >
            <div class="flex-1 text-center lg:text-left">
              <h2
                class="font-headline text-4xl font-bold text-corporate-blue mb-4 tracking-tighter"
              >
                Kết nối thế hệ mới
                <span class="text-primary">OCU-SYNC 4.0</span>
              </h2>
              <p
                class="text-on-surface-variant max-w-xl mb-10 leading-relaxed font-medium"
              >
                Đảm bảo đường truyền ổn định tuyệt đối ngay cả trong môi trường
                nhiễu sóng nặng. Công nghệ mã hóa AES-256 bảo vệ dữ liệu bay cấp
                độ quân sự.
              </p>

              <div
                class="flex flex-wrap justify-center lg:justify-start gap-16"
              >
                <div class="group">
                  <p
                    class="text-primary font-headline text-7xl font-bold tracking-tighter group-hover:scale-110 transition-transform cursor-default"
                  >
                    99.8%
                  </p>
                  <p
                    class="text-[9px] text-corporate-blue uppercase tracking-[0.4em] font-black mt-2"
                  >
                    Độ tin cậy tín hiệu
                  </p>
                </div>
                <div class="group">
                  <p
                    class="text-corporate-blue font-headline text-7xl font-bold tracking-tighter group-hover:scale-110 transition-transform cursor-default"
                  >
                    20KM
                  </p>
                  <p
                    class="text-[9px] text-corporate-blue uppercase tracking-[0.4em] font-black mt-2"
                  >
                    Khoảng cách truyền tải
                  </p>
                </div>
              </div>
            </div>

            <div
              class="w-full lg:w-1/3 aspect-square relative flex items-center justify-center"
            >
              <div
                class="absolute inset-0 border border-corporate-blue/10 rounded-full animate-pulse"
              ></div>
              <div
                class="absolute w-3/4 h-3/4 border border-corporate-blue/20 rounded-full"
              ></div>
              <div
                class="absolute w-1/2 h-1/2 border-2 border-corporate-blue rounded-full shadow-[0_0_30px_rgba(11,31,63,0.2)]"
              ></div>
              <div class="absolute flex flex-col items-center animate-bounce">
                <span
                  class="material-symbols-outlined text-corporate-blue text-5xl"
                  >wifi_tethering</span
                >
                <span
                  class="text-corporate-blue text-[10px] font-black uppercase tracking-widest mt-4"
                  >LINK ACTIVE</span
                >
              </div>
              <div class="absolute top-0 w-[1px] h-6 bg-corporate-blue"></div>
              <div
                class="absolute bottom-0 w-[1px] h-6 bg-corporate-blue"
              ></div>
              <div class="absolute left-0 h-[1px] w-6 bg-corporate-blue"></div>
              <div class="absolute right-0 h-[1px] w-6 bg-corporate-blue"></div>
            </div>
          </div>
        </section>
      </section>
    </main>

    <nav
      class="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg flex justify-around items-center h-20 z-50 border-t border-outline-variant shadow-2xl"
    >
      <button class="flex flex-col items-center text-primary">
        <span class="material-symbols-outlined text-2xl">grid_view</span>
        <span class="text-[9px] uppercase font-black mt-1">Kho</span>
      </button>
      <button
        class="flex flex-col items-center text-on-surface-variant hover:text-corporate-blue"
      >
        <span class="material-symbols-outlined text-2xl">target</span>
        <span class="text-[9px] uppercase font-black mt-1">Nhiệm vụ</span>
      </button>
      <div
        class="-mt-10 p-1 bg-surface rounded-full border border-outline-variant shadow-xl"
      >
        <button
          class="w-14 h-14 bg-corporate-blue hover:bg-primary rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-all"
        >
          <span class="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
      <button
        class="flex flex-col items-center text-on-surface-variant hover:text-corporate-blue"
      >
        <span class="material-symbols-outlined text-2xl">sensors</span>
        <span class="text-[9px] uppercase font-black mt-1">Dữ liệu</span>
      </button>
      <button
        class="flex flex-col items-center text-on-surface-variant hover:text-corporate-blue"
      >
        <span class="material-symbols-outlined text-2xl">person</span>
        <span class="text-[9px] uppercase font-black mt-1">Hồ sơ</span>
      </button>
    </nav>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.font-headline {
  font-family: "Space Grotesk", sans-serif;
}
.font-body {
  font-family: "Inter", sans-serif;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.hud-grid {
  background-size: 30px 30px;
  background-image: radial-gradient(
    circle,
    rgba(11, 31, 63, 0.1) 1px,
    transparent 1px
  );
}

/* Custom Scrollbar for modern look */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #0b1f3f;
  border-radius: 10px;
}

/* Animation pulse cho Radar */
@keyframes pulse-radar {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
}
</style>
