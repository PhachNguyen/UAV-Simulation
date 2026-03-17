// src/data/uavData.js
export const uavList = [
  {
    id: 1,
    name: "DJI Mavic 4 Pro Test từ DATA",
    description:
      "DJI Mavic 4 Pro, equipped with a powerful triple-camera system featuring a 100MP Hasselblad main camera, dual large CMOS telephoto cameras, a 360° rotating Infinity gimbal, omnidirectional obstacle-avoidance sensors with Nightscape 0.1-Lux, and the advanced O4+ video transmission system.",
    image: "/public/img/Drone cam tu.png", // Thay bằng link ảnh thật
    category: "Consumer",
    // Thumbail
    images: [
      "/public/img/Drone cam tu.png",
      "/public/img/UCAV-13_0.png",
      "/public/img/UAV-100AI.png",
    ],
    intro: [
      "/public/videos/intro_drones.mp4",
      "/public/videos/1080.mp4",
      "/public/videos/1080 (1).mp4",
    ],
    // Model 3D
    model3d: "/public/models/inside_drone.glb",
    hotspots: [
      {
        id: 1,
        pos: { x: 0, y: 0.02, z: 0.05 },
        title: "Cảm biến LiDAR",
        desc: "Quét bản đồ 3D địa hình chính xác.",
      },
      {
        id: 2,
        pos: { x: 0, y: 0.05, z: -0.05 },
        title: "Cảm biến LiDAR",
        desc: "Quét bản đồ 3D địa hình chính xác.",
      },
    ],
    video: "/public/img/AdvertisementUav.mp4", // Thay bằng link video thật
    scale: 0.1,
    stats: { battery: "34 Mins", range: "15 KM", speed: "19 m/s" },

    versions: [
      { title: "DJI Mavic 4 Pro (DJI RC 2)", controller: "DJI RC 2" },
      {
        title: "DJI Mavic 4 Pro Fly More Combo (DJI RC 2)",
        controller: "DJI RC 2",
      },
      {
        title: "DJI Mavic 4 Pro 512GB Creator Combo",
        controller: "DJI RC Pro 2",
      },
    ],
  },
  // UAV DJI Flip

  {
    id: 2,
    name: "Fixed Wing Mapper",
    category: "Professional",
    price: 4500,
    oldPrice: null,
    image: "/public/img/UAV-50_1.png",
    status: "Sale",
    badgeColor: "bg-orange-500",
    model3d: "/models/UAV-50_1.glb",
    scale: 0.07,
    stats: { battery: "120 Mins", range: "50 KM", speed: "25 m/s" },
    // hotspots: [
    //   {
    //     id: 1,
    //     pos: { x: 0, y: 1, z: 2 },
    //     title: "Cảm biến LiDAR",
    //     desc: "Quét bản đồ 3D địa hình chính xác.",
    //   },
    // ],
  },
  {
    id: 3,
    name: "Industrial VTOL V2",
    category: "Industrial",
    price: 8900,
    oldPrice: 9500,
    image: "/public/img/UCAV-13_0.png",

    status: null,
    model3d: "/models/UCAV-13_0.glb",
    scale: 0.1,
    stats: { battery: "180 Mins", range: "100 KM", speed: "30 m/s" },
    // hotspots: [
    //   {
    //     id: 1,
    //     pos: { x: 5, y: 2, z: 0 },
    //     title: "Động cơ VTOL",
    //     desc: "Cho phép cất hạ cánh thẳng đứng.",
    //   },
    // ],
  },
  {
    id: 4,
    name: "FPV Racing Drone",
    category: "Racing",
    price: 599,
    oldPrice: 750,
    image: "/public/img/UAV-100AI.png",
    status: "New",
    badgeColor: "bg-green-500",
    model3d: "/models/purist_classic_5_sx.glb",
    scale: 0.1,
    stats: { battery: "10 Mins", range: "2 KM", speed: "45 m/s" },
    hotspots: [
      {
        id: 1,
        pos: { x: 0, y: 0.5, z: 3 },
        title: "FPV Camera",
        desc: "Độ trễ cực thấp cho đua drone.",
      },
    ],
  },

  {
    id: 5,
    name: "DJI Flip",
    description:
      "DJI Flip với trọng lượng nhẹ dưới 249g, thiết kế nhỏ gọn nhưng không kém phần mạnh mẽ, hỗ trợ ghi hình chất lượng cao với cảm biến CMOS 1/1.3 inch, quay video HDR 4K/60fps và thời gian bay tối đa lên tới 31 phút. Ngoài ra, không chỉ nổi bật với tính năng AI Object Tracking và khả năng bảo vệ lưỡi dao toàn diện, sản phẩm còn tích hợp nhiều công nghệ tiên tiến, đáp ứng mọi nhu cầu của người dùng từ nghiệp dư đến chuyên nghiệp.",
    image: "/public/img/drones/Test.png", // Thay bằng link ảnh thật
    category: "Consumer",
    // Thumbail
    images: [
      "/public/img/drones/Test.png",
      "/public/img/drones/DJI Flip_thumbail.webp",
      "/public/img/drones/DJI Flip_thumbail_1.webp",
      "/public/img/drones/DJI Flip_thumbail_2.webp",
    ],
    // Model 3D
    model3d: "/public/models/inside_drone.glb",
    hotspots: [
      {
        id: 1,
        pos: { x: 0, y: 0.02, z: 0.05 },
        title: "Cảm biến LiDAR",
        desc: "Quét bản đồ 3D địa hình chính xác.",
      },
      {
        id: 2,
        pos: { x: 0, y: 0.05, z: -0.05 },
        title: "Cảm biến LiDAR",
        desc: "Quét bản đồ 3D địa hình chính xác.",
      },
    ],
    video: "/public/videos/intro_drones.mp4",
    intro: [
      "/public/videos/intro_drones.mp4",
      "/public/videos/1080.mp4",
      "/public/videos/1080 (1).mp4",
    ],
    scale: 0.1,
    stats: { battery: "34 Mins", range: "15 KM", speed: "19 m/s" },

    versions: [
      { title: "DJI Mavic 4 Pro (DJI RC 2)", controller: "DJI RC 2" },
      {
        title: "DJI Mavic 4 Pro Fly More Combo (DJI RC 2)",
        controller: "DJI RC 2",
      },
      {
        title: "DJI Mavic 4 Pro 512GB Creator Combo",
        controller: "DJI RC Pro 2",
      },
    ],
  },
];
