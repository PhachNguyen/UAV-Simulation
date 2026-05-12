<template>
  <div ref="container" class="viewer-container">
    <Transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="loader"></div>
        <p class="loader-text">Đang tải mô hình 3D...</p>
      </div>
    </Transition>

    <!-- <div class="ui-panel-top">
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
    </div> -->

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
      <p class="guide-text">Kéo để xoay • Cuộn để phóng to</p>
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
let needsRender = true;
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
  // Thêm lưới trục to hơn và mờ hơn để làm nền, giúp định hướng không gian tốt hơn
  core.scene.add(new THREE.GridHelper(60, 40, 0x1e293b, 0x0f172a));
  // Lưới phân cực giúp dễ định hướng hơn, đặc biệt khi model có nhiều chi tiết nhỏ
  const polar = new THREE.PolarGridHelper(30, 10, 8, 64, 0x3b82f6, 0x111827);
  polar.material.opacity = 0.1;
  polar.material.transparent = true;
  core.scene.add(polar);

  // 2. Camera
  core.camera = new THREE.PerspectiveCamera(
    60, // FOV đủ rộng để nhìn rõ model
    container.value.clientWidth / container.value.clientHeight,
    0.1, // Gần nhất
    1000, // Xa nhất
  );
  core.camera.position.set(30, 20, 30); // Đặt xa hơn để có cái nhìn tổng thể hơn

  // 3. Renderers (WebGL + CSS2D)
  core.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  core.renderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight,
  );
  // core.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  core.renderer.setPixelRatio(1);
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
  // Điều chỉnh vị trí và góc chiếu của đèn để làm nổi bật model hơn
  spotLight.position.set(100, 10, 10);
  core.scene.add(spotLight);

  // 5. Controls
  core.controls = new OrbitControls(core.camera, core.renderer.domElement);
  core.controls.enableDamping = true;
  core.controls.addEventListener("change", () => {
    needsRender = true; // Báo hiệu cần vẽ lại khi người dùng xoay/zoom chuột
  });

  loadModel();
};

const handleModelSuccess = (gltf) => {
  core.currentModel = gltf.scene;

  // 1. Tính toán kích thước và tâm của Model
  const box = new THREE.Box3().setFromObject(core.currentModel);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // 2. Tự động Scale (Giữ nguyên logic cũ của cậu)
  const desiredSize = 15; // Phách có thể chỉnh số này để Drone to/nhỏ lại
  const maxDim = Math.max(size.x, size.y, size.z);
  const autoScale = desiredSize / maxDim;
  core.currentModel.scale.set(autoScale, autoScale, autoScale);

  // 3. ĐƯA VỀ TÂM: Trừ đi tọa độ center để tâm model trùng với (0,0,0)
  // Lưu ý: Không cộng thêm "+ 2" như trước nữa để nó nằm đúng giữa trục Y
  core.currentModel.position.set(
    -center.x * autoScale,
    -center.y * autoScale + 8,
    -center.z * autoScale,
  );

  core.scene.add(core.currentModel);

  // 4. Đảm bảo Camera nhìn vào đúng tâm (0,0,0)
  // if (core.controls) {
  //   core.controls.target.set(0, 0, 0);
  //   core.controls.update();
  // }

  // Load Hotspots
  const hotspots = props.customHotspots || product.value?.hotspots;
  if (hotspots) setupHotspots(hotspots);

  loading.value = false;
  needsRender = true;
  emit("on-load");
};

const loadModel = () => {
  if (
    !props.modelSrc ||
    props.modelSrc.includes("null") ||
    props.modelSrc.includes("undefined")
  ) {
    console.warn(
      " Bỏ qua load 3D: Đường dẫn mô hình không hợp lệ ->",
      props.modelSrc,
    );
    loading.value = false;
    return; // Chặn ngay không cho GLTFLoader chạy
  }
  const source = props.modelSrc || product.value?.model3d;
  if (!source) {
    loading.value = false;
    return;
  }

  loading.value = true;
  activeSpot.value = null;
  cleanupExistingModel();

  new GLTFLoader().load(source, handleModelSuccess, undefined, (err) => {
    console.error("3D Load Error:", err);
    loading.value = false;
    needsRender = true;
  });
};

