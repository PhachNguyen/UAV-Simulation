<template>
  <section v-if="lesson" class="w-full flex h-full overflow-hidden">
    <div
      class="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.01)]"
    >
      <div class="max-w-4xl mx-auto space-y-12">
        <header
          class="mb-12 border-b-2 border-slate-50 pb-8 sticky top-0 bg-white z-10"
        >
          <h1
            class="text-4xl font-black text-slate-950 leading-tight mb-3 tracking-tighter uppercase"
          >
            {{ lesson.title }}
          </h1>
          <div class="flex items-center gap-3 text-slate-400">
            <MapPin :size="16" class="text-teal-500" />
            <span class="text-xs font-bold uppercase tracking-widest"
              >{{ lesson.hotspots?.length || 0 }} Điểm tương tác 3D</span
            >
          </div>
        </header>

        <div class="space-y-16 w-full">
          <div
            v-for="(section, index) in lesson.sections"
            :key="section._id"
            class="w-full"
          >
            <h2
              class="text-2xl font-black mt-8 mb-6 uppercase tracking-tighter border-l-4 border-gray-200 pl-4 text-slate-800"
            >
              {{ section.title }}
            </h2>

            <div
              v-if="section.type === 'theory'"
              class="prose prose-slate max-w-none"
            >
              <div
                v-html="section.content"
                class="text-lg leading-relaxed text-slate-700 text-justify rich-content"
              ></div>
            </div>

            <div
              v-if="section.type === 'image'"
              class="my-10 flex justify-center"
            >
              <img
                :src="'http://localhost:5000' + section.content"
                class="max-w-xl h-auto rounded-3xl shadow-xl border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <aside
      v-if="lesson.model3DPath"
      class="w-[480px] bg-slate-50 p-8 flex flex-col border-l border-slate-100 shadow-[-15px_0_40px_rgba(0,0,0,0.02)] sticky top-0 h-full"
    >
      <div class="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-10">
        <div
          class="flex items-center justify-between border-b-2 border-slate-100 pb-5 mb-5 sticky top-0 bg-slate-50 z-20"
        >
          <div>
            <h3
              class="text-sm font-black text-slate-900 uppercase tracking-widest"
            >
              Visual Simulation
            </h3>
            <p class="text-[9px] text-teal-600 font-bold uppercase mt-1">
              Gắn tọa độ thực tế từ Backend
            </p>
          </div>
          <Box class="text-slate-200 w-8 h-8" />
        </div>

        <div
          class="aspect-square bg-slate-950 rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-slate-800 group transition-all"
        >
          <Uav3DViewer
            ref="uavViewerRef"
            :admin="false"
            :modelSrc="'http://localhost:5000' + lesson.model3DPath"
            :customHotspots="lesson.hotspots"
          />
          <div
            class="absolute inset-x-0 bottom-6 px-6 flex justify-between items-center pointer-events-none"
          >
            <div
              class="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10"
            >
              <span
                class="text-[8px] font-black text-white uppercase tracking-widest"
                >Mode: Tương tác trực quan</span
              >
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Danh sách linh kiện
            </h3>
            <span
              class="text-[9px] font-black text-slate-600 bg-white px-3 py-1.5 rounded-lg shadow-sm border"
              >{{ lesson.hotspots?.length || 0 }} ĐIỂM</span
            >
          </div>

          <div class="space-y-3">
            <div
              v-for="(spot, index) in lesson.hotspots"
              :key="index"
              @click="focusHotspot(spot)"
              class="bg-white rounded-2xl p-4 border border-slate-100 hover:border-teal-500 cursor-pointer transition-all ..."
            >
              <div class="flex items-center gap-3 mb-3">
                <span
                  class="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center text-[10px] font-black text-white shadow-lg"
                >
                  {{ index + 1 }}
                </span>
                <h4 class="font-bold text-xs text-slate-800 flex-1">
                  {{ spot.title }}
                </h4>
              </div>

              <div class="grid grid-cols-3 gap-2 mb-3">
                <div
                  class="bg-slate-50 p-2 rounded-lg text-center font-mono text-[9px] text-slate-500 border border-slate-100 shadow-inner"
                >
                  <span
                    class="block text-[7px] font-black text-slate-300 uppercase"
                    >X-Axis</span
                  >
                  {{ spot.pos.x.toFixed(3) }}
                </div>
                <div
                  class="bg-slate-50 p-2 rounded-lg text-center font-mono text-[9px] text-slate-500 border border-slate-100 shadow-inner"
                >
                  <span
                    class="block text-[7px] font-black text-slate-300 uppercase"
                    >Y-Axis</span
                  >
                  {{ spot.pos.y.toFixed(3) }}
                </div>
                <div
                  class="bg-slate-50 p-2 rounded-lg text-center font-mono text-[9px] text-slate-500 border border-slate-100 shadow-inner"
                >
                  <span
                    class="block text-[7px] font-black text-slate-300 uppercase"
                    >Z-Axis</span
                  >
                  {{ spot.pos.z.toFixed(3) }}
                </div>
              </div>

              <p
                class="text-[10px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 italic"
              >
                {{ spot.desc || "Chưa có mô tả kỹ thuật." }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <aside
      v-else
      class="w-[400px] bg-slate-50 p-12 flex items-center justify-center border-l border-slate-100 text-center"
    >
      <div>
        <Box class="w-12 h-12 text-slate-200 mx-auto mb-4" />
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Bài giảng không có mô hình 3D
        </p>
      </div>
    </aside>
  </section>
</template>

<script setup>
import { Box, MapPin } from "lucide-vue-next";
import Uav3DViewer from "@/components/Uav3DViewer.vue"; // Đảm bảo đúng đường dẫn
import { ref } from "vue";
defineProps(["lesson"]);
const uavViewerRef = ref(null); // Khai báo ref cho viewer

const focusHotspot = (spot) => {
  // Gọi hàm flyToSpot bên trong component Uav3DViewer
  if (uavViewerRef.value) {
    uavViewerRef.value.flyToSpot(spot);
  }
};
</script>

<style scoped>
/* Định dạng cho nội dung HTML từ Editor (Admin) */
.rich-content :deep(p) {
  margin-bottom: 1.5rem;
}
.rich-content :deep(strong) {
  color: #0f172a;
  font-weight: 800;
}
.rich-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}
.rich-content :deep(li) {
  margin-bottom: 0.5rem;
}
.rich-content :deep(img) {
  border-radius: 1.5rem;
  margin: 2rem auto;
  display: block;
  max-width: 100%;
  height: auto;
  border: 4px solid white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
