<template>
  <div
    ref="container"
    class="w-full h-[500px] rounded-lg overflow-hidden relative shadow-2xl"
  ></div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const container = ref(null);

// Đưa các biến ra ngoài để onUnmounted có thể truy cập
let scene, camera, renderer, controls, animationId;

const initScene = () => {
  if (!container.value) return;

  // 1. Scene & Background
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0d); // Đen tech sâu hơn

  // 2. GridHelper - Hạ thấp hẳn xuống để không chạm drone
  const grid = new THREE.GridHelper(100, 50, 0x333333, 0x1a1a1a);
  grid.position.y = -4;
  scene.add(grid);

  // 3. Camera - Góc nhìn ngang thân (Eye-level)
  camera = new THREE.PerspectiveCamera(
    40,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(25, 6, 25); // Y thấp để nhìn trực diện

  // 4. Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // 5. Ánh sáng
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2);
  sunLight.position.set(10, 20, 10);
  scene.add(sunLight);

  const blueLight = new THREE.PointLight(0x00ffff, 1);
  blueLight.position.set(-10, 5, -10);
  scene.add(blueLight);

  // 6. Load Model & Fix Pivot
  const loader = new GLTFLoader();
  loader.load("/models/purist_classic_5_sx.glb", (gltf) => {
    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());

    // Đưa tâm drone về gốc tọa độ
    model.position.x += model.position.x - center.x;
    model.position.y += model.position.y - center.y;
    model.position.z += model.position.z - center.z;

    // Drone bay lơ lửng tại Y = 0
    model.position.y = 0;
    model.scale.set(0.07, 0.07, 0.07);
    scene.add(model);

    // Khóa tâm nhìn vào drone
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    }
  });

  // 7. Controls - Giới hạn góc nhìn để không bị chúi đầu
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI / 3; // Không cho nhìn quá cao từ trên xuống
  controls.maxPolarAngle = Math.PI / 1.8; // Không cho nhìn dưới gầm
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  if (controls) controls.update();
  if (renderer && scene && camera) renderer.render(scene, camera);
};

const handleResize = () => {
  if (!container.value || !camera || !renderer) return;
  camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
};

onMounted(() => {
  initScene();
  animate();
  window.addEventListener("resize", handleResize);
});

// GIẢI QUYẾT LỖI NÚT BACK: Dọn dẹp triệt để WebGL
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  cancelAnimationFrame(animationId);

  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }

  // Giải phóng biến để Garbage Collector làm việc
  scene = null;
  camera = null;
  controls = null;
  renderer = null;
});
</script>
