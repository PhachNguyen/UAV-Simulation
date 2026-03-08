<script setup>
import { ref, computed } from "vue";
import { uavList } from "./data/uavData";
import TheHeader from "./components/Header.vue";
import UavCard from "./components/UavCard.vue";
import Testimonials from "./components/Testimonials.vue";
import TheFooter from "./components/Footer.vue";
import Uav3DViewer from "./components/Uav3DViewer.vue";
import DetailData from "./components/DetailData.vue"; // Thêm dòng này

// State & Logic giữ nguyên như cũ
const isSimOpen = ref(false);
const selectedUav = ref(null);
const currentFilter = ref("All");
const categories = ["All", "Consumer", "Professional", "Industrial", "Racing"];

const filteredUavs = computed(() => {
  return currentFilter.value === "All"
    ? uavList
    : uavList.filter((uav) => uav.category === currentFilter.value);
});

const openSimulator = (uav) => {
  selectedUav.value = uav;
  isSimOpen.value = true;
};
</script>
<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <TheHeader />

    <main class="max-w-7xl mx-auto px-6">
      <section class="py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <UavCard
            v-for="uav in filteredUavs"
            :key="uav.id"
            :uav="uav"
            @open-sim="openSimulator"
          />
        </div>
      </section>
    </main>

    <Testimonials />
    <TheFooter />

    <transition name="fade">
      <div
        v-if="isSimOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-slate-900/60"
      >
        <div
          class="bg-white w-full max-w-6xl h-full max-h-[850px] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          <div
            class="flex-[2] bg-slate-200 relative flex items-center justify-center"
          >
            <Uav3DViewer
              v-if="selectedUav"
              :modelPath="selectedUav.modelPath"
            />
            <div class="absolute top-6 left-6 flex gap-2">
              <span
                class="bg-white/80 px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm"
                >4K View</span
              >
              <span
                class="bg-teal-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm"
                >Live Sim</span
              >
            </div>
          </div>

          <div
            class="flex-1 p-10 flex flex-col justify-between bg-white border-l overflow-y-auto"
          >
            <div>
              <button
                @click="isSimOpen = false"
                class="text-slate-400 hover:text-teal-600 mb-8 font-bold uppercase text-xs tracking-widest transition-colors"
              >
                ← Back to Gallery
              </button>

              <h2 class="text-4xl font-black mb-2 tracking-tighter">
                {{ selectedUav.name }}
              </h2>
              <p class="text-slate-400 text-sm mb-8 font-medium italic">
                Hệ thống mô phỏng cấu tạo & vận hành 3D.
              </p>

              <DetailData :uav="selectedUav" />
            </div>

            <button
              class="w-full bg-teal-600 text-white py-5 rounded-2xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-200 mt-6"
            >
              Xem mô phỏng nâng cao
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
