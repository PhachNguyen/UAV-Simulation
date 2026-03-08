<template>
  <section class="max-w-7xl mx-auto px-6 py-20 bg-gray-50/30">
    <div
      class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
    >
      <div class="max-w-2xl">
        <h2
          class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4"
        >
          Khách hàng nói gì về chúng tôi
        </h2>
        <p class="text-slate-500 font-medium">
          Hơn 1,000+ cá nhân và doanh nghiệp đã tin dùng giải pháp UAV của chúng
          tôi để tối ưu hóa quy trình làm việc.
        </p>
      </div>
      <div class="flex gap-3">
        <button
          class="group p-4 rounded-full bg-white shadow-sm border border-slate-200 hover:border-teal-600 transition-all duration-300"
        >
          <span class="block group-hover:-translate-x-1 transition-transform"
            >←</span
          >
        </button>
        <button
          class="group p-4 rounded-full bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all duration-300"
        >
          <span class="block group-hover:translate-x-1 transition-transform"
            >→</span
          >
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.name"
        class="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-slate-100 relative group hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-500"
      >
        <div
          class="mb-6 text-teal-100 group-hover:text-teal-500 transition-colors duration-500"
        >
          <svg
            width="40"
            height="30"
            viewBox="0 0 40 30"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 18C0 8.05887 8.05887 0 18 0V7C11.9249 7 7 11.9249 7 18H14V30H0V18Z"
            />
            <path
              d="M26 18C26 8.05887 34.0589 0 44 0V7C37.9249 7 33 11.9249 33 18H40V30H26V18Z"
            />
          </svg>
        </div>

        <p
          class="text-slate-600 leading-relaxed mb-8 text-lg font-medium relative z-10 italic"
        >
          "{{ testimonial.comment }}"
        </p>

        <div class="flex items-center gap-4 relative z-10">
          <div class="relative">
            <img
              :src="testimonial.avatar"
              class="w-14 h-14 rounded-full object-cover border-4 border-slate-50 group-hover:border-teal-50 transition-colors"
              :alt="testimonial.name"
            />
            <div
              class="absolute -bottom-1 -right-1 bg-teal-500 w-4 h-4 rounded-full border-2 border-white"
            ></div>
          </div>
          <div>
            <h4
              class="font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors"
            >
              {{ testimonial.name }}
            </h4>
            <p
              class="text-slate-400 text-sm font-semibold tracking-wide uppercase"
            >
              {{ testimonial.role }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: "Nguyễn Văn Tuấn",
    role: "Nhiếp ảnh gia chuyên nghiệp",
    comment:
      "Dòng drone này thực sự thay đổi cách tôi làm việc. Chất lượng hình ảnh 4K cực kỳ sắc nét và thời gian bay vượt trội giúp tôi bắt trọn mọi khoảnh khắc từ trên cao.",
    avatar: "https://i.pravatar.cc/150?u=tuan",
  },
  {
    name: "Trần Thị Thu Thủy",
    role: "Chuyên gia khảo sát địa chính",
    comment:
      "Độ chính xác của hệ thống định vị RTK trên thiết bị là cực kỳ ấn tượng. Nó giúp tiết kiệm 50% thời gian so với các phương pháp khảo sát truyền thống trước đây.",
    avatar: "https://i.pravatar.cc/150?u=thuy",
  },
];
</script>
