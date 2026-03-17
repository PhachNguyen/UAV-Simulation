<template>
  <div class="service-page">
    <section
      class="relative h-[400px] flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 z-0">
        <img
          src="/public/img/Service.webp"
          class="w-full h-full object-cover brightness-50"
          alt="Support Team"
        />
      </div>

      <div class="relative z-10 text-center text-white">
        <h1
          class="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 animate-fadeIn"
        >
          Service
        </h1>
        <nav
          class="flex justify-center space-x-2 text-sm font-bold uppercase tracking-widest text-gray-300"
        >
          <router-link to="/" class="hover:text-white transition"
            >Home</router-link
          >
          <span>&gt;</span>
          <span class="text-white">Service</span>
        </nav>
      </div>
    </section>

    <section class="py-[25px] bg-white">
      <div class="mx-auto px-6 text-center">
        <h2
          class="text-4xl md:text-5xl font-black text-gray-900 uppercase mb-8 tracking-tight"
        >
          Our Advantage
        </h2>

        <p class="text-gray-500 text-lg leading-relaxed font-light mb-12">
          Đội ngũ của chúng tôi tận tâm tạo ra các sản phẩm chất lượng cao, giá
          cả hợp lý cho khách hàng. Chúng tôi luôn sẵn sàng hỗ trợ kỹ thuật và
          giải đáp mọi thắc mắc về sản phẩm hoặc dịch vụ để bạn có thể hoàn toàn
          tự tin với lựa chọn của mình.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div
            v-for="adv in advantages"
            :key="adv.title"
            class="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-all group"
            style="display: flex; flex-direction: column; align-items: center"
          >
            <component
              :is="adv.icon"
              class="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:text-blue-600 transition-colors"
            />
            <h3 class="font-bold text-gray-900 mb-2">{{ adv.title }}</h3>
            <p class="text-sm text-gray-500">{{ adv.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white mx-auto py-[20px] px-6">
      <div
        v-for="(feature, index) in serviceFeatures"
        :key="index"
        class="grid grid-cols-1 md:grid-cols-2 min-h-[450px]"
      >
        <div
          :class="[
            'relative overflow-hidden',
            feature.reverse ? 'md:order-2' : 'md:order-1',
          ]"
        >
          <img
            :src="feature.image"
            class="cursor-pointer w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            :alt="feature.title"
          />
        </div>

        <div
          :class="[
            'flex flex-col justify-center p-12 md:p-24 bg-white',
            feature.reverse ? 'md:order-1' : 'md:order-2',
          ]"
        >
          <h3
            class="text-3xl font-black text-gray-900 uppercase mb-6 tracking-tight"
          >
            {{ feature.title }}
          </h3>
          <p
            class="text-gray-500 text-sm md:text-base leading-relaxed text-justify font-light"
          >
            {{ feature.desc }}
          </p>

          <div class="w-12 h-1 bg-blue-600 mt-8"></div>
        </div>
      </div>
    </section>

    <div class="fixed bottom-6 right-6 z-50">
      <button
        class="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center space-x-3 shadow-2xl hover:bg-orange-600 transition-all active:scale-95"
      >
        <span class="font-bold text-sm uppercase tracking-wider">Chat now</span>
        <MessageSquare :size="20" fill="currentColor" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { MessageSquare, ShieldCheck, Zap, Headphones } from "lucide-vue-next";

const advantages = [
  {
    title: "Chất lượng cao",
    desc: "Quy trình kiểm định UAV nghiêm ngặt theo tiêu chuẩn quốc tế.",
    icon: ShieldCheck,
  },
  {
    title: "Phản hồi nhanh",
    desc: "Hỗ trợ kỹ thuật 24/7, xử lý sự cố trong vòng 2 giờ làm việc.",
    icon: Zap,
  },
  {
    title: "Chuyên gia tận tâm",
    desc: "Đội ngũ kỹ sư giàu kinh nghiệm thực chiến trong ngành drone.",
    icon: Headphones,
  },
];
const serviceFeatures = [
  {
    title: "Đội ngũ kinh doanh chuyên nghiệp",
    desc: "Đội ngũ kinh doanh của chúng tôi có kiến thức chuyên sâu về chức năng và ứng dụng của sản phẩm. chúng tôi có khả năng xác định chính xác nhu cầu của khách hàng và đưa ra các giải pháp ứng dụng toàn diện cũng như các kế hoạch khớp sản phẩm với mức giá hợp lý và chất lượng cao.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    reverse: false,
  },
  {
    title: "Dịch vụ hỗ trợ tận tâm",
    desc: "Chúng tôi cung cấp dịch vụ chuyên nghiệp một kèm một, cũng như liên lạc 24 giờ qua email, Zalo và điện thoại để đảm bảo khách hàng hiểu đầy đủ về hiệu suất, thông số và cách sử dụng sản phẩm. Sau khi hợp tác, chúng tôi có thể cung cấp dịch vụ hỗ trợ kỹ thuật từ xa giúp giải quyết các khó khăn trong quá trình vận hành.",
    image:
      "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80",
    reverse: true, // Chữ bên trái, ảnh bên phải
  },
  {
    title: "Tùy chỉnh sản phẩm theo yêu cầu",
    desc: "Dịch vụ tùy chỉnh có sẵn cho các thiết bị bay không người lái (UAV). Ví dụ: in logo khách hàng, lắp đặt các thiết bị phụ trợ khác nhau, cài đặt thời gian làm việc riêng biệt và thay đổi kích thước sản phẩm để phù hợp với nhiều tình huống ứng dụng. Chúng tôi cũng cung cấp đầy đủ video thử nghiệm và hướng dẫn sử dụng.",
    image: "/public/img/Service_1.webp",
    reverse: false,
  },
  {
    title: "Dịch vụ hậu cần nhanh chóng",
    desc: "Chúng tôi sử dụng các hộp đóng gói được thiết kế chuyên nghiệp và có đội ngũ hậu cần chuyên trách để xử lý việc vận chuyển, đảm bảo sản phẩm được giao đến khách hàng một cách nhanh nhất, an toàn nhất và đáng tin cậy nhất có thể.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
    reverse: true,
  },
];
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
