<template>
  <div class="min-h-screen bg-white py-10 px-4 md:px-10">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      <aside class="w-full md:w-64 flex-shrink-0">
        <div class="border border-gray-100 rounded-lg p-6 shadow-sm">
          <h2 class="text-lg font-bold text-gray-800 mb-6 border-b pb-4">
            Dòng sản phẩm
          </h2>

          <ul class="space-y-4">
            <li
              v-for="category in categories"
              :key="category.name"
              class="flex items-center space-x-3 cursor-pointer group"
            >
              <span
                :class="[
                  'w-3 h-3 rounded-full transition-colors',
                  category.active
                    ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]'
                    : 'bg-gray-200 group-hover:bg-gray-400',
                ]"
              ></span>

              <span
                :class="[
                  'text-sm font-medium transition-colors',
                  category.active
                    ? 'text-orange-500'
                    : 'text-gray-600 group-hover:text-gray-900',
                ]"
              >
                {{ category.name }}
              </span>
            </li>
          </ul>
        </div>
      </aside>

      <main class="flex-1">
        <div
          class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-gray-50/50 p-4 rounded-xl"
        >
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-600 font-medium">Sắp xếp:</span>
            <select
              class="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <option>Mặc định</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
              <option>Mới nhất</option>
            </select>
          </div>

          <div class="text-sm text-gray-500">
            Có
            <span class="font-bold text-gray-900">{{ products.length }}</span>
            sản phẩm
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="group border border-gray-100 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:border-orange-100 flex flex-col items-center text-center"
          >
            <div class="relative w-full aspect-square mb-6 overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <h3
              class="text-sm font-bold text-gray-800 mb-4 h-10 flex items-center justify-center"
            >
              {{ product.name }}
            </h3>

            <div class="text-orange-500 font-bold text-sm tracking-wider">
              Liên hệ
            </div>

            <button
              class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] px-4 py-2 rounded-full font-bold uppercase tracking-widest"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </main>
    </div>

    <div class="fixed bottom-10 right-10 flex flex-col space-y-3">
      <button
        class="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <button
        class="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5h12M9 3v2m1.048 9.583L9 14.083l-1.048-4.5M3 10h18M3 14h18M3 18h18"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categories = ref([
  { name: "Tất cả", active: true },
  { name: "DJI Mavic", active: false },
  { name: "DJI Air", active: false },
  { name: "DJI Mini", active: false },
  { name: "DJI FLIP", active: false },
  { name: "DJI FPV", active: false },
  { name: "DJI NEO", active: false },
  { name: "Osmo Action", active: false },
  { name: "Osmo Pocket", active: false },
  { name: "DJI MIC", active: false },
  { name: "Osmo Mobile", active: false },
  { name: "Ronin Stabilizers", active: false },
]);

const products = ref([
  {
    id: 1,
    name: "DJI Mavic 4 Pro",
    image:
      "https://www.dji.com/assets/images/products/mavic-3-pro/mavic-3-pro-main.png",
  },
  {
    id: 2,
    name: "DJI Mavic 3 Pro Cine",
    image:
      "https://www.dji.com/assets/images/products/mavic-3-pro/mavic-3-pro-main.png",
  },
  {
    id: 3,
    name: "DJI Mavic 3 Pro",
    image:
      "https://www.dji.com/assets/images/products/mavic-3-pro/mavic-3-pro-main.png",
  },
  {
    id: 4,
    name: "DJI Air 3S",
    image:
      "https://www.dji.com/assets/images/products/mavic-3-pro/mavic-3-pro-main.png",
  },
  {
    id: 5,
    name: "DJI Mini 4 Pro",
    image:
      "https://www.dji.com/assets/images/products/mavic-3-pro/mavic-3-pro-main.png",
  },
  {
    id: 6,
    name: "DJI Neo",
    image:
      "https://www.dji.com/assets/images/products/mavic-3-pro/mavic-3-pro-main.png",
  },
  {
    id: 7,
    name: "DJI FPV Drone",
    image:
      "https://www.dji.com/assets/images/products/mavic-3-pro/mavic-3-pro-main.png",
  },
  {
    id: 8,
    name: "DJI Mini 3",
    image:
      "https://www.dji.com/assets/images/products/mavic-3-pro/mavic-3-pro-main.png",
  },
]);
</script>

<style scoped>
/* Bạn có thể thêm font chuyên dụng của DJI nếu muốn giống 100% */
</style>
