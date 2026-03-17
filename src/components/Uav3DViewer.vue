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
const isStatsOpen = ref(false);
const activeSpot = ref(null); // Lưu hotspot đang chọn
const props = defineProps({
  modelSrc: String, // Dùng cho Admin Preview (Blob URL)
  scale: { type: Number, default: 15 },
  customHotspots: Array, // Nếu muốn truyền hotspots từ form admin vào xem thử
});
const emit = defineEmits(["select-hotspot", "on-load"]);

// Xác định dữ liệu nguồn: Ưu tiên props (Admin), sau đó mới tới route (Detail)
const product = computed(() => {
  if (props.modelSrc) return null;
  const id = parseInt(route.params.id);
  return uavList.find((item) => item.id === id);
});
let scene, camera, renderer, labelRenderer, controls, animationId, currentModel;
//  Props nhận
const initScene = () => {
  if (!container.value) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080808);
  scene.fog = new THREE.Fog(0x080808, 20, 100);

  // Môi trường Grid
  scene.add(new THREE.GridHelper(60, 40, 0x1e293b, 0x0f172a));
  const polar = new THREE.PolarGridHelper(30, 10, 8, 64, 0x3b82f6, 0x111827);
  polar.material.opacity = 0.1;
  polar.material.transparent = true;
  scene.add(polar);

  camera = new THREE.PerspectiveCamera(
    40,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(30, 20, 30);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight,
  );
  Object.assign(labelRenderer.domElement.style, {
    position: "absolute",
    top: "0",
    left: "0",
    pointerEvents: "none",
    zIndex: "10",
  });
  container.value.appendChild(labelRenderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const spot = new THREE.SpotLight(0xffffff, 50);
  spot.position.set(20, 30, 20);
  scene.add(spot);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Sửa dòng cuối thành:
  // debugger;
  loadModel(product.value);
};
const cleanupExistingModel = () => {
  if (!currentModel) return;

  scene.remove(currentModel);
  currentModel.traverse((node) => {
    if (node.isMesh) {
      node.geometry.dispose();
      // Xử lý nếu material là mảng hoặc đơn lẻ
      if (Array.isArray(node.material)) {
        node.material.forEach((m) => m.dispose());
      } else {
        node.material.dispose();
      }
    }
  });
  currentModel = null;
};
const playEntryAnimation = () => {
  gsap.from(camera.position, {
    x: camera.position.x + 20,
    y: camera.position.y + 20,
    z: camera.position.z + 20,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => controls.update(),
  });
};
// Thêm watcher này vào phần script setup
watch(
  () => props.modelSrc,
  (newSrc) => {
    if (newSrc && scene) {
      // Gọi loadModel với tham số rỗng vì source sẽ được lấy ưu tiên từ props
      loadModel();
    }
  },
);
// Thêm biến đếm số thứ tự
let markerCount = 0;

const createMarkerWithNumber = (pos, number) => {
  const canvas = document.createElement("canvas");
  canvas.width = 128; // Tăng độ phân giải cho nét
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // Vẽ nền hình tròn Glow
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#00f2ff";
  ctx.fillStyle = "#00f2ff";
  ctx.beginPath();
  ctx.arc(64, 64, 50, 0, Math.PI * 2);
  ctx.fill();

  // Vẽ số thứ tự
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px Orbitron, Arial"; // Font công nghệ nếu có
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(number, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    depthTest: false, // Luôn hiện đè lên Model để dễ nhìn
    sizeAttenuation: true,
  });

  const sprite = new THREE.Sprite(spriteMaterial);

  // --- QUAN TRỌNG: KHỬ SCALE CỦA MODEL ---
  // Giả sử autoScale của bạn là 15, ta chia 1.2 cho 15 để Marker luôn có kích thước ~1.2 đơn vị
  const s = 1.2 / currentModel.scale.x;
  sprite.scale.set(s, s, 1);

  sprite.position.set(pos.x, pos.y, pos.z);
  return sprite;
};

