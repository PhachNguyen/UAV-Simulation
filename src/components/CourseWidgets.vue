<template>
  <aside
    class="w-[300px] bg-slate-50 border-l border-slate-200 p-8 space-y-10 overflow-y-auto custom-scrollbar"
    style="padding-right: 12px"
  >
    <section>
      <h5
        class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-1"
      >
        Tài liệu đính kèm
      </h5>
      <div class="space-y-3">
        <div
          v-for="file in downloads"
          :key="file.name"
          class="flex items-center gap-4 p-4 bg-white rounded-3xl border border-slate-200/50 hover:border-teal-300 transition-all cursor-pointer group shadow-sm"
        >
          <div
            class="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-teal-500 group-hover:text-white transition-all"
          >
            <FileText class="w-4 h-4" />
          </div>
          <div class="flex-1 truncate">
            <p
              class="text-xs font-black text-slate-800 truncate leading-none mb-1"
            >
              {{ file.name }}
            </p>
            <span
              class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter"
              >{{ file.meta }}</span
            >
          </div>
          <Download class="w-4 h-4 text-slate-200 group-hover:text-teal-500" />
        </div>
      </div>
    </section>

    <!-- <section
      class="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl"
    >
      <div
        class="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/20 rounded-full blur-3xl"
      ></div>
      <h5
        class="text-[10px] font-black uppercase tracking-widest mb-6 text-teal-400"
      >
        Thảo luận nhóm
      </h5>
      <div class="flex -space-x-3 mb-6">
        <img
          v-for="i in 4"
          :key="i"
          :src="`https://i.pravatar.cc/100?img=${i + 20}`"
          class="w-10 h-10 border-4 border-slate-900 rounded-full shadow-lg"
        />
      </div>
      <p class="text-xs font-bold mb-6 text-slate-300">
        Hơn 500 học viên đang trao đổi về chủ đề này.
      </p>
      <button
        class="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all"
      >
        Tham gia thảo luận
      </button>
    </section> -->
  </aside>
</template>

<script setup>
import { FileText, Download } from "lucide-vue-next";
defineProps(["downloads"]);
</script>
