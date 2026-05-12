<template>
  <div class="unity-container">
    <button class="back-btn" @click="goBack">
      <span class="icon">←</span> Quay lại
    </button>

    <div v-if="!isLoggedIn" class="w-full h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div class="bg-white p-10 rounded-2xl shadow-sm ring-1 ring-slate-200/60 text-center max-w-[500px] w-full mx-4">
        <div class="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <i class="ph ph-user-circle text-3xl text-slate-900"></i>
        </div>
        
        <h2 class="text-2xl font-bold text-slate-900 mb-3">Bạn cần đăng nhập để xem</h2>
        <p class="text-slate-500 text-sm mb-8 leading-relaxed">
          Đăng nhập tài khoản học viên để mở khóa không gian mô phỏng UAV 3D và lưu tiến độ học tập.
        </p>
        
        <button @click="goToLogin" class="bg-[#0F172B] text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm">
          Đăng nhập
        </button>
      </div>
    </div>

    <template v-else>
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
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const canvasRef = ref(null);
const loadingProgress = ref(0);
let unityInstance = null;

// ==========================================
// KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP
// ==========================================
// Đọc token từ LocalStorage. 
// LƯU Ý: Thay chữ "access_token" bằng đúng cái tên (key) mà dự án của bạn đang dùng để lưu token khi login thành công nhé!
const checkAuth = () => {
  const token = localStorage.getItem("userToken"); 
  return !!token; // Trả về true nếu có token, false nếu không có
};

const isLoggedIn = ref(checkAuth());

// ==========================================
// CÁC HÀM XỬ LÝ (METHODS)
// ==========================================
const goToLogin = () => {
  router.push("/login"); // Đảm bảo route này đúng với file router của bạn
};

const goBack = () => {
  // Nếu Unity đang chạy thì phải tắt nó trước khi back về trang trước để tránh rò rỉ bộ nhớ
  if (unityInstance) {
    unityInstance.Quit();
  }
  router.back();
};

const initUnity = () => {
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
};

// ==========================================
// VÒNG ĐỜI VUE (LIFECYCLE)
// ==========================================
onMounted(() => {
  // Chỉ tải Unity nặng nề khi người dùng ĐÃ đăng nhập
  if (isLoggedIn.value) {
    initUnity();
  }
});

onBeforeUnmount(() => {
  // Đảm bảo dọn dẹp Unity khi người dùng chuyển sang component/trang khác
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
  background-color: #F8FAFC;
}

/* Style cho nút quay lại */
.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 50; 
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
  background-color: #ff4757;
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
  z-index: 40;
}
.progress-bar {
  font-family: sans-serif;
  font-size: 1.2rem;
}
</style>