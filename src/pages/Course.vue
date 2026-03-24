<template>
  <div
    class="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden"
  >
    <aside
      class="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20"
    >
      <div
        class="p-6 border-b border-slate-100 flex items-center justify-between"
      >
        <h2 class="text-xl font-black text-slate-800 tracking-tighter italic">
          UAV MASTERCLASS
        </h2>
        <button class="text-slate-400 hover:text-teal-600">
          <Menu class="w-5 h-5" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <div
          v-for="(section, sIdx) in courseData"
          :key="sIdx"
          class="space-y-1"
        >
          <button
            @click="section.isOpen = !section.isOpen"
            class="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all text-left group"
          >
            <span
              class="font-black text-xs uppercase tracking-widest text-slate-500"
              >{{ section.title }}</span
            >
            <ChevronDown
              :class="[
                'w-4 h-4 transition-transform',
                section.isOpen ? 'rotate-180' : '',
              ]"
            />
          </button>

          <div v-if="section.isOpen" class="space-y-1 mt-1">
            <div
              v-for="(lesson, lIdx) in section.lessons"
              :key="lIdx"
              @click="activeLesson = lesson"
              :class="[
                'flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2',
                activeLesson.id === lesson.id
                  ? 'bg-teal-50 border-teal-200 shadow-sm'
                  : 'border-transparent hover:bg-slate-50',
              ]"
            >
              <div
                :class="[
                  'mt-1 rounded-full p-1',
                  lesson.completed
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-300 border-2 border-slate-200',
                ]"
              >
                <Check v-if="lesson.completed" class="w-3 h-3" />
                <Play v-else class="w-3 h-3 fill-current" />
              </div>
              <div>
                <h4
                  :class="[
                    'text-sm font-bold leading-tight',
                    activeLesson.id === lesson.id
                      ? 'text-teal-900'
                      : 'text-slate-700',
                  ]"
                >
                  {{ lesson.title }}
                </h4>
                <p class="text-[11px] font-bold text-slate-400 mt-1 uppercase">
                  {{ lesson.duration }} Minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>

    <main class="flex-1 overflow-y-auto bg-white custom-scrollbar">
      <div class="max-w-4xl mx-auto p-10 space-y-8">
        <header>
          <h1 class="text-4xl font-black text-slate-900 leading-tight mb-2">
            {{ activeLesson.title }}
          </h1>
          <div
            class="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
          >
            <span>By Expert: {{ activeLesson.instructor }}</span>
            <span>• {{ activeLesson.duration }} Min</span>
            <span>• {{ activeLesson.notesCount }} Notes</span>
          </div>
        </header>

        <div
          class="relative aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl group border-8 border-white"
        >
          <img
            src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1000"
            class="w-full h-full object-cover opacity-60"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <button
              class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <Play class="w-8 h-8 fill-current translate-x-1" />
            </button>
          </div>
        </div>

        <section class="space-y-6">
          <div class="flex items-center justify-between border-b pb-4">
            <h3 class="text-xl font-black italic uppercase tracking-tighter">
              Full Transcript
            </h3>
            <div class="flex gap-4 text-xs font-bold text-slate-500">
              <button class="flex items-center gap-1 hover:text-teal-600">
                <Globe class="w-4 h-4" /> English
              </button>
              <button class="flex items-center gap-1 hover:text-teal-600">
                <HelpCircle class="w-4 h-4" /> Help
              </button>
            </div>
          </div>

          <div class="space-y-8">
            <div
              v-for="(text, time) in activeLesson.transcript"
              :key="time"
              class="flex gap-10 group"
            >
              <span
                class="text-sm font-mono font-bold text-slate-300 group-hover:text-teal-500 transition-colors"
                >{{ time }}</span
              >
              <p
                class="text-lg text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors italic"
              >
                {{ text }}
              </p>
            </div>
          </div>
        </section>

        <div
          class="flex items-center gap-6 pt-10 border-t border-slate-100 font-bold text-xs uppercase tracking-widest text-slate-400"
        >
          <button class="flex items-center gap-2 hover:text-teal-600">
            <ThumbsUp class="w-4 h-4" /> Like
          </button>
          <button class="flex items-center gap-2 hover:text-teal-600">
            <ThumbsDown class="w-4 h-4" /> Dislike
          </button>
          <button class="flex items-center gap-2 hover:text-teal-600">
            <Share2 class="w-4 h-4" /> Share
          </button>
        </div>
      </div>
    </main>

    <aside
      class="w-80 bg-slate-50 border-l border-slate-200 p-6 space-y-8 overflow-y-auto"
    >
      <section>
        <div class="flex justify-between items-center mb-4">
          <h5
            class="text-xs font-black uppercase tracking-[0.2em] text-slate-400"
          >
            Notes
          </h5>
          <MoreVertical class="w-4 h-4 text-slate-400" />
        </div>
        <div class="space-y-3">
          <div
            v-for="note in [1, 2]"
            :key="note"
            class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/50 flex justify-between items-center group cursor-pointer hover:border-teal-200 transition-all"
          >
            <div>
              <p class="text-xs font-black text-slate-700">
                {{ note }} Main Notes
              </p>
              <span class="text-[10px] text-slate-400 font-mono italic"
                >02:22 - 02:41</span
              >
            </div>
            <Edit2
              class="w-3 h-3 text-slate-300 group-hover:text-teal-500 transition-colors"
            />
          </div>
        </div>
      </section>

      <section>
        <h5
          class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4"
        >
          Downloads
        </h5>
        <div class="space-y-2">
          <div
            v-for="file in downloadFiles"
            :key="file.name"
            class="flex items-center gap-4 p-3 hover:bg-white rounded-2xl transition-all cursor-pointer group"
          >
            <div
              class="p-3 bg-indigo-50 text-indigo-500 rounded-xl group-hover:bg-teal-500 group-hover:text-white transition-colors"
            >
              <FileText class="w-4 h-4" />
            </div>
            <div class="flex-1">
              <p class="text-[11px] font-black text-slate-800 leading-none">
                {{ file.name }}
              </p>
              <span class="text-[9px] text-slate-400 font-bold uppercase">{{
                file.meta
              }}</span>
            </div>
            <Download
              class="w-4 h-4 text-slate-300 group-hover:text-teal-500"
            />
          </div>
        </div>
      </section>

      <section
        class="bg-indigo-600 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-200"
      >
        <h5
          class="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70"
        >
          Discussions
        </h5>
        <div class="flex -space-x-3 mb-4">
          <div
            v-for="i in 4"
            :key="i"
            class="w-10 h-10 border-4 border-indigo-600 rounded-full bg-slate-200 overflow-hidden shadow-lg"
          >
            <img :src="`https://i.pravatar.cc/100?img=${i + 10}`" />
          </div>
          <div
            class="w-10 h-10 border-4 border-indigo-600 rounded-full bg-indigo-400 flex items-center justify-center text-[10px] font-bold"
          >
            +3
          </div>
        </div>
        <p class="text-xs font-bold mb-4 opacity-90 leading-relaxed">
          487 people joined this discussion.
        </p>
        <button
          class="w-full py-3 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all"
        >
          Join Discussion <ArrowRight class="w-3 h-3" />
        </button>
      </section>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Menu,
  ChevronDown,
  Check,
  Play,
  Globe,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreVertical,
  Edit2,
  FileText,
  Download,
  ArrowRight,
} from "lucide-vue-next";

