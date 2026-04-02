<template>
  <div ref="container" class="viewer-container">
    <Transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="loader"></div>
        <p class="loader-text">Initializing System...</p>
      </div>
    </Transition>

    <div class="ui-panel-top">
      <button @click="isStatsOpen = !isStatsOpen" class="toggle-btn">
        <div class="btn-label">
          <span class="label-sub">Hệ thống</span>
          <span class="label-main">{{
            isStatsOpen ? "Đóng" : "Thông số"
          }}</span>
        </div>
        <div class="btn-icon" :class="{ 'is-active': isStatsOpen }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M19 9l-7 7-7-7"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>

      <Transition name="slide-down">
        <div v-if="isStatsOpen && product?.stats" class="stats-card">
          <div v-for="(val, key) in product.stats" :key="key" class="stat-item">
            <div class="stat-header">
              <span class="stat-key">{{ key }}</span>
              <span class="stat-val">{{ val }}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill"></div></div>
          </div>
        </div>
      </Transition>
    </div>

    <Transition name="slide-up">
      <div v-if="activeSpot" class="hotspot-detail-card">
        <button @click="activeSpot = null" class="close-btn">&times;</button>
        <div class="detail-header flex items-center gap-3 mb-2">
          <div class="spot-id">{{ activeSpot.id }}</div>
          <h4 class="spot-title">{{ activeSpot.title }}</h4>
        </div>
        <p class="spot-desc">{{ activeSpot.desc }}</p>
        <div class="detail-footer uppercase">Linh kiện {{ product.name }}</div>
      </div>
    </Transition>

    <div class="ui-panel-bottom">
      <p class="guide-text">Orbit: Left Click • Zoom: Scroll</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, watch, computed, shallowRef } from "vue";
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

// --- PROPS & EMITS ---
const props = defineProps({
  modelSrc: String,
  admin: { type: Boolean, default: false },
  scale: { type: Number, default: 15 },
  currentMarkerId: { type: Number, default: 1 },
  customHotspots: Array, // Nhận từ BE ở trang Detail
});

const emit = defineEmits(["select-hotspot", "pick-coords", "on-load"]);

// --- STATE ---
const route = useRoute();
const container = ref(null);
const loading = ref(true);
const isStatsOpen = ref(false);
const activeSpot = ref(null);

// Sử dụng shallowRef cho các object Three.js để tăng hiệu năng (Vue không cần track sâu)
const core = {
  scene: null,
  camera: null,
  renderer: null,
  labelRenderer: null,
  controls: null,
  animationId: null,
  currentModel: null,
  raycaster: new THREE.Raycaster(),
  mouse: new THREE.Vector2(),
};

// --- COMPUTED ---
const product = computed(() => {
  if (props.modelSrc) return { name: "UAV Preview", stats: {} };
  const id = parseInt(route.params.id);
  return uavList.find((item) => item.id === id) || { name: "Unknown System" };
});

// --- METHODS ---

const initScene = () => {
  if (!container.value || core.renderer) return;

  // 1. Scene & Environment
  core.scene = new THREE.Scene();
  core.scene.background = new THREE.Color(0x080808);
  core.scene.fog = new THREE.Fog(0x080808, 20, 100);

  core.scene.add(new THREE.GridHelper(60, 40, 0x1e293b, 0x0f172a));
  const polar = new THREE.PolarGridHelper(30, 10, 8, 64, 0x3b82f6, 0x111827);
  polar.material.opacity = 0.1;
  polar.material.transparent = true;
  core.scene.add(polar);

  // 2. Camera
  core.camera = new THREE.PerspectiveCamera(
    40,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000,
  );
  core.camera.position.set(30, 20, 30);

  // 3. Renderers (WebGL + CSS2D)
  core.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  core.renderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight,
  );
  core.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(core.renderer.domElement);

  core.labelRenderer = new CSS2DRenderer();
  core.labelRenderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight,
  );
  Object.assign(core.labelRenderer.domElement.style, {
    position: "absolute",
    top: "0",
    left: "0",
    pointerEvents: "none",
    zIndex: "10",
  });
  container.value.appendChild(core.labelRenderer.domElement);

  // 4. Lights
  core.scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const spotLight = new THREE.SpotLight(0xffffff, 50);
  spotLight.position.set(20, 30, 20);
  core.scene.add(spotLight);

  // 5. Controls
  core.controls = new OrbitControls(core.camera, core.renderer.domElement);
  core.controls.enableDamping = true;

  loadModel();
};

