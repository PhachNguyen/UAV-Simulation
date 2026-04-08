<template>
  <div class="min-h-screen bg-slate-50/50 pb-20">
    <header
      class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div
        class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 bg-teal-500 rounded-lg text-white">
            <Box :size="20" />
          </div>
          <h1 class="text-lg font-bold text-slate-900 uppercase tracking-tight">
            {{ isEdit ? "Chỉnh sửa thông tin Drone" : "Thêm mới Drone" }}
          </h1>
        </div>

        <div class="flex gap-3">
          <button
            @click="$router.back()"
            class="px-5 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
          >
            Hủy
          </button>
          <button
            @click="handleSave"
            class="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Zap :size="16" class="text-teal-400" /> Lưu thiết bị
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8" style="min-height: 80vh">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-7 space-y-6">
          <!-- Thông tin cơ bản -->
          <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5"
          >
            <h3
              class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-50 pb-4"
            >
              <Info :size="16" class="text-teal-500" /> Thông tin cơ bản
            </h3>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-400 ml-1"
                  >Tên sản phẩm</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="VD: DJI Mavic 4 Pro"
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-400 ml-1"
                  >Danh mục</label
                >
                <input
                  v-model="form.category"
                  type="text"
                  placeholder="VD: Enterprise"
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-400 ml-1"
                  >Trọng tải tối đa (kg)</label
                >
                <input
                  v-model="form.maxPayload"
                  type="number"
                  placeholder="VD: 5"
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-400 ml-1"
                  >Thời gian bay tối đa (phút)</label
                >
                <input
                  v-model="form.maxFlightTime"
                  type="number"
                  placeholder="VD: 30"
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>
            </div>
            <div class="space-y-2">
              <label
                class="text-[10px] font-black uppercase text-slate-400 ml-1"
                >Mô tả chi tiết</label
              >
              <textarea
                v-model="form.description"
                rows="4"
                placeholder="Nhập mô tả kỹ thuật..."
                class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none resize-none transition-all"
              ></textarea>
            </div>
          </section>
          <!-- Thông số kỹ thuật -->
          <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5"
          >
            <h3
              class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-50 pb-4"
            >
              <Info :size="16" class="text-teal-500" /> Thông số kỹ thuật
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-400 ml-1"
                  >Tầm bay tối đa (km)</label
                >
                <input
                  v-model="form.maxRange"
                  type="number"
                  placeholder="VD: 10"
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-400 ml-1"
                  >Tốc độ tối đa (km/h)</label
                >
                <input
                  v-model="form.maxSpeed"
                  type="number"
                  placeholder="VD: 60"
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase text-slate-400 ml-1"
                  >Độ cao tối đa (m)</label
                >
                <input
                  v-model="form.maxAltitude"
                  type="number"
                  placeholder="VD: 120"
                  class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>
            </div>
          </section>
          <!-- Gán tọa độ cho mô hình -->
          <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5"
          >
            <div
              class="flex justify-between items-center border-b border-slate-50 pb-4"
            >
              <h3
                class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <MapPin :size="16" class="text-teal-500" /> Gán tọa độ cho mô
                hình
              </h3>
              <button
                @click="addHotspot"
                class="text-[10px] font-black uppercase bg-teal-50 text-teal-700 px-4 py-2 rounded-xl hover:bg-teal-100 transition-colors"
              >
                + Thêm điểm
              </button>
            </div>

            <div
              v-if="form.hotspots.length === 0"
              class="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl"
            >
              <p class="text-sm text-slate-400 italic">
                Chưa có điểm nào. Nhấn nút thêm để bắt đầu chọn tọa độ.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(spot, index) in form.hotspots"
                :key="index"
                class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group transition-all hover:border-teal-200"
              >
                <button
                  @click="removeHotspot(index)"
                  class="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 :size="16" />
                </button>
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="w-6 h-6 bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >{{ index + 1 }}</span
                  >
                  <input
                    v-model="spot.title"
                    placeholder="Tiêu đề điểm..."
                    class="bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-teal-300 w-full"
                  />
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <div
                    class="bg-white p-2 rounded-lg border border-slate-100 text-[10px] text-center font-mono"
                  >
                    <span class="text-slate-400">X:</span>
                    {{ spot.pos.x.toFixed(2) }}
                  </div>
                  <div
                    class="bg-white p-2 rounded-lg border border-slate-100 text-[10px] text-center font-mono"
                  >
                    <span class="text-slate-400">Y:</span>
                    {{ spot.pos.y.toFixed(2) }}
                  </div>
                  <div
                    class="bg-white p-2 rounded-lg border border-slate-100 text-[10px] text-center font-mono"
                  >
                    <span class="text-slate-400">Z:</span>
                    {{ spot.pos.z.toFixed(2) }}
                  </div>
                </div>
                <textarea
                  v-model="spot.desc"
                  placeholder="Mô tả kỹ thuật..."
                  rows="2"
                  class="w-full p-2.5 bg-white border border-slate-100 rounded-xl text-xs outline-none focus:border-teal-300 resize-none"
                ></textarea>
              </div>
            </div>
          </section>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <!-- Ảnh đại diện -->
          <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3
              class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-50 pb-4"
            >
              <ImageIcon :size="16" class="text-teal-500" /> Hình ảnh đại diện
            </h3>
            <div
              class="relative group aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all hover:border-teal-400 hover:bg-teal-50/30"
            >
              <img
                v-if="previews.image"
                :src="previews.image"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-center">
                <div
                  class="p-3 bg-white rounded-xl shadow-sm inline-block text-slate-400 mb-2"
                >
                  <UploadCloud :size="24" />
                </div>
                <p class="text-xs font-bold text-slate-500">
                  Kéo thả hoặc click để tải ảnh
                </p>
              </div>
              <input
                type="file"
                @change="handleFileUpload($event, 'image')"
                class="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
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
                <Layers :size="16" class="text-teal-500" /> Thư viện hình ảnh
              </h3>
              <label
                class="text-[10px] font-black uppercase bg-teal-50 text-teal-700 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-teal-100 transition-colors"
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
                  class="cursor-pointer absolute inset-0 bg-gray-400/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 :size="16" />
                </button>
              </div>
              <div
                v-if="previews.thumbnails.length === 0"
                class="col-span-3 py-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100"
              >
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  Chưa có ảnh thư viện
                </p>
              </div>
            </div>
          </section>
          <!-- Video -->
          <!-- <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3
              class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-50 pb-4"
            >
              <Video :size="16" class="text-teal-500" /> Video giới thiệu
            </h3>

            <div class="space-y-3">
              <div
                class="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center group border-2 border-slate-800"
              >
                <video
                  v-if="previews.video"
                  :src="previews.video"
                  controls
                  class="w-full h-full object-contain"
                ></video>
                <div v-else class="text-center">
                  <div
                    class="p-3 bg-slate-800 rounded-xl inline-block text-slate-500 mb-2"
                  >
                    <Play :size="20" />
                  </div>
                  <p
                    class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                  >
                    Tải lên video giới thiệu
                  </p>
                </div>
                <input
                  type="file"
                  @change="handleFileUpload($event, 'video')"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  accept="video/*"
                />
              </div>
              <p
                class="text-[9px] text-slate-400 text-center uppercase tracking-tight italic"
              >
                Hỗ trợ định dạng MP4, WebM. Tối đa 20MB
              </p>
            </div>
          </section> -->
          <section
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3
              class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-50 pb-4"
            >
              <Box :size="16" class="text-teal-500" /> Mô hình 3D (.GLB)
            </h3>
            <div
              class="h-80 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-slate-800 shadow-inner group"
            >
              <template v-if="previews.model3d">
                <Uav3DViewer
                  ref="uavViewerRef"
                  :admin="true"
                  :modelSrc="previews.model3d"
                  :currentMarkerId="
                    form.hotspots.length > 0 ? form.hotspots.length : 0
                  "
                  @pick-coords="updateLatestHotspot"
                />
                <div
                  class="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none"
                >
                  <div
                    class="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-bold border border-white/10 uppercase tracking-widest"
                  >
                    Preview Mode
                  </div>
                  <label
                    class="bg-white text-slate-900 px-4 py-1.5 rounded-lg text-[10px] font-black cursor-pointer pointer-events-auto hover:bg-teal-400 transition-colors shadow-xl"
                  >
                    Thay đổi model
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
                <div
                  class="p-4 bg-slate-800 rounded-full inline-block mb-3 text-teal-400 shadow-lg"
                >
                  <UploadCloud :size="32" />
                </div>
                <p class="text-white font-bold text-sm">Chưa có mô hình 3D</p>
                <p class="text-slate-500 text-[10px] mt-1">
                  Hỗ trợ định dạng .GLB
                </p>
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
import {
  Info,
  Image as ImageIcon,
  Box,
  MapPin,
  Zap,
  Layers,
  Video,
  Play,
  UploadCloud,
  X,
  Trash2,
  ChevronRight,
} from "lucide-vue-next";
import { useToast } from "vue-toastification";
import api from "@/utils/apis/axios";
// Đừng quên import component 3D của bạn để xem preview
import Uav3DViewer from "@/components/Uav3DViewer.vue";
const toast = useToast();
import { useRoute, useRouter } from "vue-router"; // Thêm router để điều hướng sau khi lưu thành công
const isPickingLocation = ref(false); // Trạng thái đang chọn tọa độ trên bản đồ 3D
const uavViewerRef = ref(null); // Ref để gọi hàm của component con