const activeLesson = ref({
  id: 1,
  title: "Cơ sở hạ tầng & Cấu trúc UAV",
  instructor: "Phách Admin",
  duration: "25",
  notesCount: "44",
  transcript: {
    "00:00":
      "Chào mừng bạn đến với khóa học UAV chuyên sâu. Hôm nay chúng ta sẽ bắt đầu với những khái niệm cơ bản nhất về phần cứng và cách một thiết bị bay không người lái vận hành trong không gian.",
    "00:12":
      "Trước hết, chúng ta cần hiểu về hệ thống truyền lực, bao gồm motor, cánh quạt và bộ điều tốc ESC. Đây là những thành phần quyết định khả năng tải và độ ổn định của UAV.",
    "00:22":
      "Hệ thống định vị toàn cầu (GPS) và cảm biến IMU là 'bộ não' giúp UAV giữ thăng bằng và tự động hóa các nhiệm vụ bay phức tạp...",
  },
});

const courseData = ref([
  {
    title: "Giới thiệu khóa học",
    isOpen: true,
    lessons: [
      {
        id: 101,
        title: "Tổng quan về ngành UAV 2024",
        duration: "15",
        completed: true,
      },
    ],
  },
  {
    title: "Kỹ thuật cơ bản",
    isOpen: true,
    lessons: [
      {
        id: 1,
        title: "Cơ sở hạ tầng & Cấu trúc UAV",
        duration: "25",
        completed: false,
      },
      {
        id: 2,
        title: "Quy định an toàn bay & Luật pháp",
        duration: "40",
        completed: false,
      },
      {
        id: 3,
        title: "Lắp ráp & Cấu hình phần cứng",
        duration: "60",
        completed: false,
      },
    ],
  },
]);

const downloadFiles = [
  { name: "Video Bài giảng (4K)", meta: "mp4, 2.5GB" },
  { name: "Sơ đồ mạch điện UAV", meta: "pdf, 15MB" },
  { name: "Tài liệu hướng dẫn lắp ráp", meta: "docx, 2MB" },
];
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
