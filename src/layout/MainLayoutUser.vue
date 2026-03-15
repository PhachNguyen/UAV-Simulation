<script setup>
import { ref } from "vue";
import {
  LayoutDashboard,
  Plane,
  Map,
  Activity,
  Database,
  Settings,
  Search,
  Bell,
  Home,
  ChevronRight,
  Wind,
  Radio,
} from "lucide-vue-next";

const activeTab = ref("Dashboard");

// Cấu trúc Sidebar theo Group chuyên nghiệp
const sidebarGroups = [
  {
    title: "Chính",
    links: [
      { name: "Bảng điều khiển", icon: LayoutDashboard, href: "/dashboard" },
    ],
  },
  {
    title: "Vận hành",
    links: [
      {
        name: "Phi đội Drone",
        icon: Plane,
        href: "/fleet",
        badge: "03",
      },
      {
        name: "Lập trình bay",
        icon: Map,
        href: "/missions",
      },
      {
        name: "Giám sát hành trình",
        icon: Activity,
        href: "/tracking",
        live: true,
      },
    ],
  },
  {
    title: "Dữ liệu",
    links: [{ name: "Thư viện & Dữ liệu", icon: Database, href: "/data" }],
  },
  {
    title: "Hệ thống",
    links: [{ name: "Cấu hình thiết bị", icon: Settings, href: "/settings" }],
  },
];

