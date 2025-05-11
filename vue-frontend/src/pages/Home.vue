<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

import BgShapes from "../partials/BgShapes.vue";
import VerticalLines from "../partials/VerticalLines.vue";
import Header from "../partials/Header.vue";
import PageHeader from "../partials/PageHeader.vue";
import SubscribeForm from "../partials/SubscribeForm.vue";
import Footer from "../partials/Footer.vue";
import Table from "../partials/Table.vue";

import { useWristbandStore } from "../stores/wristbandStore";

const adminRole = process.env.VUE_APP_ADMIN_ROLE;

const router = useRouter();

const Data = ref("");
const Show = ref(true);
const loading = ref(false);

const { clearSession, state } = useWristbandStore();

const handleUpdateData = (data) => {
  Data.value = data;
  if (Data.value) {
    Show.value = false;
  } else {
    alert("An Error has occured");
  }
};
const handleClick = () => {
  Show.value = !Show.value;
};

const handleLoading = (value) => {
  loading.value = value;
};

const scrollTarget = ref(null);

const scrollToTarget = () => {
  if (scrollTarget.value) {
    scrollTarget.value.scrollIntoView({ behavior: "smooth" });
  }
};

const login = () => {
  clearSession();
  router.push("/login");
};

const logout = () => {
  clearSession();
  router.push("/logout");
};

const signup = () => {
  clearSession();
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
    <BgShapes />
    <VerticalLines />

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <section>
        <div class="pt-32 pb-12 md:pt-44 md:pb-20">
          <div class="px-4 sm:px-6">
            <PageHeader class="mb-12" title="Wristband NestJS Auth SDK"
              description="">
              <span class="text-gray-300 mx-1"></span> Wristband NestJS Auth Demo App
            </PageHeader>
            <div class="max-w-3xl mx-auto mb-12">
              <div class="flex items-center justify-center space-x-3">
                <div :key="state.wristband.isAuthenticated">
                  <div v-if="state.wristband.isAuthenticated">
                    <button
                      class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-black rounded-full shadow-md group dark:bg-gray-800 dark:text-white dark:border-white"
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
                    <div class="py-2 text-center">
                      <a @click="() => router.push('/account')" class="cursor-pointer text-indigo-500 hover:underline">My Account</a>
                    </div>
                    <div
                      v-if="state.wristband.roles.some(role => role.name === adminRole)"
                      class="py-2 text-center"
                    >
                      <a @click="() => router.push('/organization')" class="cursor-pointer text-indigo-500 hover:underline">Organization</a>
                    </div>
                    <div
                      v-if="state.wristband.roles.some(role => role.name === adminRole)"
                      class="py-2 text-center"
                    >
                      <a @click="() => router.push('/users')" class="cursor-pointer text-indigo-500 hover:underline">Users</a>
                    </div>
                  </div>
                  <div v-else>
                    <button
                      class="relative inline-flex items-center justify-center mr-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-black rounded-full shadow-md group dark:bg-gray-800 dark:text-white dark:border-white"
                      @click="() => signup()">
                      <span class="relative z-10">Signup</span>
                      <span
                        class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"
                      ></span>
                    </button>
                    <button
                      class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-black rounded-full shadow-md group dark:bg-gray-800 dark:text-white dark:border-white"
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
            <SubscribeForm @updateData="handleUpdateData" @update:loading="handleLoading" />
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

        <div v-if="!Show" ref="scrollTarget" class="pt-32 pb-12">
          <div class="flex flex-col items-center justify-center">
            <h2
              class="mb-5 text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 dark:from-teal-200 dark:to-blue-500">
              Here are your top issues against Governance Top 10 List.

            </h2>
            <p
              class="mb-5 text-xl text-center text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow-md">
              Total issues: {{ Data.length }}
            </p>
          </div>
          <div class="text-4xl px-4 sm:px-6">
            <!-- The code for the table  -->
            <div class="flex items-center justify-center">
              <div class="bg-white dark:bg-slate-800 rounded shadow-lg" style="width: 70%">
                <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
                  <div class="flex justify-end">
                    <button @click="handleClick"
                      class="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400">
                      <svg class="w-4 h-4 fill-current">
                        <path
                          d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="px-5 pb-1">
                  <div class="text-sm">
                    <div>
                      <div class="">
                        <table class="w-full dark:text-slate-300">
                          <!-- head of the table -->
                          <thead
                            class="text-xs uppercase text-slate-400 dark:dark:text-slate-100 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                            <tr>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">No.</div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left cursor-pointer">
                                  Priority
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left cursor-pointer">
                                  Catagory
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left cursor-pointer">
                                  Method
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left cursor-pointer">
                                  Path
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left cursor-pointer">
                                  Remediation
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody class="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                            <Table
                              v-for="(El, index) in Array(Math.min(10, Data.length)).fill().map((_, i) => Data[i] || {})"
                              :data="El" :key="index" :Num="index + 1" />
                          </tbody>
                        </table>
                      </div>
                      <br />
                    </div>
                    <br />
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
