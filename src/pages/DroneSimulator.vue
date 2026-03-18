<script setup>
import { shallowRef, reactive, defineComponent, h } from "vue";
import { TresCanvas, useLoop } from "@tresjs/core"; // Sửa thành useLoop
import { OrbitControls, Sky, ContactShadows, Grid } from "@tresjs/cientos";

// --- 1. CẤU HÌNH ---
const SETTINGS = {
  moveSpeed: 0.15,
  rotationSpeed: 0.04,
  tiltAngle: 0.2,
  lerpFactor: 0.1,
};

// --- 2. QUẢN LÝ PHÍM BẤM ---
const keys = reactive({
  w: false,
  s: false,
  a: false,
  d: false,
  q: false,
  e: false,
  space: false,
  shift: false,
});

const handleKey = (e, status) => {
  const keyMap = {
    w: "w",
    s: "s",
    a: "a",
    d: "d",
    q: "q",
    e: "e",
    " ": "space",
    shift: "shift",
  };
  const k = keyMap[e.key.toLowerCase()];
  if (k) keys[k] = status;
};

window.addEventListener("keydown", (e) => handleKey(e, true));
window.addEventListener("keyup", (e) => handleKey(e, false));

const currentAltitude = shallowRef(2);

// --- 3. COMPONENT CON (Drone Logic) ---
const DroneSimulator = defineComponent({
  setup() {
    const droneRef = shallowRef();

    // TRỌNG TÂM: useLoop trả về onBeforeRender
    const { onBeforeRender } = useLoop();

    const targetRotation = { x: 0, z: 0 };

    onBeforeRender(() => {
      if (!droneRef.value) return;
      const drone = droneRef.value;

      // Bay lên/xuống
      if (keys.space) drone.position.y += SETTINGS.moveSpeed;
      if (keys.shift) drone.position.y -= SETTINGS.moveSpeed;
      currentAltitude.value = drone.position.y;

      // Xoay hướng
      if (keys.q) drone.rotation.y += SETTINGS.rotationSpeed;
      if (keys.e) drone.rotation.y -= SETTINGS.rotationSpeed;

      // Tính góc nghiêng
      targetRotation.x = keys.w
        ? -SETTINGS.tiltAngle
        : keys.s
          ? SETTINGS.tiltAngle
          : 0;
      targetRotation.z = keys.a
        ? SETTINGS.tiltAngle
        : keys.d
          ? -SETTINGS.tiltAngle
          : 0;

      drone.rotation.x +=
        (targetRotation.x - drone.rotation.x) * SETTINGS.lerpFactor;
      drone.rotation.z +=
        (targetRotation.z - drone.rotation.z) * SETTINGS.lerpFactor;

      // Di chuyển tịnh tiến
      if (keys.w) drone.translateZ(-SETTINGS.moveSpeed);
      if (keys.s) drone.translateZ(SETTINGS.moveSpeed);
      if (keys.a) drone.translateX(-SETTINGS.moveSpeed);
      if (keys.d) drone.translateX(SETTINGS.moveSpeed);
    });

    return () =>
      h("TresGroup", { ref: droneRef, position: [0, 2, 0] }, [
        h("TresMesh", { castShadow: true }, [
          h("TresBoxGeometry", { args: [1.2, 0.15, 1.2] }),
          h("TresMeshStandardMaterial", { color: "#3b82f6", metalness: 0.8 }),
        ]),
        h("TresMesh", { position: [0, 0.1, -0.5] }, [
          h("TresBoxGeometry", { args: [0.4, 0.2, 0.2] }),
          h("TresMeshStandardMaterial", { color: "#ef4444" }),
        ]),
      ]);
  },
});
</script>

<template>
  <div class="w-full h-screen bg-slate-950 overflow-hidden">
    <TresCanvas shadows alpha window-size>
      <TresPerspectiveCamera :position="[10, 10, 10]" :look-at="[0, 0, 0]" />
      <OrbitControls make-default />

      <Sky :sun-position="[100, 20, 100]" />
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight
        :position="[10, 20, 10]"
        :intensity="1.2"
        cast-shadow
      />

      <Grid :args="[100, 100]" :cell-color="'#333'" :section-color="'#444'" />

      <DroneSimulator />

      <ContactShadows :opacity="0.4" :blur="2.5" :scale="20" />
    </TresCanvas>

    <div
      class="absolute top-8 left-8 p-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white pointer-events-none"
    >
      <h2 class="text-xl font-black text-blue-400 mb-2 tracking-tighter italic">
        UAV SKY-LINK V2
      </h2>
      <div class="font-mono text-xs space-y-1">
        <p>
          ALTITUDE:
          <span class="text-green-400 font-bold"
            >{{ currentAltitude.toFixed(2) }}m</span
          >
        </p>
        <p>
          SYSTEM:
          <span class="text-orange-400 animate-pulse font-bold">ONLINE</span>
        </p>
      </div>
    </div>
  </div>
</template>
