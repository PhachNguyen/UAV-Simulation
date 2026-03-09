<script setup>
// Thêm vào trong loadModel hoặc onMounted
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  // Tính toán vị trí chuột trong không gian 2D của container
  const rect = container.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Kiểm tra va chạm với currentModel
  if (currentModel) {
    const intersects = raycaster.intersectObject(currentModel, true);
    if (intersects.length > 0) {
      const p = intersects[0].point;
      // Chuyển tọa độ thế giới về tọa độ local của Model (vì bạn gắn hotspot vào model)
      const localPos = currentModel.worldToLocal(p.clone());

      console.log(
        `Hotspot Pos: x: ${localPos.x.toFixed(2)}, y: ${localPos.y.toFixed(2)}, z: ${localPos.z.toFixed(2)}`,
      );

      // Mẹo: Bạn có thể copy dòng này dán thẳng vào file uavData.js
      alert(
        `Đã copy tọa độ: x: ${localPos.x.toFixed(2)}, y: ${localPos.y.toFixed(2)}, z: ${localPos.z.toFixed(2)}`,
      );
    }
  }
});
</script>
