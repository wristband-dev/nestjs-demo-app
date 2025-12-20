<script setup>
const props = defineProps({
  title: String,
  description: String,
})
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="text-center">

      <h1
        class="font-inter-tight text-4xl md:text-5xl font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-indigo-200 dark:to-gray-200 pb-4">
        {{ title }}
      </h1>
      <p class="text-lg text-gray-700 dark:text-gray-400">
        {{ description }}
      </p>

    </div>
  </div>
</template>
