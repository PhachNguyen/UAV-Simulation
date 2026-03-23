<template>
  <div class="unity-container">
    <button class="back-btn" @click="goBack">
      <span class="icon">←</span> Quay lại
    </button>

    <canvas
      id="unity-canvas"
      ref="canvasRef"
      style="width: 100%; height: 100vh; background: #231f20"
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
import { useRouter } from "vue-router"; // Import router

const router = useRouter();
const canvasRef = ref(null);
const loadingProgress = ref(0);
let unityInstance = null;

// Hàm quay trở lại trang trước đó
const goBack = () => {
  // UnityInstance.Quit() sẽ tự động được gọi nhờ onBeforeUnmount bên dưới
  router.back();
};

onMounted(() => {
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
    console.log("Đang đóng Unity...");
    unityInstance.Quit();
  }
});
</script>

<style scoped>
.unity-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid #444;
}

/* Style cho nút quay lại */
.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10; /* Đảm bảo nằm trên cùng */
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: 1px solid #ffffff55;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-btn:hover {
  background-color: #ff4757; /* Màu đỏ khi di chuột vào */
  border-color: #ff4757;
  transform: scale(1.05);
}

.icon {
  font-size: 1.2rem;
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
