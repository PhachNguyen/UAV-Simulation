<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-20">
    <nav
      class="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-2 text-sm text-gray-500"
    >
      <router-link to="/" class="hover:text-black transition">Home</router-link>
      <span>/</span>
      <router-link to="/store" class="hover:text-black transition"
        >Store</router-link
      >
      <span>/</span>
      <span class="text-gray-900 font-medium">{{ product.name }}</span>
    </nav>

    <main
      class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4"
    >
      <section
        class="relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm group"
      >
        <div class="aspect-square flex items-center justify-center p-[20px]">
          <img
            :src="selectedImage"
            :alt="product.name"
            class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 border-4 border-gray-100 rounded-xl"
          />
        </div>

        <button
          @click="prevImage"
          class="cursor-pointer absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          @click="nextImage"
          class="cursor-pointer absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <!-- Thumbail -->
        <div
          class="flex justify-start gap-4 mt-6"
          style="margin: 12px 0px 12px 12px"
        >
          <div
            v-for="(img, index) in product.images"
            :key="index"
            @click="currentImage = index"
            :class="[
              'w-20 h-20 rounded-xl border-2 cursor-pointer overflow-hidden transition-all p-2 bg-white',
              selectedImage === img
                ? 'border-blue-500 shadow-md'
                : 'border-gray-100 hover:border-gray-300',
            ]"
          >
            <img :src="img" class="w-full h-full object-contain" />
          </div>
        </div>
      </section>

      <section class="flex flex-col">
        <h1 class="text-4xl font-bold text-gray-900 leading-tight mb-4">
          {{ product.name }} ({{ selectedVersion.controller }})
        </h1>

        <p
          class="text-gray-600 leading-relaxed mb-6 font-light text-lg"
          style="margin-bottom: 12px"
        >
          {{ product.description }}
        </p>
        <!-- Tính năng nổi bật -->
        <div class="mb-8" style="margin-bottom: 12px">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            Tính năng nổi bật
          </h3>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Thiết kế hiện đại, sang trọng</li>
            <li>Chức năng đa dạng, tiện lợi</li>
            <li>Chất lượng cao, bền bỉ</li>
          </ul>
        </div>
        <hr class="border-gray-100 mb-8" />

        <div class="mb-10">
          <h3
            class="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4"
          >
            Select Version
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              v-for="(version, index) in product.versions"
              :key="index"
              @click="selectedVersionIndex = index"
              :class="[
                'cursor-pointer border-2 p-4 rounded-xl transition-all duration-300 flex flex-col items-center text-center space-y-3',
                selectedVersionIndex === index
                  ? 'border-blue-500 bg-blue-50/30'
                  : 'border-gray-100 bg-white hover:border-gray-300',
              ]"
            >
              <img
                :src="product.image"
                class="w-12 h-12 object-contain opacity-80"
              />
              <div>
                <p
                  class="text-[11px] font-bold text-gray-800 leading-tight mb-1"
                >
                  {{ version.title }}
                </p>
                <p class="text-[10px] text-orange-500 font-bold uppercase">
                  Liên hệ
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-center space-x-4 mb-8"
        >
          <div
            class="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <p class="text-sm text-gray-600 font-medium">
            Technical support 24/7
          </p>
        </div>
        <div
          class="cursor-pointer text-xl font-black text-white mb-8 bg-blue-500 p-4 rounded-xl text-center select-none hover:bg-blue-600 transition-colors duration-300"
        >
          Liên hệ người bán
        </div>
        <!-- Button mua sản phẩm -->
        <!-- <div class="flex space-x-4">
          <button
            @click="goToSimulation"
            class="cursor-pointer flex-1 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition shadow-lg shadow-black/10"
          >
            Mô phỏng sản phẩm
          </button>
          <button
            class="w-16 h-14 flex items-center justify-center border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        </div> -->
      </section>
    </main>
    <section class="mx-auto px-6 mt-16">
      <div
        class="flex justify-start gap-[30px] items-center space-x-12 border-b border-gray-100 mb-10"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'cursor-pointer flex items-center space-x-2 pb-4 text-sm font-bold transition-all relative',
            activeTab === tab.id
              ? 'text-blue-600'
              : 'text-gray-400 hover:text-gray-600',
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          <span>{{ tab.name }}</span>
          <div
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
          ></div>
        </button>
      </div>

      <div
        class="bg-white rounded-3xl border border-gray-100 p-8 md:p-[18px] shadow-sm"
      >
        <div v-if="activeTab === 'description'" class="animate-fadeIn">
          <h2
            class="text-3xl font-bold text-blue-600 mb-6 text-center"
            style="margin-bottom: 12px"
          >
            Thiết kế sang trọng và tính năng đột phá của {{ product.name }}
          </h2>

          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            {{ product.name }} có thiết kế có thể gập lại cân bằng giữa tính di
            động và độ bền. Chỉ nặng hơn 1 kg, cấu trúc khí động học của nó đảm
            bảo chuyến bay ổn định ngay cả khi có gió mạnh. Khi gập lại, nó đủ
            nhỏ gọn để nhét vào ba lô, trong khi bộ điều khiển từ xa DJI RC 2
            với màn hình tích hợp mang lại trải nghiệm điều khiển trực quan và
            thuận tiện hơn trong mọi môi trường.
          </p>

          <div class="rounded-3xl overflow-hidden flex justify-center">
            <img
              :src="product.image"
              alt="Mavic 4 Pro"
              class="max-w-4xl max-h-[500px] object-cover mx-auto"
            />
          </div>
          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            Máy bay không người lái được trang bị hệ thống ba camera mạnh mẽ.
            Camera chính của Hasselblad sử dụng cảm biến 4/3 CMOS 100MP với khẩu
            độ có thể điều chỉnh từ f/2.0 đến f/11, chụp được những bức ảnh có
            độ chi tiết cao với dải động rộng. Camera tele tầm trung có cảm biến
            1/1.3" 48MP với tiêu cự tương đương 70 mm, lý tưởng để chụp khung
            hình và chân dung tầm trung. Camera tele đi kèm cảm biến 1/1.5" 50MP
            ở tiêu cự 166 mm, cho phép chụp ảnh ở khoảng cách xa với độ chi tiết
            tuyệt vời. Tất cả các máy ảnh đều hỗ trợ công nghệ Dual Native ISO
            Fusion, tối ưu hóa hiệu suất chụp thiếu sáng.
          </p>
          <div class="rounded-3xl overflow-hidden flex justify-center">
            <img
              :src="product.images[2]"
              alt="Mavic 4 Pro"
              class="max-w-4xl max-h-[500px] object-cover mx-auto"
            />
          </div>
          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            {{ product.name }} hỗ trợ quay video HDR ở 6K ở tốc độ 60 khung hình
            / giây với camera chính và lên tới 4K ở tốc độ 120 khung hình / giây
            để có những bức ảnh chuyển động chậm mượt mà. Cả máy ảnh tele và
            tele trung bình đều ghi ở 4K/60fps HDR, đảm bảo chất lượng nhất quán
            trên toàn hệ thống. Nó hỗ trợ quay video 10 bit và các cấu hình màu
            nâng cao như D-Log, D-Log M và HLG, mang lại sự linh hoạt cao trong
            khâu hậu kỳ.
          </p>
          <video
            controls
            class="w-full rounded-2xl"
            style="margin-bottom: 16px"
          >
            <source :src="product.video" type="video/mp4" />
            Trình duyệt không hỗ trợ video
          </video>
          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            {{ product.name }} hỗ trợ quay video HDR ở 6K ở tốc độ 60 khung hình
            / giây với camera chính và lên tới 4K ở tốc độ 120 khung hình / giây
            để có những bức ảnh chuyển động chậm mượt mà. Cả máy ảnh tele và
            tele trung bình đều ghi ở 4K/60fps HDR, đảm bảo chất lượng nhất quán
            trên toàn hệ thống. Nó hỗ trợ quay video 10 bit và các cấu hình màu
            nâng cao như D-Log, D-Log M và HLG, mang lại sự linh hoạt cao trong
            khâu hậu kỳ. Máy bay không người lái được trang bị hệ thống ba
            camera mạnh mẽ. Camera chính của Hasselblad sử dụng cảm biến 4/3
            CMOS 100MP với khẩu độ có thể điều chỉnh từ f/2.0 đến f/11, chụp
            được những bức ảnh có độ chi tiết cao với dải động rộng. Camera tele
            tầm trung có cảm biến 1/1.3" 48MP với tiêu cự tương đương 70 mm, lý
            tưởng để chụp khung hình và chân dung tầm trung. Camera tele đi kèm
            cảm biến 1/1.5" 50MP ở tiêu cự 166 mm, cho phép chụp ảnh ở khoảng
            cách xa với độ chi tiết tuyệt vời. Tất cả các máy ảnh đều hỗ trợ
            công nghệ Dual Native ISO Fusion, tối ưu hóa hiệu suất chụp thiếu
            sáng.
          </p>
          <video
            controls
            class="w-full rounded-2xl"
            style="margin-bottom: 16px"
          >
            <source :src="product.intro[1]" type="video/mp4" />
            Trình duyệt không hỗ trợ video
          </video>
          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            {{ product.name }} hỗ trợ quay video HDR ở 6K ở tốc độ 60 khung hình
            / giây với camera chính và lên tới 4K ở tốc độ 120 khung hình / giây
            để có những bức ảnh chuyển động chậm mượt mà. Cả máy ảnh tele và
            tele trung bình đều ghi ở 4K/60fps HDR, đảm bảo chất lượng nhất quán
            trên toàn hệ thống. Nó hỗ trợ quay video 10 bit và các cấu hình màu
            nâng cao như D-Log, D-Log M và HLG, mang lại sự linh hoạt cao trong
            khâu hậu kỳ. Máy bay không người lái được trang bị hệ thống ba
            {{ product.name }} có thiết kế có thể gập lại cân bằng giữa tính di
            động và độ bền. Chỉ nặng hơn 1 kg, cấu trúc khí động học của nó đảm
            bảo chuyến bay ổn định ngay cả khi có gió mạnh. Khi gập lại, nó đủ
            nhỏ gọn để nhét vào ba lô, trong khi bộ điều khiển từ xa DJI RC 2
            với
          </p>
        </div>

        <div
          v-if="activeTab === 'specification'"
          class="animate-fadeIn mx-auto py-[12px] px-6"
        >
          <div
            v-for="(groupContent, groupName) in productSpecs"
            :key="groupName"
            class="mb-12"
          >
            <h3
              class="text-xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4"
            >
              {{ groupName }}
            </h3>

            <div class="grid grid-cols-1 gap-y-0 border-t border-gray-100">
              <div
                v-for="(value, label) in groupContent"
                :key="label"
                class="flex flex-col md:flex-row py-[12px] border-b border-gray-50 items-start hover:bg-gray-50 transition-colors px-4"
              >
                <div class="w-full md:w-1/3 mb-1 md:mb-0">
                  <span
                    class="text-gray-500 font-semibold text-sm uppercase tracking-wider"
                    >{{ label }}</span
                  >
                </div>
                <div class="w-full md:w-2/3">
                  <span
                    class="text-gray-800 text-sm md:text-base leading-relaxed block text-justify"
                  >
                    {{ value }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'simulation'" class="animate-fadeIn">
          <div class="mx-auto px-4">
            <div class="mb-[20px] text-center" style="margin-bottom: 20px">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                Tương tác 3D với {{ product.name }}
              </h2>
              <p class="text-gray-500 text-sm">
                Tương tác trực tiếp với mô hình để khám phá các linh kiện kỹ
                thuật
              </p>
            </div>

            <Uav3DViewer />

            <div
              class="mt-6 flex justify-center gap-8 text-xs text-gray-400 font-medium uppercase tracking-widest"
              style="margin-top: 12px"
            >
              <span class="flex items-center gap-2">
                <span
                  class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                ></span>
                Click Hotspot để xem chi tiết
              </span>
              <span>•</span>
              <span>Chuột trái để xoay</span>
              <span>•</span>
              <span>Cuộn chuột để Zoom</span>
            </div>
            <div
              class="mt-6 text-center"
              style="margin-top: 12px; font-size: 11px; color: #888"
            >
              Hình ảnh mô phỏng chỉ mang tính chất minh họa, không phản ánh
              chính xác thiết kế thực tế của sản phẩm.
            </div>
            <!-- Thông tin linh kiện -->
            <div
              class="mt-8 bg-gray-50 border border-gray-100 rounded-xl p-6"
              style="margin-top: 32px"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">
                Thông tin linh kiện
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Khi bạn click vào các hotspot trên mô hình 3D, thông tin chi
                tiết về linh kiện sẽ hiển thị ở đây. Bạn có thể tìm hiểu về chức
                năng, vị trí và cách hoạt động của từng bộ phận trong sản phẩm.
              </p>
            </div>
            <div v-for="hotspot in product.hotspots" :key="hotspot.id">
              <!-- Hotspot info content -->
              <div
                class="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 bg-white border border-gray-100 rounded-xl p-5 shadow-sm items-start"
              >
                <div class="row-span-2 flex items-center justify-center">
                  <div
                    class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-black shadow-lg shadow-blue-200"
                  >
                    {{ hotspot.id }}
                  </div>
                </div>

                <div class="flex items-center">
                  <span
                    class="font-black text-gray-900 uppercase tracking-wider text-sm"
                  >
                    {{ hotspot.title }}
                  </span>
                  <span
                    class="ml-3 px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded uppercase"
                  >
                    Active
                  </span>
                </div>

                <div class="col-start-2">
                  <p
                    class="text-gray-600 text-sm leading-relaxed text-justify border-l-2 border-gray-100 pl-4 italic"
                  >
                    {{ hotspot.desc }}
                  </p>
                </div>
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </section>
    <!-- Thông tin liên hệ -->
    <section class="bg-white border-t border-gray-100">
      <div class="mx-auto px-6">
        <div
          class="text-3xl font-bold text-gray-900 mb-6"
          style="margin-bottom: 96px"
        >
          Thông tin liên hệ
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            class="flex flex-col items-center text-center group cursor-pointer"
          >
            <div
              class="mb-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300"
            >
              <ShoppingBag :size="48" :stroke-width="1.25" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">Mua ở đâu</h3>
            <router-link
              to="/"
              class="flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-all"
            >
              Xem thêm
              <ChevronRight :size="16" class="ml-1 mt-0.5" />
            </router-link>
          </div>

          <div
            class="flex flex-col items-center text-center group cursor-pointer border-x border-gray-50 md:px-12"
          >
            <div
              class="mb-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300"
            >
              <Headset :size="48" :stroke-width="1.25" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">
              Hỗ trợ kỹ thuật
            </h3>
            <router-link
              to="/support"
              class="flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-all"
            >
              Xem thêm
              <ChevronRight :size="16" class="ml-1 mt-0.5" />
            </router-link>
          </div>

          <div
            class="flex flex-col items-center text-center group cursor-pointer"
          >
            <div
              class="mb-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300"
            >
              <MapPin :size="48" :stroke-width="1.25" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">Bay an toàn</h3>
            <router-link
              to="/no-fly-zones"
              class="flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-all"
            >
              Xem thêm
              <ChevronRight :size="16" class="ml-1 mt-0.5" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Uav3DViewer from "@/components/Uav3DViewer.vue";
import { useRoute, useRouter } from "vue-router";
import { uavList } from "@/data/uavData";
import { ShoppingBag, Headset, MapPin, ChevronRight } from "lucide-vue-next";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  product: Object,
});
const selectedVersionIndex = ref(0);
const goToSimulation = () => {
  const idFromUrl = route.params.id;
  // Chuyển hướng tới trang mô phỏng kèm theo ID sản phẩm
  router.push({
    name: "Simulation",
    params: { id: idFromUrl || 1 },
  });
};

