<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

import Header from "../partials/Header.vue";
import PageHeader from "../partials/PageHeader.vue";
import Footer from "../partials/Footer.vue";
import { useWristbandStore } from "@wristband/vue-client-sdk-auth";

const router = useRouter();
const Show = ref(true);
const loading = ref(false);
const wristbandStore = useWristbandStore();
const scrollTarget = ref(null);
const scrollToTarget = () => {
  if (scrollTarget.value) {
    scrollTarget.value.scrollIntoView({ behavior: "smooth" });
  }
};

const login = () => {
  router.push("/login");
};

const logout = () => {
  wristbandStore.clearSession();
  router.push("/logout");
};

const signup = () => {
  router.push("/signup");
};

onMounted(() => {
  if (Show.value) {
    scrollToTarget();
  }
});
</script>

<template>
  <div class="relative flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <section>
        <div class="pt-32 pb-12 md:pt-44 md:pb-20">
          <div class="px-4 sm:px-6">
            <PageHeader class="mb-12" title="NestJS Auth Demo App"
              description="">
              <span class="text-gray-300 mx-1"></span> NestJS Auth Demo App
            </PageHeader>
            <div class="max-w-3xl mx-auto mb-12">
              <div class="flex items-center justify-center space-x-3">
                <div :key="wristbandStore">
                  <div v-if="wristbandStore.isAuthenticated.value">
                    <button
                      class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group dark:bg-gray-800 dark:text-white border border-gray-800 dark:border-pink-500"
                      @click="logout"
                    >
                      <span class="relative z-10">Logout</span>
                      <span
                        class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"
                      ></span>
                    </button>
                    <div class="pt-6 pb-2 text-center">
                      <a @click="() => router.push('/hello-world')" class="cursor-pointer text-indigo-500 hover:underline">Hello World</a>
                    </div>
                  </div>
                  <div v-else>
                    <button
                      class="relative inline-flex items-center justify-center mr-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group dark:bg-gray-800 dark:text-white border border-gray-800 dark:border-pink-500"
                      @click="() => signup()">
                      <span class="relative z-10">Signup</span>
                      <span
                        class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"
                      ></span>
                    </button>
                    <button
                      class="relative inline-flex items-center justify-center mr-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group dark:bg-gray-800 dark:text-white border border-gray-800 dark:border-pink-500"
                      @click="() => login()">
                      <span class="relative z-10">Login</span>
                      <span
                        class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="fixed bottom-4 right-4 flex items-center justify-center z-50">
          <div class="w-64 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <div class="flex space-x-2">
              <div class="w-4 h-4 bg-indigo-400 rounded-full animate-bounce"></div>
              <div class="w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
              <div class="w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-400"></div>
            </div>
            <p class="mt-4 text-center text-white font-semibold text-xl">
              Loading...
            </p>
          </div>
        </div>
      </section>
    </main>
    <!-- Site footer -->
    <Footer />
  </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

body {
  font-family: "Roboto", sans-serif;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-bounce.delay-200 {
  animation-delay: 0.2s;
}

.animate-bounce.delay-400 {
  animation-delay: 0.4s;
}
</style>
