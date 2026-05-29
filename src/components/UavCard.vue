<template>
  <div
    class="cursor-pointer bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col p-5"
  >
    <div class="h-40 flex items-center justify-center mb-4">
      <img
        :src="`http://localhost:5000${drone.image}`"
        :alt="drone.name"
        class="max-h-full object-contain hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div class="flex-1 flex flex-col">
      <h4
        class="text-[#1A5276] text-xl font-bold mb-2 tracking-tight leading-tight"
      >
        {{ drone.name }}
      </h4>

   <div class="line-clamp-3 text-[13px] text-slate-600 leading-relaxed mb-4 justify-end">
  <span class="text-[11px] font-bold text-slate-800 mr-1 ">
    Mô tả về {{ drone.name }} :
  </span>
  {{ drone.description }}
</div>
      <!-- <div
        class="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-700 mb-6"
      >
        <div class="flex items-start">
          <span class="mr-1 mt-[1px]">&bull;</span>
          <span class="font-bold mr-1">Trọng lượng:</span>
          <span class="truncate">{{ drone.weight }}</span>
        </div>
        <div class="flex items-start">
          <span class="mr-1 mt-[1px]">&bull;</span>
          <span class="font-bold mr-1">Phạm vi:</span>
          <span class="truncate">{{ drone.range }}</span>
        </div>
        <div class="flex items-start">
          <span class="mr-1 mt-[1px]">&bull;</span>
          <span class="font-bold mr-1 whitespace-nowrap">Tốc độ tối đa:</span>
          <span class="truncate">{{ drone.speed }}</span>
        </div>
        <div class="flex items-start">
          <span class="mr-1 mt-[1px]">&bull;</span>
          <span class="font-bold mr-1">Camera:</span>
          <span class="truncate">{{ drone.camera }}</span>
        </div>
        <div class="flex items-start">
          <span class="mr-1 mt-[1px]">&bull;</span>
          <span class="font-bold mr-1">Cảm biến:</span>
          <span class="truncate">{{ drone.sensors }}</span>
        </div>
        <div class="flex items-start">
          <span class="mr-1 mt-[1px]">&bull;</span>
          <span class="font-bold mr-1">Thời gian bay:</span>
          <span class="truncate">{{ drone.flight_time }} phút</span>
        </div>
      </div> -->

      <div class="mt-auto border-t border-slate-100">
        <button
          @click="$emit('details', drone.id)"
          class="cursor-pointer w-full bg-[#1d293d] hover:bg-[#0f172a] text-white py-2 rounded-md font-medium text-sm transition-colors"
          :title="`Xem chi tiết về ${drone.name}`"
        >
          Tìm hiểu thêm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nhận dữ liệu từ component cha thông qua props
defineProps({
  drone: {
    type: Object,
    required: true,
  },
});

// Khai báo sự kiện (emit) để báo cho cha khi người dùng nhấn nút
defineEmits(["details"]);
</script>
