// src/data/uavData.js
export const uavList = [
  {
    id: 1,
    name: "DJI Mavic 3 Pro",
    category: "Consumer",
    price: 2199,
    oldPrice: 2499,
    image: "/img/Drone cam tu.png",
    status: "New",
    badgeColor: "bg-green-500",
    model3d: "/models/test_model.glb",
    scale: 0.07, // Thêm scale riêng cho từng model
    stats: { battery: "46 Mins", range: "15 KM", speed: "21 m/s" },
    hotspots: [
      {
        id: 1,
        pos: { x: 0.03, y: 0.25, z: 0.8 },
        title: "Cụm Camera O3+",
        desc: "Cảm biến 1/1.3-inch CMOS độ phân giải cao.",
      },
      {
        id: 2,
        pos: { x: -0.02, y: 0.62, z: 0.32 },
        title: "Đèn chiếu sáng",
        desc: "Định vị đa vệ tinh chuẩn xác cao.",
      },
      {
        id: 3,
        pos: { x: 0.59, y: 0.57, z: 0.19 },
        title: "Cánh quay gập",
        desc: "Cánh quay có thể gập lại để tiết kiệm không gian.",
      },
    ],
  },
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
];
