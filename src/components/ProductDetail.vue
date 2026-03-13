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

        <p class="text-gray-600 leading-relaxed mb-6 font-light text-lg">
          {{ product.description }}
        </p>

        <div class="text-3xl font-black text-orange-500 mb-8">Liên hệ</div>

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

        <div class="flex space-x-4">
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
        </div>
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
            'flex items-center space-x-2 pb-4 text-sm font-bold transition-all relative',
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
        class="bg-white rounded-3xl border border-gray-100 p-8 md:p-16 shadow-sm"
      >
        <div v-if="activeTab === 'description'" class="animate-fadeIn">
          <h2 class="text-3xl font-bold text-blue-600 mb-6 text-center">
            Modern Design – Durable & Flexible
          </h2>

          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            The DJI Mavic 4 Pro features a foldable design that balances
            portability with durability. Weighing just over 1 kg, its
            aerodynamic structure ensures stable flight even in strong winds.
            When folded, it is compact enough to fit into a backpack, while the
            DJI RC 2 remote controller with a built-in screen provides a more
            intuitive and convenient control experience in all environments.
          </p>

          <div class="rounded-3xl overflow-hidden flex justify-center">
            <img
              src="/public/img/UCAV-13_0.png"
              alt="Mavic 4 Pro"
              class="max-w-4xl max-h-[500px] object-cover mx-auto"
            />
          </div>
          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            The drone is equipped with a powerful triple-camera system. The main
            Hasselblad camera uses a 4/3 CMOS 100MP sensor with an adjustable
            aperture ranging from f/2.0 to f/11, capturing highly detailed
            images with wide dynamic range. The medium-tele camera features a
            1/1.3" 48MP sensor with a 70 mm equivalent focal length, ideal for
            mid-range framing and portraits. The telephoto camera comes with a
            1/1.5" 50MP sensor at 166 mm focal length, allowing long-distance
            shots with excellent detail. All cameras support Dual Native ISO
            Fusion technology, optimizing low-light performance.
          </p>
          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            The Mavic 4 Pro supports HDR video recording in 6K at 60fps with its
            main camera, and up to 4K at 120fps for smooth slow-motion shots.
            Both telephoto and medium-tele cameras also record in 4K/60fps HDR,
            ensuring consistent quality across the system. It supports 10-bit
            video capture and advanced color profiles such as D-Log, D-Log M,
            and HLG, offering great flexibility in post-production.
          </p>
          <video
            controls
            class="w-full rounded-2xl"
            style="margin-bottom: 16px"
          >
            <source src="/public/img/AdvertisementUav.mp4" type="video/mp4" />
            Trình duyệt không hỗ trợ video
          </video>
          <p
            class="text-gray-600 leading-[1.8] text-lg mb-12 mx-auto font-light indent-8 pb-[10px]"
          >
            The Mavic 4 Pro supports HDR video recording in 6K at 60fps with its
            main camera, and up to 4K at 120fps for smooth slow-motion shots.
            Both telephoto and medium-tele cameras also record in 4K/60fps HDR,
            ensuring consistent quality across the system. It supports 10-bit
            video capture and advanced color profiles such as D-Log, D-Log M,
            and HLG, offering great flexibility in post-production.The drone is
            equipped with a powerful triple-camera system. The main Hasselblad
            camera uses a 4/3 CMOS 100MP sensor with an adjustable aperture
            ranging from f/2.0 to f/11, capturing highly detailed images with
            wide dynamic range. The medium-tele camera features a 1/1.3" 48MP
            sensor with a 70 mm equivalent focal length, ideal for mid-range
            framing and portraits. The telephoto camera comes with a 1/1.5" 50MP
            sensor at 166 mm focal length, allowing long-distance shots with
            excellent detail. All cameras support Dual Native ISO Fusion
            technology, optimizing low-light performance.
          </p>
        </div>

        <div
          v-if="activeTab === 'specification'"
          class="animate-fadeIn max-w-4xl mx-auto"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            <div
              v-for="(spec, label) in productSpecs"
              :key="label"
              class="flex justify-between border-b border-gray-100 pb-4 items-center"
            >
              <span class="text-gray-500 font-medium">{{ label }}</span>
              <span class="text-gray-900 font-black text-right">{{
                spec
              }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="activeTab === 'package'"
          class="animate-fadeIn text-center py-20"
        >
          <div
            class="bg-gray-50 rounded-2xl p-10 max-w-lg mx-auto border border-dashed border-gray-200"
          >
            <p class="text-gray-500 italic font-medium">
              Thông tin phụ kiện đi kèm đang được cập nhật...
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { uavList } from "@/data/uavData";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  product: Object,
});
const selectedVersionIndex = ref(0);
// const goToSimulation = () => {
//   // Chuyển hướng tới trang mô phỏng kèm theo ID sản phẩm
//   router.push({
//     name: "Simulation",
//     params: { id: props.product.id || 1 },
//   });
// };

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
  { id: "package", name: "Phụ kiện đi kèm ", icon: PackageIcon },
];

const productSpecs = {
  "Trọng lượng": "1050g",
  "Thời gian bay": "46 Phút",
  "Tầm xa tối đa": "20 KM",
  "Cảm biến": "1-inch CMOS",
  "Kháng gió": "Cấp 7",
  "Độ phân giải": "5.1K Video",
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
