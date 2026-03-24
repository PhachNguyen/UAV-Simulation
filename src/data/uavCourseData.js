export const courseData = [
  {
    title: "Chương 1: Tổng quan",
    icon: "BookOpen",
    isOpen: true,
    lessons: [
      {
        id: 101,
        title: "UAV là gì? Phân loại và ứng dụng",
        duration: "35",
        completed: true,
      },
      {
        id: 102,
        title: "Nguyên lý khí động học cơ bản",
        duration: "20",
        completed: false,
      },
    ],
  },
  {
    title: "Chương 2: Cấu trúc về UAV",
    icon: "Cpu",
    isOpen: true,
    lessons: [
      {
        id: 201,
        title: "Cấu trúc phần cứng UAV Quadcopter",
        duration: "35",
        completed: true,
      },
      {
        id: 202,
        title: "Các loại cảm biến và vai trò của chúng",
        duration: "20",
        completed: false,
      },
    ],
  },
  {
    title: "Chương 3: Lập trình & Điều khiển",
    icon: "Zap",
    isOpen: true,
    lessons: [
      {
        id: 301,
        title: "Lập trình Flight Controller với ArduPilot",
        duration: "35",
        completed: true,
      },
      {
        id: 302,
        title: "Điều khiển UAV bằng tín hiệu Radio",
        duration: "20",
        completed: false,
      },
    ],
  },
];

