<template>
  <div class="min-h-screen bg-white custom-scrollbar">
    <header
      class="relative bg-slate-900 overflow-hidden rounded-[16px]"
      style="margin: 0 10px"
    >
      <img
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600"
        class="absolute inset-0 w-full h-full object-cover opacity-50"
        alt="Drone HUD Overlay"
      />

      <div
        class="max-w-[1600px] mx-auto px-10 pb-24 flex flex-col lg:flex-row items-center gap-16 relative z-10"
      >
        <div
          class="flex-1 space-y-8 animate-in fade-in slide-in-from-left duration-1000"
        >
          <h1
            class="text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95] italic uppercase"
          >
            Điều khiển <br />
            <span class="text-teal-400">Phi đội</span> Thế hệ mới
            <span
              class="inline-block ml-3 px-4 py-1.5 rounded-full bg-teal-400 text-slate-900 text-xs font-black uppercase tracking-widest relative top-[-10px]"
            >
              120ms Latency
            </span>
          </h1>

          <p
            class="text-teal-100/70 text-sm font-medium leading-relaxed max-w-lg"
          >
            Hỗ trợ đầy đủ các giao thức:
            <span class="text-teal-300 font-bold"
              >MAVLink, RTK GPS, WebRTC Video, 4G/LTE Cloud Link, AI Obstacle
              Avoidance</span
            >, và các API tích hợp của
            <span class="text-teal-300 font-bold">Mapbox</span>.
          </p>

          <div class="pt-6">
            <button
              class="bg-white text-slate-900 px-10 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-teal-400 hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] active:scale-95 group"
            >
              BẮT ĐẦU BAY NGAY
              <ArrowRight
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div class="flex-1 w-full relative perspective-1000">
          <div
            class="bg-white p-2.5 rounded-[40px] shadow-2xl overflow-hidden transform hover:rotate-3 transition-transform duration-700"
          >
            <div class="relative h-[550px] overflow-hidden rounded-[32px]">
              <img
                src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1000"
                class="w-full h-full object-cover shadow-inner"
                alt="UAV Control Center with 3D HUD"
              />
              <div
                class="absolute bottom-6 left-6 bg-slate-950/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 animate-float"
              >
                <CloudRainbow class="w-6 h-6 text-teal-400" />
                <div>
                  <div
                    class="text-[10px] font-black text-white/50 uppercase leading-none mb-1"
                  >
                    Thời tiết
                  </div>
                  <div class="text-xs font-bold text-white leading-none">
                    24°C - Gió nhẹ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Tin tức hàng không -->
    <section class="py-24 max-w-7xl mx-auto px-6">
      <div
        class="flex items-end justify-between mb-16 border-b border-slate-100 pb-8"
      >
        <div class="space-y-3">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 text-teal-700 text-[10px] font-black uppercase tracking-widest"
          >
            Insights
          </div>
          <h2
            class="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none"
          >
            Tin tức <span class="text-teal-600">Hàng không</span>
          </h2>
        </div>
        <button
          class="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-teal-600 transition-all"
        >
          Xem tất cả bản tin
          <ArrowRight
            class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      <div class="space-y-16">
        <div
          class="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div
            class="lg:col-span-8 overflow-hidden rounded-[48px] shadow-2xl shadow-slate-200 bg-slate-100"
          >
            <div class="relative aspect-[21/9] overflow-hidden">
              <div
                class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 z-10 transition-colors duration-500"
              ></div>

              <img
                src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=1200"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />

              <div class="absolute top-8 left-8 z-20">
                <span
                  class="px-5 py-2 bg-white/90 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase text-teal-600 shadow-xl border border-white/20"
                >
                  Phân tích chuyên sâu
                </span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 space-y-6">
            <div
              class="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest"
            >
              <Clock class="w-3.5 h-3.5" /> 6 phút đọc • 10/03/2026
            </div>
            <h3
              class="text-4xl font-black text-slate-900 leading-[1.1] tracking-tight group-hover:text-teal-600 transition-colors italic uppercase"
            >
              Tương lai vận chuyển hàng hóa bằng Drone tại Việt Nam
            </h3>
            <p class="text-slate-500 font-medium leading-relaxed text-lg">
              Khám phá cách các drone tự hành đang tái định nghĩa chuỗi cung ứng
              Logistics tại các đô thị thông minh.
            </p>
            <div class="pt-4">
              <span
                class="text-xs font-black text-slate-900 border-b-2 border-teal-500 pb-1 group-hover:text-teal-600 transition-colors"
                >ĐỌC CHI TIẾT</span
              >
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <div
            v-for="i in 4"
            :key="i"
            class="flex gap-8 group cursor-pointer items-start p-6 rounded-[32px] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
          >
            <div
              class="w-28 h-28 rounded-3xl overflow-hidden shrink-0 shadow-lg border-4 border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=400"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span
                  class="text-[9px] font-black text-teal-600 uppercase tracking-[0.2em]"
                  >Kỹ thuật UAV</span
                >
                <span class="text-[9px] font-bold text-slate-300"
                  >#TechNews</span
                >
              </div>
              <h4
                class="text-lg font-black text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2 uppercase italic"
              >
                Cách tối ưu hóa hiệu suất pin trong thời tiết khắc nghiệt
              </h4>
              <p class="text-[12px] text-slate-400 font-medium line-clamp-1">
                Hướng dẫn bảo trì các cell pin Lithium-Polymer...
              </p>
              <div
                class="flex items-center gap-2 text-[9px] font-bold text-slate-400"
              >
                <span>BY SKYLINK LABS</span>
                <span>•</span>
                <span>MAR 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Thiết bị tiêu điểm -->
    <section class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-end justify-between mb-12">
          <h2 class="text-3xl font-black text-slate-900 uppercase italic">
            Thiết bị <span class="text-teal-600">Tiêu điểm</span>
          </h2>
          <button
            class="text-teal-600 font-bold text-sm flex items-center gap-2 group"
          >
            Xem tất cả
            <ArrowRight
              class="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="drone in featuredDrones"
            :key="drone.name"
            class="bg-white p-3 rounded-[32px] border border-slate-200 hover:shadow-2xl transition-all group"
          >
            <div class="h-60 rounded-[24px] overflow-hidden bg-slate-100">
              <img
                :src="drone.img"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div class="p-6">
              <span class="text-[10px] font-black text-teal-600 uppercase">{{
                drone.tag
              }}</span>
              <h3 class="text-xl font-black text-slate-900 mt-1">
                {{ drone.name }}
              </h3>
              <p class="text-slate-500 text-sm mt-2 line-clamp-2">
                {{ drone.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 max-w-7xl mx-auto px-6">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-8"
      >
        <div class="flex gap-2 overflow-x-auto no-scrollbar">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="currentFilter = cat"
            :class="[
              'px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap',
              currentFilter === cat
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white border border-slate-200 text-slate-400 hover:border-teal-500',
            ]"
          >
            {{ cat }}
          </button>
        </div>
        <span class="text-sm font-bold text-slate-400 italic"
          >Hiển thị {{ filteredUavs.length }} thiết bị hoạt động</span
        >
      </div>

      <div
        v-if="filteredUavs.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <UavCard
          v-for="uav in filteredUavs"
          :key="uav.id"
          :uav="uav"
          @open-sim="openSimulator"
        />
      </div>
      <div v-else class="py-20 text-center bg-slate-50 rounded-[40px]">
        <PackageOpen class="w-12 h-12 mx-auto text-slate-300 mb-4" />
        <h3 class="text-xl font-bold text-slate-900 uppercase">
          Không có thiết bị
        </h3>
      </div>
    </section>
    <section class="py-24 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2
            class="text-4xl font-black text-slate-900 tracking-tighter uppercase italic"
          >
            Phản hồi từ <span class="text-teal-600">Chuyên gia</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="testi in testimonials"
            :key="testi.name"
            class="p-8 rounded-[40px] bg-slate-900 text-white relative"
          >
            <Quote
              class="absolute top-8 right-8 text-teal-500 opacity-20 w-12 h-12"
            />
            <div class="flex gap-1 mb-6">
              <Star
                v-for="s in 5"
                :key="s"
                class="w-4 h-4 fill-teal-400 text-teal-400"
              />
            </div>
            <p
              class="text-lg font-medium leading-relaxed mb-8 italic text-slate-300"
            >
              "{{ testi.comment }}"
            </p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-teal-500 shrink-0"></div>
              <div>
                <div
                  class="font-bold text-white uppercase tracking-wider text-sm"
                >
                  {{ testi.name }}
                </div>
                <div class="text-teal-500 text-xs font-bold">
                  {{ testi.role }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hành trình phát triển -->
    <section
      class="py-24 bg-white overflow-hidden font-sans"
      style="display: flex; justify-content: center"
    >
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-24">
          <span
            class="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4"
          >
            SkyLink Engineering History
          </span>
          <h2
            class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none"
          >
            Hành trình <span class="text-teal-600">Phát triển</span>
          </h2>
          <div
            class="h-1.5 w-24 bg-teal-600 mx-auto rounded-full mt-6 shadow-sm"
          ></div>
        </div>

        <div class="relative max-w-5xl mx-auto">
          <div
            class="absolute top-0 bottom-0 left-1/2 w-px bg-slate-200 -translate-x-1/2 hidden md:block"
          ></div>

          <div class="space-y-24 md:space-y-32">
            <div
              v-for="(item, index) in milestones"
              :key="item.year"
              class="relative flex flex-col md:flex-row items-center justify-between group"
              :class="[index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse']"
            >
              <div
                class="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center top-10"
              >
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-4 border-white shadow-lg z-20 group-hover:scale-125"
                  :class="
                    item.status === 'Current'
                      ? 'bg-teal-600 shadow-teal-200'
                      : 'bg-slate-900 group-hover:bg-teal-600'
                  "
                >
                  <component :is="item.icon" class="w-5 h-5 text-white" />
                  <span
                    v-if="item.status === 'Current'"
                    class="animate-ping absolute inset-0 rounded-full bg-teal-400 opacity-40"
                  ></span>
                </div>
              </div>

              <div
                class="w-full md:w-[44%] bg-white p-8 rounded-3xl border border-slate-100 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
              >
                <div
                  class="inline-block px-4 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg italic mb-4"
                >
                  {{ item.year }}
                </div>
                <h3
                  class="text-2xl font-black text-slate-900 uppercase italic mb-3 tracking-tight"
                >
                  {{ item.title }}
                </h3>
                <p
                  class="text-slate-500 text-[15px] leading-relaxed font-medium"
                >
                  {{ item.desc }}
                </p>
              </div>

              <div
                class="w-full md:w-[44%] mt-8 md:mt-0 p-2 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner group/img overflow-hidden"
              >
                <div
                  class="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden bg-slate-200"
                >
                  <img
                    :src="
                      item.image ||
                      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600'
                    "
                    class="w-full h-full object-cover grayscale opacity-80 group-hover/img:grayscale-0 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-700"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--  Đội ngũ phát triển  -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div
          class="flex flex-col md:flex-row items-end justify-between mb-16 gap-4"
        >
          <div class="max-w-2xl">
            <h2
              class="text-4xl font-black text-slate-900 tracking-tighter uppercase italic"
            >
              Đội ngũ <span class="text-teal-600">Phát triển</span>
            </h2>
            <p class="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
              Những kỹ sư và nhà thiết kế tâm huyết, nỗ lực định nghĩa lại tương
              lai của ngành vận tải không người lái tại Việt Nam.
            </p>
          </div>
          <div class="hidden md:block">
            <div
              class="px-6 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
            >
              SkyLink Engineering Team
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-12"
          style="margin: 35px 0px"
        >
          <div v-for="member in teamMembers" :key="member.name" class="group">
            <div class="relative mb-6 flex justify-center">
              <div
                class="absolute -inset-2 bg-teal-100 rounded-[40px] rotate-6 group-hover:rotate-12 transition-transform duration-500"
                style="max-width: 250px; margin: 0 auto"
              ></div>
              <div
                class="relative aspect-square rounded-[32px] overflow-hidden bg-slate-100 border-2 border-white shadow-xl w-full max-w-[200px]"
              >
                <img
                  :src="member.avatar"
                  :alt="member.name"
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div
                class="absolute -bottom-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                style="right: calc(50% - 100px - 16px)"
              >
                <div
                  class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white hover:bg-teal-600 cursor-pointer"
                >
                  <Linkedin class="w-4 h-4" />
                </div>
              </div>
            </div>

            <div style="margin: 30px 0px">
              <h3
                class="text-2xl font-black text-slate-900 italic uppercase leading-none"
              >
                {{ member.name }}
              </h3>
              <div
                class="text-teal-600 font-bold text-xs uppercase tracking-widest mt-2 mb-4"
              >
                {{ member.role }}
              </div>
              <p
                class="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium"
              >
                {{ member.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="isSimOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-slate-950/90"
          @click.self="isSimOpen = false"
        >
          <div
            v-if="selectedUav"
            class="bg-white w-full max-w-7xl h-[85vh] rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative animate-in zoom-in"
          >
            <div class="flex-[2] bg-black relative">
              <Uav3DViewer
                :uav="selectedUav"
                @select-hotspot="activeNote = $event"
              />
              <div
                class="absolute top-8 left-8 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-white text-[10px] font-bold uppercase"
              >
                <span
                  class="w-2 h-2 bg-teal-400 rounded-full animate-ping"
                ></span>
                Live Simulation
              </div>

              <transition name="slide-up">
                <div
                  v-if="activeNote"
                  class="absolute bottom-8 left-8 right-8 bg-white/95 p-6 rounded-[32px] shadow-2xl flex gap-6 items-center"
                >
                  <div
                    class="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-teal-400 font-black italic"
                  >
                    {{ activeNote.id }}
                  </div>
                  <div class="flex-1 text-slate-900">
                    <h4 class="font-black text-lg leading-tight uppercase">
                      {{ activeNote.title }}
                    </h4>
                    <p class="text-xs text-slate-500 mt-1">
                      {{ activeNote.desc }}
                    </p>
                  </div>
                  <button
                    @click="activeNote = null"
                    class="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </transition>
            </div>

            <aside
              class="flex-1 p-12 flex flex-col justify-between bg-white overflow-y-auto"
            >
              <div>
                <button
                  @click="isSimOpen = false"
                  class="text-slate-400 hover:text-slate-900 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-10"
                >
                  <ArrowLeft class="w-4 h-4" /> Quay lại
                </button>
                <div class="mb-8">
                  <span
                    class="text-teal-600 font-black text-[10px] uppercase tracking-widest mb-2 block italic"
                    >{{ selectedUav.category }}</span
                  >
                  <h2
                    class="text-5xl font-black tracking-tighter text-slate-900 italic uppercase"
                  >
                    {{ selectedUav.name }}
                  </h2>
                  <div class="w-12 h-1.5 bg-teal-600 rounded-full mt-4"></div>
                </div>
                <DetailData :uav="selectedUav" />
              </div>
              <div class="pt-8 space-y-4">
                <div
                  class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <span class="text-[10px] font-bold text-slate-400 uppercase"
                    >Hệ thống năng lượng</span
                  >
                  <span class="text-sm font-black text-teal-600"
                    >98% ONLINE</span
                  >
                </div>
                <button
                  class="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl active:scale-95"
                >
                  Kích hoạt Drone
                </button>
              </div>
            </aside>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { uavList } from "../../data/uavData.js";
import UavCard from "../../components/UavCard.vue";
import Uav3DViewer from "../../components/Uav3DViewer.vue";
import DetailData from "../../components/DetailData.vue";
import {
  ArrowLeft,
  ArrowRight,
  PackageOpen,
  Quote,
  Star,
} from "lucide-vue-next";

// --- DATA ---
const topUavs = [
  {
    id: "uav-01",
    name: "Matrix v3.5",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1473968512461-aa3a236c0bd5?auto=format&fit=crop&q=80&w=800",
    description: "Drone công nghiệp tích hợp LiDAR và cảm biến nhiệt độ.",
    specs: [
      { label: "Flight Time", value: "45 min" },
      { label: "Max Speed", value: "80 km/h" },
      { label: "Payload", value: "2.5 kg" },
      { label: "Range", value: "15 km" },
    ],
    status: "Active",
  },
  {
    id: "uav-02",
    name: "SkyEye 4K",
    category: "Professional",
    image:
      "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800",
    description:
      "Giải pháp quay phim điện ảnh và khảo sát trắc địa độ phân giải cao.",
    specs: [
      { label: "Flight Time", value: "35 min" },
      { label: "Max Speed", value: "65 km/h" },
      { label: "Video", value: "4K/60fps" },
      { label: "Sensor", value: "1-inch CMOS" },
    ],
    status: "Standby",
  },
  {
    id: "uav-03",
    name: "Rapid X",
    category: "Racing",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800",
    description:
      "Tốc độ tối đa vượt trội cho các cuộc đua FPV và bám đuổi tốc độ cao.",
    specs: [
      { label: "Flight Time", value: "12 min" },
      { label: "Max Speed", value: "160 km/h" },
      { label: "Latency", value: "20 ms" },
      { label: "Weight", value: "450 g" },
    ],
    status: "Maintenance",
  },
];
const milestones = [
  {
    year: "2023",
    title: "Khởi nguồn ý tưởng",
    desc: "Thành lập nhóm nghiên cứu SkyLink Lab, tập trung vào giải thức truyền tải video độ trễ thấp.",
    status: "Completed",
  },
  {
    year: "2024",
    title: "Nguyên mẫu Alpha",
    desc: "Ra mắt giao diện điều khiển 2D đầu tiên và tích hợp thành công giao thức MAVLink.",
    status: "Completed",
  },
  {
    year: "2025",
    title: "Đột phá công nghệ 3D",
    desc: "Tích hợp Digital Twin và mô phỏng 3D thời gian thực. Triển khai thử nghiệm tại các khu công nghiệp.",
    status: "Completed",
  },
  {
    year: "2026",
    title: "Thương mại hóa toàn cầu",
    desc: "Mở rộng hệ sinh thái SkyLink Enterprise, hỗ trợ quản lý phi đội UAV quy mô lớn qua 5G/AI.",
    status: "Current",
  },
];
const featuredDrones = [
  {
    name: "Matrix v3.5",
    tag: "Enterprise",
    desc: "Dòng drone công nghiệp với khả năng chịu nhiệt và cảm biến LiDAR tích hợp.",
    img: "https://images.unsplash.com/photo-1473968512461-aa3a236c0bd5?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "SkyEye 4K",
    tag: "Professional",
    desc: "Chuyên dụng cho quay phim điện ảnh và khảo sát bản đồ độ phân giải cao.",
    img: "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Rapid X",
    tag: "Racing",
    desc: "Tốc độ lên tới 160km/h với độ trễ tín hiệu cực thấp cho các cuộc đua FPV.",
    img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800",
  },
];
const teamMembers = [
  {
    name: "Nguyễn Thế Phách",
    role: "Lead Developer / Architect",
    desc: "Chuyên gia về hệ thống nhúng và xử lý luồng dữ liệu thời gian thực (WebRTC).",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  },
  {
    name: "Nguyễn Thế Phách",
    role: "UI/UX Designer",
    desc: "Người kiến tạo giao diện 3D trực quan và tối ưu hóa trải nghiệm người dùng điều khiển.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  },
  {
    name: "Nguyễn Thế Phách",
    role: "AI & Computer Vision Engineer",
    desc: "Phát triển các mô hình nhận diện vật thể và tránh vật cản tự động cho Drone.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sheldon",
  },
];
const testimonials = [
  {
    name: "Nguyễn Văn A",
    role: "CEO AeroFly",
    comment: "Hệ thống giúp chúng tôi giảm 40% rủi ro vận hành.",
  },
  {
    name: "Trần Thị B",
    role: "Kỹ sư UAV",
    comment: "Giao diện 3D trực quan nhất mà tôi từng sử dụng.",
  },
  {
    name: "Lê Minh C",
    role: "Pilot FPV",
    comment: "Tốc độ phản hồi tín hiệu Telemetry gần như tức thì.",
  },
];

// --- LOGIC ---
const isSimOpen = ref(false);
const selectedUav = ref(null);
const activeNote = ref(null);
const currentFilter = ref("All");
const categories = ["All", "Consumer", "Professional", "Industrial", "Racing"];

const filteredUavs = computed(() => {
  return currentFilter.value === "All"
    ? uavList
    : uavList.filter((uav) => uav.category === currentFilter.value);
});

const openSimulator = (uav) => {
  activeNote.value = null;
  selectedUav.value = uav;
  isSimOpen.value = true;
};

watch(isSimOpen, (val) => {
  if (!val) activeNote.value = null;
});
</script>
<style scoped></style>