const showTemporaryMarker = (pos) => {
  if (!currentModel) return;

  // Tăng số thứ tự
  markerCount++;

  const marker = createMarkerWithNumber(pos, markerCount);

  // Add vào model để nó dính chặt vào drone
  currentModel.add(marker);
};
//  Hàm lấy tọa độ hotspot khi click vào model (dành cho Admin)
const initRaycaster = () => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Lắng nghe trên canvas của WebGL thay vì container div
  renderer.domElement.addEventListener("click", (event) => {
    if (!currentModel) return;

    // Tính toán lại tọa độ chuột chuẩn xác theo Canvas
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Kiểm tra va chạm (intersect)
    const intersects = raycaster.intersectObject(currentModel, true);

    if (intersects.length > 0) {
      // Lấy điểm va chạm và chuyển sang Local của Drone
      const localPos = currentModel.worldToLocal(intersects[0].point.clone());

      // LOG RA CONSOLE ĐỂ KIỂM TRA
      console.log(`✅ Đã lấy tọa độ (ID: ${markerCount + 1}):`, {
        x: localPos.x.toFixed(3),
        y: localPos.y.toFixed(3),
        z: localPos.z.toFixed(3),
      });

      // Gửi tọa độ về trang Admin
      emit("pick-coords", {
        x: localPos.x.toFixed(3),
        y: localPos.y.toFixed(3),
        z: localPos.z.toFixed(3),
      });

      showTemporaryMarker(localPos);
    } else {
      console.warn("⚠️ Click trượt model UAV rồi Phách ơi!");
    }
  });
};
const handleModelSuccess = (gltf, data) => {
  currentModel = gltf.scene;

  // 1. Tạo một Bounding Box để bao quanh toàn bộ model
  const box = new THREE.Box3().setFromObject(currentModel);

  // 2. Lấy kích thước (size) và tâm (center) của model
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // 3. TỰ ĐỘNG TÍNH TOÀN SCALE
  // Chúng ta muốn cạnh lớn nhất của drone sẽ dài khoảng 18 đơn vị trong Scene
  const desiredSize = 18;
  const maxDimension = Math.max(size.x, size.y, size.z);
  const autoScale = desiredSize / maxDimension;

  // 4. Áp dụng scale
  // Nếu là Admin và bạn vẫn muốn can thiệp thủ công, có thể nhân thêm props.scale
  // Nhưng ở đây mình ưu tiên tự động hoàn toàn:
  currentModel.scale.set(autoScale, autoScale, autoScale);

  // 5. CĂN GIỮA MODEL (Quan trọng để xoay không bị lệch)
  // Đưa model về tâm (0,0,0) và nâng lên một chút để nằm trên mặt lưới (Grid)
  currentModel.position.set(
    -center.x * autoScale,
    -center.y * autoScale + 2, // Nâng nhẹ lên khỏi mặt đất
    -center.z * autoScale,
  );

  scene.add(currentModel);

  // 6. Hiển thị Hotspots
  const hotspots = props.customHotspots || data?.hotspots;
  if (hotspots) {
    setupHotspots(hotspots);
  }

  loading.value = false;
  playEntryAnimation();
};
const loadModel = (data) => {
  // Ưu tiên modelSrc từ props (dành cho Admin Preview), nếu không có thì lấy từ data
  const source = props.modelSrc || data?.model3d;

  if (!source) return;

  loading.value = true;
  activeSpot.value = null;

  // 1. Dọn dẹp bộ nhớ (Memory Cleanup)
  cleanupExistingModel();

  // 2. Tải Model mới
  const loader = new GLTFLoader();
  loader.load(
    source,
    (gltf) => handleModelSuccess(gltf, data),
    undefined, // Progress callback (có thể thêm nếu muốn hiện % load)
    (error) => console.error("Lỗi khi tải model UAV:", error),
  );
};

const setupHotspots = (hotspots) => {
  hotspots.forEach((spot) => {
    const el = document.createElement("div");
    el.className = "hotspot-wrapper";
    el.innerHTML = `<div class="hotspot-pulse"></div><div class="hotspot-node">${spot.id}</div>`;

    const label = new CSS2DObject(el);
    label.position.set(spot.pos.x, spot.pos.y, spot.pos.z);
    currentModel.add(label);

    el.onclick = (e) => {
      e.stopPropagation();
      activeSpot.value = spot; // Hiển thị title/desc

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
  controls?.update();
  renderer?.render(scene, camera);
  labelRenderer?.render(scene, camera);
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

watch(product, (v) => v && scene && loadModel(v));
onMounted(() => {
  // const raycaster = new THREE.Raycaster();
  // const mouse = new THREE.Vector2();

  // window.addEventListener("click", (event) => {
  //   // Tính toán vị trí chuột trong không gian 2D của container
  //   const rect = container.value.getBoundingClientRect();
  //   mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  //   mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  //   raycaster.setFromCamera(mouse, camera);

  //   // Kiểm tra va chạm với currentModel
  //   if (currentModel) {
  //     const intersects = raycaster.intersectObject(currentModel, true);
  //     if (intersects.length > 0) {
  //       const p = intersects[0].point;
  //       // Chuyển tọa độ thế giới về tọa độ local của Model (vì bạn gắn hotspot vào model)
  //       const localPos = currentModel.worldToLocal(p.clone());

  //       console.log(
  //         `Hotspot Pos: x: ${localPos.x.toFixed(2)}, y: ${localPos.y.toFixed(2)}, z: ${localPos.z.toFixed(2)}`,
  //       );

  //       // Mẹo: Bạn có thể copy dòng này dán thẳng vào file uavData.js
  //       alert(
  //         `Đã copy tọa độ: x: ${localPos.x.toFixed(2)}, y: ${localPos.y.toFixed(2)}, z: ${localPos.z.toFixed(2)}`,
  //       );
  //     }
  //   }
  // });
  initScene();
  initRaycaster(); // Khởi tạo raycaster để lấy tọa độ khi click (dành cho Admin)
  animate();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  cancelAnimationFrame(animationId);
  renderer?.dispose();
});
</script>

<style scoped>
.viewer-container {
  width: 100%;
  height: 600px;
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
