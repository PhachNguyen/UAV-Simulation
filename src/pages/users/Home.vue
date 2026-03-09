<template>
  <div class="max-w-7xl mx-auto px-6">
    <section class="py-12 flex flex-col md:flex-row items-center gap-10">
      <div class="flex-1 space-y-6">
        <h1
          class="text-5xl font-black text-slate-900 tracking-tighter leading-[1.1]"
        >
          Hệ thống Quản lý <br />
          <span class="text-teal-600">Phi đội UAV</span> Thế hệ mới
        </h1>
        <p class="text-slate-500 text-lg max-w-md">
          Giám sát, điều khiển và phân tích dữ liệu bay thời gian thực với nền
          tảng công nghệ 3D tiên tiến.
        </p>
        <div class="flex gap-4">
          <button
            class="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-lg shadow-slate-200"
          >
            Bắt đầu bay
          </button>
          <button
            class="border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
          >
            Xem báo cáo
          </button>
        </div>
      </div>
      <div
        class="flex-1 bg-slate-100 rounded-[40px] h-[400px] w-full relative overflow-hidden group"
      >
        <img
          src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1000"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt="UAV Dashboard"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"
        ></div>
      </div>
    </section>

    <div
      class="flex items-center justify-between py-8 border-t border-slate-100"
    >
      <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="currentFilter = cat"
          :class="[
            'px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap',
            currentFilter === cat
              ? 'bg-teal-600 text-white shadow-xl shadow-teal-100'
              : 'bg-white border border-slate-200 text-slate-500 hover:border-teal-500 hover:text-teal-600',
          ]"
        >
          {{ cat }}
        </button>
      </div>
      <div class="hidden md:block text-sm font-bold text-slate-400">
        Hiển thị {{ filteredUavs.length }} thiết bị
      </div>
    </div>

    <section class="py-8 min-h-[600px]">
      <div
        v-if="filteredUavs.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <UavCard
          v-for="uav in filteredUavs"
          :key="uav.id"
          :uav="uav"
          @open-sim="openSimulator"
        />
      </div>

      <div v-else class="py-20 text-center">
        <div
          class="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400"
        >
          <PackageOpen class="w-10 h-10" />
        </div>
        <h3 class="text-xl font-bold text-slate-900">
          Không tìm thấy thiết bị
        </h3>
        <p class="text-slate-500 text-sm mt-1">Vui lòng chọn danh mục khác.</p>
      </div>
    </section>

    <transition name="fade">
      <div
        v-if="isSimOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-2xl bg-slate-900/80"
        @click.self="isSimOpen = false"
      >
        <div
          v-if="selectedUav"
          class="bg-white w-full max-w-7xl h-full max-h-[900px] rounded-[48px] overflow-hidden flex flex-col md:row shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] relative border border-white/20"
        >
          <div
            class="flex-[2] bg-[#050505] relative flex items-center justify-center border-r border-slate-100"
          >
            <Uav3DViewer
              :uav="selectedUav"
              @select-hotspot="activeNote = $event"
            />

            <div class="absolute top-8 left-8 flex gap-3">
              <div
                class="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2"
              >
                <div
                  class="w-2 h-2 bg-teal-400 rounded-full animate-pulse"
                ></div>
                <span
                  class="text-[10px] font-bold text-white uppercase tracking-[0.2em]"
                  >Hardware Scan: OK</span
                >
              </div>
            </div>

            <transition name="slide-up">
              <div
                v-if="activeNote"
                class="absolute bottom-8 left-8 right-8 bg-white p-6 rounded-[32px] shadow-2xl border border-teal-50 flex gap-6 items-center"
              >
                <div
                  class="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-teal-400 font-black text-xl shrink-0"
                >
                  {{ activeNote.id }}
                </div>
                <div class="flex-1">
                  <h4 class="text-slate-900 font-black text-xl mb-1">
                    {{ activeNote.title }}
                  </h4>
                  <p class="text-slate-500 text-sm leading-relaxed">
                    {{ activeNote.desc }}
                  </p>
                </div>
                <button
                  @click="activeNote = null"
                  class="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  ✕
                </button>
              </div>
            </transition>
          </div>

          <div
            class="flex-1 p-12 flex flex-col justify-between bg-white overflow-y-auto custom-scrollbar"
          >
            <div>
              <button
                @click="isSimOpen = false"
                class="group text-slate-400 hover:text-teal-600 mb-10 font-black uppercase text-[11px] tracking-widest transition-all flex items-center gap-2"
              >
                <ArrowLeft
                  class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                />
                Thoát mô phỏng
              </button>

              <div class="mb-8">
                <span
                  class="text-teal-600 font-bold text-xs uppercase tracking-widest mb-2 block"
                  >{{ selectedUav.category }}</span
                >
                <h2
                  class="text-5xl font-black tracking-tighter text-slate-900 mb-4 italic uppercase"
                >
                  {{ selectedUav.name }}
                </h2>
                <div class="w-20 h-1.5 bg-teal-600 rounded-full"></div>
              </div>

              <DetailData :uav="selectedUav" />
            </div>

            <div class="pt-8 space-y-4">
              <div
                class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div class="text-xs font-bold text-slate-500">
                  Trạng thái pin
                </div>
                <div class="text-sm font-black text-teal-600">
                  98% - High Voltage
                </div>
              </div>
              <button
                class="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-teal-600 transition-all duration-500 shadow-2xl hover:shadow-teal-200 active:scale-95"
              >
                KÍCH HOẠT HỆ THỐNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { uavList } from "../../data/uavData.js"; // Đảm bảo đường dẫn đúng
import UavCard from "../../components/UavCard.vue";
import Uav3DViewer from "../../components/Uav3DViewer.vue";
import DetailData from "../../components/DetailData.vue";
import { ArrowLeft, PackageOpen } from "lucide-vue-next";

const isSimOpen = ref(false);
const selectedUav = ref(null);
const activeNote = ref(null);
const currentFilter = ref("All");
const categories = ["All", "Consumer", "Professional", "Industrial", "Racing"];

const filteredUavs = computed(() => {
  return currentFilter.value === "All"
    ? uavList
    : uavList.filter((uav) => uav.category === currentFilter.value);
});

const openSimulator = (uav) => {
  activeNote.value = null;
  selectedUav.value = uav;
  isSimOpen.value = true;
};

watch(isSimOpen, (val) => {
  if (!val) activeNote.value = null;
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(40px);
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>
