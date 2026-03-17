// src/data/uavData.js
export const uavList = [
  {
    id: 1,
    name: "DJI Mavic 4 Pro",
    description:
      "DJI Mavic 4 Pro được trang bị hệ thống ba camera mạnh mẽ gồm camera chính Hasselblad 100MP, camera tele CMOS kép lớn, gimbal Infinity xoay 360°, cảm biến tránh chướng ngại vật đa hướng với Nightscape 0,1-Lux và hệ thống truyền video O4+ tiên tiến, không chỉ định nghĩa lại hiệu suất chuyến bay và khả năng chụp ảnh trên không mà còn nâng khả năng sáng tạo trên bầu trời lên một tầm cao hoàn toàn mới.",
    category: "DJI Mavic",
    image: "/public/img/drones/DJI Mavic.webp",
    // Thumbail
    images: [
      "/public/img/drones/DJI Mavic.webp",
      "/public/img/drones/dji-mavic-4-pro-15-768x768.webp",
      "/public/img/drones/dji-mavic-4-pro-17-768x768.webp",
      "/public/img/drones/dji-mavic-4-pro-18-768x768.webp",
      "/public/img/drones/dji-mavic-4-pro-19-768x768.webp",
    ],
    // Model 3D
    model3d: "/public/models/DJI Mavic 3 Pro Cine.glb",
    hotspots: [
      {
        id: 1,
        pos: { x: -0.02, y: 0.15, z: 0.62 },
        title: "Hệ Thống Camera Góc Siêu Rộng & Chống Rung RockSteady 3.0",
        desc: "Camera được đặt trong khung bảo vệ chịu lực, sử dụng cảm biến CMOS 1/1.7 inch với góc nhìn siêu rộng lên tới 155°. Khả năng quay video 4K/60fps với công nghệ chống rung điện tử RockSteady và HorizonSteady, giúp giữ khung hình luôn phẳng ổn định ngay cả khi drone nhào lộn hoặc bay ở tốc độ cao. Cụm camera hỗ trợ chế độ màu D-Cinelike để tối ưu hóa khả năng chỉnh màu chuyên nghiệp.",
      },
      {
        id: 2,
        pos: { x: 0.01, y: 0.25, z: 0.63 },
        title: "Hệ Thống Cảm Biến Tầm Nhìn Kép & Hồng Ngoại",
        desc: "Được trang bị hệ thống cảm biến tầm nhìn xuống dưới (Downward Vision System) và cảm biến hồng ngoại ToF. Hệ thống này cho phép máy bay xác định độ cao cực kỳ chính xác khi bay sát mặt đất hoặc trong môi trường không có tín hiệu GPS (như trong nhà, hang động). Nó cũng hỗ trợ tính năng tự động hạ cánh và phát hiện vật cản bên dưới để đảm bảo an toàn tuyệt đối.",
      },
      {
        id: 3,
        pos: { x: 0.11, y: 0.26, z: 0.09 },
        title: "Khung Thân Hợp Kim Magie & Nhựa Kỹ Thuật Siêu Bền",
        desc: "Toàn bộ phần khung được thiết kế theo dạng khí động học tối ưu nhằm giảm lực cản của gió. Sử dụng vật liệu composite kết hợp với sợi carbon giúp giảm trọng lượng tổng thể nhưng vẫn đảm bảo độ cứng cáp để bảo vệ các linh kiện điện tử bên trong khi xảy ra va chạm. Cấu trúc mô-đun cho phép dễ dàng thay thế các cánh tay đòn (arms) nếu bị hư hỏng.",
      },
      {
        id: 4,
        pos: { x: -0.43, y: 0.32, z: 0.75 },
        title: "Động Cơ Brushless Hiệu Suất Cao & Cánh Quạt 4 Cánh",
        desc: "Hệ thống động cơ không chổi than được thiết kế tối ưu cho lực đẩy tức thời mạnh mẽ, cho phép drone tăng tốc từ 0 lên 100 km/h chỉ trong vài giây. Cánh quạt được chế tạo từ vật liệu polycarbonate siêu bền, có khả năng chịu va đập tốt. Thiết kế trục động cơ hướng lên giúp tối ưu hóa luồng khí động học và giảm thiểu tiếng ồn trong quá trình vận hành.",
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

  {
    id: 2,
    name: "DJI Mavic 3 Pro Cine",
    description:
      "Máy bay không người lái DJI Mavic 3 Pro có camera chính với cảm biến Hasselblad 4/3 CMOS và hai camera tele có zoom quang 3x/7x và zoom lai 28x, cho phép máy bay không người lái quay video lên tới 5,1K/50fps hoặc 4K/60fps. Máy bay không người lái có thời gian bay tối đa lên tới 43 phút và truyền video mượt mà ở khoảng cách 15km.",
    category: "DJI Mavic",
    image: "/public/img/drones/Mavic-3.webp",
    // Thumbail
    images: [
      "/public/img/drones/Mavic-3.webp",
      "/public/img/drones/thumbail-mavic-3.webp",
      "/public/img/drones/thumbail-mavic-3-2.webp",
      // "/public/img/drones/dji-mavic-4-pro-18-768x768.webp",
      // "/public/img/drones/dji-mavic-4-pro-19-768x768.webp",
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
  {
    id: 3,
    name: "DJI Air 3S",
    description:
      "DJI Air 3S là mẫu Flycam 2 inch, cảm biến CMOS 1 inch cho camera chính và camera Tele tầm trung 70mm, Air 3S cho ra những bức ảnh đẹp với dải Dynamic Range lên tới 14 stop. Sản phẩm này không chỉ cho phép chụp ảnh phong cảnh và chân dung với chi tiết sắc nét mà còn tích hợp nhiều tính năng hiện đại như cảm biến chướng ngại vật trang trí ban đêm và Smart RTH thế hệ mới, đảm bảo an toàn tối đa khi bay vào ban đêm.",
    category: "DJI Air",
    image: "/public/img/drones/DJI Air.webp",
    // Thumbail
    images: [
      "/public/img/drones/DJI Air.webp",
      "/public/img/drones/AIR-2.webp",
      "/public/img/drones/AIR-3.webp",
      // "/public/img/drones/dji-mavic-4-pro-18-768x768.webp",
      // "/public/img/drones/dji-mavic-4-pro-19-768x768.webp",
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
  {
    id: 4,
    name: "DJI Mavic 4 Pro",
    description:
      "DJI Mavic 4 Pro được trang bị hệ thống ba camera mạnh mẽ gồm camera chính Hasselblad 100MP, camera tele CMOS kép lớn, gimbal Infinity xoay 360°, cảm biến tránh chướng ngại vật đa hướng với Nightscape 0,1-Lux và hệ thống truyền video O4+ tiên tiến, không chỉ định nghĩa lại hiệu suất chuyến bay và khả năng chụp ảnh trên không mà còn nâng khả năng sáng tạo trên bầu trời lên một tầm cao hoàn toàn mới.",
    category: "DJI Mavic",
    image: "/public/img/drones/DJI Mavic.webp",
    // Thumbail
    images: [
      "/public/img/drones/DJI Mavic.webp",
      "/public/img/drones/dji-mavic-4-pro-15-768x768.webp",
      "/public/img/drones/dji-mavic-4-pro-17-768x768.webp",
      "/public/img/drones/dji-mavic-4-pro-18-768x768.webp",
      "/public/img/drones/dji-mavic-4-pro-19-768x768.webp",
    ],
    // Model 3D
    model3d: "/public/models/DJI Mavic 3 Pro Cine.glb",
    hotspots: [
      {
        id: 1,
        pos: { x: -0.02, y: 0.15, z: 0.62 },
        title: "Hệ Thống Camera Góc Siêu Rộng & Chống Rung RockSteady 3.0",
        desc: "Camera được đặt trong khung bảo vệ chịu lực, sử dụng cảm biến CMOS 1/1.7 inch với góc nhìn siêu rộng lên tới 155°. Khả năng quay video 4K/60fps với công nghệ chống rung điện tử RockSteady và HorizonSteady, giúp giữ khung hình luôn phẳng ổn định ngay cả khi drone nhào lộn hoặc bay ở tốc độ cao. Cụm camera hỗ trợ chế độ màu D-Cinelike để tối ưu hóa khả năng chỉnh màu chuyên nghiệp.",
      },
      {
        id: 2,
        pos: { x: 0.01, y: 0.25, z: 0.63 },
        title: "Hệ Thống Cảm Biến Tầm Nhìn Kép & Hồng Ngoại",
        desc: "Được trang bị hệ thống cảm biến tầm nhìn xuống dưới (Downward Vision System) và cảm biến hồng ngoại ToF. Hệ thống này cho phép máy bay xác định độ cao cực kỳ chính xác khi bay sát mặt đất hoặc trong môi trường không có tín hiệu GPS (như trong nhà, hang động). Nó cũng hỗ trợ tính năng tự động hạ cánh và phát hiện vật cản bên dưới để đảm bảo an toàn tuyệt đối.",
      },
      {
        id: 3,
        pos: { x: 0.11, y: 0.26, z: 0.09 },
        title: "Khung Thân Hợp Kim Magie & Nhựa Kỹ Thuật Siêu Bền",
        desc: "Toàn bộ phần khung được thiết kế theo dạng khí động học tối ưu nhằm giảm lực cản của gió. Sử dụng vật liệu composite kết hợp với sợi carbon giúp giảm trọng lượng tổng thể nhưng vẫn đảm bảo độ cứng cáp để bảo vệ các linh kiện điện tử bên trong khi xảy ra va chạm. Cấu trúc mô-đun cho phép dễ dàng thay thế các cánh tay đòn (arms) nếu bị hư hỏng.",
      },
      {
        id: 4,
        pos: { x: -0.43, y: 0.32, z: 0.75 },
        title: "Động Cơ Brushless Hiệu Suất Cao & Cánh Quạt 4 Cánh",
        desc: "Hệ thống động cơ không chổi than được thiết kế tối ưu cho lực đẩy tức thời mạnh mẽ, cho phép drone tăng tốc từ 0 lên 100 km/h chỉ trong vài giây. Cánh quạt được chế tạo từ vật liệu polycarbonate siêu bền, có khả năng chịu va đập tốt. Thiết kế trục động cơ hướng lên giúp tối ưu hóa luồng khí động học và giảm thiểu tiếng ồn trong quá trình vận hành.",
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
  //  DJI Flip
  {
    id: 5,
    name: "DJI Flip",
    description:
      "DJI Flip với trọng lượng nhẹ dưới 249g, thiết kế nhỏ gọn nhưng không kém phần mạnh mẽ, hỗ trợ ghi hình chất lượng cao với cảm biến CMOS 1/1.3 inch, quay video HDR 4K/60fps và thời gian bay tối đa lên tới 31 phút. Ngoài ra, không chỉ nổi bật với tính năng AI Object Tracking và khả năng bảo vệ lưỡi dao toàn diện, sản phẩm còn tích hợp nhiều công nghệ tiên tiến, đáp ứng mọi nhu cầu của người dùng từ nghiệp dư đến chuyên nghiệp.",
    image: "/public/img/drones/Test.png", // Thay bằng link ảnh thật
    category: "DJI Flip",
    // Thumbail
    images: [
      "/public/img/drones/Test.png",
      "/public/img/drones/DJI Flip_thumbail_2.webp",
      "/public/img/drones/DJI Flip_thumbail_1.webp",
      "/public/img/drones/f73cff7142e81410fc5992faf2322ecb@ultra.webp",
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
