<template>
  <div class="min-h-screen bg-white font-sans text-slate-800">
    <section
      class="relative w-full pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50"
    >
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        ></div>
      </div>

      <div
        class="relative z-10 max-w-[1440px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div class="max-w-2xl">
          <span
            class="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-[11px] font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100"
          >
            <Radio :size="14" /> Professional Training
          </span>

          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Kỹ thuật UAV
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"
              >Cao cấp</span
            >
            <br />
            & Phân tích Dữ liệu
          </h1>

          <p
            class="text-slate-500 text-lg mb-10 leading-relaxed font-medium max-w-xl"
          >
            Chương trình chuyên sâu về tối ưu hóa hệ thống không người lái, xử
            lý dữ liệu LiDAR thời gian thực và phân tích quang trắc độ chính xác
            cao.
          </p>

          <div class="flex flex-wrap items-center gap-4">
            <button
              class="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              Bắt đầu Chương trình <ArrowRight :size="18" />
            </button>
            <button
              class="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Xem Tài liệu
            </button>
          </div>

          <div
            class="mt-12 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8"
          >
            <div>
              <div class="text-slate-900 font-black text-3xl">100+</div>
              <div
                class="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1"
              >
                Học viên tốt nghiệp
              </div>
            </div>
            <div>
              <div class="text-slate-900 font-black text-3xl">0.5cm</div>
              <div
                class="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1"
              >
                Độ chính xác LiDAR
              </div>
            </div>
            <div>
              <div class="text-slate-900 font-black text-3xl">24/7</div>
              <div
                class="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1"
              >
                Hỗ trợ kỹ thuật
              </div>
            </div>
          </div>
        </div>

        <div class="relative hidden lg:block">
          <div
            class="aspect-[4/3] rounded-[2rem] bg-slate-200 overflow-hidden border-8 border-white shadow-2xl relative"
          >
            <img
              src="../../../public/img/hero-mavic.webp"
              alt="UAV Tech"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-slate-900/10"></div>
          </div>
          <div
            class="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
          >
            <div
              class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600"
            >
              <CheckCircle2 :size="24" />
            </div>
            <div>
              <p
                class="text-[11px] font-bold text-slate-400 uppercase tracking-wider"
              >
                Hệ thống
              </p>
              <p class="text-sm font-bold text-slate-800">Hoạt động ổn định</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-[1440px] mx-auto px-6 py-24 bg-white">
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <h2
          class="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight"
        >
          Lộ trình Đào tạo Chuyên sâu
        </h2>
        <p class="text-slate-500 text-lg">
          Từ nền tảng kỹ thuật phần cứng đến kỹ năng phân tích dữ liệu AI phức
          tạp, chúng tôi chuẩn bị cho bạn lộ trình trở thành chuyên gia UAV thực
          thụ.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
        <div
          class="hidden md:block absolute top-12 left-[15%] w-[70%] h-[2px] bg-slate-100 z-0"
        >
          <div
            class="w-1/3 h-full bg-blue-600 transition-all duration-1000"
          ></div>
        </div>

        <div class="relative z-10 group">
          <div class="flex flex-col items-center">
            <div
              class="w-24 h-24 bg-white border-4 border-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300"
            >
              <Settings
                class="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-colors"
              />
            </div>
            <div
              class="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center w-full group-hover:bg-white group-hover:shadow-xl group-hover:border-blue-100 transition-all duration-300"
            >
              <span
                class="text-[10px] font-bold tracking-[0.2em] text-slate-500 group-hover:text-blue-600 uppercase mb-4 inline-block"
                >Module 01</span
              >
              <h3 class="text-xl font-bold text-slate-900 mb-3">
                Kỹ thuật Hệ thống
              </h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6">
                Làm chủ cấu trúc Avionics, hệ thống đẩy và cơ chế vận hành an
                toàn của các dòng thiết bị Enterprise.
              </p>
              <ul
                class="text-sm text-left space-y-3 text-slate-600 font-medium"
              >
                <li class="flex items-center gap-3">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Hiệu chỉnh IMU & Compass
                </li>
                <li class="flex items-center gap-3">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Bảo
                  trì hệ thống động cơ
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="relative z-10 group">
          <div class="flex flex-col items-center">
            <div
              class="w-24 h-24 bg-blue-600 border-4 border-blue-50 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20 group-hover:-translate-y-2 transition-transform duration-300"
            >
              <Radio class="w-10 h-10 text-white" />
            </div>
            <div
              class="bg-white p-8 rounded-[2rem] border border-blue-100 shadow-xl text-center w-full transition-all duration-300"
            >
              <span
                class="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase bg-blue-50 px-3 py-1.5 rounded-full mb-4 inline-block"
                >Module 02</span
              >
              <h3 class="text-xl font-bold text-slate-900 mb-3">
                Cảm biến & Khảo sát
              </h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6">
                Kỹ thuật tích hợp LiDAR, Sensor nhiệt và Quang trắc học để thu
                thập dữ liệu độ chính xác cấp milimet.
              </p>
              <ul
                class="text-sm text-left space-y-3 text-slate-600 font-medium"
              >
                <li class="flex items-center gap-3">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Thiết lập trạm Base RTK
                </li>
                <li class="flex items-center gap-3">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Quy
                  trình quét LiDAR 3D
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="relative z-10 group">
          <div class="flex flex-col items-center">
            <div
              class="w-24 h-24 bg-white border-4 border-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300"
            >
              <BarChart3
                class="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-colors"
              />
            </div>
            <div
              class="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center w-full group-hover:bg-white group-hover:shadow-xl group-hover:border-blue-100 transition-all duration-300"
            >
              <span
                class="text-[10px] font-bold tracking-[0.2em] text-slate-500 group-hover:text-blue-600 uppercase mb-4 inline-block"
                >Module 03</span
              >
              <h3 class="text-xl font-bold text-slate-900 mb-3">
                Phân tích AI
              </h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6">
                Sử dụng thuật toán học máy để phân loại đám mây điểm (Point
                Cloud) và tự động hóa báo cáo hạ tầng.
              </p>
              <ul
                class="text-sm text-left space-y-3 text-slate-600 font-medium"
              >
                <li class="flex items-center gap-3">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Xử
                  lý Digital Twin 3D
                </li>
                <li class="flex items-center gap-3">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Nhận diện lỗi bằng AI
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 py-24">
      <div class="max-w-[1440px] mx-auto px-6">
        <div
          class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div class="max-w-2xl">
            <h2
              class="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight"
            >
              Hệ Sinh Thái Thiết Bị
            </h2>
            <p class="text-slate-500 text-lg">
              Phân tích thông số kỹ thuật và khả năng ứng dụng thực tế của các
              dòng thiết bị không người lái đầu bảng.
            </p>
          </div>
          <button
            class="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all bg-blue-50 px-5 py-2.5 rounded-xl hover:bg-blue-100"
          >
            Xem tất cả <ArrowRight :size="16" />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(item, index) in equipmentList"
            :key="index"
            class="group cursor-pointer bg-white p-3 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div
              class="relative overflow-hidden rounded-[1.5rem] bg-slate-100 aspect-[4/3] mb-4"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3">
                <span
                  class="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-800 shadow-sm"
                >
                  {{ item.category || "Thiết bị" }}
                </span>
              </div>
            </div>

            <div class="px-3 pb-3 flex flex-col flex-grow">
              <h4
                class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
              >
                {{ item.title }}
              </h4>
              <p class="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                {{ item.description }}
              </p>

              <div
                class="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto"
              >
                <div>
                  <p
                    class="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1"
                  >
                    Độ chính xác
                  </p>
                  <p class="text-sm font-bold text-slate-800">
                    {{ item.accuracy || "Cấp RTK" }}
                  </p>
                </div>
                <div class="w-[1px] h-8 bg-slate-200"></div>
                <div class="text-right">
                  <p
                    class="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1"
                  >
                    Thời gian bay
                  </p>
                  <p class="text-sm font-bold text-slate-800">
                    {{ item.flightTime || "45 Phút" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-[1440px] mx-auto px-6 py-24">
      <div class="grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-4 flex flex-col justify-center">
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-widest mb-6 w-fit border border-blue-100"
          >
            <Zap :size="14" /> Nền tảng số
          </div>
          <h2
            class="text-4xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight"
          >
            Học tập trên <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"
            >
              Hệ sinh thái Số
            </span>
          </h2>
          <p class="text-slate-500 mb-8 leading-relaxed text-lg">
            Chúng tôi cung cấp một nền tảng công nghệ toàn diện để bạn làm chủ
            toàn bộ quy trình xử lý dữ liệu không gian từ thực địa đến mô hình
            3D.
          </p>
          <div
            class="flex flex-col gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <div class="flex gap-4 items-start">
              <div
                class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-200"
              >
                <CheckCircle2 class="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h5 class="font-bold text-slate-900">Chuẩn quốc tế</h5>
                <p class="text-sm text-slate-500 mt-1">
                  Giáo trình đào tạo theo tiêu chuẩn DJI Academy và EuroUSC
                  chuyên nghiệp.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="md:col-span-2 relative group overflow-hidden rounded-[2rem] bg-slate-900 aspect-[21/9] flex items-center p-8 md:p-12"
          >
            <div class="relative z-10 max-w-md">
              <div
                class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20"
              >
                <Cpu class="w-6 h-6 text-white" />
              </div>
              <h4 class="text-3xl font-bold text-white mb-3 tracking-tight">
                VR Flight Simulator
              </h4>
              <p class="text-slate-400 text-base leading-relaxed">
                Hệ thống mô phỏng bay thực tế ảo giúp học viên rèn luyện kỹ năng
                xử lý tình huống khẩn cấp mà không rủi ro thiết bị.
              </p>
            </div>
            <div
              class="absolute right-[-10%] bottom-[-20%] w-96 h-96 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-all duration-700"
            ></div>
          </div>

          <div
            class="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:shadow-lg transition-shadow"
          >
            <div
              class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 border border-slate-200 text-blue-600"
            >
              <BrainCircuit class="w-6 h-6" />
            </div>
            <h4 class="text-xl font-bold text-slate-900 mb-3">
              AI Analytics Lab
            </h4>
            <p class="text-sm text-slate-500 leading-relaxed">
              Thực hành huấn luyện Model nhận diện hư hỏng hạ tầng tự động bằng
              dữ liệu hình ảnh UAV thực tế.
            </p>
          </div>

          <div
            class="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:shadow-lg transition-shadow"
          >
            <div
              class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 border border-slate-200 text-blue-600"
            >
              <CloudLightning class="w-6 h-6" />
            </div>
            <h4 class="text-xl font-bold text-slate-900 mb-3">
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

    <section
      class="max-w-[1440px] mx-auto px-6 py-24 border-t border-slate-100"
    >
      <div class="flex items-center justify-between mb-12">
        <h2 class="text-3xl font-black text-slate-900 tracking-tight">
          Thư viện Bài giảng Kỹ thuật
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="group cursor-pointer">
          <div
            class="relative overflow-hidden rounded-[1.5rem] mb-5 aspect-video bg-slate-100"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLmlNP1PQAzoja3JhvBuuwQ6LA8J0zF031Gvsyxht1IPQ5SBS8_hDKr0L_Kvu2Ml005Nzx1UnT27RiTVJ408d6Xob4MSONKnzOFE0LHnnuX7MZAIBwpr9-QINatcRKOblG_5GhAkPZ6K3UWJUj18Cli8GwdI-RnQSLdCxlSJE1xfikiGeOrCN_KdQejPps8NO0HimYnAbppRT5wIsxqgv7OyXLFzdQ6YiJaMcIhtEbPGW_NCqX9YNI68HvZK_tbp6N6R6qhOybkw"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div
              class="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center"
            >
              <div
                class="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <PlayCircle :size="32" stroke-width="1.5" />
              </div>
            </div>
          </div>
          <h4
            class="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
          >
            LiDAR Point Cloud Generation
          </h4>
          <p class="text-sm text-slate-500 mb-4 line-clamp-2">
            Quy trình xử lý dữ liệu đám mây điểm, khử nhiễu và phân loại mặt đất
            bằng thuật toán AI nâng cao.
          </p>
          <div
            class="flex items-center gap-4 text-[12px] font-bold text-slate-400"
          >
            <span class="flex items-center gap-1.5"
              ><Clock :size="14" /> 45 phút</span
            >
            <span class="flex items-center gap-1.5"
              ><Signal :size="14" /> Nâng cao</span
            >
          </div>
        </div>

        <div class="group cursor-pointer">
          <div
            class="relative overflow-hidden rounded-[1.5rem] mb-5 aspect-video bg-blue-50 flex items-center justify-center border border-blue-100"
          >
            <FileText
              :size="48"
              stroke-width="1"
              class="text-blue-300 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <h4
            class="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
          >
            Thermal Data Processing
          </h4>
          <p class="text-sm text-slate-500 mb-4 line-clamp-2">
            Hướng dẫn hiệu chuẩn nhiệt độ bức xạ, phân tích bản đồ nhiệt và phát
            hiện bất thường điện mặt trời.
          </p>
          <div
            class="flex items-center gap-4 text-[12px] font-bold text-slate-400"
          >
            <span class="flex items-center gap-1.5"
              ><FileText :size="14" /> PDF/Manual</span
            >
            <span class="flex items-center gap-1.5"
              ><BookOpen :size="14" /> 120 trang</span
            >
          </div>
        </div>

        <div class="group cursor-pointer">
          <div
            class="relative overflow-hidden rounded-[1.5rem] mb-5 aspect-video bg-slate-100"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrt_2znr9Af3BGStlrarpa0pzuoCgW-UZIH3-OTfOnYFHtV1RoQ1e-n5vJMDqFuHr1DsyurgjBKXc0K4lVL3RQf_2j8y0GR3Ld3_fnKPgHKUJe5-1FyDdWTenq4lC2DVesA6VQa9TxFtZE26NHqAobsZBv8iB-ZmCixT2FW1MTyLoLbATAPLskKitt-whglAvRenwXPthN4O3bGeWdbZVBzH0YegD6LCiNqgEOlQOZRWHtZolJkhzFmR6tLfcbQlET1ivEX2fSVw"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div
              class="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"
            ></div>
          </div>
          <h4
            class="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
          >
            Digital Twin Modeling
          </h4>
          <p class="text-sm text-slate-500 mb-4 line-clamp-2">
            Thực hành mô phỏng mô hình số độ phân giải cao, xuất file định dạng
            .obj/ .las cho phần mềm BIM.
          </p>
          <div
            class="flex items-center gap-4 text-[12px] font-bold text-slate-400"
          >
            <span class="flex items-center gap-1.5"
              ><Box :size="14" /> Interactive 3D</span
            >
            <span class="flex items-center gap-1.5"
              ><Cpu :size="14" /> Kỹ thuật</span
            >
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-white border-t border-slate-200 py-12">
      <div class="max-w-[1440px] mx-auto px-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 bg-slate-900 text-blue-400 rounded-lg">
              <Radio :size="20" />
            </div>
            <span
              class="text-lg font-black text-slate-900 tracking-tight uppercase"
              >SkyLink</span
            >
          </div>
          <div
            class="flex items-center gap-8 text-sm font-semibold text-slate-500"
          >
            <a class="hover:text-slate-900 transition-colors" href="#"
              >Về chúng tôi</a
            >
            <a class="hover:text-slate-900 transition-colors" href="#"
              >Bảo mật</a
            >
            <a class="hover:text-slate-900 transition-colors" href="#"
              >Điều khoản</a
            >
            <a class="hover:text-slate-900 transition-colors" href="#"
              >Liên hệ</a
            >
          </div>
        </div>
        <div
          class="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm font-medium text-slate-400">
            © 2024 SkyLink Flight System. All rights reserved.
          </p>
          <div class="flex items-center gap-6 text-slate-400">
            <a href="#" class="hover:text-slate-900"><Globe :size="20" /></a>
            <a href="#" class="hover:text-slate-900"><Mail :size="20" /></a>
          </div>
        </div>
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
  ArrowRight,
  PlayCircle,
  FileText,
  Clock,
  Signal,
  BookOpen,
  Box,
  Globe,
  Mail,
} from "lucide-vue-next";

const equipmentList = ref([
  {
    title: "Mavic 3 Enterprise",
    category: "Surveying",
    description:
      "Mechanical shutter 1/2000s, RTK module độ chính xác cấp cm, tích hợp cảm biến đa phổ.",
    accuracy: "Cấp RTK (1-2cm)",
    flightTime: "45 Phút",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxxuqU1b1JrhWq_5_MaCyoh2v7RJICZFlIlQyF5MDLaY2QcMN9Y0frDyVIM2COajovvpmL7cQiPFcfXz2iX7BItFqqx4w298yyWnz6_EGEtLaLI9ipCCziMQ89cLPbDRUJVdD4bnzE2j6RoRvmNnItVFZzIVes5UMs0xElRDsRTu0zUdMF9O2a-8QwDtaphiAvKfLhd74jNUU_anrZIAe2HWXdzekodhLt30UhWSVR2UA0P2KMY0n2XqiFujNJ35HtBa0YLCxgow",
  },
  {
    title: "eBee X Fixed-Wing",
    category: "Mapping",
    description:
      "Sức bền 90 phút, cảm biến S.O.D.A 3D, tối ưu cho bản đồ 3D diện tích cực lớn (>500ha).",
    accuracy: "Tuyệt đối 1.5cm",
    flightTime: "90 Phút",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdWnHDAXLVr0vwFNKA8yIthCGXmjyZru8iH0xJ0qj7PxapMjvGNt83899gVIz7gjaQBJB5WSfdQvzw_Q8SAV_Q8H_fIYBrtQWksjURBYrftXhcCnarHsZvtOHvoozHYRuZ4Rr8rGhzTTpq513zhE3eR1URudE4JGYSkt43OyRdzyjVb_zGxpL1eMD0sd7Hhy4uXuUZxEWTWShEScXpTy3pft6WPbs7yciUk2ynvNbX_W3vfGBD864U4uA5x-PWw89cN3o2rug8DA",
  },
  {
    title: "Matrice 350 RTK",
    category: "Enterprise",
    description:
      "Tải trọng 2.7kg, chuẩn IP55, tích hợp LiDAR Zenmuse L2 và camera nhiệt phân giải cao H20T.",
    accuracy: "Cấp RTK (1cm)",
    flightTime: "55 Phút",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfF3vjoMDPZC1iNBtKBSme0O2T36iHVhzgpnfXohfnhTEoZq6ZcYAG841RtGh-FwyHSV7vWXNnDn48gurZIi4f5Zte0HmayheLrFndWT-Czp44ag0zhj69Pv7xblMVn9Si7zonUHH0rdgxo5Alr9W1BD9Yj5ymN-jVeJmw5mt5iCWUvV5GPu30-UlvImvGccAaokmj9x3kmjfqZYo3EEWR6RSzLS2iTRCWLn_EkHlPnbgon-uPQ2fytpCPLb2dER-ptTM7sa5tcw",
  },
  {
    title: "Hệ thống Sensor",
    category: "Payloads",
    description:
      "Phân tích dải phổ Multispectral, bước sóng hồng ngoại (LWIR) và đo xa bằng Laser.",
    accuracy: "Cảm biến kép",
    flightTime: "Tích hợp",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLuH1L6XyAkJaCP1gezKaD3hDbH71wIicT0TMh5RAvncoZHeosR1LXrBqRp_ZZKsiVCbleEwkQbWV4w8jV3WdTOzDxj1bBK1p4rFW_ZhkdPRjsXDFt1uYUhI4AFe5ZzdH3p8SDU6O_maJkYty0ycve9Fw85RPM7t7B6m8aCGIT6FlF7maM4V0yIG783kLGJuJmCy0130Adq697Ke4DPvjd4uOHDwyyiK4bzRrap1VDzJazsm4S3LvsaTj-G5qNQYgy1ef9PYMRTA",
  },
]);
</script>