const route = useRoute();
const router = useRouter();
const droneId = route.params.id; // Lấy ID từ URL
const isEdit = ref(!!droneId); // Kiểm tra xem có phải đang ở chế độ sửa không
// --- LOAD DỮ LIỆU CŨ NẾU LÀ CHẾ ĐỘ SỬA ---
const fetchDroneDetail = async () => {
  if (!isEdit.value) return;

  try {
    const { data } = await api.get(`/drones/${droneId}`);

    // Đổ dữ liệu vào Form
    Object.assign(form, {
      name: data.name,
      category: data.category,
      description: data.description,
      scale: data.scale || 15,
      // Lưu ý: Các file thực tế (image, model3d) sẽ vẫn để null
      // trừ khi người dùng chọn file mới để thay thế
      hotspots:
        typeof data.hotspots === "string"
          ? JSON.parse(data.hotspots)
          : data.hotspots,
    });

    // Hiển thị Preview từ URL của Backend
    const backendUrl = "http://localhost:5000";
    previews.image = data.image ? backendUrl + data.image : null;
    previews.model3d = data.model3d ? backendUrl + data.model3d : null;

    if (data.images) {
      const thumbUrls =
        typeof data.images === "string" ? JSON.parse(data.images) : data.images;
      previews.thumbnails = thumbUrls.map((url) => backendUrl + url);
    }
  } catch (error) {
    toast.error("Không thể lấy thông tin thiết bị!");
  }
};