// Tìm hàm setupHotspots trong Uav3DViewer.vue và sửa như sau:
const setupHotspots = (hotspots) => {
  if (!core.currentModel) return;

  // 1. Xóa các labels cũ để vẽ lại
  const labels = core.currentModel.children.filter((c) => c.isCSS2DObject);
  labels.forEach((l) => core.currentModel.remove(l));

  hotspots.forEach((spot, index) => {
    // --- BỔ SUNG ĐIỀU KIỆN NÀY ---
    // Nếu điểm này đang được chọn để sửa (currentMarkerId),
    // ta ẩn marker cũ đi để hiện marker tạm thời (Teal) cho đỡ rối.
    if (props.admin && props.currentMarkerId === index + 1) return;
    // ----------------------------

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
// Thêm đoạn watcher này vào phần Watchers của Uav3DViewer.vue

watch(
  () => props.currentMarkerId,
  (newId) => {
    if (!core.currentModel) return;

    // 1. DỌN SẠCH các marker tạm (Teal) cũ
    const tempMarkers = core.currentModel.children.filter(
      (c) => c.name && c.name.startsWith("marker-"),
    );
    tempMarkers.forEach((m) => core.currentModel.remove(m));

    // 2. Vẽ lại toàn bộ marker Blue (Hàm này sẽ ẩn cái ID trùng với newId)
    setupHotspots(props.customHotspots || []);

    // 3. KHẮC PHỤC: Nếu đang chọn để sửa (newId != null), vẽ ngay marker Teal tại vị trí cũ
    if (newId) {
      // currentMarkerId là Index + 1, nên lấy trong mảng phải trừ 1
      const editingSpot = props.customHotspots[newId - 1];

      if (editingSpot && editingSpot.pos) {
        // Tạo vector tọa độ từ dữ liệu có sẵn
        const currentPos = new THREE.Vector3(
          editingSpot.pos.x,
          editingSpot.pos.y,
          editingSpot.pos.z,
        );

        // Gọi hàm hiển thị marker tạm thời tại vị trí này
        showTemporaryMarker(currentPos);
      }
    }
  },
);
const flyToSpot = (spot, label) => {
  activeSpot.value = spot;
  const worldPos = new THREE.Vector3();
  label.getWorldPosition(worldPos);

  gsap.to(core.camera.position, {
    x: worldPos.x + 6,
    y: worldPos.y + 3,
    z: worldPos.z + 6,
    duration: 1.2,
    ease: "power3.inOut",
    onUpdate: () => {
      needsRender = true;
    }, // Ép render khi camera đang bay
  });

  // CẬP NHẬT ĐIỂM NHÌN (target) CÙNG LÚC ĐỂ CAMERA LUÔN HƯỚNG VỀ HOTSPOT
  gsap.to(core.controls.target, {
    x: worldPos.x,
    y: worldPos.y,
    z: worldPos.z,
    duration: 1.2,
    onUpdate: () => {
      core.controls.update();
      needsRender = true; // Ép render
    },
  });
};

const initRaycaster = () => {
  // Lắng nghe sự kiện click trên chính khung Canvas
  core.renderer.domElement.addEventListener("click", (event) => {
    // Chỉ xử lý khi đã load Model và đang ở chế độ Admin (thêm điểm)
    if (!core.currentModel || !props.admin) return;

    // 1. Tính toán tọa độ chuột chuẩn hóa (Normalized Device Coordinates)
    const rect = core.renderer.domElement.getBoundingClientRect();
    core.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    core.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // 2. Bắn tia Ray từ Camera xuyên qua vị trí chuột
    core.raycaster.setFromCamera(core.mouse, core.camera);

    // 3. Kiểm tra xem tia Ray có chạm vào Máy bay (currentModel) không
    const intersects = core.raycaster.intersectObject(core.currentModel, true);

    if (intersects.length > 0) {
      // Lấy điểm va chạm đầu tiên (điểm gần nhất trên bề mặt máy bay)
      const hitPoint = intersects[0].point;

      // Chuyển đổi tọa độ World sang Local của Model (vì model có thể bị xoay/scale)
      const localPos = core.currentModel.worldToLocal(hitPoint.clone());

      // Phát tín hiệu (Emit) tọa độ về trang Editor
      emit("pick-coords", {
        x: localPos.x,
        y: localPos.y,
        z: localPos.z,
      });

      // Hiển thị một marker tạm thời (Blue) ngay tại điểm vừa click để Phách thấy
      showTemporaryMarker(localPos);
    }
  });
};

// --- MARKERS (ADMIN) ---
const showTemporaryMarker = (pos) => {
  const markerId = props.currentMarkerId;
  if (!markerId || !core.currentModel) return;

  // Xóa marker Teal cũ nếu có (để tránh bị chồng nhiều cái Teal khi click liên tục)
  const existingTemp = core.currentModel.children.filter(
    (c) => c.name && c.name.startsWith("marker-"),
  );
  existingTemp.forEach((m) => core.currentModel.remove(m));

  // Tạo marker Teal mới
  const marker = createMarkerSprite(pos, markerId);
  marker.name = `marker-${markerId}`;
  core.currentModel.add(marker);
};

const createMarkerSprite = (pos, number) => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // ĐỔI DÒNG NÀY: Từ #00f2ff (Teal) sang #3b82f6 (Blue)
  ctx.fillStyle = "#3b82f6";
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

  // Giữ nguyên scale để đảm bảo kích thước hiển thị tương đồng
  const s = 1.5 / core.currentModel.scale.x;
  sprite.scale.set(s, s, 1);
  sprite.position.copy(pos);
  return sprite;
};
// --- CLEANUP ---
// --- ĐÃ SỬA: Dọn dẹp cả Texture ---
const cleanupExistingModel = () => {
  if (!core.currentModel) return;

  // Xóa model khỏi scene
  core.scene.remove(core.currentModel);

  core.currentModel.traverse((n) => {
    if (n.isMesh) {
      // 1. Xóa hình học (Geometry)
      if (n.geometry) n.geometry.dispose();

      // 2. Xóa vật liệu (Material) và Textures
      if (n.material) {
        // Chuyển về mảng để xử lý đồng nhất (vì một mesh có thể có 1 hoặc nhiều vật liệu)
        const materials = Array.isArray(n.material) ? n.material : [n.material];

        materials.forEach((m) => {
          if (!m) return; // Bỏ qua nếu vật liệu bị null/undefined

          // Giải phóng tất cả các map (texture) một cách chính xác
          if (m.map) m.map.dispose();
          if (m.lightMap) m.lightMap.dispose();
          if (m.bumpMap) m.bumpMap.dispose();
          if (m.normalMap) m.normalMap.dispose();
          if (m.specularMap) m.specularMap.dispose();
          if (m.envMap) m.envMap.dispose();
          if (m.aoMap) m.aoMap.dispose(); // Đã fix lỗi
          if (m.emissiveMap) m.emissiveMap.dispose(); // Đã fix lỗi
          if (m.metalnessMap) m.metalnessMap.dispose();
          if (m.roughnessMap) m.roughnessMap.dispose();

          // Xóa chính vật liệu đó
          m.dispose();
        });
      }
    }
  });

  core.currentModel = null;
};

// --- WATCHERS ---
watch(() => props.modelSrc, loadModel);
// Tìm watch props.customHotspots trong Uav3DViewer.vue và sửa thành:
// 1. Sửa Watcher của customHotspots
watch(
  () => props.customHotspots,
  (newVal) => {
    // QUAN TRỌNG: Tắt ngay khung thông tin chi tiết của bài cũ
    activeSpot.value = null;

    if (newVal && core.currentModel) {
      // 2. Dọn dẹp triệt để trước khi vẽ bài mới
      const objectsToRemove = core.currentModel.children.filter(
        (child) =>
          child.isCSS2DObject || // Xóa nhãn số
          (child.name && child.name.startsWith("marker-")), // Xóa các Sprite tròn
      );

      objectsToRemove.forEach((obj) => {
        core.currentModel.remove(obj);
        if (obj.element) obj.element.remove(); // Xóa hẳn thẻ HTML khỏi DOM
      });

      // 3. Vẽ bộ marker mới
      setupHotspots(newVal);
      needsRender = true;
    }
  },
  { deep: true },
);

// --- LIFECYCLE ---
// 2. Thay thế hàm animate() hiện tại bằng hàm thông minh này:
const animate = () => {
  core.animationId = requestAnimationFrame(animate);

  // controls.update() trả về true nếu nó đang có quán tính trượt (damping)
  const isDamping = core.controls?.update();

  // CHỈ RENDER khi người dùng thao tác HOẶC khi đang có quán tính trượt
  if (needsRender || isDamping) {
    core.renderer?.render(core.scene, core.camera);
    core.labelRenderer?.render(core.scene, core.camera);
    needsRender = false; // Reset lại cờ sau khi vẽ xong
  }
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

// --- ĐÃ SỬA: Giải phóng toàn bộ khi rời trang ---
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);

  // 1. Dừng vòng lặp animation
  if (core.animationId) {
    cancelAnimationFrame(core.animationId);
  }

  // 2. Dọn dẹp Model & Textures khỏi GPU
  cleanupExistingModel();

  // 3. Xóa các sự kiện chuột của Controls
  if (core.controls) {
    core.controls.dispose();
  }

  // 4. Hủy WebGL Renderer và ép giải phóng Context
  if (core.renderer) {
    core.renderer.dispose();
    core.renderer.forceContextLoss(); // Ép trình duyệt nhả bộ nhớ GPU ngay lập tức
    core.renderer.domElement.remove();
  }

  // 5. Hủy HTML Renderer
  if (core.labelRenderer) {
    core.labelRenderer.domElement.remove();
  }
});

