<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <TheHeader />

    <router-view />

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from "./components/Header.vue";
import TheFooter from "./components/Footer.vue";
</script>
