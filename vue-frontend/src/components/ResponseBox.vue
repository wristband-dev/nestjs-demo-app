<script setup>
defineProps({
  title: {
    type: String,
    default: 'Response:'
  },
  message: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="mt-4 rounded border border-gray-300 dark:border-gray-700">
    <div class="bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-300 dark:border-gray-700">
      <p class="font-bold text-sm text-center">{{ title }}</p>
    </div>
    <div class="p-2 max-h-60 overflow-auto">
      <pre class="text-xs whitespace-pre-wrap break-all">{{ message }}</pre>
    </div>
  </div>
</template>
