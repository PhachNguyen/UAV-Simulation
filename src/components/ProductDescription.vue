<template>
  <section class="py-16 border-y border-[#dee2e6] bg-white">
    <div class="grid lg:grid-cols-12 gap-16 items-start">
      <div class="lg:col-span-8 space-y-8">
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-[#0b1f3f]">
            <Layers class="w-5 h-5" />
            <h2 class="text-2xl font-black uppercase tracking-tight">
              Chi tiết hệ thống vận hành
            </h2>
          </div>
          <div class="w-16 h-1 bg-[#0b1f3f]"></div>
        </div>
        <div
          class="space-y-6 text-[#4a4a4a] leading-relaxed text-lg font-medium"
        >
          <p>
            <span
              class="text-[#0b1f3f] font-black underline decoration-[#00bcd4] decoration-2 underline-offset-4"
              >{{ productName }}</span
            >
            là tinh hoa của kỹ thuật hàng không hiện đại, đại diện cho bước nhảy
            vọt trong công nghệ thiết kế không người lái. Được trang bị hệ thống
            khung sườn chế tác từ sợi carbon nguyên khối siêu nhẹ, thiết bị đạt
            được sự cân bằng tối ưu giữa trọng lượng và sức bền vật lý. Mọi chi
            tiết khí động học đều được tinh chỉnh thông qua hàng nghìn giờ mô
            phỏng CFD, giúp tối ưu hóa luồng khí, giảm thiểu tiếng ồn và gia
            tăng thời gian vận hành liên tục trong những điều kiện môi trường
            khắc nghiệt nhất.
          </p>
          <div
            class="p-8 bg-[#f8f9fa] border-l-8 border-[#0b1f3f] rounded-r-2xl space-y-3 relative overflow-hidden group"
          >
            <Target
              class="absolute -right-4 -bottom-4 w-32 h-32 text-[#0b1f3f] opacity-[0.03]"
            />
            {{ description }}
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-6">
        <div
          class="bg-[#0b1f3f] rounded-3xl p-8 text-white shadow-2xl space-y-10 relative overflow-hidden"
        >
          <h3
            class="text-[10px] font-black uppercase tracking-[0.3em] text-[#00bcd4] opacity-80"
          >
            Ưu thế cốt lõi
          </h3>
          <div class="space-y-8">
            <div
              v-for="item in highlights"
              :key="item.title"
              class="flex gap-5 group"
            >
              <div
                class="w-12 h-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#00bcd4] group-hover:text-[#0b1f3f] transition-all"
              >
                <component :is="item.icon" class="w-6 h-6" />
              </div>

              <div class="space-y-1">
                <h4
                  class="font-black uppercase text-xs tracking-widest text-white"
                >
                  {{ item.title }}
                </h4>
                <p class="text-xs text-white/60 leading-relaxed">
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Layers,
  Target,
  Award,
  ShieldCheck,
  Zap,
  Navigation,
  CloudRain,
} from "lucide-vue-next";
defineProps(["description", "productName"]);
const highlights = [
  {
    title: "Bảo mật AES-256",
    desc: "Mã hóa dữ liệu cấp quân sự, đảm bảo an toàn tuyệt đối cho đường truyền tín hiệu điều khiển.",
    icon: ShieldCheck,
  },
  {
    title: "Phản hồi cực nhanh",
    desc: "Độ trễ tín hiệu dưới 28ms nhờ công nghệ truyền tải OcuSync 4.0 thế hệ mới nhất.",
    icon: Zap,
  },
  {
    title: "Định vị RTK",
    desc: "Hệ thống định vị vệ tinh kép cho sai số vị trí ở mức centimet, tối ưu cho khảo sát địa hình.",
    icon: Navigation,
  },
  {
    title: "Kháng thời tiết IP55",
    desc: "Vận hành ổn định trong điều kiện mưa nhẹ và gió mạnh nhờ thiết kế khung carbon nguyên khối.",
    icon: CloudRain,
  },
];
</script>