const handleModelSuccess = (gltf) => {
  core.currentModel = gltf.scene;

  // Tự động căn chỉnh Scale và Tâm
  const box = new THREE.Box3().setFromObject(core.currentModel);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const desiredSize = 18;
  const maxDim = Math.max(size.x, size.y, size.z);
  const autoScale = desiredSize / maxDim;

  core.currentModel.scale.set(autoScale, autoScale, autoScale);
  core.currentModel.position.set(
    -center.x * autoScale,
    -center.y * autoScale + 2, // Nâng lên khỏi mặt đất
    -center.z * autoScale,
  );

  core.scene.add(core.currentModel);

  // Load Hotspots: Ưu tiên props BE (Detail), sau đó tới data tĩnh
  const hotspots = props.customHotspots || product.value?.hotspots;
  if (hotspots) setupHotspots(hotspots);

  loading.value = false;
  playEntryAnimation();
};

const loadModel = () => {
  const source = props.modelSrc || product.value?.model3d;
  if (!source) return;

  loading.value = true;
  activeSpot.value = null;
  cleanupExistingModel();

  new GLTFLoader().load(source, handleModelSuccess, undefined, (err) => {
    console.error("3D Load Error:", err);
    loading.value = false;
  });
};

const setupHotspots = (hotspots) => {
  if (!core.currentModel) return;

  // Xóa labels cũ
  const labels = core.currentModel.children.filter((c) => c.isCSS2DObject);
  labels.forEach((l) => core.currentModel.remove(l));

  hotspots.forEach((spot, index) => {
    const el = document.createElement("div");
    el.className = "hotspot-wrapper";
    el.innerHTML = `<div class="hotspot-pulse"></div><div class="hotspot-node">${index + 1}</div>`;

    const label = new CSS2DObject(el);
    label.position.set(spot.pos.x, spot.pos.y, spot.pos.z);
    core.currentModel.add(label);

    el.onclick = (e) => {
      e.stopPropagation();
      flyToSpot(spot, label);
      emit("select-hotspot", spot);
    };
  });
};

const flyToSpot = (spot, label) => {
  activeSpot.value = spot;
  const worldPos = new THREE.Vector3();
  label.getWorldPosition(worldPos);

  gsap.to(core.camera.position, {
    x: worldPos.x + 8,
    y: worldPos.y + 4,
    z: worldPos.z + 8,
    duration: 1.2,
    ease: "power3.inOut",
  });

  gsap.to(core.controls.target, {
    x: worldPos.x,
    y: worldPos.y,
    z: worldPos.z,
    duration: 1.2,
    onUpdate: () => core.controls.update(),
  });
};

const initRaycaster = () => {
  core.renderer.domElement.addEventListener("click", (event) => {
    if (!core.currentModel) return;

    const rect = core.renderer.domElement.getBoundingClientRect();
    core.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    core.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    core.raycaster.setFromCamera(core.mouse, core.camera);
    const intersects = core.raycaster.intersectObject(core.currentModel, true);

    if (intersects.length > 0) {
      const localPos = core.currentModel.worldToLocal(
        intersects[0].point.clone(),
      );
      emit("pick-coords", {
        x: localPos.x.toFixed(3),
        y: localPos.y.toFixed(3),
        z: localPos.z.toFixed(3),
      });
      showTemporaryMarker(localPos);
    }
  });
};

// --- MARKERS (ADMIN) ---
const showTemporaryMarker = (pos) => {
  const markerId = props.currentMarkerId;
  if (!markerId) return;

  const existing = core.currentModel.children.find(
    (c) => c.name === `marker-${markerId}`,
  );
  if (existing) core.currentModel.remove(existing);

  const marker = createMarkerSprite(pos, markerId);
  marker.name = `marker-${markerId}`;
  core.currentModel.add(marker);
};

