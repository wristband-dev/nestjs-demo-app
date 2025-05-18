<script setup>
import { useDark } from "@vueuse/core";
const isDark = useDark({
  selector: 'html',
});
</script>

<template>
  <header
    class="absolute top-4 md:top-6 w-full z-30 pb-4 md:pb-6 border-b [border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.4),transparent)1] dark:[border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.16),transparent)1] shadow-[0_1px_0_0_theme(colors.white/.2)] dark:shadow-none">
    <div class="px-4 sm:px-6">
      <div class="max-w-3xl mx-auto">
        <div
          class="relative flex items-center justify-between gap-x-2 h-12">

          <!-- Site branding -->
          <div class="flex-1">
            <!-- Logo -->
            <router-link to="/"><img src="https://cdn.prod.website-files.com/64d01a3671d020746e331a42/67cca2334993ee5f265b6559_wristband_white_logo.svg" loading="eager" alt="Wristband"/></router-link>
          </div>

          <!-- Navigation links -->
          <nav class="flex justify-center">
            <h2>
              NestJS Demo App
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
        </div>
      </div>
    </div>
  </header>
</template>

