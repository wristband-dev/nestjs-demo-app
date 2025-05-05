<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header
    class="absolute top-4 md:top-6 w-full z-30 pb-4 md:pb-6 border-b [border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.4),transparent)1] dark:[border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.16),transparent)1] shadow-[0_1px_0_0_theme(colors.white/.2)] dark:shadow-none">
    <div class="px-4 sm:px-6">
      <div class="max-w-3xl mx-auto">
        <div
          class="relative flex items-center justify-between gap-x-2 h-12 bg-gradient-to-b from-white/90 to-white/70 dark:from-gray-700/80 dark:to-gray-700/70 rounded-lg px-3 shadow">

          <!-- Border with dots in corners -->
          <div
            class="absolute -inset-1.5 bg-indigo-500/15 dark:bg-gray-800/50 rounded-sm -z-10 before:absolute before:inset-y-0 before:left-0 before:w-[10px] before:bg-[length:10px_10px] before:[background-position:top_center,bottom_center] before:bg-no-repeat before:[background-image:radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1px,transparent_1px),radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1px,transparent_1px)] dark:before:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600/.56)_1px,transparent_1px),radial-gradient(circle_at_center,theme(colors.gray.600/.56)_1px,transparent_1px)] after:absolute after:inset-y-0 after:right-0 after:w-[10px] after:bg-[length:10px_10px] after:[background-position:top_center,bottom_center] after:bg-no-repeat after:[background-image:radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1px,transparent_1px),radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1px,transparent_1px)] dark:after:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600/.56)_1px,transparent_1px),radial-gradient(circle_at_center,theme(colors.gray.600/.56)_1px,transparent_1px)]"
            aria-hidden="true"></div>

          <!-- Site branding -->
          <div class="flex-1">
            <!-- Logo -->
            <router-link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <path class="fill-indigo-300"
                  d="M16.975 3.036c6.402.475 11.514 5.586 11.99 11.989H24.32a7.345 7.345 0 0 1-7.345-7.345V3.036Zm-1.95 21.284v4.644c-6.402-.475-11.514-5.587-11.989-11.99H7.68a7.345 7.345 0 0 1 7.345 7.346Z" />
                <path class="fill-indigo-500"
                  d="M3.036 15.025c.475-6.403 5.587-11.514 11.99-11.99V7.68a7.345 7.345 0 0 1-7.346 7.345H3.036Zm21.284 1.95h4.644c-.475 6.402-5.586 11.514-11.989 11.989V24.32a7.345 7.345 0 0 1 7.345-7.345Z" />
                 
                  
              </svg>
        
                    
            </router-link>
          </div>

          <!-- Navigation links -->
          <nav class="flex justify-center">
            <h2>
              GovernanceAI Public Service 
             </h2>
            <!-- <ul class="flex items-center sm:gap-x-3 text-sm font-medium">
              <li>
                <router-link
                  class="text-gray-800 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800/30 py-1.5 px-3"
                  to="/updates">Updates</router-link>
              </li>
              <li>
                <router-link
                  class="text-gray-800 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800/30 transition-colors py-1.5 px-3"
                  to="/faq">FAQ</router-link>
              </li>
              <li>
                <router-link
                  class="text-gray-800 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800/30 transition-colors py-1.5 px-3"
                  to="/contact">Contact us</router-link>
              </li>
            </ul> -->


            
          </nav>

          <!-- Dark / Light mode toggle -->
          <ThemeToggle />

        </div>
      </div>
    </div>
  </header>
</template>

