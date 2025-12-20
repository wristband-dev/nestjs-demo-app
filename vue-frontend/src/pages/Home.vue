<script setup>
import { ref, onMounted } from "vue";

import Header from "../components/Header.vue";
import PageHeader from "../components/PageHeader.vue";
import Footer from "../components/Footer.vue";
import { useWristbandStore } from "../stores/wristbandStore";

const Show = ref(true);
const loading = ref(false);

const { state } = useWristbandStore();
const scrollTarget = ref(null);
const scrollToTarget = () => {
  if (scrollTarget.value) {
    scrollTarget.value.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  if (Show.value) {
    scrollToTarget();
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-slate-900">
    <Header />

    <main class="grow pt-24 pb-12">
      <section class="mx-auto max-w-4xl px-6">
        <PageHeader class="my-12" title="Wristband NestJS Demo App" />
        
        <div class="max-w-3xl mx-auto mb-12">
          <div class="flex items-center justify-center">
            <div :key="state.wristband.isAuthenticated">
              <div v-if="state.wristband.isAuthenticated">
                <div class="text-center space-y-4">
                  <p class="text-xl text-black dark:text-white">
                    You're currently logged in as:
                  </p>
                  <p class="text-xl text-black dark:text-white">
                    <span class="font-semibold mr-2">Email:</span> 
                    <span class="text-pink-500 font-semibold">{{ state.wristband.metadata.email }}</span>
                  </p>
                  <p class="text-xl text-black dark:text-white">
                    <span class="font-semibold mr-2">Tenant:</span> 
                    <span class="text-pink-500 font-semibold">{{ state.wristband.metadata.tenantName }}</span>
                  </p>
                </div>
              </div>
              <div v-else>
                <p class="text-xl text-black dark:text-white text-center max-w-3xl mx-auto">
                  You're not authenticated. Please log in to access this app.
                </p>
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

    <Footer />
  </div>
</template>

<style scoped>
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
