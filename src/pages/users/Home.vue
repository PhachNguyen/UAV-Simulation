<template>
<div class="relative w-full h-[300px] flex items-center overflow-hidden  shadow-sm mb-12">
  
  <img 
    src="../../../public/img/hero-mavic.webp" 
    alt="Hero UAV"
    class="absolute inset-0 w-full h-full object-cover object-center z-0"
  >
  
  <div class="absolute inset-0 bg-gradient-to-r from-[#0b1f3f]/95 via-[#0b1f3f]/70 to-transparent z-0"></div>

 <div class="relative z-10 flex flex-col justify-center px-8 md:px-10 max-w-3xl h-full">
    
  <span class="font-['Roboto_Mono'] inline-block w-max px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-blue-300 uppercase bg-blue-900/40 border border-blue-500/30 rounded-full backdrop-blur-sm">
    Trung tâm đào tạo 
  </span>
  
  <h1 class="font-['Poppins'] text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-lg">
    Làm chủ không gian với <br />
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
      Hệ thống giả lập bay
    </span>
  </h1>
  
  <p class="font-['Poppins'] text-slate-300 text-sm md:text-base mt-4 max-w-xl leading-relaxed line-clamp-2">
    Trải nghiệm sa bàn kỹ thuật số độc quyền. Bắt đầu lộ trình trở thành chuyên gia đo đạc và điều khiển Drone chuyên nghiệp ngay hôm nay.
  </p>
  
</div>
</div>
  <div class="min-h-screen bg-slate-100 p-4 lg:p-6 flex justify-center font-sans text-slate-800">
    <!-- <h1 class="text-3xl md:text-4xl font-bold text-[#0b1f3f] text-center mb-8">
  Tổng quan hệ thống
