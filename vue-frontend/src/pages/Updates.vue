<script setup>
import BgShapes from '../partials/BgShapes.vue'
import VerticalLines from '../partials/VerticalLines.vue'
import Header from '../partials/Header.vue'
import PageHeader from '../partials/PageHeader.vue'
import PostsSidebar from '../partials/PostsSidebar.vue'
import PostsList from '../partials/PostsList.vue'
// import Cta from '../partials/Table.vue'
import Footer from '../partials/Footer.vue'
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

            <PageHeader class="mb-12" title="News & Updates"
              description="Rank and score updates and feature requests so you know you're working on the most impactful things.">
              What's New
            </PageHeader>

          </div>
        </div>
      </section>

      <section>
        <div class="pb-12 md:pb-20">
          <div class="px-4 sm:px-6">

            <div class="max-w-5xl mx-auto">
              <div class="md:flex md:justify-between">

                <!-- Sidebar -->
                <PostsSidebar />

                <!-- Posts -->
                <PostsList />

            </div>
          </div>

        </div>
      </div>
    </section>

    <Cta />

  </main>

  <!-- Site footer -->
  <Footer />

</div></template>
