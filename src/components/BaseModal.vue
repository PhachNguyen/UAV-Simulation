<template>
  <Teleport to="body">
    <Transition name="fade-backdrop">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
        @click.self="$emit('update:modelValue', false)"
      >
        <Transition name="modal-scale">
          <div
            v-if="modelValue"
            :class="[
              'bg-white rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col transition-all duration-300',
              sizeClasses[size],
            ]"
          >
            <div
              class="px-8 py-6 flex items-center justify-between border-b border-slate-50"
            >
              <div class="flex items-center gap-4">
                <div
                  v-if="icon"
                  class="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center"
                >
                  <component :is="icon" :size="24" />
                </div>
                <div>
                  <h3
                    class="text-xl font-black text-slate-900 leading-none uppercase tracking-tight"
                  >
                    <slot name="title">{{ title }}</slot>
                  </h3>
                  <p
                    v-if="subtitle"
                    class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5"
                  >
                    {{ subtitle }}
                  </p>
                </div>
              </div>

              <button
                v-if="showClose"
                @click="$emit('update:modelValue', false)"
                class="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X :size="20" />
              </button>
            </div>

            <div class="flex-1 px-8 py-6 overflow-y-auto max-h-[70vh]">
              <slot></slot>
            </div>

            <div
              v-if="$slots.footer"
              class="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { X } from "lucide-vue-next";

defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: "Thông báo hệ thống" },
  subtitle: { type: String, default: "" },
  icon: { type: Object, default: null },
  showClose: { type: Boolean, default: true },
  size: { type: String, default: "md" }, // sm, md, lg, xl
});

defineEmits(["update:modelValue"]);

const sizeClasses = {
  sm: "w-full max-w-md",
  md: "w-full max-w-xl",
  lg: "w-full max-w-3xl",
  xl: "w-full max-w-5xl",
  full: "w-[95vw] h-[95vh]",
};
</script>

<style scoped>
/* Hiệu ứng mờ nền */
.fade-backdrop-enter-active,
.fade-backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.fade-backdrop-enter-from,
.fade-backdrop-leave-to {
  opacity: 0;
}

/* Hiệu ứng phóng to/thu nhỏ Modal */
.modal-scale-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-scale-leave-active {
  transition: all 0.25s ease-in;
}
.modal-scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Tùy chỉnh thanh cuộn cho body modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
