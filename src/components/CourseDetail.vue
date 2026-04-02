<template>
  <section v-if="lesson" class="w-full">
    <div class="w-full">
      <header class="mb-8">
        <h1
          class="text-4xl font-black text-slate-950 leading-tight mb-3 tracking-tighter uppercase"
        >
          {{ lesson.title }}
        </h1>
        <div class="h-1 w-20 bg-teal-500 rounded-full"></div>
      </header>

      <div class="space-y-12 mt-10 w-full">
        <div
          v-for="(section, index) in lesson.sections"
          :key="section._id"
          class="w-full"
        >
          <h2
            class="text-2xl font-black mt-8 mb-6 uppercase tracking-tighter border-l-4 border-teal-500 pl-4 text-slate-800"
          >
            {{ section.title }}
          </h2>

          <div
            v-if="section.type === 'theory'"
            class="prose prose-slate max-w-none"
          >
            <div
              v-html="section.content"
              class="text-lg leading-relaxed text-slate-700 text-justify rich-content"
            ></div>
          </div>

          <div
            v-if="section.type === 'image'"
            class="my-10 flex justify-center"
          >
            <img
              :src="'http://localhost:5000' + section.content"
              class="max-w-xl h-auto rounded-3xl shadow-xl border-4 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Play } from "lucide-vue-next";
defineProps(["lesson"]);
</script>
<style scoped>
/* Định dạng cho nội dung HTML từ Editor */
.rich-content :deep(p) {
  margin-bottom: 1.5rem;
}
.rich-content :deep(strong) {
  color: #0f172a; /* slate-900 */
  font-weight: 800;
}
.rich-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}
.rich-content :deep(li) {
  margin-bottom: 0.5rem;
}
.rich-content :deep(img) {
  border-radius: 1.5rem;
  margin: 2rem auto;
  display: block;
}
</style>