const quickStats = [
  {
    title: "Thiết bị",
    subtitle: "Drone Fleet",
    count: "03 Units",
    color: "text-blue-600",
    bg: "bg-blue-50/50",
    icon: Plane,
  },
  {
    title: "Nhiệm vụ",
    subtitle: "Mission Planning",
    count: "12 Total",
    color: "text-emerald-600",
    bg: "bg-emerald-50/50",
    icon: Map,
  },
  {
    title: "Dữ liệu",
    subtitle: "Telemetry Log",
    count: "1.2 GB",
    color: "text-purple-600",
    bg: "bg-purple-50/50",
    icon: Activity,
  },
  {
    title: "Hệ thống",
    subtitle: "System Status",
    count: "Stable",
    color: "text-orange-600",
    bg: "bg-orange-50/50",
    icon: Settings,
  },
];
</script>
<template>
  <div
    class="min-h-screen bg-[#f8fafc] flex font-sans selection:bg-teal-100 selection:text-teal-900"
  >
    <aside
      class="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col sticky top-0 h-screen z-50"
    >
      <div class="p-6 flex items-center gap-3">
        <div
          class="w-10 h-10 bg-slate-900 text-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200"
        >
          <Radio class="w-6 h-6" />
        </div>
        <div class="flex flex-col uppercase tracking-tighter">
          <span class="text-sm font-black text-slate-800 leading-none"
            >SkyLink</span
          >
          <span class="text-[9px] text-teal-600 font-bold tracking-[0.2em] mt-1"
            >Control Center</span
          >
        </div>
      </div>

      <nav class="flex-1 px-4 overflow-y-auto mt-4 space-y-6">
        <div v-for="group in sidebarGroups" :key="group.title">
          <h3
            class="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"
          >
            {{ group.title }}
          </h3>
          <div class="space-y-1">
            <button
              v-for="link in group.links"
              :key="link.name"
              @click="activeTab = link.name"
              :class="[
                'w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-bold text-[13px] group',
                activeTab === link.name
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
              ]"
            >
              <div class="flex items-center gap-3">
                <component
                  :is="link.icon"
                  :class="[
                    'w-4 h-4',
                    activeTab === link.name
                      ? 'text-teal-400'
                      : 'text-slate-400 group-hover:text-slate-900',
                  ]"
                />
                <span>{{ link.name }}</span>
              </div>

              <span
                v-if="link.badge"
                class="bg-teal-500/10 text-teal-600 text-[10px] px-2 py-0.5 rounded-md"
                >{{ link.badge }}</span
              >
              <span
                v-if="link.live"
                class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
              ></span>
            </button>
          </div>
        </div>
      </nav>

      <div class="p-4 mt-auto border-t border-slate-50">
        <div
          class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <Wind class="w-5 h-5 text-blue-500" />
            <div>
              <p
                class="text-[10px] font-black text-slate-400 uppercase leading-none mb-1"
              >
                Wind Speed
              </p>
              <p class="text-xs font-black text-slate-800 leading-none">
                8.2 km/h
              </p>
            </div>
          </div>
          <div
            class="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase"
          >
            Safe
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col">
      <header
        class="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-8 flex items-center justify-between"
      >
        <div class="flex flex-col">
          <h1
            class="text-xl font-black text-slate-900 uppercase tracking-tight"
          >
            {{ activeTab }}
          </h1>
          <div class="flex items-center gap-2 mt-0.5">
            <span
              class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
            ></span>
            <p
              class="text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em]"
            >
              Live Connection Established
            </p>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div class="relative hidden lg:block">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search mission ID, drone name..."
              class="pl-10 pr-4 py-2.5 bg-slate-100 border-transparent rounded-xl text-xs w-72 focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all shadow-inner"
            />
          </div>

          <div class="flex items-center gap-4 border-l pl-6 border-slate-100">
            <button
              class="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
            >
              <Bell class="w-5 h-5" />
              <span
                class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
              ></span>
            </button>
            <div
              class="flex items-center gap-3 px-1 py-1 pr-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100"
            >
              <img
                src="https://ui-avatars.com/api/?name=Phach&background=0f172a&color=2dd4bf"
                class="w-9 h-9 rounded-xl object-cover shadow-sm"
              />
              <div class="leading-none hidden sm:block">
                <p class="text-xs font-black text-slate-900 mb-1 uppercase">
                  Phach Nguyen
                </p>
                <p class="text-[9px] text-teal-600 font-bold uppercase">
                  Mission Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="p-8 max-w-[1600px] mx-auto w-full space-y-8">
        <div
          class="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200"
        >
          <div class="relative z-10 max-w-2xl">
            <h2 class="text-4xl font-black tracking-tighter mb-4 leading-none">
              Control Station <span class="text-teal-400">Online</span>
            </h2>
            <p class="text-slate-400 font-medium leading-relaxed mb-8">
              Hệ thống SkyLink đã sẵn sàng.
              <span
                class="text-white underline underline-offset-4 decoration-teal-500"
                >03 Drone Fleet</span
              >
              đang ở trạng thái chờ lệnh. Kiểm tra các thông số NFZ và điều kiện
              gió trước khi thực hiện nhiệm vụ.
            </p>
            <div class="flex flex-wrap gap-4">
              <button
                class="bg-teal-400 hover:bg-teal-500 text-slate-900 px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95"
              >
                Khởi tạo bay
              </button>
              <button
                class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all"
              >
                Phân tích dữ liệu
              </button>
            </div>
          </div>
          <Plane
            class="absolute -right-16 -bottom-16 w-80 h-80 text-white/5 -rotate-12 pointer-events-none"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="card in quickStats"
            :key="card.subtitle"
            class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div
              :class="[
                card.bg,
                card.color,
                'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-6 transition-transform',
              ]"
            >
              <component :is="card.icon" class="w-7 h-7" />
            </div>
            <div class="flex justify-between items-end">
              <div>
                <span
                  class="text-[10px] font-black text-slate-400 tracking-widest uppercase"
                  >{{ card.title }}</span
                >
                <h4 class="text-slate-900 font-black text-lg mt-0.5">
                  {{ card.subtitle }}
                </h4>
                <p
                  :class="[
                    card.color,
                    'text-[11px] font-bold mt-2 uppercase tracking-tight',
                  ]"
                >
                  {{ card.count }}
                </p>
              </div>
              <ChevronRight
                class="w-5 h-5 text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
