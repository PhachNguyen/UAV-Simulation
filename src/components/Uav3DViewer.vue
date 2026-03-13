<template>
  <div
    ref="container"
    class="w-full h-[600px] rounded-2xl overflow-hidden relative shadow-2xl bg-[#080808] border border-white/5"
  >
    <Transition name="fade">
      <div
        v-if="loading"
        class="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-md"
      >
        <div class="flex flex-col items-center">
          <div
            class="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"
          ></div>
          <p
            class="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            Initializing System...
          </p>
        </div>
      </div>
    </Transition>

    <div
      class="absolute bottom-6 left-6 z-10 opacity-30 hover:opacity-100 transition-opacity duration-500"
    >
      <p
        class="text-white text-[10px] uppercase font-bold tracking-widest flex gap-4"
      >
        <span>Orbit: Left Click</span>
        <span>Zoom: Scroll</span>
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

const route = useRoute();
const container = ref(null);
const loading = ref(true);
const emit = defineEmits(["select-hotspot"]);

const product = computed(() => {
  const id = parseInt(route.params.id);
  return uavList.find((item) => item.id === id);
});

let scene, camera, renderer, labelRenderer, controls, animationId, currentModel;

const initScene = () => {
  if (!container.value) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080808);
  // Sương mù nhẹ tạo chiều sâu không gian
  scene.fog = new THREE.Fog(0x080808, 20, 100);

  // --- 1. HỆ THỐNG LƯỚI (GRID & RADAR) ---
  const mainGrid = new THREE.GridHelper(60, 40, 0x1e293b, 0x0f172a);
  mainGrid.position.y = -0.01;
  scene.add(mainGrid);

  const polarGrid = new THREE.PolarGridHelper(
    30,
    10,
    8,
    64,
    0x3b82f6,
    0x111827,
  );
  polarGrid.position.y = -0.02;
  polarGrid.material.opacity = 0.15;
  polarGrid.material.transparent = true;
  scene.add(polarGrid);

  // --- 2. CAMERA ---
  camera = new THREE.PerspectiveCamera(
    40,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(30, 20, 30);

  // --- 3. RENDERERS ---
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.value.appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight,
  );
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.left = "0px"; // Căn lề trái để fix lỗi lệch
  labelRenderer.domElement.style.width = "100%"; // Ép chiều rộng
  labelRenderer.domElement.style.height = "100%";
  labelRenderer.domElement.style.pointerEvents = "none";
  labelRenderer.domElement.style.zIndex = "10";
  container.value.appendChild(labelRenderer.domElement);

  // --- 4. LIGHTING ---
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const spotLight = new THREE.SpotLight(0xffffff, 50);
  spotLight.position.set(20, 30, 20);
  scene.add(spotLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  if (product.value) loadModel(product.value);
};

const loadModel = (data) => {
  if (!data?.model3d) return;
  loading.value = true;

  if (currentModel) scene.remove(currentModel);

  const loader = new GLTFLoader();
  loader.load(data.model3d, (gltf) => {
    currentModel = gltf.scene;

    // Căn giữa & Scale
    const box = new THREE.Box3().setFromObject(currentModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const scale = 15 / Math.max(size.x, size.y, size.z);

    currentModel.scale.set(scale, scale, scale);
    currentModel.position.set(
      -center.x * scale,
      -center.y * scale + 3,
      -center.z * scale,
    );

    scene.add(currentModel);
    if (data.hotspots) setupHotspots(data.hotspots);

    loading.value = false;

    // Animation camera mượt khi mới vào
    gsap.from(camera.position, {
      x: 50,
      y: 40,
      z: 50,
      duration: 2,
      ease: "power2.out",
    });
  });
};

const setupHotspots = (hotspots) => {
  hotspots.forEach((spot) => {
    const wrapper = document.createElement("div");
    wrapper.className = "hotspot-container";

    // Vòng radar nhấp nháy (Pulse)
    const pulse = document.createElement("div");
    pulse.className = "hotspot-pulse";

    // Nốt số chính
    const dot = document.createElement("div");
    dot.className = "hotspot-dot";
    dot.textContent = spot.id;

    wrapper.appendChild(pulse);
    wrapper.appendChild(dot);

    const label = new CSS2DObject(wrapper);
    label.position.set(spot.pos.x, spot.pos.y, spot.pos.z);
    currentModel.add(label);

    wrapper.style.pointerEvents = "auto";
    wrapper.onclick = (e) => {
      e.stopPropagation();
      const worldPos = new THREE.Vector3();
      label.getWorldPosition(worldPos);

      gsap.to(camera.position, {
        x: worldPos.x + 8,
        y: worldPos.y + 4,
        z: worldPos.z + 8,
        duration: 1.2,
        ease: "power3.inOut",
      });
      gsap.to(controls.target, {
        x: worldPos.x,
        y: worldPos.y,
        z: worldPos.z,
        duration: 1.2,
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
  camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  labelRenderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight,
  );
};

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
  scene = null;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* FIX LỖI VỊ TRÍ & THÊM ANIMATION */
:deep(.hotspot-container) {
  position: absolute;
  /* Đưa tâm của div về đúng tọa độ 3D */
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

/* :deep(.hotspot-pulse) {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #3b82f6;
  animation: hotspot-ripple 2s infinite;
} */

:deep(.hotspot-dot) {
  width: 24px;
  height: 24px;
  /* background: rgba(59, 130, 246, 0.9); */
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 10px;
  /* box-shadow: 0 0 15px rgba(59, 130, 246, 0.8); */
  z-index: 2;
  transition: all 0.3s ease;
}

@keyframes hotspot-ripple {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

@keyframes hotspot-pop {
  0% {
    transform: translate(-50%, -50%) scale(0) translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
