<template>
  <div class="min-h-screen bg-slate-50/50 pb-20 font-sans">
    <header
      class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 bg-blue-600 rounded-2xl text-white flex items-center justify-center shadow-lg shadow-blue-600/20"
          >
            <Box :size="24" />
          </div>
          <div>
            <h1
              class="text-xl font-black text-slate-900 uppercase tracking-tight"
            >
              {{ isEdit ? "Cấu hình thiết bị UAV" : "Thêm mới UAV" }}
            </h1>
            <p
              class="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-0.5"
            >
              Hệ thống quản lý Data SkyLink
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="$router.back()"
            class="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm"
          >
            Hủy bỏ
          </button>
          <button
            @click="handleSave"
            class="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-bold shadow-xl shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-600/30 transition-all flex items-center gap-2 text-sm group"
          >
            <Zap
              :size="18"
              class="text-blue-400 group-hover:text-white transition-colors"
            />
            {{ isEdit ? "Cập nhật dữ liệu" : "Lưu vào hệ thống" }}
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-7 space-y-6">
          <section
            class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none"
            >
              <Info :size="120" />
            </div>
            <h3
              class="font-black text-slate-900 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full bg-blue-600"></span> Thông tin
              định danh
            </h3>

            <div class="grid grid-cols-2 gap-6 relative z-10">
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-500 tracking-widest"
                  >Tên thiết bị <span class="text-red-500">*</span></label
                >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="VD: AeroX Pro Photography"
                  :class="[
                    'w-full p-3.5 bg-slate-50 border rounded-xl focus:ring-4 outline-none font-bold text-sm transition-all',
                    errors.name
                      ? 'border-red-400 focus:ring-red-500/10'
                      : 'border-slate-200 focus:ring-blue-500/10 focus:border-blue-500',
                  ]"
                />
                <p
                  v-if="errors.name"
                  class="text-[10px] font-bold text-red-500"
                >
                  {{ errors.name }}
                </p>
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-500 tracking-widest"
                  >Phân loại <span class="text-red-500">*</span></label
                >
                <select
                  v-model="form.category"
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-sm text-slate-700 cursor-pointer transition-all"
                >
                  <option value="Quadcopter">Quadcopter</option>
                  <option value="Fixed-wing">Fixed-wing (Cánh bằng)</option>
                  <option value="Hexacopter">Hexacopter</option>
                  <option value="VTOL">VTOL</option>
                </select>
              </div>
            </div>

            <div class="space-y-2 relative z-10">
              <label
                class="text-[10px] font-black uppercase text-slate-500 tracking-widest"
                >Mô tả tổng quan</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Nhập mô tả về nhiệm vụ, đặc điểm nổi bật..."
                class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium text-sm resize-none transition-all"
              ></textarea>
            </div>
          </section>

          <section
            class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
          >
            <h3
              class="font-black text-slate-900 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Thông số
              kỹ thuật
            </h3>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="space-y-2">
                <label class="text-[9px] font-black uppercase text-slate-400"
                  >T/G Bay (Phút)</label
                >
                <input
                  v-model="form.flight_time"
                  type="number"
                  min="0"
                  class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-emerald-500"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-black uppercase text-slate-400"
                  >Trọng lượng (KG)</label
                >
                <input
                  v-model="form.weight"
                  type="number"
                  step="0.1"
                  min="0"
                  class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-emerald-500"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-black uppercase text-slate-400"
                  >Phạm vi (KM)</label
                >
                <input
                  v-model="form.range"
                  type="number"
                  step="0.1"
                  min="0"
                  class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-emerald-500"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-black uppercase text-slate-400"
                  >Tốc độ (KM/H)</label
                >
                <input
                  v-model="form.max_speed"
                  type="number"
                  min="0"
                  class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-emerald-500"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 pt-4 border-t border-slate-100">
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-500 tracking-widest"
                  >Hệ thống Camera / Quang học</label
                >
                <input
                  v-model="form.camera"
                  type="text"
                  placeholder="VD: 8K Hasselblad, Thermal Lens..."
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-emerald-500"
                />
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-500 tracking-widest flex justify-between"
                >
                  Cảm biến tích hợp
                  <span class="text-[9px] text-slate-400 italic normal-case"
                    >Nhập & ấn Enter để thêm</span
                  >
                </label>
                <div
                  class="p-2 bg-slate-50 border border-slate-200 rounded-xl min-h-[56px] flex flex-wrap gap-2 items-center focus-within:border-emerald-500 transition-colors"
                >
                  <span
                    v-for="(sensor, idx) in form.sensors"
                    :key="idx"
                    class="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2"
                  >
                    {{ sensor }}
                    <X
                      @click="removeSensor(idx)"
                      :size="12"
                      class="cursor-pointer hover:text-emerald-900"
                    />
                  </span>
                  <input
                    v-model="sensorInput"
                    @keydown.enter.prevent="addSensor"
                    type="text"
                    placeholder="Thêm cảm biến..."
                    class="flex-1 bg-transparent outline-none text-sm font-medium min-w-[150px] p-1.5"
                  />
                </div>
              </div>
            </div>
          </section>

          <section
            class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
          >
            <div class="flex justify-between items-center">
              <h3
                class="font-black text-slate-900 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <span class="w-2 h-2 rounded-full bg-purple-500"></span> Điểm
                chú thích 3D
              </h3>
              <button
                @click="addHotspot"
                class="text-[10px] font-black uppercase bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition-all shadow-md"
              >
                + Thêm Hotspot
              </button>
            </div>

            <div
              v-if="form.hotspots.length === 0"
              class="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50"
            >
              <MapPin :size="32" class="mx-auto text-slate-300 mb-2" />
              <p class="text-sm font-bold text-slate-400">
                Chưa có điểm chú thích nào.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div
                v-for="(spot, index) in form.hotspots"
                :key="index"
                class="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 relative group transition-all hover:border-purple-300 shadow-sm"
              >
                <button
                  @click="removeHotspot(index)"
                  class="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 :size="16" />
                </button>
                <div class="flex items-center gap-3 w-[90%]">
                  <span
                    class="w-6 h-6 shrink-0 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full flex items-center justify-center"
                    >{{ index + 1 }}</span
                  >
                  <input
                    v-model="spot.title"
                    placeholder="Tên bộ phận (VD: Động cơ)..."
                    class="bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-purple-300 w-full pb-1"
                  />
                </div>
                <div class="grid grid-cols-3 gap-2 px-9">
                  <div
                    class="bg-slate-50 p-2 rounded-lg text-[10px] font-mono font-bold text-slate-600"
                  >
                    <span class="text-slate-400 mr-1">X:</span
                    >{{ spot.pos.x.toFixed(3) }}
                  </div>
                  <div
                    class="bg-slate-50 p-2 rounded-lg text-[10px] font-mono font-bold text-slate-600"
                  >
                    <span class="text-slate-400 mr-1">Y:</span
                    >{{ spot.pos.y.toFixed(3) }}
                  </div>
                  <div
                    class="bg-slate-50 p-2 rounded-lg text-[10px] font-mono font-bold text-slate-600"
                  >
                    <span class="text-slate-400 mr-1">Z:</span
                    >{{ spot.pos.z.toFixed(3) }}
                  </div>
                </div>
                <textarea
                  v-model="spot.desc"
                  placeholder="Giải thích nguyên lý..."
                  rows="2"
                  class="w-full ml-9 w-[calc(100%-36px)] p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none focus:border-purple-300 resize-none"
                ></textarea>
              </div>
            </div>
          </section>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3
              class="font-black text-slate-900 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full bg-orange-500"></span> Ảnh đại
              diện <span class="text-red-500">*</span>
            </h3>
            <div
              :class="[
                'relative group aspect-video bg-slate-50 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all cursor-pointer',
                errors.image
                  ? 'border-red-400'
                  : 'border-slate-200 hover:border-orange-400',
              ]"
            >
              <img
                v-if="previews.image"
                :src="previews.image"
                class="w-full h-full object-contain p-4"
              />
              <div v-else class="text-center">
                <UploadCloud
                  :size="32"
                  class="mx-auto text-slate-300 mb-2 group-hover:text-orange-400 transition-colors"
                />
                <p class="text-xs font-bold text-slate-500">
                  Click để tải ảnh UAV
                </p>
              </div>
              <input
                type="file"
                @change="handleFileUpload($event, 'image')"
                class="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
            <p
              v-if="errors.image"
              class="text-[10px] font-bold text-red-500 text-center"
            >
              {{ errors.image }}
            </p>
          </section>

          <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
          >
            <div
              class="flex justify-between items-center border-b border-slate-50 pb-4"
            >
              <h3
                class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <Layers :size="16" class="text-orange-500" /> Thư viện ảnh
              </h3>
              <label
                class="text-[10px] font-black uppercase bg-orange-50 text-orange-700 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"
              >
                + Thêm ảnh
                <input
                  type="file"
                  multiple
                  @change="handleMultipleImages"
                  class="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div
                v-for="(img, index) in previews.thumbnails"
                :key="index"
                class="relative aspect-square rounded-xl overflow-hidden group border border-slate-100"
              >
                <img :src="img" class="w-full h-full object-cover" />
                <button
                  @click="removeThumbnail(index)"
                  class="absolute inset-0 bg-gray-900/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>
          </section>

          <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3
              class="font-black text-slate-900 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full bg-slate-900"></span> Mô hình 3D
              (.GLB)
            </h3>
            <div
              class="h-80 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-inner group"
            >
              <template v-if="previews.model3d">
                <Uav3DViewer
                  ref="uavViewerRef"
                  :admin="true"
                  :modelSrc="previews.model3d"
                  :currentMarkerId="form.hotspots.length"
                  @pick-coords="updateLatestHotspot"
                />
                <div
                  class="absolute bottom-4 left-4 right-4 flex justify-end pointer-events-none"
                >
                  <label
                    class="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-xl text-[10px] font-black cursor-pointer pointer-events-auto hover:bg-white hover:text-slate-900 transition-all"
                  >
                    Đổi File .GLB
                    <input
                      type="file"
                      @change="handleFileUpload($event, 'model3d')"
                      class="hidden"
                      accept=".glb"
                    />
                  </label>
                </div>
              </template>
              <div v-else class="text-center">
                <Box :size="40" class="mx-auto text-slate-600 mb-3" />
                <p class="text-white font-bold text-sm">Chưa có dữ liệu 3D</p>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'model3d')"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".glb"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "@/utils/apis/axios";