// Chứa nội dung chi tiết cho từng ID bài học
export const lessonContentMap = {
  // --- CHƯƠNG 1 ---
  //    Chương 1 tổng quan sẽ là web tĩnh
  101: {
    id: 101,
    title: "UAV là gì? Phân loại và ứng dụng",
    instructor: "Phách Admin",
    duration: "45", // Tăng thời gian vì nội dung dài hơn
    notesCount: "15",
    // Image
    // images: [
    //   "/public/img/phantom_drone 1.svg",
    //   "/public/img/phantom_drone 1.svg",
    // ],
    content: [
      {
        type: "heading",
        text: "1. Định nghĩa UAV: Hơn cả một chiếc máy bay đồ chơi",
      },
      {
        type: "paragraph",
        text: "UAV (Unmanned Aerial Vehicle) – hay thường được gọi phổ biến là **Drone** – là thuật ngữ dùng để chỉ các loại phương tiện bay không người lái. Điểm khác biệt cốt lõi so với máy bay truyền thống là UAV không cần phi công ngồi trong buồng lái. Thay vào đó, chúng được vận hành thông qua các bộ điều khiển từ xa hoặc chạy bằng các hệ thống lập trình tự động dựa trên GPS và AI.",
      },
      {
        type: "image",
        src: "/public/img/Drone cam tu.png", // Bỏ chữ /public
        alt: "Mô phỏng DJI Phantom Drone",
      },
      {
        type: "paragraph",
        text: "Thuật ngữ 'Drone' thực chất bắt nguồn từ âm thanh tiếng rì rầm của loài ong đực, mô tả rất chính xác tiếng động phát ra từ các động cơ cánh quạt khi UAV vận hành. Ngày nay, UAV đã thoát ra khỏi cái bóng của một thiết bị quân sự để trở thành công cụ không thể thiếu trong đời sống dân dụng.",
      },
      {
        type: "heading",
        text: "2. Phân loại cấu trúc: Chọn đúng loại cho đúng việc",
      },
      {
        type: "paragraph",
        text: "Không phải mọi UAV đều giống nhau. Tùy vào mục đích sử dụng, chúng được chia thành 3 cấu trúc chính:",
      },
      {
        type: "image",
        src: "/public/img/Classification.jpg",
        alt: "Phân loại các Drones",
      },
      {
        type: "list",
        items: [
          "**Fixed-wing (Cánh cố định):** Có hình dáng như máy bay phản lực. Ưu điểm là thời gian bay cực dài (có thể lên tới 10-20 tiếng) và diện tích bao phủ lớn. Tuy nhiên, chúng cần đường băng để cất/hạ cánh và không thể đứng yên một chỗ.",
          "**Rotary-wing (Cánh quạt/Multicopter):** Phổ biến nhất là Quadcopter (4 cánh). Đây là loại linh hoạt nhất, có khả năng cất cánh thẳng đứng, đứng yên (hover) để quay phim hoặc soi chiếu chi tiết. Nhược điểm lớn nhất là tiêu tốn nhiều năng lượng, thời gian bay thường chỉ từ 20-40 phút.",
          "**VTOL (Vertical Take-Off and Landing):** 'Đứa con lai' hoàn hảo. Nó cất cánh thẳng đứng như trực thăng nhưng khi đạt độ cao nhất định, nó sẽ chuyển sang bay ngang như máy bay cánh cố định. Đây là xu hướng của tương lai trong vận chuyển hàng hóa.",
        ],
      },
      {
        type: "heading",
        text: "3. Ứng dụng thực tế: UAV đang thay đổi thế giới như thế nào?",
      },
      {
        type: "paragraph",
        text: "Hiện nay, ứng dụng của UAV không còn giới hạn ở việc quay phim (Cinematography). Chúng ta đang thấy sự bùng nổ trong các lĩnh vực:",
      },
      {
        type: "list",
        items: [
          "**Nông nghiệp thông minh:** Phun thuốc trừ sâu tự động, sử dụng camera đa phổ để phân tích sức khỏe cây trồng từ trên cao.",
          "**Tìm kiếm và Cứu nạn:** Sử dụng camera nhiệt để tìm người mất tích trong rừng sâu hoặc vùng thiên tai mà con người chưa thể tiếp cận.",
          "**Xây dựng và Khảo sát:** Tạo bản đồ 3D độ chính xác cao cho các công trình xây dựng lớn hoặc khảo sát các đường dây điện cao thế.",
          "**Vận tải (Delivery):** Các ông lớn như Amazon hay DHL đang thử nghiệm dùng Drone để giao kiện hàng nhỏ trực tiếp đến sân nhà khách hàng.",
        ],
      },
      {
        type: "heading",
        text: "4. Kết luận",
      },
      {
        type: "paragraph",
        text: "Việc hiểu rõ định nghĩa và phân loại UAV là bước đệm quan trọng nhất để bạn bước chân vào ngành công nghiệp nghìn tỷ đô này. Trong bài học tiếp theo, chúng ta sẽ đi sâu vào nguyên lý giúp những khối kim loại và carbon này có thể thắng được trọng lực và bay lên trời.",
      },
    ],
  },
  102: {
    id: 102,
    title: "Nguyên lý khí động học cơ bản",
    instructor: "Phách Admin",
    duration: "20",
    notesCount: "5",
    content: [
      { type: "heading", text: "1. Lực nâng (Lift)" },
      {
        type: "paragraph",
        text: "Lực nâng được tạo ra nhờ sự chênh lệch áp suất giữa mặt trên và mặt dưới của cánh (Định luật Bernoulli) hoặc phản lực từ cánh quạt.",
      },
      { type: "heading", text: "2. Các trục chuyển động" },
      {
        type: "list",
        items: [
          "**Pitch:** Chúc đầu lên/xuống.",
          "**Roll:** Nghiêng trái/phải.",
          "**Yaw:** Xoay thân trái/phải quanh trục đứng.",
        ],
      },
    ],
  },

  // --- CHƯƠNG 2 ---
  201: {
    id: 201,
    title: "Cấu trúc phần cứng UAV Quadcopter",
    instructor: "Phách Admin",
    duration: "35",
    notesCount: "12",
    content: [
      { type: "heading", text: "1. Hệ thống khung gầm (Frame)" },
      {
        type: "paragraph",
        text: "Khung carbon là lựa chọn hàng đầu nhờ độ cứng và trọng lượng nhẹ, giúp giảm thiểu rung động cho cảm biến.",
      },
      { type: "heading", text: "2. Động cơ và ESC" },
      {
        type: "paragraph",
        text: "Sử dụng Motor Brushless kết hợp với ESC để điều khiển tốc độ vòng quay chính xác.",
      },
    ],
  },
  202: {
    id: 202,
    title: "Các loại cảm biến và vai trò của chúng",
    instructor: "Phách Admin",
    duration: "20",
    notesCount: "15",
    content: [
      { type: "heading", text: "1. IMU (Inertial Measurement Unit)" },
      {
        type: "paragraph",
        text: "Bao gồm gia tốc kế và con quay hồi chuyển, là cảm biến sống còn để UAV giữ thăng bằng.",
      },
      { type: "heading", text: "2. Cảm biến hỗ trợ khác" },
      {
        type: "list",
        items: [
          "**Barometer:** Cảm biến áp suất để giữ độ cao.",
          "**GPS:** Định vị tọa độ toàn cầu.",
          "**Compass:** La bàn số để xác định phương hướng.",
        ],
      },
    ],
  },

  // --- CHƯƠNG 3 ---
  301: {
    id: 301,
    title: "Lập trình Flight Controller với ArduPilot",
    instructor: "Phách Admin",
    duration: "35",
    notesCount: "20",
    content: [
      { type: "heading", text: "1. Giới thiệu ArduPilot" },
      {
        type: "paragraph",
        text: "Hệ điều hành mã nguồn mở mạnh mẽ nhất cho UAV, hỗ trợ nhiều chế độ bay tự động phức tạp.",
      },
      { type: "heading", text: "2. Mission Planner" },
      {
        type: "paragraph",
        text: "Phần mềm nạp firmware và cấu hình PID, Calibrate cảm biến cho Flight Controller.",
      },
    ],
  },
  302: {
    id: 302,
    title: "Điều khiển UAV bằng tín hiệu Radio",
    instructor: "Phách Admin",
    duration: "20",
    notesCount: "10",
    content: [
      { type: "heading", text: "1. Hệ thống TX/RX" },
      {
        type: "paragraph",
        text: "Bộ phát (Transmitter) và bộ thu (Receiver) sử dụng sóng 2.4GHz để truyền lệnh từ người điều khiển.",
      },
      { type: "heading", text: "2. Giao thức truyền tin" },
      {
        type: "list",
        items: [
          "**SBUS/IBUS:** Truyền nhiều kênh dữ liệu trên 1 sợi dây duy nhất.",
          "**Mavlink:** Giao thức giao tiếp giữa FC và trạm mặt đất (GCS).",
        ],
      },
    ],
  },
};

export const downloadFiles = [
  { name: "Slide Bài giảng 01.pdf", meta: "PDF - 4.5 MB" },
  { name: "Danh sách linh kiện tham khảo", meta: "EXCEL - 1.2 MB" },
];