onMounted(fetchDroneDetail);

const removeHotspot = (index) => {
  // 1. Lấy ID của điểm sắp xóa (thường là index + 1)
  const targetId = form.hotspots[index].id;

  // 2. Gọi hàm xóa bên trong Component 3D
  if (uavViewerRef.value) {
    uavViewerRef.value.removeMarkerById(targetId);
  }

  // 3. Xóa khỏi mảng dữ liệu của Form
  form.hotspots.splice(index, 1);

  // 4. (Tùy chọn) Cập nhật lại ID cho các điểm còn lại để số thứ tự luôn liên tục
  form.hotspots.forEach((spot, idx) => {
    const oldId = spot.id;
    spot.id = idx + 1;
    // Nếu muốn marker trên 3D cũng đổi số theo
    toast.error(`Xóa tọa độ thành công.`);
  });
};
// Hàm khi bấm nút "Thêm điểm"
const addHotspot = () => {
  isPickingLocation.value = true;

  // Tạo một điểm mới với tọa độ tạm thời là 0,0,0
  form.hotspots.push({
    id: form.hotspots.length + 1,
    pos: { x: 0, y: 0, z: 0 },
    title: "",
    desc: "",
  });

  // Thông báo cho người dùng click vào bản đồ 3D để chọn vị trí
  toast.success(" Thêm tọa độ thành công", {
    position: "top-right", // Hiển thị ở giữa trên cùng cho dễ thấy
    timeout: 4000, // Tự tắt sau 4 giây
    closeOnClick: true,
    pauseOnHover: true,
  });
};
// Hàm nhận tọa độ từ Uav3DViewer gửi ra
// Trong AddDroneView.vue
const updateLatestHotspot = (coords) => {
  if (!isPickingLocation.value) return; // Nếu không đang ở trạng thái chọn tọa độ thì bỏ qua
  if (form.hotspots.length === 0) return; // Nếu không có điểm nào trong mảng thì cũng bỏ qua
  // Lấy hotspot cuối cùng vừa được thêm
  if (form.hotspots.length > 0) {
    const lastIndex = form.hotspots.length - 1;
    form.hotspots[lastIndex].pos = {
      x: Number(coords.x),
      y: Number(coords.y),
      z: Number(coords.z),
    };
    console.log("Đã cập nhật tọa độ vào form:", form.hotspots[lastIndex].pos);
  }
};
const form = reactive({
  name: "",
  description: "",
  category: "",
  image: null, // Lưu file thực tế
  model3d: null, // Lưu file thực tế
  scale: 15,
  hotspots: [],
  thumbnails: [], // Lưu File thực tế
  video: null, // Lưu File video thực tế
});

