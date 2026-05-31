<template>
  <div class="min-h-screen bg-gray-100 p-6 font-sans text-gray-800 pb-24">
    <div
      class="flex items-center justify-between bg-white p-4 rounded-t-xl border-b border-gray-200 shadow-sm mb-6"
    >
      <div class="flex items-center gap-4">
        <button
          type="button"
          @click="$router.back()"
          class="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all group shadow-sm cursor-pointer"
          title="Quay lại danh sách"
        >
          <ArrowLeft
            class="w-5 h-5 text-gray-400 group-hover:text-[#1a2b4c] transition-colors"
          />
        </button>

        <h1 class="text-2xl font-bold text-gray-900">
          {{
            isEdit
              ? "Thông tin Drone: " + (form.name || "Đang cập nhật...")
              : "Thêm mới Drone"
          }}
        </h1>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-gray-900 whitespace-nowrap"
            >Danh mục:</span
          >
          <select
            v-model="form.category"
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] bg-white cursor-pointer min-w-[150px]"
          >
            <option value="Quadcopter">Quadcopter</option>
            <option value="Hexacopter">Hexacopter</option>
            <option value="Fixed-wing">Fixed-wing</option>
            <option value="VTOL">VTOL</option>
          </select>
        </div>
        <button
          type="button"
          @click.prevent="handleSave"
          class="px-6 py-2 bg-[#1a2b4c] text-white rounded-lg text-sm font-semibold hover:bg-[#13203a] flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
        >
          {{ isEdit ? "Lưu thay đổi" : "Lưu thiết bị" }}
        </button>
      </div>
    </div>

    <!--  Thông tin Mô hình 3D -->
    <div
      :class="[
        'bg-white rounded-xl shadow-sm border p-6 mb-6 transition-colors',
        errors.model3d
          ? 'border-red-400 ring-4 ring-red-50'
          : 'border-gray-200',
      ]"
    >
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Box :size="20" class="text-[#1a2b4c]" /> Không gian Mô phỏng 3D
          <span class="text-red-500">*</span>
        </h2>
        <label
          @click="clearError('model3d')"
          class="text-sm text-white bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-lg font-bold cursor-pointer transition-colors shadow-sm flex items-center gap-2"
        >
          <UploadCloud :size="16" /> Đổi File (.GLB)
          <input
            type="file"
            @change="handleFileUpload($event, 'model3d')"
            class="hidden"
            accept=".glb"
          />
        </label>
      </div>

      <p v-if="errors.model3d" class="text-[11px] font-bold text-red-500 mb-4">
        {{ errors.model3d }}
      </p>
      <div v-else class="mb-6"></div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8">
          <div
            class="bg-[#1a1a2e] rounded-xl border border-gray-300 relative overflow-hidden h-[500px] flex items-center justify-center group shadow-inner"
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
                class="absolute inset-0 pointer-events-none border-4 border-teal-500/60 animate-pulse z-10"
              ></div>
            </template>
            <div
              v-else
              @click="clearError('model3d')"
              class="text-center w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
            >
              <Box :size="48" class="mx-auto text-gray-400 mb-3" />
              <p class="text-gray-300 font-medium text-base">
                Chưa tải lên mô hình 3D
              </p>
              <p class="text-gray-500 text-sm mt-1">
                Hãy tải lên một file định dạng .glb để bắt đầu
              </p>
              <label
                class="mt-4 text-sm text-gray-900 bg-white hover:bg-gray-200 px-4 py-2 rounded-lg font-bold cursor-pointer transition-colors"
              >
                Tải lên ngay
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

        <div class="lg:col-span-4 flex flex-col h-[500px]">
          <div class="flex justify-between items-center mb-1">
            <h3 class="text-sm font-bold text-gray-900">
              Danh sách Điểm chú thích
            </h3>
            <button
              type="button"
              @click.prevent="addHotspot"
              class="text-xs font-bold text-[#1a2b4c] bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 flex items-center gap-1 transition-colors"
            >
              <Plus :size="14" /> Thêm điểm
            </button>
          </div>

          <p
            v-if="errors.hotspots"
            class="text-[11px] font-bold text-red-500 mb-2"
          >
            {{ errors.hotspots }}
          </p>

          <div
            class="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-2 mt-2"
          >
            <div
              v-if="!form.hotspots || form.hotspots.length === 0"
              class="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 h-full flex flex-col items-center justify-center"
            >
              <MapPin :size="32" class="text-gray-300 mb-3" />
              <p class="text-sm font-medium text-gray-500">Chưa có điểm nào.</p>
              <p class="text-xs text-gray-400 mt-1">
                Bấm "Thêm điểm" để bắt đầu gán tọa độ.
              </p>
            </div>

            <div
              v-for="(spot, index) in form.hotspots"
              :key="spot.id || index"
              :class="[
                'p-4 rounded-xl border transition-all relative group',
                editingIndex === index
                  ? 'border-teal-500 bg-teal-50/40 shadow-md ring-2 ring-teal-500/20'
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
                  @focus="clearError('hotspots')"
                  placeholder="Tên bộ phận (VD: Động cơ)..."
                  :class="[
                    'bg-transparent font-bold text-sm text-gray-900 outline-none border-b w-full pb-1 transition-colors',
                    errors.hotspots && !spot.title.trim()
                      ? 'border-red-400 placeholder-red-300'
                      : 'border-gray-300 focus:border-[#1a2b4c]',
                  ]"
                />
              </div>

              <div
                @click="startEditSpot(index)"
                class="mb-3 cursor-crosshair group-hover:opacity-100 transition-opacity"
                title="Click để chấm lại vị trí"
              >
                <div
                  class="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm divide-x divide-gray-100"
                >
                  <div
                    class="flex items-center flex-1 px-2 py-1.5 bg-gray-50/50 justify-center"
                  >
                    <span class="text-[10px] font-bold text-gray-400 mr-1.5"
                      >X:</span
                    >
                    <span class="text-xs font-mono font-bold text-gray-700">{{
                      spot.pos.x
                    }}</span>
                  </div>
                  <div
                    class="flex items-center flex-1 px-2 py-1.5 bg-gray-50/50 justify-center"
                  >
                    <span class="text-[10px] font-bold text-gray-400 mr-1.5"
                      >Y:</span
                    >
                    <span class="text-xs font-mono font-bold text-gray-700">{{
                      spot.pos.y
                    }}</span>
                  </div>
                  <div
                    class="flex items-center flex-1 px-2 py-1.5 bg-gray-50/50 justify-center"
                  >
                    <span class="text-[10px] font-bold text-gray-400 mr-1.5"
                      >Z:</span
                    >
                    <span class="text-xs font-mono font-bold text-gray-700">{{
                      spot.pos.z
                    }}</span>
                  </div>
                </div>
              </div>

              <textarea
                v-model="spot.desc"
                placeholder="Mô tả chi tiết linh kiện..."
                rows="2"
                class="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a2b4c] resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Thông tin Drone -->
    <div class="flex items-center gap-3 mb-4 mt-8">
      <div class="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
        <FileText :size="20" class="text-[#1a2b4c]" />
      </div>
      <h1 class="text-xl font-bold text-gray-900">
        Thông tin chi tiết về Drone
      </h1>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <div class="xl:col-span-5 flex flex-col gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3
            class="text-base font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2"
          >
            Hình ảnh Thiết bị
          </h3>

          <div class="mb-6">
            <h4 class="text-sm font-bold text-gray-700 mb-2">
              Ảnh đại diện chính <span class="text-red-500">*</span>
            </h4>
            <div
              :class="[
                'border border-dashed rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 h-[200px] relative group transition-colors',
                errors.image
                  ? 'border-red-400'
                  : 'border-gray-300 hover:border-blue-400',
              ]"
            >
              <img
                v-if="previews.image"
                :src="previews.image"
                class="w-full h-full object-contain mb-2"
              />
              <div v-else class="text-center">
                <UploadCloud
                  :size="32"
                  class="mx-auto text-gray-300 mb-2 group-hover:text-gray-500 transition-colors"
                />
                <p class="text-xs text-gray-500 font-medium">
                  Click để thêm ảnh đại diện
                </p>
              </div>
              <label class="absolute inset-0 cursor-pointer">
                <input
                  type="file"
                  @change="handleFileUpload($event, 'image')"
                  class="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <p v-if="errors.image" class="text-xs font-bold text-red-500 mt-1">
              {{ errors.image }}
            </p>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm font-bold text-gray-700">
                Thư viện ảnh phụ (Gallery)
              </h4>
            </div>
            <div class="grid grid-cols-4 gap-3">
              <label
                class="border border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-blue-400 cursor-pointer transition-colors group"
              >
                <span
                  class="text-2xl text-gray-400 group-hover:text-blue-500 transition-colors"
                  >+</span
                >
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
                class="relative aspect-square rounded-lg overflow-hidden group border border-gray-200"
              >
                <img :src="img" class="w-full h-full object-cover" />
                <button
                  type="button"
                  @click.prevent="removeThumbnail(index)"
                  class="absolute inset-0 bg-gray-900/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="xl:col-span-7 flex flex-col gap-6">
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
        >
          <h3
            class="text-base font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2"
          >
            Thông tin Cơ bản
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-900 mb-2">
                Tên thiết bị (Model) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="VD: DJI Mavic 3 Enterprise"
                @focus="clearError('name')"
                :class="[
                  'w-full border rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] transition-shadow',
                  errors.name ? 'border-red-400' : 'border-gray-300',
                ]"
              />
              <p v-if="errors.name" class="text-xs font-bold text-red-500 mt-1">
                {{ errors.name }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-900 mb-2">
                Mô tả tổng quan
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                placeholder="Nhập mô tả chi tiết về khả năng và ứng dụng của thiết bị..."
                class="w-full p-4 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] resize-none transition-shadow"
              ></textarea>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-base font-bold text-gray-900">
                Thông tin cần thiết
              </h3>
              <button
                type="button"
                @click.prevent="addSpec"
                class="text-xs font-bold text-[#1a2b4c] hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus :size="14" /> Thêm mục
              </button>
            </div>

            <p
              v-if="errors.specifications"
              class="text-[11px] font-bold text-red-500 mb-3"
            >
              {{ errors.specifications }}
            </p>

            <div
              class="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-200"
            >
              <div
                v-for="spec in form.specifications"
                :key="spec.id"
                class="flex gap-4 items-start group"
              >
                <div class="flex-1 flex flex-col gap-1.5">
                  <label
                    class="text-[11px] font-bold text-gray-600 uppercase tracking-wide"
                  >
                    Tiêu đề <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="spec.name"
                    type="text"
                    placeholder="VD: Tốc độ tối đa"
                    @focus="clearError('specifications')"
                    :class="[
                      'w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none transition-shadow',
                      errors.specifications && !spec.name.trim()
                        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-300 focus:border-blue-400 shadow-sm',
                    ]"
                  />
                </div>

                <div class="flex-1 flex flex-col gap-1.5">
                  <label
                    class="text-[11px] font-bold text-gray-600 uppercase tracking-wide"
                  >
                    Giá trị <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="spec.value"
                    type="text"
                    placeholder="VD: 21 m/s"
                    @focus="clearError('specifications')"
                    :class="[
                      'w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none transition-shadow',
                      errors.specifications && !spec.value.trim()
                        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-300 focus:border-blue-400 shadow-sm',
                    ]"
                  />
                </div>

                <button
                  type="button"
                  @click.prevent="removeSpec(spec.id)"
                  class="p-2 mt-6 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0 cursor-pointer transition-colors"
                  title="Xóa thông số"
                >
                  <Trash2 :size="18" />
                </button>
              </div>

              <div
                v-if="form.specifications.length === 0"
                class="py-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-white"
              >
                <p class="text-gray-400 text-sm font-medium">
                  Chưa có thông số kỹ thuật nào.
                </p>
              </div>
            </div>
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
  ArrowLeft,
  Zap,
  UploadCloud,
  Trash2,
  Plus,
  Edit3,
  FileText,
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
// HÀM XÓA LỖI KHI CLICK VÀO FORM
const clearError = (field) => {
  if (errors[field]) {
    delete errors[field];
  }
};
// Thông số kỹ thuật
const addSpec = () =>
  form.specifications.push({ id: Date.now(), name: "", value: "" });
