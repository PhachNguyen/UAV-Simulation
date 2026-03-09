<script setup>
import { ref, computed, watch } from "vue";
import { uavList } from "./data/uavData";
import TheHeader from "./components/Header.vue";
import UavCard from "./components/UavCard.vue";
import Testimonials from "./components/Testimonials.vue";
import TheFooter from "./components/Footer.vue";
import Uav3DViewer from "./components/Uav3DViewer.vue";
import DetailData from "./components/DetailData.vue";

// State quản lý mô phỏng
const isSimOpen = ref(false);
const selectedUav = ref(null);
const activeNote = ref(null); // Lưu trữ nốt đang được chọn
const currentFilter = ref("All");
const categories = ["All", "Consumer", "Professional", "Industrial", "Racing"];

const filteredUavs = computed(() => {
  return currentFilter.value === "All"
    ? uavList
    : uavList.filter((uav) => uav.category === currentFilter.value);
});

const openSimulator = (uav) => {
  activeNote.value = null; // Reset nốt khi mở máy bay mới
  selectedUav.value = uav;
  isSimOpen.value = true;
};

// Theo dõi khi đóng Simulator để dọn dẹp dữ liệu
watch(isSimOpen, (val) => {
  if (!val) activeNote.value = null;
});
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <TheHeader />

    <main class="max-w-7xl mx-auto px-6">
      <div class="flex gap-4 py-8 overflow-x-auto no-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="currentFilter = cat"
          :class="[
            'px-6 py-2 rounded-full text-xs font-bold transition-all',
            currentFilter === cat
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-200'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <section class="py-8">
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
        @click.self="isSimOpen = false"
      >
        <div
          v-if="selectedUav"
          class="bg-white w-full max-w-6xl h-full max-h-[850px] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
        >
          <div
            class="flex-[2] bg-[#0d0d0d] relative flex items-center justify-center border-r border-slate-100"
          >
            <Uav3DViewer
              :uav="selectedUav"
              @select-hotspot="activeNote = $event"
            />

            <div class="absolute top-6 left-6 flex gap-2 pointer-events-none">
              <span
                class="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white border border-white/20 uppercase tracking-widest"
                >4K Dynamic View</span
              >
              <span
                class="bg-teal-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg shadow-teal-500/40"
                >Live Simulation</span
              >
            </div>

            <transition name="slide-up">
              <div
                v-if="activeNote"
                class="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-[24px] shadow-2xl border border-teal-100 z-20 flex gap-4 items-center"
              >
                <div
                  class="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0"
                >
                  {{ activeNote.id }}
                </div>
                <div class="flex-1">
                  <h4
                    class="text-slate-900 font-bold text-lg leading-none mb-1"
                  >
                    {{ activeNote.title }}
                  </h4>
                  <p
                    class="text-slate-500 text-xs leading-relaxed line-clamp-2"
                  >
                    {{ activeNote.desc }}
                  </p>
                </div>
                <button
                  @click="activeNote = null"
                  class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  ✕
                </button>
              </div>
            </transition>
          </div>

          <div
            class="flex-1 p-10 flex flex-col justify-between bg-white overflow-y-auto custom-scrollbar"
          >
            <div>
              <button
                @click="isSimOpen = false"
                class="group text-slate-400 hover:text-teal-600 mb-8 font-bold uppercase text-[10px] tracking-[0.2em] transition-all flex items-center gap-2"
              >
                <span class="group-hover:-translate-x-1 transition-transform"
                  >←</span
                >
                Back to Gallery
              </button>

              <h2
                class="text-4xl font-black mb-1 tracking-tighter text-slate-900"
              >
                {{ selectedUav.name }}
              </h2>
              <p class="text-slate-400 text-xs mb-8 font-medium">
                Khám phá cấu tạo chi tiết & thông số vận hành thời gian thực.
              </p>

              <DetailData :uav="selectedUav" />
            </div>

            <button
              class="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-teal-600 transition-all duration-300 shadow-xl mt-8 active:scale-[0.98]"
            >
              Đặt mua ngay
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