const product = computed(() => {
  // Lấy ID từ URL (ví dụ: /product/1 thì id là "1")
  const idFromUrl = route.params.id;

  // Tìm trong danh sách tổng
  const result = uavList.find((item) => item.id === parseInt(idFromUrl));

  return (
    result || {
      name: "Unknown Product",
      description: "No description available.",
      images: ["/public/img/Drone cam tu.png"],
      versions: [],
    }
  );
});
// const product = ref({
//   name: "DJI Mavic 4 Pro",
//   description:
//     "DJI Mavic 4 Pro, equipped with a powerful triple-camera system featuring a 100MP Hasselblad main camera, dual large CMOS telephoto cameras, a 360° rotating Infinity gimbal, omnidirectional obstacle-avoidance sensors with Nightscape 0.1-Lux, and the advanced O4+ video transmission system.",
//   image: "/public/img/Drone cam tu.png", // Thay bằng link ảnh thật
//   // Thumbail
//   images: [
//     "/public/img/Drone cam tu.png",
//     "/public/img/UCAV-13_0.png",
//     "/public/img/UAV-100AI.png",
//   ],
//   versions: [
//     { title: "DJI Mavic 4 Pro (DJI RC 2)", controller: "DJI RC 2" },
//     {
//       title: "DJI Mavic 4 Pro Fly More Combo (DJI RC 2)",
//       controller: "DJI RC 2",
//     },
//     {
//       title: "DJI Mavic 4 Pro 512GB Creator Combo",
//       controller: "DJI RC Pro 2",
//     },
//   ],
// });
const currentImage = ref(0);
// Tạo một biến ref để lưu ảnh đang được chọn, ảnh đang hiển thị trên main
const selectedImage = computed(() => product.value.images[currentImage.value]);
// Chuyển sang ảnh khác khi click vào mũi tên
const nextImage = () => {
  currentImage.value = (currentImage.value + 1) % product.value.images.length;
  selectedImage.value = product.value.images[currentImage.value];
};
const prevImage = () => {
  currentImage.value =
    (currentImage.value - 1 + product.value.images.length) %
    product.value.images.length;
  selectedImage.value = product.value.images[currentImage.value];
};
const selectedVersion = computed(
  () => product.value.versions[selectedVersionIndex.value],
);
// Giả lập icon đơn giản (Bạn có thể dùng Lucide-vue-next hoặc Heroicons)
const DescriptionIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
};
const SpecIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
};
const PackageIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
};

