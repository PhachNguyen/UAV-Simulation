<script setup>
import { ref, computed } from "vue";
import { uavList } from "./data/uavData";
// Giả định bạn đã tạo component này
// import Uav3DViewer from './components/Uav3DViewer.vue';

// State management
const isSimOpen = ref(false);
const selectedUav = ref(null);
const currentFilter = ref("All");

// Filters
const categories = ["All", "Consumer", "Professional", "Industrial", "Racing"];

const filteredUavs = computed(() => {
  if (currentFilter.value === "All") return uavList;
  return uavList.filter((uav) => uav.category === currentFilter.value);
});

// Actions
const openSimulator = (uav) => {
  selectedUav.value = uav;
  isSimOpen.value = true;
};

const closeSimulator = () => {
  isSimOpen.value = false;
  selectedUav.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <header class="border-b sticky top-0 bg-white/80 backdrop-blur-md z-40">
      <div
        class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"
      >
        <div class="flex items-center gap-2 text-2xl font-bold text-teal-600">
          <span class="p-2 bg-teal-600 text-white rounded-lg">U</span> UAV World
        </div>
        <nav class="hidden md:flex gap-8 font-medium">
          <a href="#" class="text-teal-600">Home</a>
          <a href="#" class="hover:text-teal-600 transition">Shop</a>
          <a href="#" class="hover:text-teal-600 transition">Simulation</a>
        </nav>
        <div class="flex items-center gap-4">
          <button class="p-2 hover:bg-slate-100 rounded-full transition">
            🛒 (2)
          </button>
          <button
            class="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Login
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6">
      <section
        class="mt-10 bg-slate-100 rounded-[40px] flex flex-col md:flex-row items-center overflow-hidden"
      >
        <div class="p-12 md:p-20 flex-1">
          <p
            class="uppercase tracking-widest text-xs text-teal-600 font-bold mb-4"
          >
            Dẫn đầu kỷ nguyên tự hành
          </p>
          <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Công Nghệ UAV <br />
            Cho Mọi Sứ Mệnh.
          </h1>
          <button
            class="bg-teal-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg hover:bg-teal-700 transition-all"
          >
            Khám Phá Ngay ➔
          </button>
        </div>
        <div class="flex-1 p-10 flex justify-center relative">
          <img
            src="https://pngimg.com/d/drone_PNG204.png"
            alt="Hero"
            class="z-10 w-full max-w-md drop-shadow-2xl animate-float"
          />
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-200 rounded-full blur-[100px] opacity-40"
          ></div>
        </div>
      </section>

      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-center border-b"
      >
        <div
          v-for="item in [
            'Free Shipping',
            'Secure Payment',
            '24/7 Support',
            'Money Back',
          ]"
          :key="item"
          class="group"
        >
          <span class="block text-2xl mb-2 group-hover:scale-125 transition"
            >✨</span
          >
          <b class="text-slate-700">{{ item }}</b>
        </div>
      </div>

      <section class="py-16">
        <div
          class="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <h2 class="text-4xl font-bold">Danh sách UAV</h2>
          <div
            class="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full"
          >
            <button
              v-for="cat in categories"
              :key="cat"
              @click="currentFilter = cat"
              :class="[
                currentFilter === cat
                  ? 'bg-white shadow-sm text-teal-600'
                  : 'text-slate-500 hover:text-slate-800',
              ]"
              class="px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="uav in filteredUavs" :key="uav.id" class="group">
            <div
              class="relative bg-slate-100 rounded-3xl aspect-square overflow-hidden mb-5"
            >
              <div
                v-if="uav.status"
                :class="uav.badgeColor"
                class="absolute top-4 left-4 text-white text-[10px] font-black px-3 py-1 rounded-full z-10 shadow-sm"
              >
                {{ uav.status.toUpperCase() }}
              </div>
              <img
                :src="uav.image"
                class="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div
                class="absolute inset-0 bg-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4"
              >
                <button
                  @click="openSimulator(uav)"
                  class="w-full bg-white text-slate-900 py-3.5 rounded-2xl shadow-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-teal-600 hover:text-white"
                >
                  Mô phỏng 3D
                </button>
              </div>
            </div>

            <div class="px-2">
              <h3 class="font-bold text-slate-800 mb-1 truncate text-lg">
                {{ uav.name }}
              </h3>
              <div class="flex items-center gap-3 mb-4">
                <span class="font-black text-teal-600 text-xl"
                  >${{ uav.price }}</span
                >
                <span
                  v-if="uav.oldPrice"
                  class="text-slate-400 line-through text-sm font-medium"
                  >${{ uav.oldPrice }}</span
                >
              </div>
              <div
                class="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100"
              >
                <div class="text-center">
                  <span
                    class="block text-[10px] text-slate-400 font-bold uppercase"
                    >Pin</span
                  >
                  <span class="text-xs font-bold">{{ uav.stats.battery }}</span>
                </div>
                <div class="text-center border-x border-slate-100">
                  <span
                    class="block text-[10px] text-slate-400 font-bold uppercase"
                    >Tầm xa</span
                  >
                  <span class="text-xs font-bold">{{ uav.stats.range }}</span>
                </div>
                <div class="text-center">
                  <span
                    class="block text-[10px] text-slate-400 font-bold uppercase"
                    >Tốc độ</span
                  >
                  <span class="text-xs font-bold">{{ uav.stats.speed }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredUavs.length === 0" class="py-20 text-center">
          <p class="text-slate-400 text-lg">
            Không tìm thấy sản phẩm nào trong mục này.
          </p>
        </div>
      </section>
    </main>

    <transition name="fade">
      <div
        v-if="isSimOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-slate-900/60"
      >
        <div
          class="bg-white w-full max-w-6xl h-full max-h-[850px] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          <div class="flex-[2] bg-slate-200 relative">
            <div
              class="absolute inset-0 flex items-center justify-center text-slate-400"
            >
              [ Canvas 3D Rendering Area ]
            </div>
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
            class="flex-1 p-10 flex flex-col justify-between border-l border-slate-100 bg-white"
          >
            <div>
              <button
                @click="closeSimulator"
                class="group text-slate-400 hover:text-teal-600 transition flex items-center gap-2 mb-10 font-bold uppercase text-xs tracking-widest"
              >
                <span class="group-hover:-translate-x-1 transition-transform"
                  >←</span
                >
                Back to Gallery
              </button>
              <h2 class="text-4xl font-black mb-4 text-slate-900">
                {{ selectedUav.name }}
              </h2>
              <p class="text-slate-500 leading-relaxed mb-8">
                Khám phá chi tiết cấu tạo và thử nghiệm khả năng vận hành của
                drone thông qua môi trường mô phỏng 3D thời gian thực.
              </p>

              <div class="space-y-6">
                <div
                  v-for="(val, key) in selectedUav.stats"
                  :key="key"
                  class="flex justify-between items-center border-b border-slate-50 pb-3"
                >
                  <span
                    class="text-slate-400 font-bold uppercase text-[10px] tracking-widest"
                    >{{ key }}</span
                  >
                  <b class="text-slate-900">{{ val }}</b>
                </div>
              </div>
            </div>

            <div class="mt-10 flex gap-4">
              <button
                class="flex-1 bg-teal-600 text-white py-5 rounded-2xl font-bold hover:bg-teal-700 hover:shadow-xl transition-all active:scale-95"
              >
                Mua Ngay
              </button>
              <button
                class="p-5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition"
              >
                ♥
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