defineExpose({ flyToSpot });
</script>

<style scoped>
.viewer-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #080808;
  border-radius: 1.5rem;
  overflow: hidden;

}

/* Hotspot Detail Card */
.hotspot-detail-card {
  position: absolute;
  top: 10px;
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

  /* Thêm dòng này để card không phình quá to làm mất title */
  display: flex;
  flex-direction: column;
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

  /* CẬP NHẬT MỚI ĐỂ HẾT CHE KHUẤT */
  max-height: 180px; /* Giới hạn chiều cao tối đa của vùng text */
  overflow-y: auto; /* Hiện thanh cuộn nếu text quá dài */
  padding-right: 10px; /* Khoảng trống để không bị đè vào thanh cuộn */
  margin-bottom: 5px;
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
  /* DÒNG NÀY LÀ CỨU CÁNH: Đưa tâm thẻ HTML về đúng tọa độ 3D */
  transform: translate(-50%, -50%);
  pointer-events: auto;
  will-change: transform; /* Giúp mượt hơn khi xoay camera */
}
:deep(.hotspot-pulse) {
  position: absolute;
  inset: -4px;
  /* border: 2px solid #3b82f6; */
  border-radius: 50%;
  animation: pulse 2s infinite;
}
:deep(.hotspot-node) {
  /* Kích thước chuẩn bạn yêu cầu */
  width: 24px;
  height: 24px;

  /* Màu nền Blue chuẩn Tailwind */
  background: #3b82f6;

  /* Các style bổ trợ để nhìn xịn hơn */
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
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); /* Thêm hiệu ứng đổ bóng cho đẹp */
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
