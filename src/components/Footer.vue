<template>
  <footer class="pt-20 pb-10 border-t border-slate-100 bg-white">
    <div
      class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
    >
      <div class="space-y-6">
        <div class="flex items-center gap-2 text-2xl font-bold text-teal-600">
          <span class="p-2 bg-teal-600 text-white rounded-lg uppercase">U</span>
          UAV World
        </div>
        <p class="text-slate-500 text-sm leading-relaxed">
          Dẫn đầu trong việc cung cấp các giải pháp máy bay không người lái hiện
          đại, phục vụ từ giải trí đến công nghiệp chuyên dụng.
        </p>
        <div class="flex gap-4">
          <a
            v-for="icon in ['f', 't', 'i', 'y']"
            :key="icon"
            href="#"
            class="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-full hover:bg-teal-600 hover:text-white transition uppercase font-bold text-xs"
          >
            {{ icon }}
          </a>
        </div>
      </div>

      <div>
        <h4
          class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6"
        >
          Category
        </h4>
        <ul class="space-y-4 text-slate-600 text-sm font-medium">
          <li>
            <a href="#" class="hover:text-teal-600 transition"
              >Consumer Drones</a
            >
          </li>
          <li>
            <a href="#" class="hover:text-teal-600 transition"
              >Professional Flight</a
            >
          </li>
          <li>
            <a href="#" class="hover:text-teal-600 transition"
              >Industrial Solutions</a
            >
          </li>
          <li><a href="#" class="text-teal-600 underline">Racing FPV</a></li>
          <li>
            <a href="#" class="hover:text-teal-600 transition">Agriculture</a>
          </li>
        </ul>
      </div>

      <div>
        <h4
          class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6"
        >
          Support
        </h4>
        <ul class="space-y-4 text-slate-600 text-sm font-medium">
          <li>
            <a href="#" class="hover:text-teal-600 transition"
              >Help & Support</a
            >
          </li>
          <li>
            <a href="#" class="hover:text-teal-600 transition"
              >Terms & Conditions</a
            >
          </li>
          <li>
            <a href="#" class="hover:text-teal-600 transition"
              >Privacy Policy</a
            >
          </li>
          <li>
            <a href="#" class="hover:text-teal-600 transition"
              >Technical Help</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h4
          class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6"
        >
          Newsletter
        </h4>
        <div class="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="Your email"
            class="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600 transition text-sm"
          />
          <button
            class="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition text-sm"
          >
            Subscribe
          </button>
        </div>
        <p class="text-slate-400 text-xs leading-relaxed">
          Đăng ký để nhận thông báo về các sản phẩm UAV mới nhất và các chương
          trình khuyến mãi.
        </p>
      </div>
    </div>

    <div
      class="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
    >
      <p class="text-slate-400 text-xs italic">
        @ 2026 - UAV World - Designed & Developed by
        <span class="text-slate-900 font-bold">YourName</span>
      </p>
      <div
        class="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 transition duration-500"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          class="h-5"
          alt="PayPal"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
          class="h-4"
          alt="Visa"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
          class="h-6"
          alt="Mastercard"
        />
      </div>
    </div>
  </footer>
</template>

<script setup>
// Không cần logic phức tạp cho footer tĩnh
</script>
