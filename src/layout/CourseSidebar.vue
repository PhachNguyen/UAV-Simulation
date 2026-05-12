<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  structure: { type: Array, default: () => [] },
  activeLessonId: { type: [Number, String], default: null },
  completedLessons: { type: Array, default: () => [] },
});

const emit = defineEmits(["select-lesson", "next-lesson"]);
//  Di chuyển đến trang mô phỏng lái
const goToSimulation = () => {
  // Thay '/simulation' bằng đường dẫn (path) thực tế của cậu trong router
  router.push("/simulation");
};
// 1. Tự động tính % tiến độ (Thêm ?. để tránh lỗi nếu chapter bị null)
const progress = computed(() => {
  if (!props.structure) return 0;
  const allLessons = props.structure.flatMap((ch) => ch?.lessons || []);
  if (allLessons.length === 0) return 0;

  const completedCount = allLessons.filter((l) =>
    props.completedLessons.includes(l.id),
  ).length;
  return Math.round((completedCount / allLessons.length) * 100);
});

// 2. Tìm tên Chương hiện tại (Thêm ?. để an toàn tuyệt đối)
const currentModule = computed(() => {
  if (!props.structure) return "Đang tải...";
  const chapter = props.structure.find((ch) =>
    ch?.lessons?.some((l) => l.id === props.activeLessonId),
  );
  return chapter ? chapter.title : "Nhiệm vụ chưa xác định";
});

// 3. Helper kiểm tra trạng thái bài học
// 3. Helper kiểm tra trạng thái bài học (Logic Khóa bài chặt chẽ)
const getLessonStatus = (lessonId) => {
  // Ép tất cả về Number để so sánh cho chắc ăn
  const currentId = Number(lessonId);
  const completedIds = props.completedLessons.map((id) => Number(id));

  if (currentId === Number(props.activeLessonId)) return "active";
  if (completedIds.includes(currentId)) return "completed";

  const allLessons = props.structure.flatMap((ch) => ch?.lessons || []);
  const index = allLessons.findIndex((l) => Number(l.id) === currentId);

  if (index === 0) return "unlocked";

  if (index > 0) {
    const prevLessonId = Number(allLessons[index - 1]?.id);
    if (completedIds.includes(prevLessonId)) return "unlocked";
  }

  return "locked";
};

// 4. Logic Nút "Bài giảng tiếp theo"
const goToNextLesson = () => {
  const allLessons = props.structure.flatMap((ch) => ch?.lessons || []);
  const currentIndex = allLessons.findIndex(
    (l) => l.id === props.activeLessonId,
  );

  if (currentIndex === -1) return;

  const isLastLesson = currentIndex === allLessons.length - 1;

  if (isLastLesson) {
    // TRƯỜNG HỢP BÀI CUỐI:
    // Gửi emit để trang Cha lưu nốt tiến độ bài này (để lên 100%)
    // Nhưng truyền nextId là chính nó để không bị mất bài trên màn hình
    emit("next-lesson", {
      currentId: props.activeLessonId,
      nextId: props.activeLessonId,
    });

    alert(
      "Hệ thống SkyLink: Chúc mừng phi công! Bạn đã hoàn thành 100% khóa huấn luyện!",
    );
  } else {
    // TRƯỜNG HỢP CÒN BÀI TIẾP THEO:
    const nextLesson = allLessons[currentIndex + 1];
    emit("next-lesson", {
      currentId: props.activeLessonId,
      nextId: nextLesson.id,
    });
  }
};

const handleLessonClick = (lessonId) => {
  emit("select-lesson", lessonId);
};
</script>

