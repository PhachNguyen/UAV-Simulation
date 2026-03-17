<template>
  <div class="min-h-screen bg-[#F9FAFB] font-sans antialiased">
    <section
      class="relative h-[450px] w-full flex items-center overflow-hidden"
    >
      <img
        src="/public/img/hero-mavic.webp"
        alt="DJI Banner"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <div class="absolute inset-0 bg-black/30"></div>

      <div
        class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-white"
      >
        <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Danh sách sản phẩm
        </h1>

        <p
          class="max-w-2xl text-lg md:text-xl text-gray-200 leading-relaxed font-light"
        >
          Duyệt qua danh mục sản phẩm đa dạng của chúng tôi, từ drone chuyên
          nghiệp đến các thiết bị cầm tay và giải pháp doanh nghiệp tiên tiến.
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 py-16 px-6">
      <aside class="w-full md:w-72 flex-shrink-0">
        <div
          class="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm sticky top-10"
        >
          <h2
            class="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center"
          >
            <span
              class="w-1 h-4 bg-black mr-2 rounded-full"
              style="margin-right: 5px"
            ></span>
            Dòng sản phẩm
          </h2>

          <ul class="space-y-1">
            <li
              v-for="category in categories"
              :key="category.name"
              @click="activeCategory = category.name"
              class="group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
              :class="
                activeCategory === category.name
                  ? 'bg-orange-50'
                  : 'hover:bg-gray-50'
              "
            >
              <div class="flex items-center space-x-3">
                <span
                  :class="[
                    'w-2 h-2 rounded-full transition-all duration-300',
                    activeCategory === category.name
                      ? 'bg-blue-500 ring-1 ring-[#222222]/20 scale-125'
                      : 'bg-gray-300 group-hover:bg-gray-400',
                  ]"
                  style="margin-right: 10px"
                ></span>
                <span
                  :class="[
                    'text-sm font-bold transition-colors',
                    activeCategory === category.name
                      ? 'text-blue-600'
                      : 'text-gray-500 group-hover:text-gray-900',
                  ]"
                >
                  {{ category.name }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <main class="flex-1">
        <div
          class="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm"
        >
          <div class="flex items-center space-x-4">
            <span
              class="text-xs font-bold text-gray-400 uppercase tracking-widest"
              >Sắp xếp</span
            >
            <select
              v-model="sortBy"
              class="bg-gray-50 border-none rounded-lg px-4 py-2 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-orange-500/20 outline-none cursor-pointer"
            >
              <option value="default">Mặc định</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>
          <div
            class="text-xs font-bold text-gray-400 uppercase tracking-widest"
          >
            Hiển thị
            <span class="text-gray-900 font-black">{{
              filteredProducts.length
            }}</span>
            sản phẩm
          </div>
        </div>

        <TransitionGroup
          tag="div"
          name="list"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <UavCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @view-detail="handleDetail(product)"
          />
        </TransitionGroup>

        <div
          v-if="filteredProducts.length === 0"
          class="py-20 text-center text-gray-400 italic"
        >
          Không có sản phẩm nào trong danh mục này.
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import UavCard from "@/components/UavCard.vue";
import { uavList } from "@/data/uavData";
import { useRouter } from "vue-router";
const router = useRouter();
// Filter State
const activeCategory = ref("Tất cả");
const sortBy = ref("default");

const categories = [
  { name: "Tất cả" },
  { name: "DJI Mavic" },
  { name: "DJI Air" },
  { name: "DJI Flip" },
  // { name: "Racing" },
];

const products = ref(uavList);

// Logic Filter Thực Tế
const filteredProducts = computed(() => {
  let result = products.value;

  // Lọc theo Category
  if (activeCategory.value !== "Tất cả") {
    result = result.filter((p) => p.category === activeCategory.value);
  }

  // Sắp xếp theo giá (ví dụ thêm)
  if (sortBy.value === "newest") {
    return [...result].reverse();
  }

  return result;
});
//  Hàm xử lý khi click vào View Detail
const handleDetail = (product) => {
  // Chuyển sang trang chi tiết sản phẩm, có thể dùng router hoặc emit sự kiện
  // Ví dụ: this.$router.push(`/products/${product.id}`);
  router.push({ name: "droneDetail", params: { id: product.id } });
  console.log("Xem chi tiết sản phẩm:", product);
};
</script>

<style scoped>
/* Hiệu ứng mượt mà khi lọc sản phẩm */
/* .list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
} */
</style>
