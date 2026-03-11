<template>
  <div
    ref="container"
    class="w-full h-[500px] rounded-lg overflow-hidden relative shadow-2xl bg-[#0d0d0d]"
  >
    <div class="absolute top-4 left-4 z-10 flex gap-2 pointer-events-none">
      <!-- <span
        class="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white border border-white/20 uppercase"
        >4K View</span
      > -->
      <!-- <span
        class="bg-teal-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase"
        >Live Sim</span
      > -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Import thêm 2 thành phần này từ Three.js examples
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import gsap from "gsap"; // Đảm bảo bạn đã npm install gsap

const props = defineProps({
  uav: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select-hotspot"]);
const container = ref(null);

// Mở rộng các biến quản lý
let scene, camera, renderer, labelRenderer, controls, animationId, currentModel;

// 1. Hàm tạo nốt ghi chú (Hotspot)
const createHotspot = (data) => {
  const div = document.createElement("div");
  div.className = "hotspot-marker";
  div.textContent = data.id;

  // Biến div HTML thành vật thể 3D
  const label = new CSS2DObject(div);
  label.position.set(data.pos.x, data.pos.y, data.pos.z);
  scene.add(label);

  // Xử lý click vào nốt số
  div.style.pointerEvents = "auto"; // Cho phép click
  div.onclick = () => {
    // Bay camera đến vị trí linh kiện
    gsap.to(camera.position, {
      x: data.pos.x + 8,
      y: data.pos.y + 4,
      z: data.pos.z + 8,
      duration: 1.2,
      ease: "power2.inOut",
    });
    // Xoay tâm nhìn vào linh kiện
    gsap.to(controls.target, {
      x: data.pos.x,
      y: data.pos.y,
      z: data.pos.z,
      duration: 1.2,
      onUpdate: () => controls.update(),
    });
    emit("select-hotspot", data);
  };
};

// 2. Dọn dẹp nốt cũ khi đổi Drone
const clearHotspots = () => {
  const labels = scene.getObjectsByProperty("type", "Object3D");
  labels.forEach((obj) => {
    if (obj instanceof CSS2DObject) scene.remove(obj);
  });
};

const initScene = () => {
  if (!container.value) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0d);

  // Grid
  const grid = new THREE.GridHelper(100, 50, 0x333333, 0x1a1a1a);
  grid.position.y = -4;
  scene.add(grid);

  camera = new THREE.PerspectiveCamera(
    40,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(25, 12, 25);

  // WebGL Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // --- QUAN TRỌNG: Khởi tạo Label Renderer ---
  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight,
  );
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none"; // Để không chặn xoay chuột 3D
  container.value.appendChild(labelRenderer.domElement);

  // Ánh sáng (Tăng cường để thấy rõ model)
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const sunLight = new THREE.DirectionalLight(0xffffff, 2);
  sunLight.position.set(10, 20, 10);
  scene.add(sunLight);

  loadModel(props.uav);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
};

const loadModel = (uavData) => {
  if (currentModel) scene.remove(currentModel);
  clearHotspots();

  const loader = new GLTFLoader();
  loader.load(uavData.model3d, (gltf) => {
    currentModel = gltf.scene;

    // --- LOGIC TỰ TÍNH SCALE VÀ CĂN TÂM ---
    const box = new THREE.Box3().setFromObject(currentModel);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // 1. Tính toán tỷ lệ tự động (Auto-scaling)
    // Giả sử chúng ta muốn mô hình luôn dài khoảng 15 đơn vị trong không gian 3D
    const desiredSize = 15;
    const maxDim = Math.max(size.x, size.y, size.z);
    const autoScale = desiredSize / maxDim;

    currentModel.scale.set(autoScale, autoScale, autoScale);

    // 2. Căn giữa mô hình dựa trên scale mới
    // Đưa drone về gốc tọa độ 0,0,0
    currentModel.position.x = -center.x * autoScale;
    currentModel.position.y = -center.y * autoScale;
    currentModel.position.z = -center.z * autoScale;

    // Nâng drone lên một chút so với mặt lưới (y = 0)
    currentModel.position.y += 2;

    scene.add(currentModel);

    // --- GẮN HOTSPOT VÀO MODEL ---
    // Để nốt dính chặt vào thân drone khi quay, chúng ta gắn trực tiếp vào model
    if (uavData.hotspots) {
      uavData.hotspots.forEach((data) => {
        const div = document.createElement("div");
        div.className = "hotspot-marker";
        div.textContent = data.id;

        const label = new CSS2DObject(div);
        // Tọa độ pos trong uavData sẽ được nhân với 1 (vì ta đã scale model tổng thể)
        label.position.set(data.pos.x, data.pos.y, data.pos.z);

        // Gắn vào currentModel để nó xoay theo máy bay
        currentModel.add(label);

        div.style.pointerEvents = "auto";
        div.onclick = () => {
          // Lấy tọa độ thế giới thực tế của nốt để camera bay tới
          const worldPos = new THREE.Vector3();
          label.getWorldPosition(worldPos);

          gsap.to(camera.position, {
            x: worldPos.x + 8,
            y: worldPos.y + 4,
            z: worldPos.z + 8,
            duration: 1.2,
            ease: "power2.inOut",
          });
          gsap.to(controls.target, {
            x: worldPos.x,
            y: worldPos.y,
            z: worldPos.z,
            duration: 1.2,
            onUpdate: () => controls.update(),
          });
          emit("select-hotspot", data);
        };
      });
    }

    if (controls) {
      controls.target.set(0, 2, 0);
      controls.update();
    }
  });
};
const animate = () => {
  animationId = requestAnimationFrame(animate);
  if (controls) controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera); // Render cả các nốt số
  }
};

// Theo dõi khi Props thay đổi (người dùng chọn Drone khác)
watch(
  () => props.uav,
  (newUav) => {
    if (newUav) loadModel(newUav);
  },
  { deep: true },
);

onMounted(() => {
  initScene();
  animate();
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  if (!container.value || !camera || !renderer) return;
  const w = container.value.clientWidth;
  const h = container.value.clientHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
};

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  cancelAnimationFrame(animationId);

  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
  if (labelRenderer) {
    labelRenderer.domElement.remove();
  }
  scene = null;
  camera = null;
  controls = null;
  renderer = null;
  labelRenderer = null;
});
</script>

<style scoped>
/* Style cho nốt số nhấp nháy */
:deep(.hotspot-marker) {
  width: 24px;
  height: 24px;
  /* background: #14b8a6; */
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;
  /* box-shadow: 0 0 15px rgba(20, 184, 166, 0.8); */
  transition: all 0.3s ease;
  /* Hiệu ứng nhấp nháy */
  /* animation: pulse-ring 2s infinite; */
}

:deep(.hotspot-marker:hover) {
  transform: scale(1.3);
  background: #0d9488;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(20, 184, 166, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0);
  }
}
</style>