import Uav3DViewer from "@/components/Uav3DViewer.vue";
import {
  Info,
  Box,
  MapPin,
  Zap,
  UploadCloud,
  X,
  Trash2,
  Layers,
} from "lucide-vue-next";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const droneId = route.params.id;
const isEdit = ref(!!droneId);

const uavViewerRef = ref(null);
const isPickingLocation = ref(false);

const form = reactive({
  name: "",
  category: "Quadcopter",
  description: "",
  flight_time: 0,
  weight: 0,
  range: 0,
  max_speed: 0,
  camera: "",
  sensors: [],
  scale: 0.15,
  image: null,
  model3d: null,
  hotspots: [],
  thumbnails: [],
});

const previews = reactive({
  image: null,
  model3d: null,
  thumbnails: [],
});

const errors = reactive({});

// Logic Tags Cảm biến
const sensorInput = ref("");
const addSensor = () => {
  const val = sensorInput.value.trim();
  if (val && !form.sensors.includes(val)) form.sensors.push(val);
  sensorInput.value = "";
};
const removeSensor = (idx) => form.sensors.splice(idx, 1);

// VALIDATION
const validateForm = () => {
  Object.keys(errors).forEach((key) => delete errors[key]);
  let isValid = true;
  if (!form.name.trim()) {
    errors.name = "Bắt buộc nhập tên thiết bị";
    isValid = false;
  }
  if (!isEdit.value && !form.image) {
    errors.image = "Bắt buộc tải ảnh đại diện";
    isValid = false;
  }

  form.flight_time = Number(form.flight_time) || 0;
  form.weight = Number(form.weight) || 0;
  form.range = Number(form.range) || 0;
  form.max_speed = Number(form.max_speed) || 0;

  if (!isValid) toast.error("Vui lòng kiểm tra lại thông tin bị lỗi!");
  return isValid;
};

