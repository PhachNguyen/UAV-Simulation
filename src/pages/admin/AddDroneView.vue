<template>
  <div class="min-h-screen bg-gray-100 p-6 font-sans text-gray-800 pb-24">
    <div
      class="flex items-center justify-between bg-white p-4 rounded-t-xl border-b border-gray-200 shadow-sm"
    >
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold text-gray-900">
          {{
            isEdit
              ? "Cấu hình UAV: " + (form.name || "Đang cập nhật...")
              : "Thêm mới UAV"
          }}
        </h1>
        <span
          class="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full"
        >
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          SkyLink System
        </span>
      </div>

      <div class="flex w-64 items-center gap-3">
        <span
          class="inline-block text-sm font-bold text-gray-900 whitespace-nowrap"
          >Danh mục</span
        >
        <select
          v-model="form.category"
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] bg-white font-medium cursor-pointer"
        >
          <option value="Quadcopter">Quadcopter</option>
          <option value="Hexacopter">Hexacopter</option>
          <option value="Fixed-wing">Fixed-wing</option>
          <option value="VTOL">VTOL</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
      <div class="xl:col-span-5 flex flex-col gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3
            class="text-sm font-bold text-gray-900 mb-3 flex justify-between items-center"
          >
            Mô hình 3D (.GLB)
            <label
              class="text-xs text-[#1a2b4c] font-bold cursor-pointer hover:underline flex items-center gap-1"
            >
              Đổi File 3D
              <input
                type="file"
                @change="handleFileUpload($event, 'model3d')"
                class="hidden"
                accept=".glb"
              />
            </label>
          </h3>
          <div
            class="bg-[#1a1a2e] rounded-lg relative overflow-hidden h-[400px] flex items-center justify-center group"
          >
            <template v-if="previews.model3d">
              <Uav3DViewer
                ref="uavViewerRef"
                :admin="true"
                :modelSrc="previews.model3d"
                :customHotspots="displayHotspots"
                :currentMarkerId="null"
                @pick-coords="handlePickCoords"
              />

              <div
                v-if="isPickingLocation"
                class="absolute inset-0 pointer-events-none border-4 border-teal-500/50 animate-pulse z-10"
              ></div>
            </template>
            <div v-else class="text-center">
              <Box :size="40" class="mx-auto text-gray-400 mb-3" />
              <p class="text-gray-300 font-medium text-sm">
                Chưa có dữ liệu 3D
              </p>
              <label
                class="mt-3 inline-block bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-100"
              >
                Tải lên File .GLB
                <input
                  type="file"
                  @change="handleFileUpload($event, 'model3d')"
                  class="hidden"
                  accept=".glb"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-sm font-bold text-gray-900">Điểm chú thích 3D</h3>
            <button
              type="button"
              @click.prevent="addHotspot"
              class="text-xs font-bold text-[#1a2b4c] bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Plus :size="14" /> Thêm điểm
            </button>
          </div>

          <div
            v-if="!form.hotspots || form.hotspots.length === 0"
            class="py-8 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50"
          >
            <MapPin :size="24" class="mx-auto text-gray-300 mb-2" />
            <p class="text-xs font-medium text-gray-500">
              Chưa có điểm chú thích nào.
            </p>
          </div>

          <div
            v-else
            class="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
          >
            <div
              v-for="(spot, index) in form.hotspots"
              :key="spot.id || index"
              :class="[
                'p-4 rounded-xl border transition-all relative group',
                editingIndex === index
                  ? 'border-teal-500 bg-teal-50/30 ring-2 ring-teal-500/20 shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300',
              ]"
            >
              <div class="absolute top-3 right-3 flex gap-1.5">
                <button
                  type="button"
                  v-if="editingIndex === index"
                  @click.prevent="finishEditing"
                  class="p-1.5 bg-teal-500 text-white rounded-lg shadow-sm hover:bg-teal-600 transition-all"
                >
                  <Check :size="14" />
                </button>
                <button
                  type="button"
                  v-else
                  @click.prevent="startEditSpot(index)"
                  class="p-1.5 text-gray-400 hover:text-blue-600 bg-white border border-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Edit3 :size="14" />
                </button>
                <button
                  type="button"
                  @click.prevent="removeHotspot(index)"
                  class="p-1.5 text-gray-400 hover:text-red-500 bg-white border border-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 :size="14" />
                </button>
              </div>

              <div class="flex items-center gap-3 w-[85%] mb-3">
                <span
                  class="w-6 h-6 shrink-0 bg-[#1a2b4c] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                  >{{ index + 1 }}</span
                >
                <input
                  v-model="spot.title"
                  placeholder="Tên bộ phận (VD: Động cơ)..."
                  class="bg-transparent font-bold text-sm text-gray-900 outline-none border-b border-gray-300 focus:border-[#1a2b4c] w-full pb-1"
                />
              </div>

              <div
                @click="startEditSpot(index)"
                class="grid grid-cols-3 gap-2 pl-9 mb-3 cursor-crosshair"
                title="Sửa vị trí"
              >
                <div
                  class="bg-white p-2 rounded-lg border border-gray-200 flex items-center gap-2 shadow-sm"
                >
                  <span class="text-[10px] font-bold text-gray-400">X:</span>
                  <input
                    type="number"
                    v-model="spot.pos.x"
                    step="0.01"
                    class="w-full text-xs font-mono font-bold text-gray-700 outline-none bg-transparent min-w-0 pointer-events-none"
                  />
                </div>
                <div
                  class="bg-white p-2 rounded-lg border border-gray-200 flex items-center gap-2 shadow-sm"
                >
                  <span class="text-[10px] font-bold text-gray-400">Y:</span>
                  <input
                    type="number"
                    v-model="spot.pos.y"
                    step="0.01"
                    class="w-full text-xs font-mono font-bold text-gray-700 outline-none bg-transparent min-w-0 pointer-events-none"
                  />
                </div>
                <div
                  class="bg-white p-2 rounded-lg border border-gray-200 flex items-center gap-2 shadow-sm"
                >
                  <span class="text-[10px] font-bold text-gray-400">Z:</span>
                  <input
                    type="number"
                    v-model="spot.pos.z"
                    step="0.01"
                    class="w-full text-xs font-mono font-bold text-gray-700 outline-none bg-transparent min-w-0 pointer-events-none"
                  />
                </div>
              </div>

              <textarea
                v-model="spot.desc"
                placeholder="Mô tả chi tiết..."
                rows="2"
                class="w-full ml-9 w-[calc(100%-36px)] p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a2b4c] resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="xl:col-span-7 flex flex-col gap-6">
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-bold text-gray-900 mb-3">
                Hình ảnh đại diện <span class="text-red-500">*</span>
              </h3>
              <div
                :class="[
                  'border border-dashed rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 h-[220px] relative group',
                  errors.image ? 'border-red-400' : 'border-gray-300',
                ]"
              >
                <img
                  v-if="previews.image"
                  :src="previews.image"
                  class="w-full h-full object-contain mb-4"
                />
                <div v-else class="text-center">
                  <UploadCloud
                    :size="32"
                    class="mx-auto text-gray-300 mb-2 group-hover:text-gray-500"
                  />
                  <p class="text-xs text-gray-500 font-medium">Chưa có ảnh</p>
                </div>
                <label
                  class="absolute bottom-4 bg-white border border-gray-300 text-gray-700 text-sm font-medium py-1.5 px-4 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Tải lên hình chính
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'image')"
                    class="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              <p
                v-if="errors.image"
                class="text-xs font-bold text-red-500 mt-1"
              >
                {{ errors.image }}
              </p>
            </div>

            <div>
              <h3 class="text-sm font-bold text-gray-900 mb-3">
                Thư viện ảnh (Gallery)
              </h3>
              <div
                class="grid grid-cols-3 gap-3 h-[220px] content-start auto-rows-max overflow-y-auto pr-2 custom-scrollbar"
              >
                <label
                  class="border border-dashed border-gray-300 rounded-lg aspect-square min-h-[100px] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-600 cursor-pointer transition-colors"
                >
                  <span class="text-2xl mb-1">+</span> Thêm ảnh
                  <input
                    type="file"
                    multiple
                    @change="handleMultipleImages"
                    class="hidden"
                    accept="image/*"
                  />
                </label>

                <div
                  v-for="(img, index) in previews.thumbnails"
                  :key="index"
                  class="relative aspect-square min-h-[100px] rounded-lg overflow-hidden group border border-gray-200"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    @click.prevent="removeThumbnail(index)"
                    class="absolute inset-0 bg-gray-900/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <Trash2 :size="16" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-900 mb-2"
                >Tên thiết bị <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.name"
                type="text"
                placeholder="VD: AeroX Pro Photography"
                :class="[
                  'w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] bg-gray-50',
                  errors.name ? 'border-red-400' : 'border-gray-300',
                ]"
              />
              <p v-if="errors.name" class="text-xs font-bold text-red-500 mt-1">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-900 mb-2"
                >Mô tả chi tiết</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Nhập mô tả chi tiết tại đây..."
                class="w-full p-4 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] resize-none bg-gray-50"
              ></textarea>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-bold text-gray-900">
                Thông tin cần thiết
              </h3>
              <button
                type="button"
                @click.prevent="addSpec"
                class="text-xs font-bold text-[#1a2b4c] hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus :size="14" /> Thêm thông số mới
              </button>
            </div>

            <div
              class="space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-200"
            >
              <div
                v-for="spec in form.specifications"
                :key="spec.id"
                class="flex gap-3 items-center group"
              >
                <div class="flex-1">
                  <input
                    v-model="spec.title"
                    type="text"
                    placeholder="Tên thông số (VD: Trọng lượng)"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] bg-white"
                  />
                </div>
                <div class="flex-1">
                  <input
                    v-model="spec.value"
                    type="text"
                    placeholder="Giá trị (VD: 595g)"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] bg-white"
                  />
                </div>
                <button
                  type="button"
                  @click.prevent="removeSpec(spec.id)"
                  class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  <Trash2 :size="18" />
                </button>
              </div>
              <div
                v-if="form.specifications.length === 0"
                class="py-4 text-center text-gray-400 text-xs italic"
              >
                Chưa có thông số nào được thêm.
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              @click="$router.back()"
              class="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              @click.prevent="handleSave"
              class="px-8 py-2 bg-[#1a2b4c] text-white rounded-lg text-sm font-semibold hover:bg-[#13203a] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Zap :size="16" class="text-blue-300" />
              {{ isEdit ? "Lưu thay đổi" : "Tạo thiết bị" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "@/utils/apis/axios";
import Uav3DViewer from "@/components/Uav3DViewer.vue";
import {
  Box,
  MapPin,
  Zap,
  UploadCloud,
  Trash2,
  Plus,
  Edit3,
  Check,
} from "lucide-vue-next";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const droneId = route.params.id;
const isEdit = ref(!!droneId);

const uavViewerRef = ref(null);

const form = reactive({
  name: "",
  category: "Quadcopter",
  description: "",
  specifications: [],
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

// Quản lý Thông số kỹ thuật động
const addSpec = () => {
  form.specifications.push({ id: Date.now(), title: "", value: "" });
};
const removeSpec = (id) => {
  form.specifications = form.specifications.filter((s) => s.id !== id);
};

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
  if (!isValid) toast.error("Vui lòng kiểm tra lại thông tin bị lỗi!");
  return isValid;
};

// ==========================================
// TÍCH HỢP LOGIC HOTSPOTS TỪ LESSON EDITOR
// ==========================================
const isPickingLocation = ref(false);
const editingIndex = ref(null);

const displayHotspots = computed(() => {
  if (!form.hotspots) return [];
  return form.hotspots.map((spot, index) => ({
    ...spot,
    isActive:
      index === editingIndex.value ||
      (editingIndex.value === null &&
        index === form.hotspots.length - 1 &&
        isPickingLocation.value),
  }));
});

const addHotspot = () => {
  if (!Array.isArray(form.hotspots)) form.hotspots = [];
  form.hotspots.push({
    id: Date.now(),
    pos: { x: 0, y: 0, z: 0 },
    title: "",
    desc: "",
  });

  editingIndex.value = form.hotspots.length - 1;
  isPickingLocation.value = true;
  toast.success("Bấm vào mô hình 3D để gán tọa độ");
};

const startEditSpot = (index) => {
  editingIndex.value = index;
  isPickingLocation.value = true;
  // Xoay camera về phía điểm linh kiện
  if (
    uavViewerRef.value &&
    typeof uavViewerRef.value.flyToSpot === "function"
  ) {
    uavViewerRef.value.flyToSpot(form.hotspots[index]);
  }
};

const finishEditing = () => {
  editingIndex.value = null;
  isPickingLocation.value = false;
};

const removeHotspot = (index) => {
  if (
    uavViewerRef.value &&
    typeof uavViewerRef.value.removeMarkerById === "function"
  ) {
    uavViewerRef.value.removeMarkerById(form.hotspots[index].id);
  }
  form.hotspots.splice(index, 1);
  if (editingIndex.value === index) editingIndex.value = null;
};

const handlePickCoords = (coords) => {
  if (!isPickingLocation.value || form.hotspots.length === 0) return;
  const targetIndex =
    editingIndex.value !== null ? editingIndex.value : form.hotspots.length - 1;

  if (form.hotspots[targetIndex]) {
    // SỬ DỤNG .toFixed(2) VÀ BỌC BỞI Number() TẠI ĐÂY
    form.hotspots[targetIndex].pos = {
      x: Number(coords.x.toFixed(2)),
      y: Number(coords.y.toFixed(2)),
      z: Number(coords.z.toFixed(2)),
    };

    // Ép render lại mảng để UI 3D cập nhật marker ngay lập tức
    form.hotspots = [...form.hotspots];
  }
};
// ==========================================

// LOAD DỮ LIỆU CŨ
const fetchDroneDetail = async () => {
  if (!isEdit.value) return;
  try {
    const { data } = await api.get(`/drones/${droneId}`);

    let rawHotspots = [];
    try {
      rawHotspots =
        typeof data.hotspots === "string"
          ? JSON.parse(data.hotspots)
          : data.hotspots || [];
      if (!Array.isArray(rawHotspots)) rawHotspots = [];
    } catch (e) {
      rawHotspots = [];
    }

    const formattedHotspots = rawHotspots.map((spot) => {
      let pos = { x: 0, y: 0, z: 0 };
      if (spot.pos && typeof spot.pos === "object") {
        pos = {
          x: Number(spot.pos.x) || 0,
          y: Number(spot.pos.y) || 0,
          z: Number(spot.pos.z) || 0,
        };
      } else if (spot.position && typeof spot.position === "string") {
        const coords = spot.position.split(" ");
        pos = {
          x: Number(coords[0]) || 0,
          y: Number(coords[1]) || 0,
          z: Number(coords[2]) || 0,
        };
      }
      return {
        ...spot,
        title: spot.title || "",
        desc: spot.desc || "",
        pos: pos,
      };
    });

    let safeSpecs = [];
    try {
      safeSpecs = data.specifications
        ? typeof data.specifications === "string"
          ? JSON.parse(data.specifications)
          : data.specifications
        : [];
      if (!Array.isArray(safeSpecs)) safeSpecs = [];
    } catch (e) {
      safeSpecs = [];
    }

    Object.assign(form, {
      name: data.name,
      category: data.category,
      description: data.description,
      specifications: safeSpecs,
      scale: data.scale || 0.15,
      hotspots: formattedHotspots,
    });

    const backendUrl = "http://localhost:5000";
    previews.image = data.image ? backendUrl + data.image : null;
    previews.model3d = data.model3d ? backendUrl + data.model3d : null;

    let thumbList = [];
    try {
      const thumbData = data.thumbnail || data.thumbnails || [];
      thumbList =
        typeof thumbData === "string" ? JSON.parse(thumbData) : thumbData;
      if (!Array.isArray(thumbList)) thumbList = [];
    } catch (e) {}

    previews.thumbnails = thumbList.map((url) => backendUrl + url);
    form.thumbnails = [...thumbList];
  } catch (error) {
    toast.error("Không thể đồng bộ dữ liệu UAV!");
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

  // Sửa lỗi: Đổi link modelSrc để nó tự render
  if (type === "model3d") {
    previews.model3d = URL.createObjectURL(file);
  }
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

// LƯU LÊN BACKEND
const handleSave = async () => {
  if (!validateForm()) return;

  try {
    toast.info("Đang xử lý dữ liệu...");

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

    const [mainImageUrl, modelUrl] = await Promise.all([
      uploadIfNew(form.image, previews.image),
      uploadIfNew(form.model3d, previews.model3d),
    ]);

    let finalThumbnails = [];
    const newFilesToUpload = [];

    for (const item of form.thumbnails) {
      if (item instanceof File) {
        newFilesToUpload.push(item);
      } else if (typeof item === "string") {
        finalThumbnails.push(item.replace("http://localhost:5000", ""));
      }
    }

    if (newFilesToUpload.length > 0) {
      const multiFormData = new FormData();
      newFilesToUpload.forEach((f) => multiFormData.append("files", f));
      const multiRes = await api.post("/upload-multiple", multiFormData);
      if (multiRes.data && multiRes.data.urls) {
        finalThumbnails = [...finalThumbnails, ...multiRes.data.urls];
      }
    }

    const finalData = {
      name: form.name,
      category: form.category,
      description: form.description,
      specifications: JSON.stringify(form.specifications),
      scale: form.scale,
      image: mainImageUrl,
      model3d: modelUrl,
      hotspots: JSON.stringify(form.hotspots),
      thumbnail: JSON.stringify(finalThumbnails),
    };

    if (isEdit.value) {
      await api.put(`/drones/${droneId}`, finalData);
      toast.success("Hệ thống SkyLink: Cập nhật UAV thành công!");
    } else {
      await api.post("/drones", finalData);
      toast.success("Hệ thống SkyLink: Thêm mới UAV thành công!");
    }

    router.push("/admin/drones");
  } catch (error) {
    toast.error("Lỗi hệ thống khi lưu dữ liệu! Vui lòng thử lại.");
  }
};
</script>

<style scoped>
/* Tuỳ chỉnh thanh scroll nhẹ nhàng */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #94a3b8;
}

/* Ẩn mũi tên của input number cho gọn */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
