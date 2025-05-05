<script setup>
// category: "Security Config Missing";
// id: "21095cb1";
// method: "post";
// path: "/pet";
// priority: "HIGH";
// remediation: "Security configuration is missing across all '17' endpoints. The security configuration makes it transparent for developers, testers, and API consumers to understand the security expectations and integrate with the API correctly. It can also helps enforce security measures consistently, reducing the likelihood of unauthorized access or data breaches.";
// tag: "Security";

const Props = defineProps({
  data: Object,
  Num: Number,
});

if (Props.Num > 2) {
  Props.data.remediation =
    "UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK UNLOCK UNCLOCK ";
}

function openLinkInNewTab() {
  window.open("https://apigovernance.dev/", "_blank");
}
</script>

<template>
  <tr>
    <td class="p-2 whitespace-nowrap">
      <div
        class="text-left font-medium text-slate-800 dark:dark:text-slate-100"
      >
        {{ Num }}
      </div>
    </td>
    <td class="p-2 whitespace-pre-line">
      <div
        class="text-orange-500 dark:text-orange-400 flex items-center justify-start font-semibold"
      >
        {{ data.priority }}
      </div>
    </td>
    <td class="p-2 whitespace-pre-line">
      <div class="flex items-center justify-start font-semibold">
        {{ data.category }}
      </div>
    </td>
    <td class="p-2 whitespace-pre-line">
      <div class="flex items-center justify-start font-semibold">
        {{ data.method }}
      </div>
    </td>
    <td class="p-2 whitespace-pre-line">
      <div class="flex items-center justify-start font-semibold">
        {{ data.path }}
      </div>
    </td>
    <td class="p-2 whitespace-pre-line relative">
      <div
        class="flex items-center justify-start font-semibold"
        :style="{ filter: Num > 2 ? 'blur(4px)' : 'none' }"
      >
        {{ data.remediation }}
      </div>

      <div
        @click="openLinkInNewTab"
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center font-semibold text-black p-4 rounded-lg"
        v-if="Num > 2"
      >
        <div class="bg-white bg-opacity-80 p-3 rounded-md">
          <p class="font-medium text-indigo-500 hover:underline">
            GovernanceAI
          </p>
        </div>
      </div>
    </td>
  </tr>
</template>
