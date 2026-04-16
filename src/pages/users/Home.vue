<template>
  <div class="uav-academy-wrapper bg-white">
    <section
      class="relative w-full min-h-[600px] flex items-center overflow-hidden bg-[#0b1f3f]"
    >
      <div class="absolute inset-0 z-0">
        <img
          src="../../../public/img/hero-mavic.webp"
          alt="3D UAV Graphic"
          class="w-full h-full object-cover object-center opacity-40 scale-110 motion-safe:animate-[pulse_8s_infinite]"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#0b1f3f] via-[#0b1f3f]/80 to-transparent"
        ></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div class="max-w-2xl">
          <span
            class="inline-block px-4 py-1 mb-6 text-xs tracking-widest text-blue-400 uppercase border border-blue-400/30 rounded-full bg-blue-400/10"
          >
            Professional Training Program
          </span>

          <h1 class="text-5xl md:text-6xl mb-6 text-white tracking-tight">
            Kỹ thuật UAV <span class="text-blue-500">Cao cấp</span> & <br />
            Phân tích Dữ liệu
          </h1>

          <p
            class="text-slate-300 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-light italic"
          >
            Chương trình chuyên sâu về tối ưu hóa hệ thống không người lái, xử
            lý dữ liệu LiDAR thời gian thực và phân tích quang trắc độ chính xác
            cao.
          </p>

          <div class="flex flex-wrap gap-4">
            <button
              class="bg-[#1D293D] cursor-pointer text-white px-10 py-4 rounded-lg font-bold hover:bg-gray-700"
            >
              Bắt đầu Chương trình
            </button>

            <button
              class="cursor-pointer bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-lg font-bold hover:bg-white/20 transition-all"
            >
              Xem Tài liệu
            </button>
          </div>

          <div
            class="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <div class="text-white font-bold text-2xl">100+</div>
              <div class="text-slate-400 text-xs uppercase tracking-tighter">
                Học viên tốt nghiệp
              </div>
            </div>
            <div>
              <div class="text-white font-bold text-2xl">0.5cm</div>
              <div class="text-slate-400 text-xs uppercase tracking-tighter">
                Độ chính xác LiDAR
              </div>
            </div>
            <div>
              <div class="text-white font-bold text-2xl">24/7</div>
              <div class="text-slate-400 text-xs uppercase tracking-tighter">
                Hỗ trợ kỹ thuật
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  Lộ trình đào tạo -->
    <section class="max-w-7xl mx-auto px-6 py-14 bg-white">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-[#0b1f3f] mb-4">
          Lộ trình Đào tạo Chuyên sâu
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto">
          Từ nền tảng kỹ thuật phần cứng đến kỹ năng phân tích dữ liệu AI phức
          tạp, chúng tôi chuẩn bị cho bạn lộ trình trở thành chuyên gia UAV thực
          thụ.
        </p>
      </div>

      <div class="relative">
        <div
          class="hidden md:block absolute top-12 left-[10%] w-[80%] h-[2px] bg-slate-100 z-0"
        >
          <div
            class="w-2/3 h-full bg-blue-600 transition-all duration-1000"
          ></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8 relative z-10">
          <div class="group">
            <div class="flex flex-col items-center">
              <div
                class="w-24 h-24 bg-white border-2 border-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:bg-blue-600 transition-all duration-300 transform group-hover:-translate-y-2"
              >
                <Settings
                  class="w-10 h-10 text-blue-600 group-hover:text-white"
                />
              </div>

              <div
                class="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center group-hover:bg-white group-hover:shadow-2xl group-hover:border-transparent transition-all duration-300"
              >
                <span
                  class="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full mb-4 inline-block"
                  >Module 01</span
                >
                <h3 class="text-xl font-bold text-[#0b1f3f] mb-3">
                  Kỹ thuật Hệ thống
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed mb-6">
                  Làm chủ cấu trúc Avionics, hệ thống đẩy (Propulsion) và cơ chế
                  vận hành an toàn của các dòng thiết bị Enterprise.
                </p>
                <ul class="text-xs text-left space-y-2 text-slate-500">
                  <li class="flex items-center gap-2">
                    <div class="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Hiệu chỉnh IMU & Compass
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Bảo trì hệ thống động cơ
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="group">
            <div class="flex flex-col items-center">
              <div
                class="w-24 h-24 bg-blue-600 border-2 border-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_20px_40px_rgba(37,99,235,0.3)] transform group-hover:-translate-y-2 transition-all"
              >
                <Radio class="w-10 h-10 text-white" />
              </div>

              <div
                class="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center group-hover:bg-white group-hover:shadow-2xl group-hover:border-transparent transition-all duration-300"
              >
                <span
                  class="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full mb-4 inline-block"
                  >Module 02</span
                >
                <h3 class="text-xl font-bold text-[#0b1f3f] mb-3">
                  Cảm biến & Khảo sát
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed mb-6">
                  Kỹ thuật tích hợp LiDAR, Sensor nhiệt và Quang trắc học để thu
                  thập dữ liệu độ chính xác cấp milimet.
                </p>
                <ul class="text-xs text-left space-y-2 text-slate-500">
                  <li class="flex items-center gap-2">
                    <div class="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Thiết lập trạm Base RTK
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Quy trình quét LiDAR 3D
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="group">
            <div class="flex flex-col items-center">
              <div
                class="w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-600 transition-all duration-300 transform group-hover:-translate-y-2"
              >
                <BarChart3
                  class="w-10 h-10 text-slate-400 group-hover:text-blue-600"
                />
              </div>

              <div
                class="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center group-hover:bg-white group-hover:shadow-2xl group-hover:border-transparent transition-all duration-300"
              >
                <span
                  class="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase bg-slate-100 px-3 py-1 rounded-full mb-4 inline-block"
                  >Module 03</span
                >
                <h3 class="text-xl font-bold text-[#0b1f3f] mb-3">
                  Phân tích AI
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed mb-6">
                  Sử dụng thuật toán học máy để phân loại đám mây điểm (Point
                  Cloud) và tự động hóa báo cáo hạ tầng.
                </p>
                <ul class="text-xs text-left space-y-2 text-slate-500">
                  <li class="flex items-center gap-2">
                    <div class="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Xử lý Digital Twin 3D
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1 h-1 bg-blue-400 rounded-full"></div>
                    Nhận diện lỗi bằng AI
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Trưng bày sản phẩm -->
    <section class="max-w-7xl mx-auto px-6 bg-[#f8fafc] rounded-[3rem]">
      <div
        class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
      >
        <div class="max-w-2xl">
          <h2 class="text-4xl font-bold text-[#0b1f3f] mb-4">
            Hệ Sinh Thái Thiết Bị
          </h2>
          <p class="text-slate-500 text-lg">
            Phân tích thông số kỹ thuật và khả năng ứng dụng thực tế của các
            dòng thiết bị không người lái đầu bảng trong ngành trắc địa và kiểm
            tra hạ tầng.
          </p>
        </div>
        <button
          class="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          Xem tất cả thiết bị
          <!-- <span class="material-symbols-outlined">arrow_forward</span> -->
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(item, index) in equipmentList"
          :key="index"
          class="group cursor-pointer bg-white p-2 rounded-3xl border border-slate-200 hover:border-[#0b1f3f] hover:shadow-[0_20px_50px_rgba(11,31,63,0.1)] transition-all duration-500 flex flex-col h-full"
        >
          <div
            class="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute top-3 left-3">
              <span
                class="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0b1f3f] shadow-sm"
              >
                {{ item.category }}
              </span>
            </div>
          </div>

          <div class="p-5 flex flex-col flex-grow">
            <h4
              class="text-xl font-bold text-[#0b1f3f] mb-2 group-hover:text-blue-600 transition-colors"
            >
              {{ item.title }}
            </h4>
            <p class="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
              {{ item.description }}
            </p>

            <div
              class="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto"
            >
              <div class="text-center">
                <p class="text-[10px] uppercase text-slate-400 font-bold">
                  Độ chính xác
                </p>
                <p class="text-sm font-semibold text-[#0b1f3f]">
                  {{ item.accuracy }}
                </p>
              </div>
              <div class="w-[1px] h-8 bg-slate-100"></div>
              <div class="text-center">
                <p class="text-[10px] uppercase text-slate-400 font-bold">
                  Thời gian bay
                </p>
                <p class="text-sm font-semibold text-[#0b1f3f]">
                  {{ item.flightTime }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  -->
    <section class="max-w-7xl mx-auto px-6 py-24">
      <div class="grid lg:grid-cols-12 gap-8">
        <div class="lg:col-span-4 flex flex-col justify-center">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 w-fit"
          >
            <Zap class="w-3 h-3" /> Advanced Tech
          </div>
          <h2 class="text-4xl font-black text-[#0b1f3f] mb-6 leading-tight">
            Học tập trên <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"
            >
              Hệ sinh thái Số
            </span>
          </h2>
          <p class="text-slate-500 mb-8 leading-relaxed">
            Chúng tôi không chỉ dạy bay. Chúng tôi cung cấp một nền tảng công
            nghệ toàn diện để bạn làm chủ toàn bộ quy trình xử lý dữ liệu không
            gian từ thực địa đến mô hình 3D.
          </p>
          <div class="space-y-4">
            <div
              class="flex flex-col gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <div
                class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0"
              >
                <div>
                  <CheckCircle2 class="w-5 h-5 text-green-500" />
                </div>
              </div>
              <div>
                <h5 class="font-bold text-[#0b1f3f]">Chuẩn quốc tế</h5>
                <p class="text-xs text-slate-500">
                  Giáo trình theo tiêu chuẩn DJI Academy và EuroUSC.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="md:col-span-2 relative group overflow-hidden rounded-3xl bg-[#0b1f3f] aspect-[21/9] flex items-center p-8 md:p-12"
          >
            <div class="relative z-10 max-w-sm">
              <div
                class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6"
              >
                <Cpu class="w-6 h-6 text-white" />
              </div>
              <h4 class="text-2xl font-bold text-white mb-2">
                VR Flight Simulator
              </h4>
              <p class="text-blue-100/70 text-sm">
                Hệ thống mô phỏng bay thực tế ảo giúp học viên rèn luyện kỹ năng
                xử lý tình huống khẩn cấp mà không rủi ro thiết bị.
              </p>
            </div>
            <div
              class="absolute right-[-10%] bottom-[-20%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700"
            ></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrt_2znr9Af3BGStlrarpa0pzuoCgW-UZIH3-OTfOnYFHtV1RoQ1e-n5vJMDqFuHr1DsyurgjBKXc0K4lVL3RQf_2j8y0GR3Ld3_fnKPgHKUJe5-1FyDdWTenq4lC2DVesA6VQa9TxFtZE26NHqAobsZBv8iB-ZmCixT2FW1MTyLoLbATAPLskKitt-whglAvRenwXPthN4O3bGeWdbZVBzH0YegD6LCiNqgEOlQOZRWHtZolJkhzFmR6tLfcbQlET1ivEX2fSVw"
              class="absolute right-0 top-0 h-full w-1/2 object-cover opacity-50 mask-gradient-left"
              alt="Simulation"
            />
          </div>

          <div class="bg-slate-100 rounded-3xl p-8">
            <div
              class="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-500 transition-colors"
            >
              <BrainCircuit
                class="w-6 h-6 text-blue-600 group-hover:text-white"
              />
            </div>
            <h4
              class="text-xl font-bold text-[#0b1f3f] group-hover:text-white mb-2"
            >
              AI Analytics Lab
            </h4>
            <p
              class="text-sm text-slate-500 group-hover:text-blue-100 leading-relaxed"
            >
              Thực hành huấn luyện Model nhận diện hư hỏng hạ tầng tự động bằng
              dữ liệu hình ảnh UAV.
            </p>
          </div>

          <div class="bg-white border-2 border-slate-100 rounded-3xl p-8">
            <div
              class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-6"
            >
              <CloudLightning class="w-6 h-6 text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-[#0b1f3f] mb-2">
              Cloud Photogrammetry
            </h4>
            <p class="text-sm text-slate-500 leading-relaxed">
              Xử lý hàng nghìn hecta dữ liệu Point Cloud trên hệ thống server
              đám mây tốc độ cao của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-10">Thư viện Bài giảng Kỹ thuật</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="group cursor-pointer">
          <div class="relative overflow-hidden rounded-2xl mb-4 aspect-video">
            <img
              alt="Data processing"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLmlNP1PQAzoja3JhvBuuwQ6LA8J0zF031Gvsyxht1IPQ5SBS8_hDKr0L_Kvu2Ml005Nzx1UnT27RiTVJ408d6Xob4MSONKnzOFE0LHnnuX7MZAIBwpr9-QINatcRKOblG_5GhAkPZ6K3UWJUj18Cli8GwdI-RnQSLdCxlSJE1xfikiGeOrCN_KdQejPps8NO0HimYnAbppRT5wIsxqgv7OyXLFzdQ6YiJaMcIhtEbPGW_NCqX9YNI68HvZK_tbp6N6R6qhOybkw"
            />
            <div
              class="absolute inset-0 bg-black/30 flex items-center justify-center"
            >
              <span
                class="material-symbols-outlined text-white text-5xl opacity-80"
                >play_circle</span
              >
            </div>
          </div>
          <h4 class="font-bold text-lg mb-2">LiDAR Point Cloud Generation</h4>
          <p class="text-sm text-slate-600 mb-4">
            Quy trình xử lý dữ liệu đám mây điểm, khử nhiễu và phân loại mặt đất
            bằng thuật toán AI nâng cao.
          </p>
          <div
            class="flex items-center gap-4 text-xs font-medium text-slate-400"
          >
            <span class="flex items-center gap-1"
              ><span class="material-symbols-outlined text-sm">schedule</span>
              45 phút</span
            >
            <span class="flex items-center gap-1"
              ><span class="material-symbols-outlined text-sm"
                >signal_cellular_alt</span
              >
              Nâng cao</span
            >
          </div>
        </div>

        <div class="group cursor-pointer">
          <div
            class="bg-slate-100 rounded-2xl mb-4 aspect-video flex items-center justify-center relative"
          >
            <img
              alt="Technical docs"
              class="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Se348EKltQgTl-8FwYSCPg_YWhF0f31wm2dIplqIP8hyp9H43YMyMZ36K3Yd9yyfg8GDvZCyE7VHu7qC88OhSmGYSTLjqRdgEOxcEVuoHzo_jG2CwbmB9UqP_JbOodAkGgMsNxyHz60PZtlA7_uJRnnaUSqhzqUK6t6gmtOz3Cn5wU8tRklAFrRJdCwIfnCMDXLfUhqL2sAZPfu5vH0aA_qqV7I6_b97TxcfaidN3ATXj5ZIJPRkRf4eEiMJxjL6ds4t2ld2jQ"
            />
            <span
              class="material-symbols-outlined text-6xl text-[var(--primary-navy)] z-10"
              >description</span
            >
          </div>
          <h4 class="font-bold text-lg mb-2">Thermal Data Processing</h4>
          <p class="text-sm text-slate-600 mb-4">
            Hướng dẫn hiệu chuẩn nhiệt độ bức xạ, phân tích bản đồ nhiệt và phát
            hiện bất thường trong kiểm tra điện mặt trời.
          </p>
          <div
            class="flex items-center gap-4 text-xs font-medium text-slate-400"
          >
            <span class="flex items-center gap-1"
              ><span class="material-symbols-outlined text-sm"
                >file_present</span
              >
              PDF/Manual</span
            >
            <span class="flex items-center gap-1"
              ><span class="material-symbols-outlined text-sm"
                >auto_stories</span
              >
              120 trang</span
            >
          </div>
        </div>

        <div class="group cursor-pointer">
          <div class="relative overflow-hidden rounded-2xl mb-4 aspect-video">
            <img
              alt="Simulation"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrt_2znr9Af3BGStlrarpa0pzuoCgW-UZIH3-OTfOnYFHtV1RoQ1e-n5vJMDqFuHr1DsyurgjBKXc0K4lVL3RQf_2j8y0GR3Ld3_fnKPgHKUJe5-1FyDdWTenq4lC2DVesA6VQa9TxFtZE26NHqAobsZBv8iB-ZmCixT2FW1MTyLoLbATAPLskKitt-whglAvRenwXPthN4O3bGeWdbZVBzH0YegD6LCiNqgEOlQOZRWHtZolJkhzFmR6tLfcbQlET1ivEX2fSVw"
            />
          </div>
          <h4 class="font-bold text-lg mb-2">Digital Twin Modeling</h4>
          <p class="text-sm text-slate-600 mb-4">
            Thực hành mô phỏng mô hình số độ phân giải cao, xuất file định dạng
            .obj/ .las cho các phần mềm BIM/CAD.
          </p>
          <div
            class="flex items-center gap-4 text-xs font-medium text-slate-400"
          >
            <span class="flex items-center gap-1"
              ><span class="material-symbols-outlined text-sm">vrpano</span>
              Interactive 3D</span
            >
            <span class="flex items-center gap-1"
              ><span class="material-symbols-outlined text-sm"
                >precision_manufacturing</span
              >
              Kỹ thuật</span
            >
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-[var(--primary-navy)] text-white/60 py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-8 mb-8"
        >
          <div class="flex items-center gap-8 text-sm">
            <a class="hover:text-white transition-colors" href="#"
              >Về chúng tôi</a
            >
            <a class="hover:text-white transition-colors" href="#"
              >Chính sách bảo mật</a
            >
            <a class="hover:text-white transition-colors" href="#"
              >Điều khoản sử dụng</a
            >
            <a class="hover:text-white transition-colors" href="#">Liên hệ</a>
          </div>
          <div class="flex items-center gap-6">
            <a class="hover:text-white transition-colors" href="#"
              ><span class="material-symbols-outlined">public</span></a
            >
            <a class="hover:text-white transition-colors" href="#"
              ><span class="material-symbols-outlined">brand_awareness</span></a
            >
            <a class="hover:text-white transition-colors" href="#"
              ><span class="material-symbols-outlined">alternate_email</span></a
            >
          </div>
        </div>
        <p class="text-xs text-center md:text-left">
          © 2024 UAV Academy. Hệ thống đào tạo kỹ thuật bay và phân tích dữ liệu
          không gian chuẩn quốc tế. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Settings,
  Radio,
  BarChart3,
  Zap,
  Cpu,
  BrainCircuit,
  CloudLightning,
  CheckCircle2,
} from "lucide-vue-next";
// Tối ưu hóa code bằng cách đưa data của các thiết bị vào mảng để dùng v-for render
const equipmentList = ref([
  {
    title: "Mavic 3 Enterprise",
    description:
      "Mechanical shutter 1/2000s, RTK module độ chính xác cấp cm, thời gian bay 45p.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxxuqU1b1JrhWq_5_MaCyoh2v7RJICZFlIlQyF5MDLaY2QcMN9Y0frDyVIM2COajovvpmL7cQiPFcfXz2iX7BItFqqx4w298yyWnz6_EGEtLaLI9ipCCziMQ89cLPbDRUJVdD4bnzE2j6RoRvmNnItVFZzIVes5UMs0xElRDsRTu0zUdMF9O2a-8QwDtaphiAvKfLhd74jNUU_anrZIAe2HWXdzekodhLt30UhWSVR2UA0P2KMY0n2XqiFujNJ35HtBa0YLCxgow",
  },
  {
    title: "eBee X Fixed-Wing",
    description:
      "Sức bền 90 phút, cảm biến S.O.D.A 3D, tối ưu cho bản đồ 3D diện tích cực lớn (>500ha).",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdWnHDAXLVr0vwFNKA8yIthCGXmjyZru8iH0xJ0qj7PxapMjvGNt83899gVIz7gjaQBJB5WSfdQvzw_Q8SAV_Q8H_fIYBrtQWksjURBYrftXhcCnarHsZvtOHvoozHYRuZ4Rr8rGhzTTpq513zhE3eR1URudE4JGYSkt43OyRdzyjVb_zGxpL1eMD0sd7Hhy4uXuUZxEWTWShEScXpTy3pft6WPbs7yciUk2ynvNbX_W3vfGBD864U4uA5x-PWw89cN3o2rug8DA",
  },
  {
    title: "Matrice 350 RTK",
    description:
      "Tải trọng 2.7kg, chuẩn IP55, tích hợp LiDAR Zenmuse L2 và camera nhiệt H20T.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfF3vjoMDPZC1iNBtKBSme0O2T36iHVhzgpnfXohfnhTEoZq6ZcYAG841RtGh-FwyHSV7vWXNnDn48gurZIi4f5Zte0HmayheLrFndWT-Czp44ag0zhj69Pv7xblMVn9Si7zonUHH0rdgxo5Alr9W1BD9Yj5ymN-jVeJmw5mt5iCWUvV5GPu30-UlvImvGccAaokmj9x3kmjfqZYo3EEWR6RSzLS2iTRCWLn_EkHlPnbgon-uPQ2fytpCPLb2dER-ptTM7sa5tcw",
  },
  {
    title: "Hệ thống Sensor",
    description:
      "Phân tích dải phổ Multispectral, bước sóng hồng ngoại (LWIR) và đo xa Laser (Rangefinder).",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLuH1L6XyAkJaCP1gezKaD3hDbH71wIicT0TMh5RAvncoZHeosR1LXrBqRp_ZZKsiVCbleEwkQbWV4w8jV3WdTOzDxj1bBK1p4rFW_ZhkdPRjsXDFt1uYUhI4AFe5ZzdH3p8SDU6O_maJkYty0ycve9Fw85RPM7t7B6m8aCGIT6FlF7maM4V0yIG783kLGJuJmCy0130Adq697Ke4DPvjd4uOHDwyyiK4bzRrap1VDzJazsm4S3LvsaTj-G5qNQYgy1ef9PYMRTA",
  },
]);
</script>

<style scoped>
/* Khai báo các biến màu và font cho component */
</style>
