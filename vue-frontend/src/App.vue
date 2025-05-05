<script setup>
import { useWristbandStore } from "./stores/wristbandStore";

const wristbandStore = useWristbandStore();

// Allows for real-time updates to the authentication state outside of session initialization.
wristbandStore.$subscribe((mutation, state) => {
  if (mutation.type === "direct") {
    if (state.isAuthenticated) {
      wristbandStore.setState(state);
    }
  }
}, { detached: true });
</script>

<template>
  <router-view />
</template>
