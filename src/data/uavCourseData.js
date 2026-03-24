export const courseData = [
  {
    title: "Chương 1: Nhập môn UAV",
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
    title: "Chương 2: Phần cứng UAV",
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
  101: {
    id: 101,
    title: "UAV là gì? Phân loại và ứng dụng",
    instructor: "Phách Admin",
    duration: "35",
    notesCount: "8",
    content: [
      { type: "heading", text: "1. Định nghĩa UAV" },
      {
        type: "paragraph",
        text: "UAV (Unmanned Aerial Vehicle) hay còn gọi là Drone, là thiết bị bay không người lái được điều khiển từ xa hoặc bay tự động theo lộ trình đã lập trình sẵn.",
      },
      { type: "heading", text: "2. Phân loại theo cấu trúc" },
      {
        type: "list",
        items: [
          "**Fixed-wing:** Cánh cố định, bay đường dài hiệu quả nhưng cần đường băng.",
          "**Rotary-wing:** Cánh quạt (Multicopter), linh hoạt, có thể đứng yên một chỗ.",
          "**VTOL:** Sự kết hợp giữa cánh cố định và cất cánh thẳng đứng.",
        ],
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
