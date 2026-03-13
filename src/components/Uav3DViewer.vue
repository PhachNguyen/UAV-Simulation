<template>
  <div
    ref="container"
    class="w-full h-[600px] rounded-2xl overflow-hidden relative shadow-2xl bg-[#0d0d0d] border border-white/5"
  >
    <div
      v-if="loading"
      class="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-white text-sm font-bold tracking-widest uppercase">
          Loading Model...
        </p>
      </div>
    </div>

    <div class="absolute bottom-6 left-6 z-10 hidden md:block">
      <p class="text-white/40 text-[10px] uppercase tracking-tighter">
        Chuột trái: Xoay • Chuột phải: Di chuyển • Cuộn: Thu phóng
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import gsap from "gsap";
import { uavList } from "../data/uavData";

// --- STATE & ROUTE ---
const route = useRoute();
const container = ref(null);
const loading = ref(true);
const emit = defineEmits(["select-hotspot"]);

// Lấy dữ liệu sản phẩm từ URL ID
const product = computed(() => {
  const id = parseInt(route.params.id);
  return uavList.find((item) => item.id === id);
});

// --- THREE.JS VARIABLES ---
let scene, camera, renderer, labelRenderer, controls, animationId, currentModel;

// --- LOGIC KHỞI TẠO ---
const initScene = () => {
  if (!container.value) return;

  // 1. Scene & Background
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0d);

  // 2. Camera
  camera = new THREE.PerspectiveCamera(
    45,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(20, 15, 20);

  // 3. Renderers (WebGL & CSS2D)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight,
  );
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  container.value.appendChild(labelRenderer.domElement);

  // 4. Ánh sáng
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 10);
  spotLight.position.set(15, 20, 15);
  scene.add(spotLight);

  // 5. Điều khiển xoay
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Bắt đầu load model nếu có dữ liệu
  if (product.value) {
    loadModel(product.value);
  }
};

const loadModel = (data) => {
  if (!data?.model3d) return;
  loading.ref = true;

  // Dọn dẹp model và hotspots cũ
  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }

  const loader = new GLTFLoader();
  loader.load(
    data.model3d,
    (gltf) => {
      currentModel = gltf.scene;

      // Auto-centering & Scaling
      const box = new THREE.Box3().setFromObject(currentModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 12 / maxDim;
      currentModel.scale.set(scale, scale, scale);

      currentModel.position.x = -center.x * scale;
      currentModel.position.y = -center.y * scale + 2; // Nâng lên mặt sàn
      currentModel.position.z = -center.z * scale;

      scene.add(currentModel);

      // Thêm Hotspots
      if (data.hotspots) {
        setupHotspots(data.hotspots);
      }

      loading.value = false;
    },
    undefined,
    (error) => {
      console.error("Lỗi load model:", error);
      loading.value = false;
    },
  );
};

const setupHotspots = (hotspots) => {
  hotspots.forEach((spot) => {
    const div = document.createElement("div");
    div.className = "hotspot-marker";
    div.textContent = spot.id;
    div.style.pointerEvents = "auto";

    const label = new CSS2DObject(div);
    label.position.set(spot.pos.x, spot.pos.y, spot.pos.z);
    currentModel.add(label);

    div.onclick = () => {
      const worldPos = new THREE.Vector3();
      label.getWorldPosition(worldPos);

      gsap.to(camera.position, {
        x: worldPos.x + 6,
        y: worldPos.y + 3,
        z: worldPos.z + 6,
        duration: 1.5,
        ease: "power3.inOut",
      });

      gsap.to(controls.target, {
        x: worldPos.x,
        y: worldPos.y,
        z: worldPos.z,
        duration: 1.5,
        onUpdate: () => controls.update(),
      });

      emit("select-hotspot", spot);
    };
  });
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  if (controls) controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }
};

const handleResize = () => {
  if (!container.value) return;
  const w = container.value.clientWidth;
  const h = container.value.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
};

// --- WATCHERS & LIFECYCLE ---
watch(product, (newVal) => {
  if (newVal && scene) loadModel(newVal);
});

onMounted(() => {
  initScene();
  animate();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  cancelAnimationFrame(animationId);
  if (renderer) renderer.dispose();
  if (labelRenderer) labelRenderer.domElement.remove();
  scene = null;
  camera = null;
  renderer = null;
});
</script>

<style scoped>
:deep(.hotspot-marker) {
  width: 28px;
  height: 28px;
  background: rgba(59, 130, 246, 0.8);
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

:deep(.hotspot-marker:hover) {
  background: #3b82f6;
  transform: scale(1.2);
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.8);
}
</style>
