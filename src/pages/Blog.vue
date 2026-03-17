<template>
  <div class="bg-white min-h-screen font-sans">
    <section class="relative overflow-hidden h-[500px]">
      <video
        autoplay
        muted
        loop
        playsinline
        class="w-full rounded-2xl"
        style="margin-bottom: 16px"
      >
        <source src="/public/videos/intro_drones.mp4" type="video/mp4" />
        Trình duyệt không hỗ trợ video
      </video>
      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
      >
        <!-- <span
          class="bg-white text-black text-[10px] font-bold px-3 py-1 rounded uppercase mb-4 shadow-sm"
        >
          Latest
        </span> -->
        <!-- <h1 class="text-5xl md:text-7xl font-medium mb-2 tracking-tight">
          {{ featuredPost.title }}
        </h1> -->
        <p class="text-lg md:text-xl font-light opacity-90 italic">
          Trước khi bạn thực hiện những trải nghiệm đầu tiên...
        </p>
      </div>
    </section>

    <div
      class="mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6"
    >
      <nav class="flex items-center gap-6">
        <span class="text-gray-400 font-bold text-sm uppercase">Blogs:</span>
        <button
          v-for="cat in blogCategories"
          :key="cat"
          @click="activeCat = cat"
          :class="[
            'text-sm font-bold transition-colors',
            activeCat === cat
              ? 'text-black underline underline-offset-4'
              : 'text-gray-500 hover:text-black',
          ]"
        >
          {{ cat }}
        </button>
      </nav>

      <div class="relative w-full md:w-80">
        <input
          type="text"
          placeholder="Search..."
          class="w-full py-2 px-4 bg-gray-100 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <button
          class="absolute right-0 top-0 h-full px-4 bg-[#6A4062] text-white rounded-r"
        >
          <Search :size="16" />
        </button>
      </div>
    </div>

    <main class="mx-auto px-6 pb-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="flex flex-col group cursor-pointer"
        >
          <div class="aspect-video overflow-hidden rounded-lg mb-4">
            <img
              :src="post.image"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h3
            class="text-2xl font-bold text-gray-900 mb-2 leading-tight hover:underline"
            style="margin: 2px; line-height: 1.2"
          >
            {{ post.title }}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {{ post.excerpt }}
          </p>

          <div class="flex gap-2 mb-4">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="bg-pink-50 text-pink-500 text-[10px] font-bold px-2 py-0.5 rounded italic"
            >
              {{ tag }}
            </span>
          </div>

          <div
            class="flex justify-between items-center text-[12px] font-bold text-gray-900 mt-auto border-t pt-4"
          >
            <span>{{ post.date }}</span>
            <span
              class="flex items-center gap-1 uppercase tracking-tighter opacity-70"
            >
              <Folder :size="12" /> {{ post.category }}
            </span>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search, Folder } from "lucide-vue-next";

const activeCat = ref("Tất cả");

const featuredPost = computed(
  () => blogPosts.find((p) => p.featured) || blogPosts[0],
);

const filteredPosts = computed(() => {
  if (activeCat.value === "Tất cả") return blogPosts;
  return blogPosts.filter((p) => p.category === activeCat.value);
});
const blogCategories = [
  "Tất cả",
  "Công nghệ",
  "Vận hành",
  "Quy định",
  "Ứng dụng",
  "Bảo trì",
];
const blogPosts = [
  {
    id: 1,
    title:
      "Tối ưu hóa tầm xa điều khiển (O4 Transmission) trong môi trường đô thị",
    excerpt:
      "Làm thế nào để duy trì tín hiệu 1080p/60fps ổn định khi bay drone giữa các tòa nhà cao tầng? Khám phá sức mạnh của hệ thống truyền dẫn đa tần số mới nhất...",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80",
    category: "Công nghệ",
    tags: ["O4 System", "Signal"],
    date: "Mar 15, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "Quy trình xin cấp phép bay UAV tại Việt Nam năm 2026",
    excerpt:
      "Cập nhật những thay đổi mới nhất về Nghị định quản lý thiết bị bay không người lái. Hướng dẫn chi tiết thủ tục cấp phép cho các khu vực hạn chế bay...",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80",
    category: "Quy định",
    tags: ["Pháp lý", "Giấy phép"],
    date: "Mar 12, 2026",
    featured: false,
  },
  {
    id: 3,
    title: "Ứng dụng cảm biến LiDAR trong khảo sát địa hình 3D",
    excerpt:
      "Drone tích hợp LiDAR đang thay đổi hoàn toàn cách chúng ta đo đạc bản đồ. Độ chính xác đến từng milimet giúp xây dựng mô hình số độ cao (DEM) nhanh chóng...",
    image:
      "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80",
    category: "Ứng dụng",
    tags: ["LiDAR", "Mapping"],
    date: "Mar 10, 2026",
    featured: false,
  },
  {
    id: 4,
    title: "Hướng dẫn bảo dưỡng Pin Intelligent Flight Battery Plus",
    excerpt:
      "Pin là linh kiện quan trọng nhất. Làm sao để tránh tình trạng phồng pin, tụt áp và cách lưu trữ pin đúng cách khi không sử dụng trong thời gian dài...",
    image:
      "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&q=80",
    category: "Bảo trì",
    tags: ["Battery", "Maintenance"],
    date: "Mar 05, 2026",
    featured: false,
  },
  {
    id: 5,
    title: "Kỹ thuật bay Waypoint: Thiết lập lộ trình bay tự động",
    excerpt:
      "Học cách lập trình các điểm mốc (Waypoints) để thực hiện những chuyến bay tuần tra định kỳ. Tối ưu hóa quỹ đạo bay để tiết kiệm năng lượng tối đa...",
    image: "/public/img/best_resolution 1.svg",
    category: "Vận hành",
    tags: ["Waypoints", "Automation"],
    date: "Mar 01, 2026",
    featured: false,
  },
];
</script>