</h1> -->
    <div class="max-w-[1800px] w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- <h1 class="text-3xl md:text-4xl font-bold text-[#0b1f3f] text-center mb-8">
  Tổng quan hệ thống
</h1> -->
      <!-- Grid 1 -->
      <div class="bg-white rounded-3xl shadow-sm p-6 md:p-10 flex flex-col">
        
      

        <!-- Banner cũ -->
      <!-- <section class="rounded-[2rem] overflow-hidden flex relative min-h-[360px] w-full mb-12">
  <div class="absolute inset-0 w-full hidden md:block">
    <div class="absolute inset-0 z-10"></div>
    <img 
      src="https://images.unsplash.com/photo-1524143986875-3b098d78b363?auto=format&fit=crop&q=80" 
      alt="Drone Hero" 
      class="w-full h-full object-cover object-center" 
    />
  </div>
</section> -->
<!-- <h1 class="text-3xl md:text-4xl font-bold text-[#0b1f3f] text-center mb-8">
  Tổng quan hệ thống
</h1> -->
<section class="rounded-[2rem] overflow-hidden relative min-h-[360px] w-full mb-12 group">
  
  <transition-group name="fade" tag="div">
    <div 
      v-for="(banner, index) in banners" 
      :key="banner.id"
      v-show="currentIndex === index"
      class="absolute inset-0 w-full h-full"
    >
      <div class="absolute inset-0 bg-black/10 z-10"></div>
      
      <img 
        :src="banner.url" 
        :alt="banner.alt" 
        class="w-full h-full object-cover object-center" 
      />
    </div>
  </transition-group>

  <button @click="prevSlide" class="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
  </button>
  <button @click="nextSlide" class="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
  </button>

  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 ">
    <button 
      v-for="(banner, index) in banners" 
      :key="'dot-' + index"
      @click="goToSlide(index)"
      class="h-2 rounded-full transition-all duration-500 ease-in-out cursor-pointer"
      :class="currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'"
    ></button>
  </div>
</section>

    <section class="mb-12">
  <h2 class="text-2xl font-bold  mb-5 text-[#0b1f3f]">Kiến thức cơ sở về UAV</h2>

  <div class="grid grid-cols-1 md:grid-2 gap-8">
    
    <div class="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col">
  <h3 class="text-xl font-bold text-[#0b1f3f] mb-4 border-b border-slate-100 pb-3">
    UAV là gì?
  </h3>
  
  <p class="text-slate-600 text-sm leading-relaxed mb-6">
    <strong class="text-[#0b1f3f]">UAV (Unmanned Aerial Vehicle)</strong> - phương tiện bay không người lái, thường được biết đến với tên gọi phổ thông là Drone. Trong kỹ thuật chuyên sâu, UAV thực chất chỉ là phần cứng bay của một hệ thống toàn diện hơn gọi là <strong class="text-slate-800">UAS (Unmanned Aircraft System)</strong>. 
  </p>
  <p class="text-slate-600 text-sm leading-relaxed mb-8">
    UAV hiện đại không chỉ là cỗ máy cơ học bay lơ lửng, mà là một nền tảng điện toán viền (Edge Computing) di động trên không. Chúng có khả năng tự vận hành, xử lý các thuật toán trí tuệ nhân tạo, nhận diện hình ảnh thời gian thực và thực thi quỹ đạo bay phức tạp nhờ hệ thống máy tính nhúng được lập trình sẵn.
  </p>
  
  <div class="mt-auto">
    <p class="text-xs text-[#0b1f3f] font-bold mb-4 uppercase tracking-wider">
      Cấu trúc Hệ thống cốt lõi
    </p>
    <ul class="text-sm text-slate-600 space-y-5 pl-3 border-l-2 border-blue-500">
      <li class="pl-2">
        <strong class="text-slate-800 block mb-1">Khung máy bay & Động cơ (Airframe & Propulsion):</strong> 
        Khung thường được chế tạo từ sợi carbon hoặc hợp kim hàng không để tối ưu hóa khí động học và giảm trọng lượng. Hệ thống động cơ không chổi than kết hợp với bộ điều tốc (ESC) cung cấp lực nâng tĩnh và độ ổn định cao trước sức gió.
      </li>
      <li class="pl-2">
        <strong class="text-slate-800 block mb-1">Bộ điều khiển trung tâm (Flight Controller):</strong> 
        Đóng vai trò là "bộ não" của hệ thống. Vi xử lý này liên tục chạy các vòng lặp PID, đọc dữ liệu từ cảm biến hàng nghìn lần mỗi giây để vi chỉnh tốc độ motor, giúp UAV giữ thăng bằng hoặc bay chính xác theo các điểm tọa độ (Waypoints) được chỉ định.
      </li>
      <li class="pl-2">
        <strong class="text-slate-800 block mb-1">Cảm biến & Tải trọng (Sensors & Payload):</strong> 
        Tích hợp hệ thống định vị động học thời gian thực (RTK-GNSS) cho độ chính xác cấp centimet, cụm cảm biến quán tính (IMU). Tải trọng mang theo có thể là Camera độ phân giải cao, Cảm biến ảnh nhiệt (Thermal) hoặc máy quét LiDAR phục vụ phân tích dữ liệu không gian.
      </li>
      <li class="pl-2">
        <strong class="text-slate-800 block mb-1">Viễn trắc & Trạm mặt đất (Telemetry & GCS):</strong> 
        Hệ thống liên kết vô tuyến truyền tải luồng dữ liệu hai chiều. Cho phép kỹ thuật viên giám sát các thông số thiết bị từ xa, truyền phát video trực tiếp, đồng thời tích hợp với các phần mềm quản lý để lập kế hoạch hoặc mô phỏng (Simulation) đường bay an toàn.
      </li>
    </ul>
  </div>
</div>

   <div class="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
  <h3 class="text-xl font-bold text-[#0b1f3f] mb-4 border-b border-slate-100 pb-3">
    Lịch sử phát triển & Định hình công nghệ
  </h3>

  <div class="space-y-6 mt-2 flex-1 relative before:absolute before:inset-y-2 before:left-[4.5px] before:w-[2px] before:bg-slate-100 pl-5">

    <div class="relative">
      <div class="absolute -left-[24.5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-white"></div>
      <h4 class="text-sm font-bold text-[#0b1f3f]">Khởi nguyên sơ khai (1849 - 1915)</h4>
      <p class="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
        Khái niệm thiết bị bay không người lái xuất hiện lần đầu năm 1849 khi quân đội Áo sử dụng khinh khí cầu mang chất nổ tấn công Venice. Dù phụ thuộc hoàn toàn vào hướng gió, đây là nền móng đầu tiên cho ý tưởng tách con người khỏi các phương tiện bay nguy hiểm.
      </p>
    </div>

    <div class="relative">
      <div class="absolute -left-[24.5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-white"></div>
      <h4 class="text-sm font-bold text-[#0b1f3f]">Đột phá sóng Vô tuyến (Thế chiến I & II)</h4>
      <p class="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
        Sự ra đời của công nghệ điều khiển bằng sóng vô tuyến tạo ra bước ngoặt lớn. Các nguyên mẫu như <strong class="text-slate-800">Kettering Bug (1918)</strong> và <strong class="text-slate-800">Radioplane OQ-2 (1940)</strong> đánh dấu việc UAV được sản xuất hàng loạt để phục vụ huấn luyện và trinh sát chiến thuật.
      </p>
    </div>

    <div class="relative">
      <div class="absolute -left-[24.5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-white"></div>
      <h4 class="text-sm font-bold text-[#0b1f3f]">Kỷ nguyên Vệ tinh & GPS (Cuối TK 20)</h4>
      <p class="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
        Việc tích hợp hệ thống định vị toàn cầu (GPS) và liên kết dữ liệu vệ tinh (Satellite Datalink) giúp UAV phá vỡ giới hạn tầm nhìn (BVLOS). Các hệ thống bay bắt đầu có năng lực tuần tra tự động liên tục hàng chục giờ trên không trung.
      </p>
    </div>

    <div class="relative">
      <div class="absolute -left-[24.5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-white"></div>
      <h4 class="text-sm font-bold text-[#0b1f3f]">Thương mại hóa & Công nghệ AI (Thế kỷ 21)</h4>
      <p class="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
        Nhờ sự tối ưu hóa của vi mạch và pin Lithium, UAV đa động cơ (Multi-rotor) bùng nổ mạnh mẽ. Ngày nay, nền tảng bay được tích hợp <strong class="text-slate-800">Computer Vision, AI Edge Computing</strong> và <strong class="text-slate-800">LiDAR</strong>, trở thành công cụ chủ lực trong Nông nghiệp chính xác, Bản đồ số 3D và Giám sát hạ tầng.
      </p>
    </div>

  </div>
</div>

  </div>
</section>
      </div>
    <!-- Grid 2 -->
    <div class="bg-white rounded-3xl shadow-sm p-6 md:p-10 flex flex-col h-full">
  <!-- Danh sách drone -->
<section class="mb-10 w-full">
  <div class="flex justify-between items-end mb-6">
    <h2 class="text-2xl font-bold text-[#0b1f3f]">Thư viện Drone</h2>
<router-link 
  to="/services" 
  class="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
>
  Xem tất cả
</router-link>  </div>

<div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <UavCard 
        v-for="drone in droneLibrary" 
        :key="drone.id" 
        :drone="drone"
        @details="goToDroneDetails"
      />
    </div>
</section>
<!-- Lộ trình bài giảng -->
<section class="w-full">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
  <h2 class="text-2xl font-bold text-[#0b1f3f]">Lộ trình bài giảng</h2>
  
 <router-link 
  v-if="!isLoggedIn"
  to="/register-course" 
  class="inline-flex items-center justify-center px-6 py-2.5 bg-[#0b1f3f] text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
>
  Đăng ký tham gia ngay
</router-link>

<router-link 
  v-else
  to="/course" 
  class="inline-flex items-center justify-center px-6 py-2.5 bg-[#0b1f3f] text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
>
  Vào học bài giảng ngay
</router-link>
</div>

  <div class="bg-white border border-slate-200/80 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
    
    <div class="relative flex flex-col gap-8">
      
      <div class="absolute left-6 top-6 bottom-6 w-[2px] bg-[#0b1f3f] z-0"></div>

      <div v-for="(lesson, idx) in lectureList" :key="idx" class="relative z-10 flex items-start gap-5">
        
        <div class="w-12 h-12 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 ring-4 ring-white">
          {{ idx + 1 }}
        </div>
        
        <div class="pt-2.5">
          <h3 class="text-lg font-bold text-[#0b1f3f] mb-1.5">
            {{ idx + 1 }}. {{ lesson.title }}
          </h3>
          <p class="text-gray-700 text-sm leading-relaxed pr-4">
            {{ lesson.description }}
          </p>
        </div>

      </div>
    </div>
    
  </div>
</section>
<!-- Trải nghiệm 3D -->
<section class="w-full mt-10">
  <h2 class="text-xl md:text-2xl font-bold text-[#0b1f3f] mb-6 md:mb-5 ">
    Trải nghiệm mô phỏng
  </h2>
  <div class="relative w-full min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden shadow-xl group flex items-center justify-center border border-slate-200/50">
    
    <img 
      src="../../../public/img/UAV_simualation.png" 
      alt="Giao diện mô phỏng drone 3D" 
      class="absolute inset-0 w-full h-full object-cover z-0"
    />

    <div class="absolute inset-0 bg-black/20 z-0 group-hover:bg-black/30 transition-colors duration-500"></div>

    <div class="relative z-10 px-6 py-8 md:px-6 md:py-6 mx-4 bg-white/50 backdrop-blur-sm rounded-2xl max-w-2xl text-center shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-white/60 transition-transform duration-300 hover:scale-[1.02]">
      
      <h2 class="text-2xl md:text-3xl font-black text-[#0b1f3f]  mb-4  ">
        Mô phỏng cấu tạo và vận hành
      </h2>
      
      <p class="text-slate-700 font-medium text-sm md:text-base  mb-8 max-w-lg mx-auto">
        Hệ thống mô phỏng 3D hiện đại tích hợp trực tiếp vào bài giảng, cung cấp cái nhìn chi tiết về linh kiện và trải nghiệm bay chân thực nhất.
      </p>

      <router-link 
  to="/simulation" 
  class="inline-block bg-[#0b1f3f] text-white px-8 py-3.5 rounded-lg font-bold text-base hover:bg-[#1a365d] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
>
  Trải Nghiệm Mô Phỏng
</router-link>

    </div>
  </div>
</section>
  <footer class="mt-auto pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
    <div class="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600">
      <a href="#" class="hover:text-[#0b1f3f]">Về Chúng Tôi</a>
      <a href="#" class="hover:text-[#0b1f3f]">Chính Sách Bảo Mật</a>
      <a href="#" class="hover:text-[#0b1f3f]">Điều Khoản Sử Dụng</a>
      <a href="#" class="hover:text-[#0b1f3f]">Liên Hệ Hỗ Trợ</a>
    </div>
    <p class="text-[11px] text-slate-400">©2026 Electric Power University. All rights reserved.</p>
  </footer>

</div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import UavCard from '@/components/UavCard.vue';
import axios from '../../utils/apis/axios';
import { useRouter } from 'vue-router';
const router = useRouter();
// Khởi tạo biến kiểm tra trạng thái đăng nhập
const isLoggedIn = ref(false);
// Danh sách thiết bị đã thay ảnh Unsplash
const droneLibrary = ref([]);
// 2. Hàm kết nối API Backend bằng Axios
const fetchDrones = async () => {
  try {
    const response = await axios.get('/drones'); 
    
    // 1. In dữ liệu ra console để xem Backend thực sự trả về cái gì
    console.log("Dữ liệu gốc từ API:", response.data); 
    
    // 2. Tìm đúng mảng dữ liệu. 
    // TẠM THỜI gán thử các trường hợp phổ biến:
    let uavArray = response.data; 
    
    if (response.data.data) uavArray = response.data.data;
    else if (response.data.uavs) uavArray = response.data.uavs; // Nếu backend trả về { uavs: [...] }
    else if (response.data.drones) uavArray = response.data.drones;
    
    // 3. Kiểm tra an toàn trước khi dùng .slice()
    if (Array.isArray(uavArray)) {
      droneLibrary.value = uavArray.slice(0, 4); 
    } else {
      console.error("Dữ liệu không phải là mảng! Vui lòng kiểm tra lại cấu trúc API ở console.log.");
    }
    
  } catch (error) {
    console.error('Không thể tải dữ liệu Thư viện Drone:', error);
  }
};

const goToDroneDetails = (droneId) => {
  router.push(`/test2/${droneId}`); 
};
// const droneLibrary = ref([
//   {
//     name: 'Phantom 4 Advanced',
//     weight: '1368g',
//     range: '7 km',
//     speed: '20 m/s',
//     camera: '1" CMOS',
//     flightTime: '30 phút',
//     image: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?auto=format&fit=crop&q=80'
//   },
//   {
//     name: 'Mavic 3 Pro',
//     weight: '958g',
//     range: '15 km',
//     speed: '21 m/s',
//     camera: '4/3 CMOS',
//     flightTime: '43 phút',
//     image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80'
//   },
//   {
//     name: 'Matrice 300 RTK',
//     weight: '6.3 kg',
//     range: '15 km',
//     speed: '23 m/s',
//     camera: 'Zenmuse H20T',
//     flightTime: '55 phút',
//     image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80'
//   },
//   {
//     name: 'Inspire 2',
//     weight: '3440g',
//     range: '7 km',
//     speed: '26 m/s',
//     camera: 'Zenmuse X7',
//     flightTime: '27 phút',
//     image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80' // Thêm ảnh Unsplash thứ 4
//   }
// ]);

// Danh sách bài giảng
const lectureList = ref([
  {
    title: 'Cơ bản về UAV & Pháp lý',
    description: 'Khởi đầu vững chắc với kiến thức nền tảng về nguyên lý khí động học và cấu tạo của máy bay không người lái. Bạn sẽ nắm rõ quy trình kiểm tra an toàn trước chuyến bay (Pre-flight check), cách thiết lập cơ bản, cũng như tìm hiểu kỹ về các quy định pháp lý, vùng cấm bay và thủ tục xin phép bay hiện hành.'
  },
  {
    title: 'Bảo dưỡng & Quản lý thiết bị',
    description: 'Tìm hiểu sâu về phần cứng của drone, cách quản lý và tối ưu hóa tuổi thọ pin Lithium-polymer (LiPo). Hướng dẫn chi tiết cách vệ sinh cảm biến, hiệu chỉnh la bàn (Compass Calibration), chẩn đoán lỗi cơ bản và bảo trì định kỳ để thiết bị luôn hoạt động ở trạng thái an toàn và hoàn hảo nhất.'
  },
  {
    title: 'Kỹ thuật bay chuyên nghiệp',
    description: 'Nâng cao kỹ năng điều khiển drone thông qua việc thực hành các thao tác bay từ cơ bản đến phức tạp trong nhiều điều kiện thời tiết. Khóa học tập trung vào kỹ năng xử lý tình huống khẩn cấp, mất tín hiệu (Return-to-Home), bay không GPS (ATTI Mode) và cách tận dụng tối đa hệ thống cảm biến tránh vật cản.'
  },
  // {
  //   title: 'Nhiếp ảnh & Quay phim trên không (Cinematography)',
  //   description: 'Khám phá nghệ thuật kể chuyện bằng hình ảnh từ trên cao. Bạn sẽ được học cách thiết lập thông số camera chuyên sâu (ISO, Shutter Speed, ND Filter), thực hành các kỹ thuật góc máy điện ảnh kinh điển (Orbit, Reveal, Tracking) và quy tắc bố cục để tạo ra những thước phim đạt chuẩn thương mại.'
  // },
  // {
  //   title: 'Lập trình bay tự động & Trắc địa',
  //   description: 'Làm quen với các phần mềm điều khiển chuyến bay tự động hàng đầu như DroneDeploy, Pix4D hoặc Litchi. Học cách thiết lập bản đồ bay (Grid), chỉ định điểm trung chuyển (Waypoints) để thu thập dữ liệu đồng bộ, phục vụ trực tiếp cho các công tác khảo sát, trắc địa và lập bản đồ địa hình.'
  // },
  // {
  //   title: 'Chuyên gia phân tích dữ liệu',
  //   description: 'Trở thành chuyên gia trong việc thu thập, xử lý và số hóa dữ liệu từ UAV. Ứng dụng các phần mềm chuyên dụng để xử lý ảnh quang phổ, ghép ảnh trực giao (Orthomosaic), tạo mô hình 3D, phân tích chỉ số thực vật (NDVI) trong nông nghiệp thông minh và đo lường khối lượng trong ngành xây dựng.'
  // },
  // {
  //   title: 'Dự án thực tế & Cấp chứng chỉ',
  //   description: 'Tổng hợp và áp dụng toàn bộ kiến thức đã học để thực hiện một dự án thực tế do giảng viên giao phó. Sau khi hoàn thành, học viên sẽ được hướng dẫn hoàn thiện hồ sơ năng lực (Portfolio), các thủ tục thi lấy chứng chỉ vận hành UAV hợp lệ và cơ hội kết nối với các doanh nghiệp trong ngành.'
  // }
])
// Mock data cho Cột Trái
const featuredProducts = ref([
  {
    name: 'Mavic 3 Pro',
    specs: 'Camera 4/3 CMOS, 46 phút bay',
    price: '290.000',
    image: 'https://cdn-icons-png.flaticon.com/512/9338/9338302.png'
  },
  {
    name: 'Matrice 350 RTK',
    specs: 'Camera 4/3 CMOS, 46 phút bay',
    price: '750.000',
    image: 'https://cdn-icons-png.flaticon.com/512/9338/9338298.png'
  },
  {
    name: 'Mavic 3 Pro',
    specs: 'Camera 4/3 CMOS, 46 phút bay',
    price: '360.000',
    image: 'https://cdn-icons-png.flaticon.com/512/9338/9338302.png'
  },
  {
    name: 'Matrice 350 RTK',
    specs: 'Camera 4/3 CMOS, 46 phút bay',
    price: '920.000',
    image: 'https://cdn-icons-png.flaticon.com/512/9338/9338298.png'
  }
]);




// 1. Mảng chứa các hình ảnh banner của bạn
const banners = ref([
  { id: 1, url: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?auto=format&fit=crop&q=80', alt: 'Drone 1' },
  { id: 2, url: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80', alt: 'Drone 2' },
  { id: 3, url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80', alt: 'Drone 3' }
]);

const currentIndex = ref(0);
let autoPlayInterval = null;

// Chuyển sang ảnh tiếp theo
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % banners.value.length;
};

// Lùi về ảnh trước đó
const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? banners.value.length - 1 : currentIndex.value - 1;
};

// Nhảy đến ảnh cụ thể khi bấm vào các thanh nhỏ ở dưới
const goToSlide = (index) => {
  currentIndex.value = index;
};

// Tự động chuyển ảnh sau mỗi 5 giây
onMounted(() => {
  const token = localStorage.getItem("userToken");
  
  // Nếu có token, chuyển isLoggedIn thành true để hiển thị nút "Vào học bài giảng"
  isLoggedIn.value = !!token;
  fetchDrones();
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 3000); // 5000ms = 5 giây
});

// Xóa bộ đếm khi component bị hủy để tối ưu bộ nhớ
onUnmounted(() => {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
});
</script>

<style scoped>
/* Nhúng Material Symbols để hiển thị icon phần Lợi ích */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
/* HIỆU ỨNG CHUYỂN CẢNH CHO BANNER (Bắt buộc phải có để thẻ <transition-group name="fade"> hoạt động) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>