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
  //  DJI Flip
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
    model3d: "/public/models/DJI Flip.glb",
    hotspots: [
      {
        id: 1,
        pos: { x: 0, y: 0.11, z: 0.6 },
        title: "Cụm Camera Hasselblad 4K HDR & Gimbal Chống Rung 3 Trục",
        desc: "Hệ thống quang học trung tâm được trang bị cảm biến CMOS 1/1.3 inch với độ phân giải thực 48MP. Ống kính có khẩu độ f/1.7 hỗ trợ thu sáng vượt trội trong môi trường thiếu sáng. Cụm camera được bảo vệ bởi hệ thống Gimbal cơ học 3 trục (Tilt, Roll, Pan), cho phép triệt tiêu hoàn toàn các rung động từ động cơ và gió, đảm bảo video mượt mà ngay cả khi drone đang bay ở tốc độ 16 m/s. Hỗ trợ quay 4K/60fps và chế độ màu 10-bit D-Log M để hậu kỳ chuyên nghiệp.",
      },
      {
        id: 2,
        pos: { x: 0.01, y: 0.34, z: 0.48 },
        title: "Hệ Thống Cảm Biến Tránh Vật Cản Đa Hướng (APAS 5.0)",
        desc: "Mắt thần của Drone bao gồm các cảm biến hình ảnh kép (Dual-Vision Sensors) và cảm biến hồng ngoại 3D. Hệ thống này liên tục quét môi trường xung quanh theo thời gian thực để xây dựng bản đồ 3D không gian. Khi phát hiện vật cản (cây cối, dây điện, tòa nhà) trong phạm vi 20 mét, hệ thống APAS 5.0 sẽ tự động tính toán lộ trình bay vòng qua hoặc dừng lại an toàn mà không cần sự can thiệp của người điều khiển.",
      },
      {
        id: 3,
        pos: { x: -0.43, y: 0.21, z: 0.65 },
        title: "Động cơ Brushless Hiệu Suất Cao & Cánh Quạt Độ Ồn Thấp",
        desc: "Hệ thống truyền động sử dụng 4 động cơ không chổi than (Brushless) thế hệ mới, tối ưu hóa từ tính để tăng 20% lực đẩy so với phiên bản cũ. Động cơ được thiết kế để chịu được nhiệt độ lên đến 80°C mà không giảm hiệu năng. Kết hợp với cánh quạt khí động học độ ồn thấp (Low-noise Propellers), giúp drone bay êm ái hơn, tránh gây chú ý và tăng khả năng kháng gió lên cấp 5 (10.7 m/s).",
      },
      {
        id: 4,
        pos: { x: 0.19, y: 0.42, z: -0.13 },
        title: "Pin Li-ion Intelligent Flight Battery Plus",
        desc: "Trái tim năng lượng của máy bay là viên pin Lithium-ion mật độ cao với dung lượng 3110 mAh. Pin được tích hợp chip quản lý năng lượng thông minh (BMS), tự động cân bằng điện áp giữa các cell pin và kích hoạt chế độ tự xả khi không sử dụng để bảo vệ tuổi thọ. Hệ thống liên tục truyền dữ liệu về thời gian bay còn lại dựa trên khoảng cách thực tế, giúp tự động kích hoạt tính năng RTH (Return to Home) khi pin yếu để tránh rủi ro rơi máy bay.",
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
