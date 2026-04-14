<template>
  <div class="min-h-screen bg-[#F8FAFC] font-sans antialiased">
    <section
      class="relative h-[500px] w-full flex items-center overflow-hidden bg-slate-900"
    >
      <img
        src="/public/img/hero-mavic.webp"
        alt="Banner"
        class="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-[#F8FAFC]"
      ></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
        <h1
          class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter italic"
        >
          THE FUTURE OF <span class="text-blue-500">FLIGHT</span>
        </h1>
        <p
          class="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed font-medium mb-8"
        >
          Khám phá hệ sinh thái thiết bị bay không người lái hàng đầu. Từ những
          khung hình điện ảnh đến các giải pháp đo đạc bản đồ chính xác tuyệt
          đối.
        </p>
        <div class="flex justify-center gap-4">
          <div
            class="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-bold"
          >
            100% Digital Link
          </div>
          <div
            class="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-bold"
          >
            4K/120FPS HDR
          </div>
        </div>
      </div>
    </section>

<!-- Content trưng bày sản phẩm  -->

    <main class="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-24">
      <section class="mb-24">
        <div class="flex items-center gap-3 mb-8">
          <div
            class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"
          >
            <span class="material-symbols-outlined">star</span>
          </div>
          <h2
            class="text-3xl font-black text-slate-900 uppercase tracking-tight"
          >
            UAV Tiêu Biểu 2026
          </h2>
        </div>

        <div
          v-if="featuredUav"
          class="bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-200 flex flex-col lg:flex-row items-center"
        >
          <div
            class="w-full lg:w-1/2 p-12 bg-slate-50 flex justify-center items-center"
          >
            <img
              :src="featuredUav.image"
              class="max-h-[350px] drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div class="w-full lg:w-1/2 p-12">
            <span
              class="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block"
              >Hàng đầu phân khúc</span
            >
            <h3 class="text-4xl font-bold text-slate-900 mb-6">
              {{ featuredUav.name }}
            </h3>
            <p class="text-slate-500 text-lg mb-8 leading-relaxed">
              Dòng UAV định nghĩa lại chuẩn mực quay phim chuyên nghiệp với cụm
              3 camera Hasselblad và thời gian bay lên tới 45 phút.
            </p>
            <div class="grid grid-cols-2 gap-6 mb-8">
              <div
                v-for="(val, key) in featuredUav.specs"
                :key="key"
                class="border-l-2 border-blue-500 pl-4"
              >
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  {{ key }}
                </p>
                <p class="text-lg font-black text-slate-800">{{ val }}</p>
              </div>
            </div>
            <button
              @click="handleDetail(featuredUav)"
              class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
            >
              Khám phá ngay
            </button>
          </div>
        </div>
      </section>

<!-- Trưng bày các loại drone -->

      <div v-for="cat in productCategories" :key="cat.name" class="mb-20">
        <div
          class="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 mb-10 gap-6"
        >
          <div class="max-w-2xl">
            <h3
              class="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2"
            >
              {{ cat.name }}
            </h3>
            <p class="text-slate-500 font-medium italic">
              {{ cat.description }}
            </p>
          </div>
          <button
            class="text-sm font-bold text-blue-600 flex items-center gap-2 hover:gap-3 transition-all"
          >
            XEM TẤT CẢ
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div
            v-for="product in cat.items"
            :key="product.id"
            class="group bg-white rounded-3xl p-4 border border-slate-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col"
          >
            <div
              class="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative mb-6 flex items-center justify-center p-8"
            >
              <img
                :src="product.image"
                class="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div
                class="absolute top-4 right-4 bg-white/80 backdrop-blur shadow-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 border border-slate-100"
              >
                #{{ product.id }}
              </div>
            </div>

            <div class="px-2 flex-1 flex flex-col">
              <h4
                class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
              >
                {{ product.name }}
              </h4>
              <p class="text-sm text-slate-400 mb-6 line-clamp-2">
                {{ product.shortDesc }}
              </p>

              <div
                class="flex items-center justify-between mt-auto pt-6 border-t border-slate-50"
              >
                <div class="flex flex-col">
                  <span
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                    >Thời gian bay</span
                  >
                  <span class="text-sm font-black text-slate-800">{{
                    product.flightTime || "N/A"
                  }}</span>
                </div>
                <button
                  @click="handleDetail(product)"
                  class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90"
                >
                  <span class="material-symbols-outlined text-sm"
                    >visibility</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { uavList } from "@/data/uavData";
import { useRouter } from "vue-router";
const router = useRouter();

// Phân loại dữ liệu theo logic mới
const productCategories = computed(() => {
  const cats = [
    {
      name: "Dòng Mavic",
      description:
        "Đỉnh cao công nghệ quay phim chuyên nghiệp, cảm biến lớn và khả năng kháng gió vượt trội.",
      slug: "DJI Mavic",
    },
    {
      name: "Dòng Air",
      description:
        "Sự cân bằng hoàn hảo giữa tính di động và hiệu suất hình ảnh 4K sắc nét.",
      slug: "DJI Air",
    },
    {
      name: "Dòng FPV",
      description:
        "Trải nghiệm tốc độ cực đại và góc nhìn thứ nhất đầy kịch tính.",
      slug: "DJI Flip", // Giả định theo data cũ của bạn
    },
  ];

  return cats.map((c) => ({
    ...c,
    items: uavList.filter((p) => p.category === c.slug),
  }));
});

// UAV Tiêu biểu (Lấy cái đầu tiên trong list)
const featuredUav = computed(() => {
  return {
    ...uavList[0],
    specs: {
      "Cảm biến": "4/3 CMOS Hasselblad",
      "Truyền tải": "O3+ (15KM)",
      "Thời lượng": "46 PHÚT",
      "Kháng gió": "12 m/s",
    },
  };
});

const handleDetail = (product) => {
  router.push({ name: "droneDetail", params: { id: product.id } });
};
</script>

<style scoped>
/* Hiệu ứng mượt mà khi load trang */
main {
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
