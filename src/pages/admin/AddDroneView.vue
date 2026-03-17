<template>
  <div class="max-w-5xl mx-auto space-y-6 pb-20">
    <div
      class="flex items-center justify-between border-b border-slate-200 pb-4"
    >
      <div>
        <h1 class="text-2xl font-black text-slate-900 uppercase tracking-tight">
          Thêm thiết bị UAV mới
        </h1>
        <p class="text-sm text-slate-500">
          Điền đầy đủ thông tin kỹ thuật và tài nguyên đa phương tiện cho thiết
          bị.
        </p>
      </div>
      <div class="flex gap-3">
        <button
          @click="$router.back()"
          class="px-6 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
        >
          Hủy
        </button>
        <button
          @click="handleSave"
          class="px-6 py-2 bg-teal-500 text-slate-900 rounded-xl font-black shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all"
        >
          Lưu thiết bị
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <section
          class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <h3
            class="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <Info :size="16" class="text-teal-500" /> Thông tin cơ bản
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[10px] font-black uppercase text-slate-400"
                >Tên sản phẩm</label
              >
              <input
                v-model="form.name"
                type="text"
                placeholder="VD: DJI Mavic 4 Pro"
                class="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500/20 outline-none"
              />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black uppercase text-slate-400"
                >Danh mục</label
              >
              <input
                v-model="form.category"
                type="text"
                placeholder="VD: DJI Mavic"
                class="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500/20 outline-none"
              />
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase text-slate-400"
              >Mô tả chi tiết</label
            >
            <textarea
              v-model="form.description"
              rows="5"
              class="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
            ></textarea>
          </div>
        </section>

        <section
          class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6"
        >
          <h3
            class="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <Image :size="16" class="text-teal-500" /> Tài nguyên đa phương tiện
          </h3>

          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase text-slate-400"
              >Danh sách hình ảnh (Thumbnail URLs)</label
            >
            <div
              v-for="(img, index) in form.images"
              :key="index"
              class="flex gap-2"
            >
              <input
                v-model="form.images[index]"
                type="text"
                class="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs"
              />
              <button
                @click="removeArrayItem('images', index)"
                class="p-2 text-red-400 hover:bg-red-50 rounded-lg"
              >
                <X :size="16" />
              </button>
            </div>
            <button
              @click="addArrayItem('images')"
              class="text-xs font-bold text-teal-600 flex items-center gap-1"
            >
              + Thêm ảnh
            </button>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase text-slate-400"
              >Video giới thiệu (Intro Video URLs)</label
            >
            <div
              v-for="(vid, index) in form.intro"
              :key="index"
              class="flex gap-2"
            >
              <input
                v-model="form.intro[index]"
                type="text"
                class="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs"
              />
              <button
                @click="removeArrayItem('intro', index)"
                class="p-2 text-red-400 hover:bg-red-50 rounded-lg"
              >
                <X :size="16" />
              </button>
            </div>
            <button
              @click="addArrayItem('intro')"
              class="text-xs font-bold text-teal-600 flex items-center gap-1"
            >
              + Thêm video
            </button>
          </div>
        </section>

        <section
          class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <div class="flex justify-between items-center">
            <h3
              class="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"
            >
              <MapPin :size="16" class="text-teal-500" /> Tọa độ Hotspots (3D)
            </h3>
            <button
              @click="addHotspot"
              class="text-xs font-black uppercase bg-teal-50 text-teal-700 px-3 py-1 rounded-lg"
            >
              Thêm điểm
            </button>
          </div>

          <div
            v-for="(spot, index) in form.hotspots"
            :key="index"
            class="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3 relative"
          >
            <button
              @click="removeArrayItem('hotspots', index)"
              class="absolute top-2 right-2 text-slate-300 hover:text-red-500"
            >
              <Trash2 :size="16" />
            </button>
            <div class="grid grid-cols-3 gap-3">
              <div class="space-y-1">
                <label class="text-[9px] font-black text-slate-400 uppercase"
                  >X</label
                >
                <input
                  v-model.number="spot.pos.x"
                  type="number"
                  step="0.01"
                  class="w-full p-2 border rounded-lg text-xs"
                />
              </div>
              <div class="space-y-1">
                <label class="text-[9px] font-black text-slate-400 uppercase"
                  >Y</label
                >
                <input
                  v-model.number="spot.pos.y"
                  type="number"
                  step="0.01"
                  class="w-full p-2 border rounded-lg text-xs"
                />
              </div>
              <div class="space-y-1">
                <label class="text-[9px] font-black text-slate-400 uppercase"
                  >Z</label
                >
                <input
                  v-model.number="spot.pos.z"
                  type="number"
                  step="0.01"
                  class="w-full p-2 border rounded-lg text-xs"
                />
              </div>
            </div>
            <input
              v-model="spot.title"
              type="text"
              placeholder="Tiêu đề điểm"
              class="w-full p-2 border rounded-lg text-xs font-bold"
            />
            <textarea
              v-model="spot.desc"
              placeholder="Mô tả kỹ thuật cho điểm này..."
              rows="2"
              class="w-full p-2 border rounded-lg text-xs resize-none"
            ></textarea>
          </div>
        </section>
      </div>

      <div class="space-y-6">
        <section
          class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <h3
            class="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <Box :size="16" class="text-teal-500" /> Cấu hình 3D
          </h3>
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase text-slate-400"
              >Đường dẫn File .GLB</label
            >
            <input
              v-model="form.model3d"
              type="text"
              class="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs"
            />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase text-slate-400"
              >Tỷ lệ Scale (Ví dụ: 0.1)</label
            >
            <input
              v-model.number="form.scale"
              type="number"
              step="0.01"
              class="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs"
            />
          </div>
        </section>

        <section
          class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <h3
            class="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <Zap :size="16" class="text-teal-500" /> Chỉ số vận hành
          </h3>
          <div v-for="(val, key) in form.stats" :key="key" class="space-y-1">
            <label class="text-[10px] font-black uppercase text-slate-400">{{
              key
            }}</label>
            <input
              v-model="form.stats[key]"
              type="text"
              class="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs"
            />
          </div>
        </section>

        <section
          class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <div class="flex justify-between items-center">
            <h3
              class="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"
            >
              <Layers :size="16" class="text-teal-500" /> Phiên bản & Combo
            </h3>
            <button @click="addVersion" class="text-xs text-teal-600 font-bold">
              + Thêm
            </button>
          </div>
          <div
            v-for="(v, idx) in form.versions"
            :key="idx"
            class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 relative"
          >
            <button
              @click="removeArrayItem('versions', idx)"
              class="absolute top-1 right-1 text-slate-300"
            >
              <X :size="14" />
            </button>
            <input
              v-model="v.title"
              type="text"
              placeholder="Tên phiên bản"
              class="w-full p-2 text-[11px] border-none bg-transparent font-bold outline-none"
            />
            <input
              v-model="v.controller"
              type="text"
              placeholder="Bộ điều khiển đi kèm"
              class="w-full p-2 text-[10px] border-none bg-transparent italic outline-none"
            />
          </div>
        </section>
        <section
          class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <h3
            class="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <Image :size="16" class="text-teal-500" /> Hình ảnh đại diện
          </h3>
          <div class="flex items-center gap-6">
            <div
              class="w-32 h-32 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group"
            >
              <img
                v-if="previews.image"
                :src="previews.image"
                class="w-full h-full object-cover"
              />
              <ImageIcon v-else class="text-slate-300" :size="32" />
              <input
                type="file"
                @change="handleFileUpload($event, 'image')"
                class="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
            <div class="text-sm">
              <p class="font-bold text-slate-700">Tải lên ảnh Thumbnail</p>
              <p class="text-slate-400 text-xs">
                Hỗ trợ JPG, PNG, WebP. Tối đa 5MB.
              </p>
            </div>
          </div>
        </section>

        <section
          class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <h3
            class="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <Box :size="16" class="text-teal-500" /> File mô hình 3D (.GLB)
          </h3>
          <div
            class="w-full h-64 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-700"
          >
            <Uav3DViewer
              v-if="previews.model3d"
              :modelSrc="previews.model3d"
              :scale="form.scale"
            />

            <div v-else class="text-center z-10">
              <div
                class="p-4 bg-slate-800 rounded-full inline-block mb-3 text-teal-400"
              >
                <UploadCloud :size="32" />
              </div>
              <p class="text-white font-bold text-sm">
                Kéo thả hoặc click để tải lên file .GLB
              </p>
              <input
                type="file"
                @change="handleFileUpload($event, 'model3d')"
                class="absolute inset-0 opacity-0 cursor-pointer"
                accept=".glb"
              />
            </div>

            <button
              v-if="previews.model3d"
              class="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/20 transition-all"
            >
              Thay đổi Model
              <input
                type="file"
                @change="handleFileUpload($event, 'model3d')"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
  Info,
  Image as ImageIcon,
  Box,
  MapPin,
  Zap,
  Layers,
  UploadCloud,
  X,
  Trash2,
} from "lucide-vue-next";
// Đừng quên import component 3D của bạn để xem preview
import Uav3DViewer from "@/components/Uav3DViewer.vue";

const form = reactive({
  name: "",
  description: "",
  category: "",
  image: null, // Lưu file thực tế
  model3d: null, // Lưu file thực tế
  scale: 0.1,
  hotspots: [],
  // ... các trường khác
});

// Chứa link tạm thời để hiển thị Preview
const previews = reactive({
  image: null,
  model3d: null,
});

const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  // 1. Lưu file vào form để sau này gửi lên server (API)
  form[type] = file;

  // 2. Tạo URL tạm thời để xem preview
  if (previews[type]) {
    URL.revokeObjectURL(previews[type]); // Giải phóng bộ nhớ cũ
  }
  previews[type] = URL.createObjectURL(file);
};

const handleSave = async () => {
  // Khi gửi lên C# Backend, Phách phải dùng FormData thay vì JSON thông thường
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("imageFile", form.image); // Gửi file
  formData.append("modelFile", form.model3d); // Gửi file
  // ... append các trường khác

  console.log("Sẵn sàng gửi FormData lên API...");
  alert("Dữ liệu đã sẵn sàng để gửi!");
};
</script>
