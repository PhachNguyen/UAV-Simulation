<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <section
      class="relative h-[85vh] bg-black flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div
        class="absolute inset-0 opacity-40 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gray-800 via-transparent to-transparent"
      ></div>
      <div class="flex" style="justify-content: space-between; width: stretch">
        <div class="relative z-10">
          <h1
            class="text-white text-4xl md:text-5xl font-medium mb-4 tracking-tight py-[8px]"
          >
            Trải Nghiệm Drone Ánh Sáng
          </h1>
          <p
            class="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed mb-8 pb-[8px]"
          >
            Khám phá bầu trời và thế giới tuyệt đẹp với khả năng điều hướng đơn
            giản. <br />
            Ghi lại trọn vẹn những kỷ niệm đáng nhớ, nhanh chóng và nhẹ nhàng
            như một tia chớp.
          </p>
          <button
            class="bg-[#2E4DEC] hover:bg-indigo-700 text-white px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105"
          >
            MUA NGAY
          </button>
        </div>
        <div class="relative z-10 mt-12">
          <img
            src=""
            alt="White Drone"
            class="w-[450px] drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
          />
        </div>
      </div>
    </section>

    <div class="min-h-[80vh] flex items-center justify-center bg-white">
      <section
        class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full max-w-[1400px] mx-auto relative z-20"
      >
        <div
          class="relative group aspect-[4/3] overflow-hidden rounded-sm cursor-pointer text-white"
        >
          <img
            src="/public/img/ultra_light 1.svg"
            class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div
            class="absolute top-[45px] inset-0 flex flex-col items-center text-center p-6 z-10"
          >
            <h2 class="text-4xl font-bold mb-4 text-[#222222]">Siêu Nhẹ</h2>
            <p class="text-lg max-w-sm font-light mx-auto text-[#222222]/50">
              Drone di chuyển nhanh hơn với linh kiện trọng lượng
              <span class="text-[#222222] font-bold mt-1">dưới 200g</span>
            </p>
          </div>
        </div>

        <div
          class="relative group aspect-[4/3] overflow-hidden rounded-sm cursor-pointer text-white"
        >
          <img
            src="/public/img/best_resolution 1.svg"
            class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"
          ></div>
          <div
            class="absolute top-[45px] inset-0 flex flex-col items-center text-center p-6 z-10"
          >
            <h2 class="text-4xl font-bold mb-4">Độ Phân Giải Cao</h2>
            <p class="text-lg max-w-sm font-light mx-auto">
              Ghi lại những khung hình tuyệt đẹp với camera lên đến
              <span class="font-bold text-yellow-400 mt-1">4K Ultra HD</span>
            </p>
          </div>
        </div>
      </section>
    </div>
    <section
      class="py-10 px-4 max-w-7xl mx-auto flex items-center justify-center text-center"
    >
      <div class="mb-16">
        <img
          src="/public/img/benefit_feature_image 1.svg"
          alt="Thông số Drone"
          class="w-full max-w-lg drop-shadow-2xl animate-float"
        />
      </div>

      <div class="max-w-3xl space-y-8">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800">
          Tại sao chọn Drone Light?
        </h2>
        <p class="text-gray-500 text-lg leading-relaxed mx-auto">
          Chúng tôi cung cấp những dòng drone tự lái tốt nhất, dễ dàng vận hành
          và điều khiển. Với chế độ bay tự động, thiết bị sẽ ghi lại những góc
          nhìn tuyệt đẹp, mang lại trải nghiệm bay chuyên nghiệp nhất.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 pt-10">
          <div class="flex flex-col items-center">
            <div class="text-3xl font-black text-gray-900">4K</div>
            <div
              class="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold leading-tight mt-2"
            >
              Độ phân giải<br />Camera
            </div>
          </div>

          <div class="flex flex-col items-center">
            <div class="text-3xl font-black text-gray-900">2 TB</div>
            <div
              class="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold leading-tight mt-2"
            >
              Dung lượng<br />Lưu trữ
            </div>
          </div>

          <div class="flex flex-col items-center">
            <div class="text-3xl font-black text-gray-900">60 m/s</div>
            <div
              class="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold leading-tight mt-2"
            >
              Tốc độ<br />Tối đa
            </div>
          </div>

          <div class="flex flex-col items-center">
            <div class="text-3xl font-black text-gray-900">30 phút</div>
            <div
              class="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold leading-tight mt-2"
            >
              Thời gian<br />Bay tối đa
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="py-[30px] bg-gray-50/50 flex flex-col items-center justify-center"
    >
      <div class="max-w-7xl w-full mx-auto px-6">
        <div class="text-center mb-16">
          <h2
            class="text-[36px] font-semibold text-[#222222] mb-4 tracking-tight"
          >
            Sản Phẩm Mới
          </h2>
          <div class="space-y-1">
            <p
              class="text-[#818181] font-bold text-[10px] tracking-[0.3em] uppercase"
            >
              Sáng tạo không ngừng, chất lượng vượt trội.
            </p>
            <p class="text-[#818181] text-[10px] tracking-[0.2em] uppercase">
              Biến mỗi khoảnh khắc bay lượn trở nên đáng nhớ hơn bao giờ hết.
            </p>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-10 py-[30px]">
          <div
            v-for="product in products"
            :key="product.id"
            class="w-full max-w-[350px] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 group"
          >
            <div class="w-full h-56 overflow-hidden rounded-xl mb-8 bg-gray-50">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              {{ product.name }}
            </h3>

            <p
              class="text-gray-500 text-sm leading-relaxed mb-10 px-2 flex-grow"
            >
              {{ product.description }}
            </p>

            <button
              class="bg-[#2E4DEC] hover:bg-indigo-500 text-white px-10 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-indigo-100 active:scale-95"
            >
              SỞ HỮU NGAY
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-[30px] bg-white flex flex-col items-center">
      <div class="max-w-7xl w-full mx-auto px-6">
        <div class="mb-20 text-center md:text-left" style="margin-bottom: 20px">
          <h2
            class="md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tighter"
          >
            Cảm nhận từ <br />
            Những "Phi công"
          </h2>
          <div class="w-25 h-1.5 bg-[#2E4DEC] mt-[8px] mx-auto md:mx-0"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="bg-gray-50 border border-gray-100 rounded-[2rem] p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
          >
            <div class="relative">
              <span
                class="text-4xl text-indigo-200 absolute -top-4 -left-2 font-serif opacity-0 group-hover:opacity-100 transition-opacity"
                >“</span
              >
              <p
                class="text-gray-600 text-base leading-relaxed mb-12 italic relative z-10"
              >
                “{{ review.content }}”
              </p>
            </div>

            <div
              class="flex items-center space-x-4 border-t border-gray-200 pt-8"
            >
              <img
                :src="review.avatar"
                :alt="review.name"
                class="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h4
                  class="text-gray-900 font-black text-sm uppercase tracking-wide"
                >
                  {{ review.name }}
                </h4>
                <p
                  class="text-indigo-600 font-bold text-[11px] uppercase tracking-widest mt-0.5"
                >
                  {{ review.role }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="h-20 bg-white"></footer>
  </div>
</template>

<script setup>
//  Data
const products = [
  {
    id: 1,
    name: "Mini Drone",
    description:
      "Powerful camera drone at an affordable price range. Camera up to 4K resolution, optimize shots automatically.",
    image: "/public/img/mini_drone.svg",
  },
  {
    id: 2,
    name: "Drone Light",
    description:
      "Drone light is every creators dream. Setting aperture manually and high battery performance. Drone light is everything you need.",
    image:
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Phantom Pro",
    description: "Inspired can move fast. Focus on speed and environment.",
    image: "/public/img/phantom_drone 1.svg",
  },
];
const reviews = [
  {
    id: 1,
    content:
      "With high resolution camera, picture become clear and beautiful. It's so easy to operate drone.",
    name: "Hugo Adams",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/150?u=hugo",
  },
  {
    id: 2,
    content:
      "Taking high view video become easy and faster. Battery performance really helping for making film.",
    name: "Jennie Obrien",
    role: "Director Film",
    avatar: "https://i.pravatar.cc/150?u=jennie",
  },
  {
    id: 3,
    content:
      "Making video content for my trip vlog so powerful and wonderful. Love the video quality.",
    name: "Lisa Millz",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/150?u=lisa",
  },
];
</script>

<style scoped>
/* Tùy chỉnh thêm nếu cần */
</style>