const removeSpec = (id) =>
  (form.specifications = form.specifications.filter((s) => s.id !== id));

// Validation
// VALIDATION NÂNG CAO
const validateForm = () => {
  // Xóa các lỗi cũ trước khi check lại
  Object.keys(errors).forEach((key) => delete errors[key]);
  let isValid = true;

  // 1. Kiểm tra Tên thiết bị
  if (!form.name.trim()) {
    errors.name = "Vui lòng nhập tên thiết bị.";
    isValid = false;
  } else if (form.name.length > 100) {
    errors.name = "Tên thiết bị không được vượt quá 100 ký tự.";
    isValid = false;
  }

  // 2. Kiểm tra Ảnh đại diện (Chỉ bắt buộc khi tạo mới)
  if (!isEdit.value && !form.image && !previews.image) {
    errors.image = "Bắt buộc phải có ảnh đại diện.";
    isValid = false;
  }

  // 3. Kiểm tra Thông số kỹ thuật (Nếu có thêm thì không được để trống ô nào)
  if (form.specifications.length > 0) {
    const hasEmptySpecs = form.specifications.some(
      (spec) => !spec.name.trim() || !spec.value.trim(),
    );
    if (hasEmptySpecs) {
      errors.specifications =
        "Vui lòng điền đầy đủ Tên và Giá trị cho các thông số kỹ thuật.";
      isValid = false;
    }
  }

  // 4. Kiểm tra Điểm chú thích 3D (Nếu có chấm điểm thì phải đặt tên linh kiện)
  if (form.hotspots.length > 0) {
    const hasEmptyHotspots = form.hotspots.some((spot) => !spot.title.trim());
    if (hasEmptyHotspots) {
      errors.hotspots =
        "Vui lòng đặt Tên bộ phận cho tất cả các điểm chú thích 3D.";
      isValid = false;
    }
  }

  // Hiển thị thông báo nếu có lỗi
  if (!isValid) {
    toast.error(
      "Vui lòng kiểm tra lại các thông tin còn trống hoặc chưa hợp lệ!",
    );
  }

  return isValid;
};

