<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <TheHeader v-if="!$route.meta.hideHeaderFooter" />

    <router-view />

    <TheFooter v-if="!(route.meta.hideHeaderFooter || route.meta.hideFooter)" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import TheHeader from "./components/Header.vue";
import TheFooter from "./components/Footer.vue";

const route = useRoute();
</script>
