<script setup>
import { useRouter } from 'vue-router';
import { useWristbandStore } from "@wristband/vue-client-sdk-auth";

const wristbandStore = useWristbandStore();
const router = useRouter();

const logout = () => {
  router.push("/logout")
};
const login = () => {
  router.push("/login")
};
</script>

<template>
  <header
    class="absolute top-4 md:top-6 w-full z-30 pb-4 md:pb-6 border-b [border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.4),transparent)1] dark:[border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.16),transparent)1] shadow-[0_1px_0_0_theme(colors.white/.2)] dark:shadow-none">
    <div class="px-4 sm:px-6">
      <div class="max-w-3xl mx-auto">
        <div class="relative flex items-center justify-between gap-x-2 h-12">

          <!-- Site branding -->
          <div class="flex-1">
            <!-- Logo -->
            <router-link to="/"><img
                src="https://cdn.prod.website-files.com/64d01a3671d020746e331a42/67cca2334993ee5f265b6559_wristband_white_logo.svg"
                loading="eager" alt="Wristband" /></router-link>
          </div>

          <!-- Navigation links -->
          <nav class="flex justify-center items-center gap-x-4">
            <h2>
              NestJS Demo App
            </h2>
            <ul class="flex items-center sm:gap-x-3 text-sm font-medium">
              <li v-if="wristbandStore.isAuthenticated.value">
                <button
                  class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group dark:bg-gray-800 dark:text-white border border-gray-800 dark:border-pink-500"
                  @click="logout">
                  <span class="relative z-10">Logout</span>
                  <span
                    class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"></span>
                </button>
              </li>
              <li v-else>
                <button
                  class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group dark:bg-gray-800 dark:text-white border border-gray-800 dark:border-pink-500"
                  @click="login">
                  <span class="relative z-10">Login</span>
                  <span
                    class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"></span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