// LOAD DỮ LIỆU CŨ
const fetchDroneDetail = async () => {
  if (!isEdit.value) return;
  try {
    const { data } = await api.get(`/drones/${droneId}`);
    Object.assign(form, {
      name: data.name,
      category: data.category,
      description: data.description,
      flight_time: data.flight_time || 0,
      weight: data.weight || 0,
      range: data.range || 0,
      max_speed: data.max_speed || 0,
      camera: data.camera || "",
      sensors:
        typeof data.sensors === "string"
          ? JSON.parse(data.sensors)
          : data.sensors || [],
      scale: data.scale || 0.15,
      hotspots:
        typeof data.hotspots === "string"
          ? JSON.parse(data.hotspots)
          : data.hotspots || [],
    });

    const backendUrl = "http://localhost:5000";
    previews.image = data.image ? backendUrl + data.image : null;
    previews.model3d = data.model3d ? backendUrl + data.model3d : null;
    if (data.thumbnails) {
      const thumbUrls =
        typeof data.thumbnails === "string"
          ? JSON.parse(data.thumbnails)
          : data.thumbnails;
      previews.thumbnails = thumbUrls.map((url) => backendUrl + url);
    }
  } catch (error) {
    toast.error("Không thể lấy thông tin UAV!");
  }
};
onMounted(fetchDroneDetail);

