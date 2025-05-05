<script setup>
import { useDark } from "@vueuse/core";
const isDark = useDark({
  selector: 'html',
})
</script>

<template>
  <div class="flex-1 flex justify-end">
    <input type="checkbox" name="light-switch" id="light-switch" v-model="isDark" class="light-switch sr-only" />
    <label class="cursor-pointer p-2" for="light-switch">
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-gray-400 dark:fill-gray-500"
          d="M9 0H7v2h2V0ZM14.294 3.052 12.88 1.637 11.466 3.05l1.413 1.414 1.415-1.413ZM16 7h-2v2h2V7ZM11.535 13.02l1.415 1.413 1.414-1.415-1.415-1.413-1.414 1.414ZM9 14H7v2h2v-2ZM1.566 12.948l1.414 1.415 1.415-1.413-1.414-1.415-1.415 1.413ZM2 7H0v2h2V7ZM4.465 3.12 3.05 1.707 1.636 3.12l1.415 1.414L4.465 3.12Z" />
        <path class="fill-gray-800 dark:fill-gray-200" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
      </svg>
      <span class="sr-only">Switch to light / dark version</span>
    </label>
  </div>
</template>