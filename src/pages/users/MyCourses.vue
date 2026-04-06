<template>
  <div class="space-y-10">
    <div
      class="relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group"
    >
      <div class="relative z-10">
        <span
          class="px-4 py-1.5 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-teal-100"
          >Certification Program</span
        >
        <h1
          class="text-4xl font-black text-slate-900 mt-6 mb-4 tracking-tighter leading-tight"
        >
          Chuyên gia Vận hành UAV<br />Chuyên nghiệp
        </h1>

        <div class="flex items-center gap-6 text-slate-400 font-bold text-sm">
          <span class="flex items-center gap-2"
            ><Database class="w-4 h-4 text-teal-500" /> 24 Bài học</span
          >
          <span class="flex items-center gap-2"
            ><Activity class="w-4 h-4 text-teal-500" /> 12 Giờ học tập</span
          >
        </div>

        <div class="mt-8 max-w-md">
          <div
            class="flex justify-between text-[11px] font-black uppercase mb-2"
          >
            <span class="text-slate-400">Tiến độ khóa học</span>
            <span class="text-teal-600">12/24 Hoàn thành</span>
          </div>
          <div class="h-2 bg-slate-100 rounded-full">
            <div class="h-full bg-teal-500 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
      <Plane
        class="absolute -right-10 -bottom-10 w-64 h-64 text-slate-50 rotate-[-15deg] group-hover:text-teal-50 transition-colors duration-700"
      />
    </div>

    <div class="space-y-4">
      <div
        v-for="(chapter, idx) in courseChapters"
        :key="idx"
        class="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm"
      >
        <div
          class="p-6 flex items-center justify-between border-b border-slate-50"
        >
          <div class="flex items-center gap-5">
            <div
              class="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg"
            >
              0{{ idx + 1 }}
            </div>
            <div>
              <h3 class="font-black text-slate-800 tracking-tight">
                {{ chapter.title }}
              </h3>
              <p class="text-[11px] text-slate-400 font-medium">
                {{ chapter.desc }}
              </p>
            </div>
          </div>
          <span class="text-[10px] font-black text-slate-400 uppercase"
            >{{ chapter.progress }} Hoàn thành</span
          >
        </div>

        <div class="p-4 space-y-2 bg-slate-50/50">
          <div
            v-for="lesson in chapter.lessons"
            :key="lesson.id"
            class="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all group"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-6 h-6 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-teal-500 transition-colors"
              >
                <div
                  v-if="lesson.completed"
                  class="w-full h-full bg-teal-500 rounded-full flex items-center justify-center text-white"
                >
                  <Check class="w-3 h-3" />
                </div>
              </div>
              <span class="text-sm font-bold text-slate-700">{{
                lesson.title
              }}</span>
              <span
                class="text-[10px] text-slate-300 font-bold px-2 py-0.5 border border-slate-100 rounded-md"
                >{{ lesson.time }}</span
              >
            </div>

            <div class="flex items-center gap-2">
              <span
                v-for="tag in lesson.tags"
                :key="tag"
                class="text-[9px] font-black uppercase px-2 py-1 rounded-md border"
                :class="
                  tag === 'Lý thuyết'
                    ? 'bg-slate-50 text-slate-400'
                    : 'bg-teal-50 text-teal-600 border-teal-100'
                "
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Check, Database, Activity, Plane } from "lucide-vue-next";
const courseChapters = [
  {
    title: "Chương 1: Tổng quan về Hệ thống UAV",
    desc: "Lịch sử, phân loại và các thành phần cốt lõi.",
    progress: "100%",
    lessons: [
      {
        id: 1,
        title: "1.1 Giới thiệu về Ngành công nghiệp Drone",
        time: "15 phút",
        tags: ["Lý thuyết"],
        completed: true,
      },
      {
        id: 2,
        title: "1.2 Cấu tạo phần cứng cơ bản",
        time: "45 phút",
        tags: ["Lý thuyết", "Mô hình 3D"],
        completed: true,
      },
    ],
  },
  {
    title: "Chương 2: Động lực học & Điều khiển",
    desc: "Nguyên lý bay, cân bằng và lực nâng khí động học.",
    progress: "Đang diễn ra",
    lessons: [
      {
        id: 3,
        title: "2.1 Bốn lực cơ bản trong hàng không",
        time: "30 phút",
        tags: ["Lý thuyết", "Mô phỏng 3D"],
        completed: false,
      },
    ],
  },
];
</script>