const createMarkerSprite = (pos, number) => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#00f2ff";
  ctx.beginPath();
  ctx.arc(64, 64, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(number, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, depthTest: false });
  const sprite = new THREE.Sprite(material);

  const s = 1.2 / core.currentModel.scale.x;
  sprite.scale.set(s, s, 1);
  sprite.position.copy(pos);
  return sprite;
};

// --- CLEANUP ---
const cleanupExistingModel = () => {
  if (!core.currentModel) return;
  core.scene.remove(core.currentModel);
  core.currentModel.traverse((n) => {
    if (n.isMesh) {
      n.geometry.dispose();
      Array.isArray(n.material)
        ? n.material.forEach((m) => m.dispose())
        : n.material.dispose();
    }
  });
  core.currentModel = null;
};

// --- WATCHERS ---
watch(() => props.modelSrc, loadModel);
watch(
  () => props.customHotspots,
  (newVal) => {
    if (newVal && core.currentModel) setupHotspots(newVal);
  },
  { deep: true },
);

// --- LIFECYCLE ---
const animate = () => {
  core.animationId = requestAnimationFrame(animate);
  core.controls?.update();
  core.renderer?.render(core.scene, core.camera);
  core.labelRenderer?.render(core.scene, core.camera);
};

const handleResize = () => {
  if (!container.value) return;
  const w = container.value.clientWidth;
  const h = container.value.clientHeight;
  core.camera.aspect = w / h;
  core.camera.updateProjectionMatrix();
  core.renderer.setSize(w, h);
  core.labelRenderer.setSize(w, h);
};

onMounted(() => {
  initScene();
  if (props.admin) initRaycaster();
  animate();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  cancelAnimationFrame(core.animationId);
  if (core.renderer) {
    core.renderer.dispose();
    core.renderer.domElement.remove();
  }
  if (core.labelRenderer) core.labelRenderer.domElement.remove();
});

defineExpose({ flyToSpot });
</script>

<style scoped>
.viewer-container {
  width: 100%;
  height: 700px;
  position: relative;
  background: #080808;
  border-radius: 1.5rem;
  overflow: hidden;
}

/* Hotspot Detail Card */
.hotspot-detail-card {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 40;
  width: 500px;
  background: rgba(37, 99, 235, 0.85);
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  color: white;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0.5rem;
  font-size: 1.5rem;
  opacity: 0.5;
  cursor: pointer;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.spot-id {
  width: 30px;
  height: 30px;
  background: white;
  color: #2563eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 10px;
}
.spot-title {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.05em;
}
.spot-desc {
  font-size: 11px;
  line-height: 1.6;
  opacity: 0.9;
}
.detail-footer {
  margin-top: 1rem;
  font-size: 8px;
  font-weight: 900;
  opacity: 0.3;
  text-align: right;
}

/* Stats Panel */
.ui-panel-top {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}
.toggle-btn {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.4);
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}
.label-sub {
  font-size: 8px;
  color: #60a5fa;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
}
.label-main {
  font-size: 11px;
  color: white;
  font-weight: 800;
  text-transform: uppercase;
}
.btn-icon {
  width: 28px;
  height: 28px;
  background: #3b82f6;
  border-radius: 0.5rem;
  color: white;
  display: flex;
  items-center: center;
  justify-content: center;
  transition: 0.4s;
}
.btn-icon.is-active {
  transform: rotate(180deg);
}
.stats-card {
  width: 240px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Common 3D UI */
:deep(.hotspot-wrapper) {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  pointer-events: auto;
}
:deep(.hotspot-pulse) {
  position: absolute;
  inset: -4px;
  /* border: 2px solid #3b82f6; */
  border-radius: 50%;
  animation: pulse 2s infinite;
}
:deep(.hotspot-node) {
  width: 24px;
  height: 24px;
  background: #3b82f6;
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 10px;
  z-index: 2;
  position: relative;
}

@keyframes pulse {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