// ==========================================
// LOGIC HOTSPOTS MÔ PHỎNG 3D
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
  form.hotspots.splice(index, 1);
  // ✨ Assign lại array để trigger watch customHotspots và update 3D viewer
  form.hotspots = [...form.hotspots];
  if (editingIndex.value === index) editingIndex.value = null;
};

const handlePickCoords = (coords) => {
  if (!isPickingLocation.value || form.hotspots.length === 0) return;
  const targetIndex =
    editingIndex.value !== null ? editingIndex.value : form.hotspots.length - 1;

  if (form.hotspots[targetIndex]) {
    // SỬ DỤNG NUMBER VÀ TOFIXED(2) ĐỂ LÀM TRÒN TỌA ĐỘ VÀO DB
    form.hotspots[targetIndex].pos = {
      x: Number(coords.x.toFixed(2)),
      y: Number(coords.y.toFixed(2)),
      z: Number(coords.z.toFixed(2)),
    };
    form.hotspots = [...form.hotspots];
  }
};
// ==========================================

// LOAD DỮ LIỆU
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

// UPLOAD MEDIA
const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;
  if (type === "image" && errors.image) delete errors.image;
  if (type === "model3d") {
    // ✨ THÊM: Xóa hotspots khi đổi file GLB
    form.hotspots = [];
    editingIndex.value = null;
    isPickingLocation.value = false;
  }
  form[type] = file;
  if (previews[type]) URL.revokeObjectURL(previews[type]);
  previews[type] = URL.createObjectURL(file);
  if (type === "model3d") previews.model3d = URL.createObjectURL(file);
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

// SAVE DATA
const handleSave = async () => {
  if (!validateForm()) return;

  try {
    // toast.info("Đang xử lý dữ liệu ...");

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
      specifications: form.specifications,
      scale: form.scale,
      image: mainImageUrl,
      model3d: modelUrl,
      hotspots: form.hotspots, // Tọa độ lưu vào Database ở đây đã được làm tròn
      thumbnail: JSON.stringify(finalThumbnails),
    };

    if (isEdit.value) {
      await api.put(`/drones/${droneId}`, finalData);
      toast.success(" Cập nhật thiết bị thành công!");
    } else {
      await api.post("/drones", finalData);
      toast.success("Hệ thống SkyLink: Đã lưu thiết bị mới!");
    }

    router.push("/admin/drones");
  } catch (error) {
    toast.error("Lỗi hệ thống khi lưu dữ liệu! Vui lòng thử lại.");
  }
};
</script>

<style scoped>
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

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
