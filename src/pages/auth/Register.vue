<script setup>
import { ref } from "vue";
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft } from "lucide-vue-next";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const bgImage = "/public/img/Login.svg"; // Dùng chung ảnh cho đồng bộ
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div
      class="max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
    >
      <div class="hidden md:block md:w-3/5 relative">
        <img
          :src="bgImage"
          alt="Background"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute bottom-6 left-6 text-white text-xs opacity-80">
          Photo by
          <span class="underline cursor-pointer text-gray-200"
            >PhachNguyen</span
          >
        </div>
        <div class="absolute top-6 left-6">
          <router-link
            to="/"
            class="flex items-center gap-2 text-white hover:text-blue-500 transition-colors"
          >
            <ArrowLeft
              class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            />
            Trang chủ
          </router-link>
        </div>
      </div>

      <div class="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-6">
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 via-orange-300 to-blue-300"
            ></div>
            <span class="font-bold text-gray-800 tracking-tight">Xin chào</span>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mb-2 flex justify-center">
            Đăng ký
          </h2>
          <p class="text-center text-gray-500 text-sm mb-8">
            Tạo tài khoản mới để bắt đầu
          </p>

          <form
            @submit.prevent
            class="space-y-4"
            style="display: flex; flex-direction: column; gap: 10px"
          >
            <div>
              <label
                class="block text-xs font-medium text-gray-950 ml-1 mb-2"
                style="margin-bottom: 8px"
                >Họ và tên</label
              >
              <input
                v-model="name"
                type="text"
                placeholder="Nhập họ tên của bạn"
                class="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label
                class="block text-xs font-medium text-gray-950 ml-1 mb-2"
                style="margin-bottom: 8px"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                placeholder="thephach@gmail.com"
                class="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label
                class="block text-xs font-medium text-gray-950 ml-1 mb-2"
                style="margin-bottom: 8px"
                >Mật khẩu</label
              >
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Nhập mật khẩu"
                  class="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye v-if="!showPassword" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
              </div>
            </div>

            <div>
              <label
                class="block text-xs font-medium text-gray-950 ml-1 mb-2"
                style="margin-bottom: 8px"
                >Xác nhận mật khẩu</label
              >
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Xác nhận mật khẩu"
                  class="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye v-if="!showConfirmPassword" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
              </div>
            </div>

            <button
              class="cursor-pointer w-full bg-[#007bff] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-200 mt-4"
              style="margin-bottom: 8px"
            >
              Tạo tài khoản
            </button>
          </form>

          <p class="mt-8 text-center text-xs text-gray-500">
            Đã có tài khoản?
            <router-link
              to="/login"
              class="text-blue-600 font-bold hover:underline"
              >Đăng nhập ngay</router-link
            >
          </p>
        </div>

        <div
          class="flex justify-between items-center mt-8 text-[10px] text-gray-400"
        >
          <div class="flex items-center gap-1">
            <div
              class="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-white text-[8px] font-bold"
            >
              f
            </div>
            <span class="hover:text-gray-600 cursor-pointer">@phachnguyen</span>
          </div>
          <span>© EPU Login 2026</span>
        </div>
      </div>
    </div>
  </div>
</template>