<template>
  <aside class="w-full lg:w-[400px] flex flex-col gap-6">
    <div
      class="bg-white rounded-lg p-5 border border-slate-200 flex items-center justify-between shadow-sm"
    >
      <div class="flex-1 mr-6">
        <div class="flex justify-between items-end mb-2">
          <span class="text-xs font-bold text-slate-700 uppercase"
            >Tiến độ khóa học</span
          >
          <span class="text-xs font-bold text-slate-900">{{ progress }}%</span>
        </div>
        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-[#0b1f3f] transition-all duration-700 ease-out"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
      <div class="text-right text-[10px]">
        <div class="text-slate-500 uppercase mb-1 font-semibold">
          Bài giảng đang học:
        </div>
        <div class="font-bold text-slate-800 line-clamp-1">
          {{ currentModule }}
        </div>
      </div>
    </div>

    <div
      class="bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden sticky top-6 shadow-md"
    >
      <div class="p-5 border-b border-slate-100 bg-slate-50/50">
        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
          Chương trình đào tạo SkyLink
        </h3>
      </div>

      <div class="overflow-y-auto max-h-[calc(100vh-300px)] sidebar-scroll">
        <div v-for="chapter in structure" :key="chapter.id">
          <div
            class="bg-slate-50 px-5 py-3 border-y border-slate-100 sticky top-0 z-10"
          >
            <h4
              class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
            >
              {{ chapter.title }}
            </h4>
          </div>

          <div
            v-for="lesson in chapter.lessons"
            :key="lesson.id"
            @click="
              getLessonStatus(lesson.id) !== 'locked' &&
              handleLessonClick(lesson.id)
            "
            :class="[
              'p-4 pl-12 relative flex flex-col gap-1 transition-all group',
              // Hiệu ứng khi Active
              getLessonStatus(lesson.id) === 'active'
                ? 'bg-blue-50 border-l-4 border-blue-900'
                : '',
              // Hiệu ứng khi bị Khóa: Giảm độ đậm, đổi con trỏ, chặn click
              getLessonStatus(lesson.id) === 'locked'
                ? 'opacity-40 cursor-not-allowed grayscale'
                : 'cursor-pointer hover:bg-slate-50',
            ]"
          >
            <i
              v-if="getLessonStatus(lesson.id) === 'completed'"
              class="ph-fill ph-check-circle text-teal-500 absolute left-5 top-1/2 -translate-y-1/2 text-xl"
            ></i>

            <i
              v-else-if="getLessonStatus(lesson.id) === 'active'"
              class="ph-fill ph-play-circle text-blue-900 absolute left-[17px] top-1/2 -translate-y-1/2 text-xl animate-pulse"
            ></i>

            <i
              v-else-if="getLessonStatus(lesson.id) === 'unlocked'"
              class="ph-bold ph-circle text-blue-400 absolute left-5 top-1/2 -translate-y-1/2 text-lg"
            ></i>

            <i
              v-else
              class="ph-fill ph-lock-key text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 text-lg"
            ></i>

            <div
              :class="[
                'text-sm font-semibold transition-colors',
                getLessonStatus(lesson.id) === 'active'
                  ? 'text-blue-900'
                  : 'text-slate-700',
                getLessonStatus(lesson.id) === 'locked' ? 'text-slate-400' : '',
              ]"
            >
              {{ lesson.title }}
            </div>

            <div class="text-[10px] text-slate-400 font-mono uppercase">
              {{ lesson.duration || "10:00" }}
              <span
                v-if="getLessonStatus(lesson.id) === 'active'"
                class="text-blue-600 font-bold"
                >• Đang học</span
              >
              <span
                v-if="getLessonStatus(lesson.id) === 'locked'"
                class="text-slate-300"
                >• Chưa mở khóa</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="p-5 bg-slate-50 border-t border-slate-100">
        <button
          @click="goToNextLesson"
          class="cursor-pointer w-full bg-[#0b1f3f] hover:bg-gray-900 text-white text-xs font-bold uppercase py-4 rounded-xl transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 active:scale-95"
        >
          Bài giảng tiếp theo <i class="ph-bold ph-arrow-right"></i>
        </button>
        <button
          @click="goToSimulation"
          class="w-full mt-3 bg-gray-500 cursor-pointer hover:bg-gray-600 text-white text-xs font-bold uppercase py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 group"
        >
          <i
            class="ph-bold ph-airplane-takeoff text-lg group-hover:animate-bounce"
          ></i>
          Lab mô phỏng
        </button>
      </div>

      <!-- <div
        v-for="lesson in chapter.lessons"
        :key="lesson.id"
        @click="
          getLessonStatus(lesson.id) !== 'locked' &&
          handleLessonClick(lesson.id)
        "
        :class="[
          'p-4 pl-12 relative flex flex-col gap-1 transition-all group',
          getLessonStatus(lesson.id) === 'active'
            ? 'bg-blue-50 border-l-4 border-blue-900'
            : '',
          getLessonStatus(lesson.id) === 'locked'
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-slate-50',
        ]"
      >
        <i
          v-if="getLessonStatus(lesson.id) === 'unlocked'"
          class="ph-bold ph-circle text-slate-300 absolute left-5 top-1/2 -translate-y-1/2 text-lg"
        ></i>
      </div> -->
    </div>
  </aside>
</template>

<style scoped>
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
