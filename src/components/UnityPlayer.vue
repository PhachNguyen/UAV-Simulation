<template>
  <div class="unity-container">
    <canvas
      id="unity-canvas"
      ref="canvasRef"
      style="width: 100%; height: 600px; background: #231f20"
    ></canvas>

    <div v-if="loadingProgress < 100" class="loading-overlay">
      <div class="progress-bar">
        Đang tải mô phỏng UAV: {{ loadingProgress }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";

const canvasRef = ref(null);
const loadingProgress = ref(0);
let unityInstance = null;

onMounted(() => {
  // ĐÚNG: Bỏ chữ /public đi.
  // Ví dụ file ở: public/unity/Build/loader.js -> path là: /unity/Build/loader.js
  const loaderUrl = "/unity/Build/vue-unity-webgl.loader.js";

  const config = {
    dataUrl: "/unity/Build/vue-unity-webgl.data.br",
    frameworkUrl: "/unity/Build/vue-unity-webgl.framework.js.br",
    codeUrl: "/unity/Build/vue-unity-webgl.wasm.br",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "UAV_Simulation",
    productVersion: "0.1",
  };

  const script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    // eslint-disable-next-line no-undef
    createUnityInstance(canvasRef.value, config, (progress) => {
      loadingProgress.value = Math.round(100 * progress);
    })
      .then((instance) => {
        unityInstance = instance;
        window.unityInstance = instance;
        console.log("Mô phỏng UAV đã sẵn sàng!");
      })
      .catch((err) => {
        console.error("Lỗi khởi tạo Unity:", err);
      });
  };
  document.body.appendChild(script);
});

onBeforeUnmount(() => {
  if (unityInstance) {
    unityInstance.Quit();
  }
});
</script>

<style scoped>
.unity-container {
  position: relative;
  width: 100%;
  border: 2px solid #444;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.progress-bar {
  font-family: sans-serif;
  font-size: 1.2rem;
}
</style>
