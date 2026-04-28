<template>
  <Teleport to="body">
    <Transition name="fade-backdrop">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 p-4"
        @click.self="$emit('update:modelValue', false)"
      >
        <Transition name="modal-scale">
          <div
            v-if="modelValue"
            :class="[
              'bg-white rounded-2xl shadow-xl relative flex flex-col transition-all duration-300',
              sizeClasses[size],
            ]"
          >
            <div
              class="px-6 py-5 flex items-start justify-between border-b border-gray-100"
            >
              <div class="flex items-center gap-4">
                <div
                  v-if="icon"
                  class="w-12 h-12 bg-blue-50 text-[#1a2b4c] rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50"
                >
                  <component :is="icon" :size="22" stroke-width="2.5" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">
                    <slot name="title">{{ title }}</slot>
                  </h3>
                  <p
                    v-if="subtitle"
                    class="text-sm font-medium text-gray-500 mt-0.5"
                  >
                    {{ subtitle }}
                  </p>
                </div>
              </div>

              <button
                v-if="showClose"
                @click="$emit('update:modelValue', false)"
                class="p-2 -mr-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Đóng"
              >
                <X :size="20" />
              </button>
            </div>

            <div
              class="flex-1 px-6 py-6 overflow-y-auto max-h-[75vh] custom-scrollbar"
            >
              <slot></slot>
            </div>

            <div
              v-if="$slots.footer"
              class="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl"
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
  size: { type: String, default: "md" }, // sm, md, lg, xl, full
});

defineEmits(["update:modelValue"]);

const sizeClasses = {
  sm: "w-full max-w-sm",
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

/* Hiệu ứng phóng to/thu nhỏ Modal mượt mà hơn */
.modal-scale-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-scale-leave-active {
  transition: all 0.2s ease-in;
}
.modal-scale-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(15px);
}
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(10px);
}

/* Tùy chỉnh thanh cuộn cho body modal đồng bộ với app */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #94a3b8;
}
</style>
