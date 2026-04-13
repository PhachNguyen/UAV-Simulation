# SkyLink - Hệ thống Quản lý Bài giảng & Mô phỏng UAV

SkyLink là một nền tảng trực tuyến hiện đại được thiết kế dành riêng cho việc quản lý, phân phối nội dung học tập về thiết bị bay không người lái (UAV). Hệ thống tích hợp khả năng mô phỏng 3D trực quan, giúp người học tiếp cận kiến thức kỹ thuật một cách sinh động và thực tế.

## 🚀 Tính năng chính

- **Quản lý nội dung học tập:** Tổ chức bài giảng theo cấu trúc Khóa học -> Chương -> Bài học.
- **Mô phỏng 3D:** Tích hợp trình xem mô hình UAV 3D (Three.js/CesiumJS) giúp quan sát cấu tạo và nguyên lý bay.
- **Đa phương tiện:** Hỗ trợ video bài giảng, tài liệu PDF và hình ảnh chất lượng cao.
- **Theo dõi tiến độ:** Hệ thống ghi nhận trạng thái hoàn thành và thống kê kết quả học tập cá nhân.
- **Phân quyền người dùng:** Giao diện riêng biệt cho Quản trị viên, Giảng viên và Học viên.

## 🛠 Công nghệ sử dụng

- **Frontend:** Vue 3 (Composition API), Vite, Tailwind CSS.
- **State Management:** Pinia.
- **Đồ họa 3D:** Three.js / CesiumJS / Unity WebGL Integration.
- **Routing:** Vue Router.
- **Backend (Tùy chọn):** Node.js / FastAPI (nếu có).

## 💻 Cài đặt và Chạy ứng dụng

### 1. Yêu cầu hệ thống
- **Node.js:** Phiên bản 18.x trở lên.
- **Trình quản lý gói:** npm hoặc yarn.

### 2. Cài đặt thư viện
Mở terminal tại thư mục dự án và chạy lệnh:
```sh
npm install
### GIỚI THIỆU HỆ THỐNG TRANG KHÓA HỌC
Hệ thống các trang khóa học là trái tim của website SkyLink, nơi người học tương tác trực tiếp với kiến thức và các mô phỏng 3D. Giao diện được xây dựng tối ưu bằng Vue 3 và Tailwind CSS, đảm bảo tốc độ phản hồi nhanh và trải nghiệm người dùng liền mạch.

1. Trang Danh sách Khóa học (Course Catalog)
Đây là điểm chạm đầu tiên của người dùng khi bắt đầu hành trình học tập.

Giao diện trực quan: Các khóa học được hiển thị dưới dạng thẻ (Card) với hình ảnh minh họa UAV bắt mắt, tiêu đề, mô tả ngắn gọn và tác giả.

Bộ lọc thông minh: Cho phép người học tìm kiếm bài giảng theo danh mục (Cơ bản, Nâng cao, Kỹ thuật bay, Bảo trì) hoặc mức độ khó.

Trạng thái cá nhân: Hiển thị nhãn "Đang học", "Hoàn thành" hoặc "Mới" để người dùng dễ dàng theo dõi lộ trình cá nhân.

2. Trang Chi tiết Khóa học (Course Overview)
Trang này cung cấp cái nhìn tổng quan trước khi người học bắt đầu nội dung chính.

Thông tin tổng quát: Giới thiệu mục tiêu khóa học, kết quả đạt được sau khi học và yêu cầu đầu vào.

Cấu trúc chương trình: Danh sách các chương và bài học được trình bày dưới dạng Accordion, cho phép người dùng xem trước lộ trình mà không cần chuyển trang.

Đánh giá & Phản hồi: Khu vực hiển thị nhận xét từ các học viên trước, tạo sự tin tưởng và cộng đồng trao đổi.

3. Trang Học tập Tương tác (Learning Workspace)
Đây là giao diện quan trọng nhất, nơi tích hợp đa phương tiện và công nghệ mô phỏng.

Trình phát đa phương tiện: Khu vực chính hiển thị video bài giảng chất lượng cao hoặc các tài liệu PDF chuyên sâu.

Trình xem mô phỏng 3D (SkyLink 3D Viewer): Một khu vực đặc biệt tích hợp Three.js hoặc CesiumJS, cho phép người học xoay, phóng to/thu nhỏ và tương tác trực tiếp với mô hình 3D của các loại UAV ngay trong bài học.

Thanh lộ trình bên trái (Course Sidebar): Giúp người học nhanh chóng chuyển đổi giữa các bài học, đánh dấu các bài đã hoàn thành bằng checkbox tự động.

Ghi chú & Thảo luận: Mục ghi chú cá nhân bên dưới mỗi bài giảng và khung chat thảo luận thời gian thực với giảng viên và các bạn học khác.

4. Trang Theo dõi Tiến độ (Learning Progress)
Biểu đồ trực quan: Sử dụng các biểu đồ để thể hiện % hoàn thành của từng khóa học.

Hệ thống huy hiệu: Tặng huy hiệu ảo khi người dùng hoàn thành các mốc quan trọng (ví dụ: "Chuyên gia cấu tạo UAV", "Phi công lý thuyết").

Lịch sử học tập: Lưu lại mốc thời gian và những bài học vừa xem để người dùng có thể quay lại học tiếp chỉ với một cú click.

Điểm nhấn công nghệ (Dành cho báo cáo):
"Toàn bộ các trang khóa học được xây dựng theo kiến trúc Component-based của Vue 3, giúp tái sử dụng mã nguồn hiệu quả và dễ dàng mở rộng thêm các loại bài giảng mới trong tương lai. Việc ứng dụng Reactive State giúp cập nhật tiến độ học tập tức thì mà không cần tải lại trang, mang lại trải nghiệm mượt mà như một ứng dụng desktop."
