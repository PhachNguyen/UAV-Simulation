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
              >AeroGuardian X9</span
            >
            là tinh hoa của kỹ thuật hàng không hiện đại... (nội dung rút gọn)
          </p>
          <div
            class="p-8 bg-[#f8f9fa] border-l-8 border-[#0b1f3f] rounded-r-2xl space-y-3 relative overflow-hidden group"
          >
            <Target
              class="absolute -right-4 -bottom-4 w-32 h-32 text-[#0b1f3f] opacity-[0.03]"
            />
            <p class="italic text-[#1a1a1a] text-xl font-semibold">
              "X9 không chỉ cung cấp hình ảnh; nó cung cấp sự an tâm tuyệt
              đối..."
            </p>
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
import { Layers, Target, Award } from "lucide-vue-next";
defineProps(["highlights", "description"]);
</script>
