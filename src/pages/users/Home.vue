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
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105"
          >
            MUA NGAY
          </button>
        </div>
        <div class="relative z-10 mt-12">
          <img
            src="/public/img/ultra_light 1.svg"
            alt="White Drone"
            class="w-[450px] drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
          />
        </div>
      </div>
    </section>

    <section
      class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-[1400px] mx-auto -mt-10 relative z-20"
    >
      <div
        class="relative group h-[500px] overflow-hidden rounded-sm cursor-pointer"
      >
        <img
          src="/public/img/ultra_light 1.svg"
          class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-center p-6"
        >
          <h2 class="text-gray-900 text-4xl font-bold mb-4">Ultra Light</h2>
          <p class="text-gray-700 text-lg max-w-xs">
            Drone move faster with weighing component
            <span class="font-bold underline">under 200 g</span>
          </p>
          <img
            src="https://images.unsplash.com/photo-1527977966376-1c8418f9f108?auto=format&fit=crop&w=400&q=80"
            class="w-48 mt-8 mix-blend-multiply opacity-80"
          />
        </div>
      </div>

      <div
        class="relative group h-[500px] overflow-hidden rounded-sm cursor-pointer text-white"
      >
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80"
          class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"
        ></div>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        >
          <h2 class="text-4xl font-bold mb-4">Best Resolution</h2>
          <p class="text-lg max-w-sm font-light">
            Take a beautiful view with best camera up to
            <span class="font-bold">4K Camera Resolution</span>
          </p>
          <div class="mt-10 border-2 border-white/50 p-2 rounded-lg">
            <div class="bg-white/20 px-4 py-1 text-xs">AERIAL VIEW</div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="py-20 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
    >
      <div class="flex-1 flex justify-center">
        <img
          src="/public/img/benefit_feature_image 1.svg"
          alt="Drone Specs"
          class="w-full max-w-md drop-shadow-2xl"
        />
      </div>

      <div class="flex-1 space-y-6">
        <h2 class="text-3xl font-bold text-gray-800">Why Drone Light?</h2>
        <p class="text-gray-500 leading-relaxed max-w-md">
          We provide a best self drone easy to use and operate. With auto pilot,
          the device will take a beautiful view for the best of flying
          operation.
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-6">
          <div class="text-center md:text-left">
            <div class="text-2xl font-bold text-gray-800">4K</div>
            <div
              class="text-[10px] uppercase tracking-tighter text-gray-400 font-semibold leading-tight"
            >
              Camera<br />Resolution
            </div>
          </div>
          <div class="text-center md:text-left">
            <div class="text-2xl font-bold text-gray-800">2 TB</div>
            <div
              class="text-[10px] uppercase tracking-tighter text-gray-400 font-semibold leading-tight"
            >
              Storage<br />Capacity
            </div>
          </div>
          <div class="text-center md:text-left">
            <div class="text-2xl font-bold text-gray-800">60 m/s</div>
            <div
              class="text-[10px] uppercase tracking-tighter text-gray-400 font-semibold leading-tight"
            >
              Super<br />Max Speed
            </div>
          </div>
          <div class="text-center md:text-left">
            <div class="text-2xl font-bold text-gray-800">30 mins</div>
            <div
              class="text-[10px] uppercase tracking-tighter text-gray-400 font-semibold leading-tight"
            >
              Long Flight<br />Time
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50/50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">New Products</h2>
          <p class="text-gray-400 text-xs tracking-widest uppercase">
            New innovation, best quality than before.
          </p>
          <p class="text-gray-400 text-xs tracking-widest uppercase mt-1">
            Make every moment flying operation become unforgettable.
          </p>
        </div>

        <div
          class="flex flex-nowrap md:grid md:grid-cols-3 gap-8 overflow-x-auto pb-8 snap-x"
        >
          <div
            v-for="product in products"
            :key="product.id"
            class="min-w-[300px] snap-center bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center transition-all hover:shadow-xl hover:-translate-y-2"
          >
            <div class="w-full h-48 overflow-hidden rounded-lg mb-6">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">
              {{ product.name }}
            </h3>
            <p
              class="text-gray-500 text-sm leading-relaxed mb-8 px-4 flex-grow"
            >
              {{ product.description }}
            </p>
            <button
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-2.5 rounded-full font-bold text-xs transition shadow-md active:scale-95"
            >
              GET NOW
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="mb-16">
          <h2
            class="text-5xl md:text-6xl font-bold text-gray-800 leading-tight"
          >
            What Our “Pilots” <br />
            Are Saying
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
          >
            <p class="text-gray-500 text-sm leading-relaxed mb-10 italic">
              “{{ review.content }}”
            </p>

            <div class="flex items-center space-x-4">
              <img
                :src="review.avatar"
                :alt="review.name"
                class="w-12 h-12 rounded-full object-cover border-2 border-indigo-50"
              />
              <div>
                <h4 class="text-gray-900 font-bold text-sm">
                  {{ review.name }}
                </h4>
                <p class="text-gray-400 text-xs">{{ review.role }}</p>
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