// Chứa link tạm thời để hiển thị Preview
const previews = reactive({
  image: null,
  model3d: null,
  thumbnails: [], // Lưu URL tạm thời cho ảnh thư viện
  video: null, // Lưu URL tạm thời cho video
});
// Hàm xử lý upload nhiều ảnh cùng lúc
const handleMultipleImages = (event) => {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  files.forEach((file) => {
    form.thumbnails.push(file);
    previews.thumbnails.push(URL.createObjectURL(file));
  });

  toast.success(`Đã thêm ${files.length} ảnh vào thư viện!`);
};

// Xóa ảnh thumbnail
const removeThumbnail = (index) => {
  URL.revokeObjectURL(previews.thumbnails[index]);
  form.thumbnails.splice(index, 1);
  previews.thumbnails.splice(index, 1);
  toast.error("Đã xóa ảnh khỏi thư viện.");
};
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
// Reset form
const resetForm = () => {
  // 1. Thu hồi các URL preview để giải phóng bộ nhớ
  if (previews.image) URL.revokeObjectURL(previews.image);
  if (previews.model3d) URL.revokeObjectURL(previews.model3d);
  if (previews.video) URL.revokeObjectURL(previews.video);
  previews.thumbnails.forEach((url) => URL.revokeObjectURL(url));

  // 2. Reset dữ liệu form về mặc định
  Object.assign(form, {
    name: "",
    description: "",
    category: "",
    image: null,
    model3d: null,
    scale: 15,
    hotspots: [],
    thumbnails: [],
    video: null,
  });

  // 3. Reset các đường dẫn preview hiển thị trên giao diện
  Object.assign(previews, {
    image: null,
    model3d: null,
    thumbnails: [],
    video: null,
  });

  // 4. Nếu bạn có dùng ref để reset input file (optional)
  // document.querySelectorAll('input[type="file"]').forEach(input => input.value = "");
};
// Save data
// --- CẬP NHẬT HÀM SAVE ĐỂ HỖ TRỢ CẢ UPDATE ---
const handleSave = async () => {
  try {
    const loadingToast = toast.info("Đang xử lý dữ liệu...", {
      timeout: false,
    });

    // 1. Chỉ Upload file nếu người dùng chọn file mới (form.image/form.model3d không null)
    const uploadIfNew = async (file, currentUrl) => {
      if (file instanceof File) {
        // Nếu là File thực tế thì mới upload
        const fData = new FormData();
        fData.append("file", file);
        const res = await api.post("/courses/upload", fData);
        return res.data.url;
      }
      // Nếu không chọn file mới, giữ nguyên URL cũ (cần cắt bỏ domain backend để lưu vào DB)
      return currentUrl
        ? currentUrl.replace("http://localhost:5000", "")
        : null;
    };

    const [mainImageUrl, modelUrl] = await Promise.all([
      uploadIfNew(form.image, previews.image),
      uploadIfNew(form.model3d, previews.model3d),
    ]);

    // 2. Gom dữ liệu cuối cùng
    const finalData = {
      name: form.name,
      category: form.category,
      description: form.description,
      scale: form.scale,
      image: mainImageUrl,
      model3d: modelUrl,
      images: previews.thumbnails.map((url) =>
        url.replace("http://localhost:5000", ""),
      ), // Logic đơn giản cho thumbnails
      hotspots: form.hotspots,
      stats: { battery: "34 Mins", range: "15 KM", speed: "19 m/s" },
    };

    // 3. Gọi API POST (tạo mới) hoặc PUT (cập nhật)
    if (isEdit.value) {
      await api.put(`/drones/${droneId}`, finalData);
      toast.success("Cập nhật thiết bị thành công!");
    } else {
      await api.post("/drones", finalData);
      toast.success("Thêm mới thiết bị thành công!");
    }

    toast.dismiss(loadingToast);
    router.push("/admin/drones"); // Quay lại trang danh sách
  } catch (error) {
    toast.clear();
    toast.error("Lỗi khi lưu dữ liệu!");
  }
};
</script>

<style scoped>
/* Custom Scrollbar cho đẹp hơn */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
