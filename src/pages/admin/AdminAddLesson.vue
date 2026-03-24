<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
    <header
      class="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm"
    >
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft class="w-5 h-5 text-slate-500" />
        </button>
        <div>
          <h1
            class="text-xl font-black uppercase tracking-tighter italic flex items-center gap-2"
          >
            <PlusCircle class="w-5 h-5 text-teal-600" /> Tạo bài giảng mới
          </h1>
        </div>
      </div>

      <div class="flex gap-4">
        <button
          class="px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all"
        >
          Lưu nháp
        </button>
        <button
          @click="handlePublish"
          class="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl shadow-slate-200"
        >
          Xuất bản bài học
        </button>
      </div>
    </header>

    <div class="flex-1 overflow-hidden flex">
      <aside
        class="w-96 border-r border-slate-200 bg-white p-8 overflow-y-auto custom-scrollbar"
      >
        <h3
          class="text-[11px] font-black uppercase tracking-[0.2em] text-teal-600 mb-8"
        >
          Thông tin cơ bản
        </h3>

        <div class="space-y-8">
          <div class="space-y-3">
            <label class="text-[10px] font-black text-slate-400 uppercase"
              >Thuộc Chương</label
            >
            <select
              v-model="form.sectionIndex"
              class="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-teal-500 font-bold text-sm"
            >
              <option v-for="(sec, idx) in courseData" :key="idx" :value="idx">
                {{ sec.title }}
              </option>
            </select>
          </div>

          <div class="space-y-3">
            <label class="text-[10px] font-black text-slate-400 uppercase"
              >Mã bài học (ID)</label
            >
            <input
              v-model="form.id"
              type="number"
              class="w-full p-4 bg-slate-100 border-none rounded-2xl font-mono font-bold text-teal-600"
              placeholder="VD: 103"
            />
            <p class="text-[9px] text-slate-400 italic">
              * Nên đặt theo quy luật (Chương 1: 1xx, Chương 2: 2xx)
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
              <label class="text-[10px] font-black text-slate-400 uppercase"
                >Thời lượng</label
              >
              <input
                v-model="form.duration"
                type="text"
                class="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 font-bold"
                placeholder="30m"
              />
            </div>
            <div class="space-y-3">
              <label class="text-[10px] font-black text-slate-400 uppercase"
                >Ghi chú</label
              >
              <input
                v-model="form.notesCount"
                type="number"
                class="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 font-bold"
              />
            </div>
          </div>
        </div>
      </aside>

      <main
        class="flex-1 bg-slate-50 p-12 overflow-y-auto custom-scrollbar flex justify-center"
      >
        <div class="w-full max-w-3xl space-y-12">
          <textarea
            v-model="form.title"
            rows="2"
            placeholder="Nhập tiêu đề bài giảng tại đây..."
            class="w-full bg-transparent text-5xl font-black text-slate-900 outline-none placeholder:text-slate-200 tracking-tighter uppercase italic leading-tight resize-none border-b-4 border-transparent focus:border-teal-100 pb-4 transition-all"
          ></textarea>

          <div class="space-y-8">
            <div
              v-for="(block, index) in form.content"
              :key="index"
              class="group relative animate-fade-in"
            >
              <button
                @click="removeBlock(index)"
                class="absolute -left-12 top-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 class="w-5 h-5" />
              </button>

              <div
                class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all"
              >
                <div v-if="block.type === 'heading'">
                  <div
                    class="flex items-center gap-2 mb-4 text-teal-500 font-black text-[9px] uppercase tracking-widest"
                  >
                    <Type class="w-3 h-3" /> Tiêu đề mục
                  </div>
                  <input
                    v-model="block.text"
                    class="w-full text-2xl font-black text-slate-800 outline-none border-b-2 border-slate-50 focus:border-teal-200 pb-2"
                    placeholder="Nhập tiêu đề..."
                  />
                </div>

                <div v-else-if="block.type === 'paragraph'">
                  <div
                    class="flex items-center gap-2 mb-4 text-blue-500 font-black text-[9px] uppercase tracking-widest"
                  >
                    <AlignLeft class="w-3 h-3" /> Đoạn văn nội dung
                  </div>
                  <textarea
                    v-model="block.text"
                    rows="4"
                    class="w-full text-lg leading-relaxed text-slate-600 outline-none resize-none"
                    placeholder="Viết nội dung bài giảng chuyên sâu tại đây..."
                  ></textarea>
                </div>

                <div v-else-if="block.type === 'list'">
                  <div
                    class="flex items-center gap-2 mb-4 text-purple-500 font-black text-[9px] uppercase tracking-widest"
                  >
                    <ListIcon class="w-3 h-3" /> Danh sách đặc điểm
                  </div>
                  <div
                    v-for="(li, lIdx) in block.items"
                    :key="lIdx"
                    class="flex gap-4 mb-3 items-center group/item"
                  >
                    <div class="w-2 h-2 rounded-full bg-purple-200"></div>
                    <input
                      v-model="block.items[lIdx]"
                      class="flex-1 text-lg outline-none"
                      placeholder="Nhập mục..."
                    />
                    <button
                      @click="block.items.splice(lIdx, 1)"
                      class="opacity-0 group-hover/item:opacity-100 text-red-300"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    @click="block.items.push('')"
                    class="mt-4 text-[10px] font-black text-purple-600 hover:underline"
                  >
                    + THÊM DÒNG MỚI
                  </button>
                </div>

                <div v-else-if="block.type === 'image'">
                  <div
                    class="flex items-center gap-2 mb-4 text-orange-500 font-black text-[9px] uppercase tracking-widest"
                  >
                    <ImageIcon class="w-3 h-3" /> Hình ảnh minh họa
                  </div>
                  <div
                    class="p-8 border-4 border-dashed border-slate-100 rounded-[2rem] text-center hover:border-orange-200 transition-all"
                  >
                    <input
                      v-model="block.src"
                      placeholder="Nhập URL ảnh (VD: /img/uav-model.png)"
                      class="w-full p-3 bg-slate-50 rounded-xl outline-none font-mono text-xs mb-4"
                    />
                    <div v-if="block.src" class="mt-4">
                      <img
                        :src="block.src"
                        class="max-h-48 mx-auto rounded-xl shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="flex justify-center gap-6 py-10 border-t-2 border-dashed border-slate-200 mt-10"
            >
              <button
                @click="addBlock('heading')"
                class="flex flex-col items-center gap-2 group"
              >
                <div
                  class="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all"
                >
                  <Type />
                </div>
                <span
                  class="text-[9px] font-black uppercase text-slate-400 group-hover:text-teal-600"
                  >Tiêu đề</span
                >
              </button>
              <button
                @click="addBlock('paragraph')"
                class="flex flex-col items-center gap-2 group"
              >
                <div
                  class="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"
                >
                  <AlignLeft />
                </div>
                <span
                  class="text-[9px] font-black uppercase text-slate-400 group-hover:text-blue-600"
                  >Đoạn văn</span
                >
              </button>
              <button
                @click="addBlock('list')"
                class="flex flex-col items-center gap-2 group"
              >
                <div
                  class="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all"
                >
                  <ListIcon />
                </div>
                <span
                  class="text-[9px] font-black uppercase text-slate-400 group-hover:text-purple-600"
                  >Danh sách</span
                >
              </button>
              <button
                @click="addBlock('image')"
                class="flex flex-col items-center gap-2 group"
              >
                <div
                  class="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all"
                >
                  <ImageIcon />
                </div>
                <span
                  class="text-[9px] font-black uppercase text-slate-400 group-hover:text-orange-600"
                  >Hình ảnh</span
                >
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ArrowLeft,
  PlusCircle,
  Type,
  AlignLeft,
  List as ListIcon,
  Image as ImageIcon,
  Trash2,
  X,
} from "lucide-vue-next";
import { courseData as rawData } from "@/data/uavCourseData";

const courseData = ref(rawData);

const form = ref({
  id: 103,
  sectionIndex: 0,
  title: "",
  instructor: "Phách Admin",
  duration: "30",
  notesCount: 0,
  content: [
    { type: "heading", text: "" },
    { type: "paragraph", text: "" },
  ],
});

const addBlock = (type) => {
  if (type === "heading" || type === "paragraph")
    form.value.content.push({ type, text: "" });
  if (type === "list") form.value.content.push({ type, items: [""] });
  if (type === "image") form.value.content.push({ type, src: "", alt: "" });
};

const removeBlock = (index) => form.value.content.splice(index, 1);

const handlePublish = () => {
  console.log("Dữ liệu bài giảng mới:", form.value);
  alert("Chúc mừng Phách! Bài giảng đã sẵn sàng để lưu vào hệ thống.");
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
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
