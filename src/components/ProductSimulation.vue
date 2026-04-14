<template>
  <section
    id="3d-model"
    class="w-full bg-[#050505] py-24 relative overflow-hidden font-mono"
  >
    <div
      class="absolute inset-0 opacity-10 pointer-events-none"
      :style="{
        backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }"
    ></div>

    <div class="max-w-7xl mx-auto px-6 mb-12 relative z-10">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-2 border-blue-600 pl-6"
      >
        <div class="space-y-1">
          <div
            class="flex items-center gap-2 text-blue-500 font-black tracking-[0.3em] uppercase text-[10px]"
          >
            <Activity class="w-3 h-3 animate-pulse" />
            Live Structural Analysis // v4.0.1
          </div>
          <h2
            class="text-4xl font-black text-white tracking-tighter uppercase italic"
          >
            Mô phỏng <span class="text-blue-500">HUD</span> Cấu trúc
          </h2>
        </div>
        <div
          class="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <MousePointerClick class="w-4 h-4 text-blue-500" />
          Tương tác trực tiếp trên mô hình 3D
        </div>
      </div>
    </div>

    <div class="w-full h-[500px] md:h-[650px] relative mb-16 group">
      <div
        class="absolute inset-x-10 inset-y-10 border border-white/5 pointer-events-none"
      >
        <div
          class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500"
        ></div>
        <div
          class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500"
        ></div>
      </div>

      <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
      >
        <Target class="w-24 h-24 text-blue-400 stroke-[0.5]" />
      </div>

      <Uav3DViewer @select-hotspot="onHotspotSelect" />

      <div
        class="absolute left-10 top-1/2 -translate-y-1/2 space-y-4 hidden lg:block"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="w-32 h-1 bg-white/10 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-blue-500 animate-[loading_2s_infinite]"
            :style="{ animationDelay: i * 0.5 + 's' }"
          ></div>
        </div>
        <div
          class="text-[8px] text-blue-500/50 font-bold uppercase tracking-tighter"
        >
          Telemetry Syncing...
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="flex items-center gap-3 mb-10">
        <Cpu class="w-5 h-5 text-blue-500" />
        <h3 class="text-xs font-black text-white uppercase tracking-[0.4em]">
          Dữ liệu thành phần chi tiết //
        </h3>
        <div
          class="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"
        ></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(spot, index) in hotspots"
          :key="spot.id"
          class="relative group cursor-pointer transition-all duration-300"
          @click="$emit('update:activeSpotId', spot.id)"
        >
          <div
            class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
          ></div>

          <div
            class="relative border-l-2 p-5 transition-all"
            :class="
              activeSpotId === spot.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 bg-transparent hover:border-white/30'
            "
          >
            <div class="flex justify-between items-start mb-4">
              <span
                class="text-[9px] font-black tracking-widest"
                :class="
                  activeSpotId === spot.id ? 'text-blue-400' : 'text-slate-600'
                "
              >
                ID_{{ (index + 1).toString().padStart(2, "0") }}
              </span>
              <div
                v-if="activeSpotId === spot.id"
                class="w-2 h-2 bg-blue-500 rounded-full animate-ping"
              ></div>
            </div>

            <h4
              class="text-sm font-black text-white uppercase tracking-wider mb-2 group-hover:text-blue-400 transition-colors"
            >
              {{ spot.title }}
            </h4>

            <p
              class="text-[11px] text-slate-500 leading-relaxed font-medium group-hover:text-slate-300"
            >
              {{ spot.desc }}
            </p>

            <div class="mt-4 flex gap-1">
              <div class="h-[2px] w-6 bg-blue-600/50"></div>
              <div class="h-[2px] w-1 bg-blue-600/50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Activity, Target, MousePointerClick, Cpu } from "lucide-vue-next";
import Uav3DViewer from "@/components/Uav3DViewer.vue";

defineProps({
  hotspots: Array,
  activeSpotId: [Number, String],
});
const emit = defineEmits(["update:activeSpotId"]);

const onHotspotSelect = (spot) => {
  emit("update:activeSpotId", spot.id);
  if (window.innerWidth < 768) {
    window.scrollBy({ top: 350, behavior: "smooth" });
  }
};
</script>

<style scoped>
@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Kiểu font Monospace cho cảm giác máy tính */
#3d-model {
  font-family: "JetBrains Mono", "Fira Code", monospace;
}

/* Hiệu ứng mờ ảo (Glow) cho text active */
h4.text-blue-400 {
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
</style>