const activeTab = ref("description");

const tabs = [
  { id: "description", name: "Mô tả", icon: DescriptionIcon },
  { id: "specification", name: "Thông số kỹ thuật", icon: SpecIcon },
  { id: "simulation", name: "Mô phỏng sản phẩm", icon: PackageIcon },
];

const productSpecs = {
  "Máy bay": {
    "Trọng lượng cất cánh":
      "Dưới 249 g " +
      "Trọng lượng tiêu chuẩn của máy bay (đã bao gồm Pin bay Thông minh, cánh quạt và thẻ nhớ microSD). Trọng lượng thực tế có thể thay đổi tùy thuộc vào sự khác biệt về lô vật liệu và các yếu tố bên ngoài. Ở hầu hết các quốc gia và khu vực, bạn không cần phải qua đào tạo hay thi sát hạch để vận hành sản phẩm này. Luôn kiểm tra luật pháp và các quy định tại địa phương trước khi sử dụng. Khi sử dụng Pin bay Thông minh Plus (được bán rời và chỉ có sẵn ở một số quốc gia nhất định), trọng lượng máy bay sẽ vượt quá 249 g. Luôn kiểm tra và tuân thủ nghiêm ngặt " +
      "các điều luật và quy định của địa phương trước khi bay.",
    "Kích thước": "Gập: 136×62×165 mm | Mở: 233×280×79 mm",
    "Tốc độ tăng trưởng tối đa": "5 m/s",
    "Tốc độ ngang tối đa": "12 m/s (Môi trường không gió)",
    "Độ cao cất cánh tối đa": "3000 m",
    "Thời gian bay tối đa": "31 phút",
    "Khoảng cách bay tối đa": "14 km",
    "Kháng gió tối đa": "10.7 m/s (Cấp 5)",
    "Hệ thống định vị": "GPS + Galileo + BeiDou",
    "Bộ nhớ trong": "2 GB",
  },
  Camera: {
    "Cảm biến hình ảnh": "1/1.3-inch CMOS",
    "Ống kính": "FOV 82.1°, khẩu độ f/1.7",
    "Dải ISO": "100-6400 (Video/Ảnh)",
    "Tốc độ màn trập": "1/16000 - 2 giây",
    "Độ phân giải video": "4K (3840×2160) @24/25/30/48/50/60/100fps",
    "Định dạng video": "MP4 (H.264/H.265)",
    "Chế độ màu": "Normal, D-Log M (10-bit)",
    "Zoom kỹ thuật số": "4K: 3x | FHD: 4x",
  },
  "Truyền hình ảnh": {
    "Hệ thống truyền": "DJI O4",
    "Chất lượng xem trực tiếp": "1080p/60fps",
    "Khoảng cách truyền tối đa": "FCC: 13 km | CE/SRRC/MIC: 8 km",
    "Độ trễ thấp nhất": "Khoảng 120 ms",
  },
  "Pin ": {
    "Dung lượng": "3110 mAh",
    "Loại pin": "Li-ion",
    "Năng lượng": "22.3 Wh",
    "Thời gian sạc": "Khoảng 45 - 70 phút (tùy bộ sạc)",
    "Nhiệt độ sạc": "5° đến 40°C (41° đến 104°F)",
    "Thời gian bảo quản":
      "Nếu không sử dụng trong thời gian dài, hãy sạc pin đến khoảng 50% và bảo quản ở nơi khô ráo, thoáng mát. Kiểm tra và sạc lại pin sau mỗi 3 tháng để duy trì hiệu suất tối ưu.",
  },
  "Điều khiển từ xa": {
    "Loại điều khiển": "DJI RC 2 (Màn hình 5.5 inch, độ sáng 1000 nits)",
    "Khoảng cách điều khiển tối đa": "FCC: 13 km | CE/SRRC/MIC: 8 km",
    "Thời lượng pin điều khiển": "Khoảng 6 giờ",
    "Cổng kết nối": "USB-C",
    "Tương thích":
      "Tương thích với các thiết bị iOS và Android có " +
      " hỗ trợ ứng dụng DJI Fly",
  },
};
</script>
<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
