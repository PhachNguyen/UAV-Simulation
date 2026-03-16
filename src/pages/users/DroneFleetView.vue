<script setup>
import { ref } from "vue";
import {
  Plane,
  Battery,
  Signal,
  Zap,
  MapPin,
  Activity,
  MoreVertical,
  Plus,
  AlertCircle,
  CheckCircle2,
  Cog,
} from "lucide-vue-next";

const drones = ref([
  {
    id: "SKL-V1-001",
    name: "Alpha Scout",
    model: "Mavic 3 Enterprise",
    status: "Đang bay", // Đang bay, Sẵn sàng, Bảo trì
    battery: 85,
    signal: 92,
    gps: 18,
    lastFlight: "15/03/2026",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "SKL-V2-042",
    name: "Heavy Lifter",
    model: "Matrice 300 RTK",
    status: "Sẵn sàng",
    battery: 100,
    signal: 0,
    gps: 0,
    lastFlight: "14/03/2026",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c841de9d21a?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: "SKL-V1-012",
    name: "Night Vision",
    model: "Autel EVO II",
    status: "Bảo trì",
    battery: 45,
    signal: 0,
    gps: 0,
    lastFlight: "10/03/2026",
    image:
      "https://images.unsplash.com/photo-1473963456455-8717904033cc?q=80&w=2070&auto=format&fit=crop",
  },
]);

const getStatusClass = (status) => {
  switch (status) {
    case "Đang bay":
      return "bg-emerald-500 text-white";
    case "Sẵn sàng":
      return "bg-blue-500 text-white";
    case "Bảo trì":
      return "bg-orange-500 text-white";
    default:
      return "bg-slate-400 text-white";
  }
};
</script>
<template>
  <div class="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
    <div class="flex items-center justify-between">
      <div>
        <h2
          class="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none"
        >
          Phi đội Drone
        </h2>
        <p class="text-slate-500 mt-2 font-medium">
          Quản lý và giám sát {{ drones.length }} thiết bị trong hệ thống
        </p>
      </div>
      <button
        class="bg-slate-900 hover:bg-slate-800 text-teal-400 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl shadow-slate-200 active:scale-95"
      >
        <Plus class="w-4 h-4" /> Thêm Drone mới
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <div
        v-for="drone in drones"
        :key="drone.id"
        class="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
      >
        <div class="relative h-56 overflow-hidden">
          <img
            :src="drone.image"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div class="absolute top-4 left-4">
            <span
              :class="[
                getStatusClass(drone.status),
                'px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg',
              ]"
            >
              {{ drone.status }}
            </span>
          </div>
          <button
            class="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-slate-900 transition-all"
          >
            <MoreVertical class="w-5 h-5" />
          </button>
        </div>

        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-xl font-black text-slate-900 leading-none mb-1">
                {{ drone.name }}
              </h3>
              <p
                class="text-[11px] font-bold text-slate-400 uppercase tracking-wider"
              >
                {{ drone.model }} • ID: {{ drone.id }}
              </p>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-[10px] font-black text-slate-400 uppercase"
                >Pin</span
              >
              <div class="flex items-center gap-1.5">
                <Battery
                  :class="[
                    'w-4 h-4',
                    drone.battery > 20 ? 'text-emerald-500' : 'text-red-500',
                  ]"
                />
                <span class="text-sm font-black text-slate-800"
                  >{{ drone.battery }}%</span
                >
              </div>
            </div>
          </div>

          <div
            class="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl mb-8 border border-slate-100"
          >
            <div
              class="flex flex-col items-center gap-1 border-r border-slate-200"
            >
              <Signal class="w-4 h-4 text-blue-500" />
              <span class="text-[10px] font-black text-slate-800"
                >{{ drone.signal }}%</span
              >
              <span class="text-[8px] font-bold text-slate-400 uppercase"
                >Sóng</span
              >
            </div>
            <div
              class="flex flex-col items-center gap-1 border-r border-slate-200"
            >
              <MapPin class="w-4 h-4 text-orange-500" />
              <span class="text-[10px] font-black text-slate-800"
                >{{ drone.gps }} Sat</span
              >
              <span class="text-[8px] font-bold text-slate-400 uppercase"
                >GPS</span
              >
            </div>
            <div class="flex flex-col items-center gap-1">
              <Zap class="w-4 h-4 text-teal-500" />
              <span class="text-[10px] font-black text-slate-800">C2 Link</span>
              <span class="text-[8px] font-bold text-slate-400 uppercase"
                >Status</span
              >
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center gap-2">
              <Activity class="w-4 h-4 text-slate-300" />
              <span class="text-[10px] font-bold text-slate-400 uppercase"
                >Lần bay cuối: {{ drone.lastFlight }}</span
              >
            </div>
            <button
              class="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-teal-500 transition-colors group/btn"
            >
              <ChevronRight
                class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        class="border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-300 hover:border-teal-200 hover:text-teal-400 transition-all cursor-pointer group"
      >
        <div
          class="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-teal-50 transition-colors"
        >
          <Cog class="w-8 h-8 animate-spin-slow" />
        </div>
        <p class="text-sm font-black uppercase tracking-widest">
          Đang cập nhật...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
