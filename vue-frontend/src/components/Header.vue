<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useWristbandStore } from "../stores/wristbandStore";

const { clearSession, state } = useWristbandStore();
const router = useRouter();
const route = useRoute();
const menuOpen = ref(false);

const logout = () => {
  clearSession();
  router.push("/logout");
};

const login = () => {
  router.push("/login");
};

const signup = () => {
  router.push("/signup");
};

const handleNav = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};
</script>

<template>
  <nav class="fixed z-[999] w-full h-16 shadow-xl bg-slate-900 text-white border-b border-white">
    <div class="flex justify-between items-center h-full w-full pl-6 pr-8 2xl:px-16">
      <div class="flex left items-center">
        <router-link to="/" class="cursor-pointer mr-4">
          <img
            src="/wristband-logo.png"
            alt="Wristband"
            class="h-10 cursor-pointer"
          />
        </router-link>
        <p class="text-md font-semibold">
          NestJS Demo
        </p>
      </div>

      <!-- Desktop Navigation - Authenticated -->
      <div v-if="state.wristband.isAuthenticated" class="hidden sm:flex">
        <ul class="hidden sm:flex">
          <router-link to="/">
            <li
              :class="[
                'ml-8 capitalize border-b-2 transition ease-in-out duration-200 text-xl',
                route.path === '/' 
                  ? 'border-pink-500 text-pink-500' 
                  : 'border-transparent hover:border-pink-500 hover:text-pink-500'
              ]"
            >
              Home
            </li>
          </router-link>
          <router-link to="/hello-world">
            <li
              :class="[
                'ml-8 capitalize border-b-2 transition ease-in-out duration-200 text-xl',
                route.path === '/hello-world' 
                  ? 'border-pink-500 text-pink-500' 
                  : 'border-transparent hover:border-pink-500 hover:text-pink-500'
              ]"
            >
              Hello World
            </li>
          </router-link>
          <div @click="logout" class="cursor-pointer">
            <li class="ml-8 capitalize border-b-2 border-transparent hover:border-pink-500 hover:text-pink-500 transition ease-in-out duration-200 text-xl">
              Log Out
            </li>
          </div>
        </ul>
      </div>

      <!-- Desktop Navigation - Not Authenticated -->
      <div v-else class="hidden sm:flex">
        <ul class="hidden sm:flex">
          <div @click="signup" class="cursor-pointer">
            <li class="ml-8 capitalize border-b-2 border-transparent hover:border-pink-500 hover:text-pink-500 transition ease-in-out duration-200 text-xl">
              Sign Up
            </li>
          </div>
          <div @click="login" class="cursor-pointer">
            <li class="ml-8 capitalize border-b-2 border-transparent hover:border-pink-500 hover:text-pink-500 transition ease-in-out duration-200 text-xl">
              Log In
            </li>
          </div>
        </ul>
      </div>

      <!-- Mobile Menu Button -->
      <div
        @click="handleNav"
        class="sm:hidden cursor-pointer pl-24 hover:text-pink-500 transition ease-in-out duration-200"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      :class="[
        'fixed left-0 top-0 w-full sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-300',
        menuOpen ? 'left-0' : 'left-[-100%]'
      ]"
    >
      <div class="flex w-full items-center justify-end text-black">
        <div @click="handleNav" class="cursor-pointer hover:text-pink-500 transition ease-in-out duration-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="flex-col py-4 text-black">
        <!-- Mobile Menu - Authenticated -->
        <ul v-if="state.wristband.isAuthenticated">
          <router-link to="/">
            <li
              @click="closeMenu"
              class="py-4 cursor-pointer hover:text-pink-500 transition ease-in-out duration-200"
            >
              Home
            </li>
          </router-link>
          <router-link to="/hello-world">
            <li
              @click="closeMenu"
              class="py-4 cursor-pointer hover:text-pink-500 transition ease-in-out duration-200"
            >
              Hello World
            </li>
          </router-link>
          <div @click="logout" class="cursor-pointer">
            <li
              @click="closeMenu"
              class="py-4 cursor-pointer hover:text-pink-500 transition ease-in-out duration-200"
            >
              Log Out
            </li>
          </div>
        </ul>
        
        <!-- Mobile Menu - Not Authenticated -->
        <ul v-else>
          <div @click="signup" class="cursor-pointer">
            <li
              @click="closeMenu"
              class="py-4 cursor-pointer hover:text-pink-500 transition ease-in-out duration-200"
            >
              Sign Up
            </li>
          </div>
          <div @click="login" class="cursor-pointer">
            <li
              @click="closeMenu"
              class="py-4 cursor-pointer hover:text-pink-500 transition ease-in-out duration-200"
            >
              Log In
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>