// XỬ LÝ MEDIA
const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;
  if (type === "image" && errors.image) delete errors.image;
  form[type] = file;
  if (previews[type]) URL.revokeObjectURL(previews[type]);
  previews[type] = URL.createObjectURL(file);
};

const handleMultipleImages = (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    form.thumbnails.push(file);
    previews.thumbnails.push(URL.createObjectURL(file));
  });
};
const removeThumbnail = (index) => {
  URL.revokeObjectURL(previews.thumbnails[index]);
  form.thumbnails.splice(index, 1);
  previews.thumbnails.splice(index, 1);
};

// XỬ LÝ HOTSPOTS
const addHotspot = () => {
  isPickingLocation.value = true;
  form.hotspots.push({
    id: form.hotspots.length + 1,
    pos: { x: 0, y: 0, z: 0 },
    title: "",
    desc: "",
  });
  toast.success("Bấm vào mô hình 3D để gán tọa độ");
};
const removeHotspot = (index) => {
  if (uavViewerRef.value)
    uavViewerRef.value.removeMarkerById(form.hotspots[index].id);
  form.hotspots.splice(index, 1);
};
const updateLatestHotspot = (coords) => {
  if (!isPickingLocation.value || form.hotspots.length === 0) return;
  form.hotspots[form.hotspots.length - 1].pos = {
    x: Number(coords.x),
    y: Number(coords.y),
    z: Number(coords.z),
  };
};

// LƯU LÊN BACKEND
const handleSave = async () => {
  if (!validateForm()) return;

  try {
    toast.info("Đang xử lý dữ liệu...");

    // 1. Hàm upload cho 1 file đơn (Ảnh đại diện, Mô hình 3D)
    const uploadIfNew = async (file, currentUrl) => {
      if (file instanceof File) {
        const fData = new FormData();
        fData.append("file", file);
        const res = await api.post("/courses/upload", fData);
        return res.data.url;
      }
      return currentUrl
        ? currentUrl.replace("http://localhost:5000", "")
        : null;
    };

    // Chạy song song upload 2 file chính cho nhanh
    const [mainImageUrl, modelUrl] = await Promise.all([
      uploadIfNew(form.image, previews.image),
      uploadIfNew(form.model3d, previews.model3d),
    ]);

    // 2. XỬ LÝ UPLOAD NHIỀU ẢNH (THUMBNAILS)
    let finalThumbnails = [];
    const newFilesToUpload = [];

    // Phân loại: đâu là ảnh cũ, đâu là File vừa chọn thêm
    for (const item of form.thumbnails) {
      if (item instanceof File) {
        newFilesToUpload.push(item); // File mới cần đưa lên Server
      } else if (typeof item === "string") {
        // Ảnh cũ đã lưu ở DB (trường hợp cậu đang Edit)
        finalThumbnails.push(item.replace("http://localhost:5000", ""));
      }
    }

    // Nếu có file mới, gọi API multiple upload
    if (newFilesToUpload.length > 0) {
      const multiFormData = new FormData();
      newFilesToUpload.forEach((f) => {
        multiFormData.append("files", f); // Tên "files" phải khớp với upload.array("files") ở BE
      });

      const multiRes = await api.post("/upload-multiple", multiFormData);

      // Lấy mảng URL Backend trả về ghép chung với mảng ảnh cũ
      if (multiRes.data && multiRes.data.urls) {
        finalThumbnails = [...finalThumbnails, ...multiRes.data.urls];
      }
    }

    // 3. ĐÓNG GÓI DỮ LIỆU CUỐI CÙNG
    const finalData = {
      name: form.name,
      category: form.category,
      description: form.description,
      flight_time: form.flight_time,
      weight: form.weight,
      range: form.range,
      max_speed: form.max_speed,
      camera: form.camera,
      sensors: JSON.stringify(form.sensors),
      scale: form.scale,
      image: mainImageUrl,
      model3d: modelUrl,
      hotspots: JSON.stringify(form.hotspots),
      thumbnail: JSON.stringify(finalThumbnails), // Mảng URLs đã sạch sẽ
    };

    // 4. LƯU VÀO DATABASE
    if (isEdit.value) {
      await api.put(`/drones/${droneId}`, finalData);
      toast.success("Hệ thống SkyLink: Cập nhật UAV thành công!");
    } else {
      await api.post("/drones", finalData);
      toast.success("Hệ thống SkyLink: Thêm mới UAV thành công!");
    }

    // Điều hướng về danh sách
    router.push("/admin/drones");
  } catch (error) {
    console.error("Lỗi Save Drone:", error);
    toast.error("Lỗi rada khi lưu dữ liệu! Vui lòng thử lại.");
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
