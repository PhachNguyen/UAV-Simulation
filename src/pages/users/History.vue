<template>
  <div class="min-h-screen bg-gray-100 p-6 font-sans text-gray-800">
    <div
      class="flex items-center justify-between bg-white p-4 rounded-t-xl border-b border-gray-200"
    >
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold text-gray-900">
          Tên Drone: {{ formData.name }}
        </h1>
        <span
          class="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full"
        >
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          {{ formData.status }}
        </span>
      </div>
      <!-- Danh mục -->
      <div class="flex w-48 items-center gap-2">
        <span class="inline-block text-sm font-bold text-gray-900 mb-2">
          Danh mục
        </span>
        <select
          v-model="formData.category"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] bg-white"
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
          <div
            class="bg-[#eaf3fa] rounded-lg relative overflow-hidden h-[400px] flex items-center justify-center"
          >
            <span class="text-gray-400 font-medium"
              >Khu vực tích hợp Uav3DViewer</span
            >
          </div>

          <div class="mt-6">
            <h3 class="text-base font-bold text-gray-900 mb-3">
              Connected Components
            </h3>
            <ul class="space-y-3">
              <li
                class="flex items-center gap-2 text-sm text-gray-700 font-medium"
              >
                <span class="w-2 h-2 rounded-full bg-green-500"></span> 4x
                Propellers (Healthy)
              </li>
              <li
                class="flex items-center gap-2 text-sm text-gray-700 font-medium"
              >
                <span class="w-2 h-2 rounded-full bg-green-500"></span> 1x
                Gimbal & Camera (Calibrated)
              </li>
              <li
                class="flex items-center gap-2 text-sm text-gray-700 font-medium"
              >
                <span class="w-2 h-2 rounded-full bg-green-500"></span> 1x
                Battery Pack (98% Charge)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="xl:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div class="p-6 space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-bold text-gray-900 mb-3">
                Hình ảnh đại diện
              </h3>
              <div
                class="border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 h-[220px]"
              >
                <img
                  src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=200"
                  alt="Main Drone"
                  class="w-32 h-32 object-contain mix-blend-multiply mb-4"
                />
                <button
                  class="bg-white border border-gray-300 text-gray-700 text-sm font-medium py-1.5 px-4 rounded-lg shadow-sm hover:bg-gray-50"
                >
                  Tải lên hình ảnh chính
                </button>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-bold text-gray-900 mb-3">
                Thư viện ảnh (Gallery)
              </h3>
              <div class="grid grid-cols-3 gap-3">
                <button
                  class="border border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-600 transition-colors"
                >
                  <span class="text-2xl mb-1">+</span> Thêm ảnh
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-bold text-gray-900 mb-3">Mô tả chi tiết</h3>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <textarea
                v-model="formData.description"
                class="w-full h-32 p-4 text-sm text-gray-700 focus:outline-none resize-none bg-gray-50"
                placeholder="Nhập mô tả chi tiết tại đây..."
              ></textarea>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-bold text-gray-900">
                Thông tin cần thiết
              </h3>
            </div>

            <div
              class="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200"
            >
              <div
                v-for="spec in formData.specifications"
                :key="spec.id"
                class="flex gap-3 items-center group"
              >
                <div class="flex-1">
                  <input
                    v-model="spec.title"
                    type="text"
                    placeholder="Tên thông số (VD: Trọng lượng)"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]"
                  />
                </div>
                <div class="flex-1">
                  <input
                    v-model="spec.value"
                    type="text"
                    placeholder="Giá trị (VD: 595g)"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]"
                  />
                </div>
                <button
                  @click="removeSpec(spec.id)"
                  class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  title="Xóa thông số này"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>

              <button
                @click="addSpec"
                class="mt-2 flex items-center gap-2 text-sm font-bold text-[#1a2b4c] hover:text-blue-700 transition-colors"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Thêm thông số mới
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- <div>
              <label class="block text-sm font-bold text-gray-900 mb-2"
                >Thẻ (Cách nhau bởi dấu phẩy)</label
              >
              <input
                v-model="formData.tags"
                type="text"
                placeholder="VD: Professional, 4K, GPS"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]"
              />
            </div> -->
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              class="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              @click="submitForm"
              class="px-6 py-2 bg-[#1a2b4c] text-white rounded-lg text-sm font-semibold hover:bg-[#13203a] transition-colors shadow-sm"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// 1. Khởi tạo State tập trung (Mô phỏng dữ liệu fetch từ BE)
const formData = reactive({
  name: "Mavic Air 2S - Educational Edition",
  status: "Active",
  description:
    "The Mavic Air 2S is an advanced drone featuring a 1-inch CMOS sensor, 5.4K video recording, and MasterShots.",
  tags: "Professional, 4K, Long Range, GPS",
  category: "Quadcopter", // Khớp với ENUM của Database
  specifications: [
    // Bắt buộc phải có id duy nhất để Vue render không bị lỗi
    { id: Date.now(), title: "Trọng lượng cất cánh", value: "595g" },
    { id: Date.now() + 1, title: "Thời gian bay tối đa", value: "31 phút" },
  ],
});

// 2. Hàm xử lý Thông số kỹ thuật
const addSpec = () => {
  formData.specifications.push({
    id: Date.now(), // Tạo ID độc nhất
    title: "",
    value: "",
  });
};

const removeSpec = (idToRemove) => {
  // Lọc bỏ item có id trùng với id cần xóa
  formData.specifications = formData.specifications.filter(
    (spec) => spec.id !== idToRemove,
  );
};

// 3. Hàm Submit dữ liệu
const submitForm = async () => {
  console.log("Dữ liệu chuẩn bị gửi lên Server SkyLink:", formData);
  // Cậu dùng Axios gọi hàm updateDrone API ở đây nhé!
  // await api.put(`/drones/${droneId}`, formData);
  alert(
    "Đã ghi nhận thay đổi! Hãy check Console (F12) để xem cục dữ liệu gửi đi.",
  );
};
</script>

<style scoped>
/* Nút xóa mặc định hơi mờ, khi hover vào cả hàng sẽ rõ lên cho đẹp */
.group:hover button {
  opacity: 1;
}
</style>
