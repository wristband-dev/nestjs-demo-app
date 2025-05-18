<script setup>
import Header from "../partials/Header.vue";
import PageHeader from "../partials/PageHeader.vue";
import Footer from "../partials/Footer.vue";
import { useWristbandStore } from "../stores/wristbandStore";
const { state } = useWristbandStore();
</script>

<template>
  <div class="relative flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <section>
        <div class="pt-32 pb-12 md:pt-44 md:pb-20">
          <div class="px-4 sm:px-6">
            <PageHeader class="mb-12" title="You have been logged out." description="">
              <span class="text-gray-300 mx-1"></span>
            </PageHeader>
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
</style>
