<template>
  <section v-if="lesson" class="w-full">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-8">
        <h1
          class="text-4xl font-black text-slate-950 leading-tight mb-3 tracking-tighter uppercase"
        >
          {{ lesson.title }}
        </h1>
      </header>
      <!-- Nội dung -->
      <div class="space-y-6 mt-10 w-full">
        <div
          v-for="(item, index) in lesson.content"
          :key="index"
          class="w-full"
        >
          <!-- Tiêu đề -->
          <h2
            v-if="item.type === 'heading'"
            style="margin: 10px 0px"
            class="text-2xl font-black mt-8 mb-4 uppercase tracking-tighter border-l-4 border-gray-500 pl-4"
          >
            {{ item.text }}
          </h2>
          <!-- Nội dung  -->
          <p
            v-if="item.type === 'paragraph'"
            class="text-lg leading-relaxed mb-4 text-justify"
          >
            {{ item.text }}
          </p>
          <div v-if="item.type === 'image'" class="my-10 flex justify-center">
            <img
              :src="item.src"
              :alt="item.alt"
              class="max-w-xl h-auto rounded-3xl shadow-xl border-4 border-white"
            />
          </div>
          <ul v-if="item.type === 'list'" class="space-y-4 ml-6">
            <li
              v-for="li in item.items"
              :key="li"
              class="text-lg list-disc marker:text-teal-500"
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
</template>
<script setup>
import { Play } from "lucide-vue-next";
defineProps(["lesson"]);
</script>
