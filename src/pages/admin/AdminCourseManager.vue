<template>
  <div
    class="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900"
  >
    <aside
      class="w-96 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20"
    >
      <div class="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2
          class="text-xl font-black text-slate-800 uppercase tracking-tighter italic flex items-center gap-2"
        >
          <LayoutDashboard class="w-5 h-5 text-teal-600" /> Quản lý nội dung
        </h2>
        <button
          @click="addNewLesson"
          class="w-full mt-4 py-3 bg-teal-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100"
        >
          <Plus class="w-4 h-4" /> Thêm bài giảng mới
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        <div
          v-for="(section, sIdx) in courseData"
          :key="sIdx"
          class="space-y-2"
        >
          <div class="flex items-center gap-2 px-2 mb-2">
            <component
              :is="section.icon || 'BookOpen'"
              class="w-3 h-3 text-teal-500"
            />
            <span
              class="text-[10px] font-black uppercase text-slate-400 tracking-widest"
              >{{ section.title }}</span
            >
          </div>

          <div
            v-for="lesson in section.lessons"
            :key="lesson.id"
            @click="editLesson(lesson.id)"
            :class="[
              'group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border-2',
              editingId === lesson.id
                ? 'bg-teal-50 border-teal-200 shadow-sm'
                : 'border-transparent hover:bg-slate-50',
            ]"
          >
            <div
              class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-white transition-colors"
            >
              {{ lesson.id }}
            </div>
            <div class="flex-1 overflow-hidden">
              <h4
                class="text-xs font-bold text-slate-700 truncate leading-tight"
              >
                {{ lesson.title }}
              </h4>
              <span class="text-[9px] font-bold text-slate-400 uppercase"
                >{{ lesson.duration }}m • Active</span
              >
            </div>
            <ChevronRight
              class="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all"
            />
          </div>
        </div>
      </nav>
    </aside>

    <main
      class="flex-1 overflow-y-auto bg-white custom-scrollbar p-10 flex justify-center"
    >
      <div class="w-full max-w-4xl space-y-10">
        <header
          class="flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 py-4 z-10 border-b border-slate-100 mb-8"
        >
          <div>
            <h1
              class="text-2xl font-black text-slate-900 tracking-tighter uppercase italic"
            >
              {{ isNew ? "Tạo bài giảng mới" : "Chỉnh sửa bài học" }}
            </h1>
            <p class="text-[10px] font-bold text-slate-400 uppercase">
              ID: {{ editingLesson.id }} • Cập nhật lần cuối: 10:45 AM
            </p>
          </div>
          <div class="flex gap-3">
            <button
              class="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              Hủy
            </button>
            <button
              @click="saveLesson"
              class="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
            >
              Lưu thay đổi
            </button>
          </div>
        </header>

        <div class="grid grid-cols-2 gap-6">
          <div class="col-span-2 space-y-2">
            <label
              class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1"
              >Tiêu đề bài giảng</label
            >
            <input
              v-model="editingLesson.title"
              type="text"
              class="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-teal-500 focus:bg-white outline-none font-bold text-slate-800 transition-all"
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1"
              >Giảng viên</label
            >
            <input
              v-model="editingLesson.instructor"
              type="text"
              class="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-teal-500 focus:bg-white outline-none font-bold text-slate-800 transition-all"
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1"
              >Thời lượng (phút)</label
            >
            <input
              v-model="editingLesson.duration"
              type="number"
              class="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-teal-500 focus:bg-white outline-none font-bold text-slate-800 transition-all"
            />
          </div>
        </div>

        <div class="space-y-6">
          <div
            class="flex items-center justify-between border-b border-slate-100 pb-4"
          >
            <h3 class="text-lg font-black italic uppercase tracking-tighter">
              Nội dung bài viết (Content)
            </h3>
            <div class="flex gap-2">
              <button
                @click="addBlock('heading')"
                class="p-2 bg-slate-100 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all"
              >
                <Type class="w-4 h-4" />
              </button>
              <button
                @click="addBlock('paragraph')"
                class="p-2 bg-slate-100 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all"
              >
                <AlignLeft class="w-4 h-4" />
              </button>
              <button
                @click="addBlock('list')"
                class="p-2 bg-slate-100 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all"
              >
                <List class="w-4 h-4" />
              </button>
              <button
                @click="addBlock('image')"
                class="p-2 bg-slate-100 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all"
              >
                <Image class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="(item, index) in editingLesson.content"
              :key="index"
              class="group relative bg-slate-50 p-6 rounded-[2rem] border-2 border-transparent hover:border-slate-200 transition-all"
            >
              <button
                @click="removeBlock(index)"
                class="absolute -right-2 -top-2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
              >
                <Trash2 class="w-4 h-4" />
              </button>

              <div v-if="item.type === 'heading'" class="space-y-2">
                <span class="text-[9px] font-black text-teal-500 uppercase"
                  >Heading Block</span
                >
                <input
                  v-model="item.text"
                  class="w-full bg-transparent text-xl font-black outline-none italic uppercase tracking-tighter"
                  placeholder="Nhập tiêu đề mục..."
                />
              </div>

              <div v-if="item.type === 'paragraph'" class="space-y-2">
                <span class="text-[9px] font-black text-blue-500 uppercase"
                  >Paragraph Block</span
                >
                <textarea
                  v-model="item.text"
                  rows="3"
                  class="w-full bg-transparent outline-none leading-relaxed text-slate-600"
                  placeholder="Viết nội dung tại đây..."
                ></textarea>
              </div>

              <div v-if="item.type === 'list'" class="space-y-2">
                <span class="text-[9px] font-black text-purple-500 uppercase"
                  >List Block</span
                >
                <div
                  v-for="(li, lIdx) in item.items"
                  :key="lIdx"
                  class="flex gap-2 mb-2"
                >
                  <div
                    class="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0"
                  ></div>
                  <input
                    v-model="item.items[lIdx]"
                    class="flex-1 bg-transparent outline-none text-slate-600"
                    placeholder="Mục danh sách..."
                  />
                </div>
                <button
                  @click="item.items.push('')"
                  class="text-[9px] font-bold text-purple-500 hover:underline"
                >
                  + THÊM DÒNG
                </button>
              </div>

              <div v-if="item.type === 'image'" class="space-y-2">
                <span class="text-[9px] font-black text-orange-500 uppercase"
                  >Image Block</span
                >
                <input
                  v-model="item.src"
                  class="w-full bg-white p-2 rounded-lg text-xs font-mono outline-none border border-slate-200"
                  placeholder="URL hình ảnh (ví dụ: /img/uav.png)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  LayoutDashboard,
  Plus,
  ChevronRight,
  Type,
  AlignLeft,
  List,
  Image,
  Trash2,
  BookOpen,
  Cpu,
  Zap,
} from "lucide-vue-next";
import { courseData as rawData, lessonContentMap } from "@/data/uavCourseData";

const courseData = ref(rawData);
const editingId = ref(201);
const editingLesson = ref({ ...lessonContentMap[201] });
const isNew = ref(false);

const editLesson = (id) => {
  isNew.value = false;
  editingId.value = id;
  editingLesson.value = JSON.parse(JSON.stringify(lessonContentMap[id]));
};

const addBlock = (type) => {
  const newBlock = { type };
  if (type === "heading" || type === "paragraph") newBlock.text = "";
  if (type === "list") newBlock.items = [""];
  if (type === "image") newBlock.src = "";
  editingLesson.value.content.push(newBlock);
};

const removeBlock = (index) => {
  editingLesson.value.content.splice(index, 1);
};

const saveLesson = () => {
  alert("Đã lưu dữ liệu bài học thành công vào Memory!");
  console.log(editingLesson.value);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
