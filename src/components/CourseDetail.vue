<template>
  <section
    v-if="lesson"
    class="flex-1 overflow-y-auto bg-white custom-scrollbar"
  >
    <div class="max-w-4xl mx-auto p-10">
      <header class="mb-8">
        <h1
          class="text-4xl font-black text-slate-900 leading-tight mb-3 italic tracking-tighter uppercase"
        >
          {{ lesson.title }}
        </h1>
      </header>

      <div class="space-y-6 mt-10">
        <div v-for="(item, index) in lesson.content" :key="index">
          <h3
            v-if="item.type === 'heading'"
            class="text-2xl font-black text-slate-800 mt-8 mb-4 italic uppercase tracking-tighter border-l-4 border-teal-500 pl-4"
          >
            {{ item.text }}
          </h3>

          <p
            v-if="item.type === 'paragraph'"
            class="text-lg text-slate-600 leading-relaxed mb-4"
          >
            {{ item.text }}
          </p>

          <ul v-if="item.type === 'list'" class="space-y-4 ml-6">
            <li
              v-for="li in item.items"
              :key="li"
              class="text-lg text-slate-600 list-disc marker:text-teal-500"
            >
              <span
                v-html="
                  li.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class=\'text-slate-900\'>$1</strong>',
                  )
                "
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div
    v-else
    class="flex-1 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest"
  >
    Đang tải nội dung bài học...
  </div>
</template>
<script setup>
import { Play } from "lucide-vue-next";
defineProps(["lesson"]);
</script>
