<script setup>
import { apiClient } from "../api/axios-client";
import Header from "../partials/Header.vue";
import PageHeader from "../partials/PageHeader.vue";
import Footer from "../partials/Footer.vue";
import { useWristbandStore } from "@wristband/vue-client-sdk-auth";

const wristbandStore = useWristbandStore();
console.log("Auth status:", wristbandStore.authStatus.value);
const handleHelloWorld = async () => {
  try {
    const response = await apiClient.get("/hello-world");
    alert(response.data);
  } catch (error) {
    console.log(error);

    if (error.response && [401, 403].includes(error.response.status)) {
      alert("Your session expired. Please log in again to continue.");
    } else {
      alert("Something went wrong trying to say hello!");
    }
  }
};
</script>
<!-- ============================================== -->
<template>
  <div class="relative flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <section>
        <div class="pt-32 pb-12 md:pt-44 md:pb-20">
          <div class="px-4 sm:px-6">
            <PageHeader v-if="wristbandStore.isAuthenticated" class="mb-12"
              title="Hello, You've reached an authenticated route!" description="">
              <span class="text-gray-300 mx-1"></span>
            </PageHeader>
            <PageHeader v-else class="mb-12" title="You're not authenticated." description="">
              <span class="text-gray-300 mx-1"></span>
            </PageHeader>
            <div class="max-w-3xl mx-auto mb-12">
              <div class="text-center">
                <h1 class="text-4xl font-bold mb-8">Try Saying Hi {{wristbandStore.isAuthenticated}}</h1>
              </div>
              <div class="flex items-center justify-center space-x-3">
                <div :key="wristbandStore.isAuthenticated">
                  <div v-if="wristbandStore.isAuthenticated === true">
                    <button
                      class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group dark:bg-gray-800 dark:text-white border border-gray-800 dark:border-pink-500"
                      @click="handleHelloWorld">
                      <span class="relative z-10">Say Hello</span>
                      <span
                        class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"></span>
                    </button>
                  </div>
                  <div v-else>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<!-- ============================================== -->

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

body {
  font-family: "Roboto", sans-serif;
}
</style>
