<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth"; 
import Swal from "sweetalert2"; 

const router = useRouter();
const authStore = useAuthStore();

// Form State
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

const bgImage = "/public/img/Login.svg";

// Hàm xử lý Đăng ký
const handleRegister = async () => {
  // 1. Kiểm tra nhập liệu cơ bản
  if (!name.value || !email.value || !password.value) {
    return Swal.fire("Chú ý", "Vui lòng điền đầy đủ các trường!", "warning");
  }

  // 2. Kiểm tra mật khẩu khớp nhau
  if (password.value !== confirmPassword.value) {
    return Swal.fire("Lỗi", "Mật khẩu xác nhận không khớp!", "error");
  }

  try {
    isLoading.value = true;

    // 3. Truyền dữ liệu lên BE thông qua Store
    const result = await authStore.register({
      full_name: name.value,
      email: email.value,
      password: password.value,
      role: "Người dùng", // Mặc định role là student cho dự án UAV của Phach
    });

    if (result.success) {
      await Swal.fire({
        icon: "success",
        title: "Đăng ký thành công!",
        text: "Chào mừng bạn đến với hệ thống UAV",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/login"); // Chuyển hướng sau khi đăng ký xong
    } else {
      Swal.fire("Lỗi", result.message || "Đăng ký thất bại", "error");
    }
  } catch (error) {
    Swal.fire(
      "Lỗi kết nối",
      "Không thể gọi tới Backend, hãy kiểm tra Server!",
      "error",
    );
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="h-screen w-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
    <div class="max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[750px]">
      
      <div class="hidden md:block md:w-3/5 relative h-full">
        <img
          :src="bgImage"
          alt="Background"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute bottom-6 left-6 text-white text-xs opacity-80">
          Photo by
          <span class="underline cursor-pointer text-gray-200">PhachNguyen</span>
        </div>
        <div class="absolute top-6 left-6">
          <router-link
            to="/"
            class="flex items-center gap-2 text-white hover:text-blue-500 transition-colors"
          >
            <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Trang chủ
          </router-link>
        </div>
      </div>

      <div class="w-full md:w-2/5 p-8 flex flex-col justify-between h-full overflow-y-auto custom-scrollbar">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 via-orange-300 to-blue-300"></div>
            <span class="font-bold text-gray-800 tracking-tight">Xin chào</span>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 text-center mb-2">
            Đăng ký
          </h2>
          <p class="text-center text-gray-500 text-sm mb-6">
            Tạo tài khoản mới để bắt đầu
          </p>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-gray-950 ml-1 mb-1.5">Họ và tên</label>
              <input
                v-model="name"
                type="text"
                placeholder="Nhập họ tên của bạn"
                class="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-950 ml-1 mb-1.5">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="thephach@gmail.com"
                class="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-950 ml-1 mb-1.5">Mật khẩu</label>
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
                  class="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye v-if="!showPassword" :size="18" stroke-width="1.5" />
                  <EyeOff v-else :size="18" stroke-width="1.5" />
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-950 ml-1 mb-1.5">Xác nhận mật khẩu</label>
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
                  class="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye v-if="!showConfirmPassword" :size="18" stroke-width="1.5" />
                  <EyeOff v-else :size="18" stroke-width="1.5" />
                </button>
              </div>
            </div>

            <button
              :disabled="isLoading"
              class="cursor-pointer w-full bg-[#007bff] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-200 mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              <span v-if="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {{ isLoading ? 'Đang xử lý...' : 'Tạo tài khoản' }}
            </button>
          </form>

          <p class="mt-6 text-center text-xs text-gray-500">
            Đã có tài khoản?
            <router-link
              to="/login"
              class="text-blue-600  hover:underline"
            >Đăng nhập ngay</router-link>
          </p>
        </div>

        <div class="flex justify-between items-center text-[10px] text-gray-400 mt-6">
          <div class="flex items-center gap-1">
            <div class="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-white text-[8px] font-bold">f</div>
            <span class="hover:text-gray-600 cursor-pointer">@phachnguyen</span>
          </div>
          <span>© EPU Login 2026</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tùy chỉnh thanh cuộn nếu màn hình quá nhỏ buộc phải cuộn */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>