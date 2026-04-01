<script setup>
import { ref } from "vue";
import { Eye, EyeOff, ArrowLeft } from "lucide-vue-next";
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const bgImage = "/public/img/Login.svg"; // Thay bằng ảnh của bạn
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div
      class="max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
    >
      <div class="hidden md:block md:w-3/5 relative">
        <img
          :src="bgImage"
          alt="Lighthouse"
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
          <div class="flex items-center gap-2 mb-10">
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 via-orange-300 to-blue-300"
            ></div>
            <span class="font-bold text-gray-800 tracking-tight">Xin chào</span>
          </div>

          <h2
            class="text-3xl font-bold text-gray-900 mb-8 flex justify-center"
            style="margin-bottom: 8px"
          >
            Đăng nhập
          </h2>

          <form @submit.prevent class="space-y-5">
            <div>
              <label
                class="block text-xs font-medium text-gray-950 ml-1"
                style="margin-bottom: 8px"
                >Tài khoản</label
              >
              <input
                v-model="email"
                type="text"
                placeholder="Email hoặc số điện thoại"
                class="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                style="margin-bottom: 8px"
              />
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <label
                  class="block text-xs font-medium text-gray-950 ml-1"
                  style="margin-bottom: 8px"
                  >Mật khẩu</label
                >
              </div>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Nhập mật khẩu"
                  class="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />

                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye v-if="!showPassword" :size="20" stroke-width="1.5" />
                  <EyeOff v-else :size="20" stroke-width="1.5" />
                </button>
              </div>
            </div>

            <div
              class="flex items-center justify-between text-xs"
              style="margin: 8px 0px"
            >
              <label class="flex items-center cursor-pointer gap-1">
                <div class="relative">
                  <input type="checkbox" v-model="rememberMe" class="sr-only" />
                  <div
                    :class="rememberMe ? 'bg-blue-600' : 'bg-gray-300'"
                    class="block w-8 h-4 rounded-full transition-colors"
                  ></div>
                  <div
                    :class="rememberMe ? 'translate-x-4' : 'translate-x-1'"
                    class="absolute left-0 top-1 bg-white w-2 h-2 rounded-full transition-transform"
                  ></div>
                </div>
                <span class="ml-2 text-gray-600 font-medium"
                  >Nhớ tài khoản</span
                >
              </label>
              <a href="#" class="text-blue-600 hover:underline font-medium"
                >Quên mật khẩu?</a
              >
            </div>

            <button
              class="cursor-pointer w-full bg-[#007bff] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-200"
            >
              Đăng nhập
            </button>

            <div class="relative flex items-center py-2">
              <div class="flex-grow border-t border-gray-200"></div>
              <span class="flex-shrink mx-4 text-gray-400 text-xs"
                >Or sign in with Google</span
              >
              <div class="flex-grow border-t border-gray-200"></div>
            </div>

            <button
              class="w-full flex items-center justify-center gap-3 bg-[#333] hover:bg-black text-white font-medium py-3 rounded-lg transition-all"
              style="margin-bottom: 8px"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                class="w-5 h-5"
                alt="Google"
              />
              <span class="text-sm">Sign in with Google</span>
            </button>
          </form>

          <p class="mt-8 text-center text-xs text-gray-500">
            Don't have an account?
            <router-link
              to="/register"
              class="text-blue-600 font-bold hover:underline"
              >Sign up now</router-link
            >
          </p>
        </div>

        <div
          class="flex justify-between items-center mt-12 text-[10px] text-gray-400"
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
