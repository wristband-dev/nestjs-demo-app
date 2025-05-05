<script setup>
import BgShapes from '../partials/BgShapes.vue'
import VerticalLines from '../partials/VerticalLines.vue'
import Header from '../partials/Header.vue'
import PageHeader from '../partials/PageHeader.vue'
import Accordion from '../partials/Accordion.vue'
// import Cta from '../partials/Table.vue'
import Footer from '../partials/Footer.vue'

const faqs = [
  {
    title: "When the software will be released?",
    text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
    active: false,
  },
  {
    title: "Are there any limits to the number of exported tools from Waitlist?",
    text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
    active: false,
  },
  {
    title: "Do you provide any support?",
    text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
    active: false,
  },
  {
    title: "What does the term “per software” mean in the License?",
    text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
    active: true,
  },
  {
    title: "How is Waitlist different from X?",
    text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
    active: false,
  },
  {
    title: "What happens if I don't renew my license after one year?",
    text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
    active: false,
  },
  {
    title: "How does billing work?",
    text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
    active: false,
  },
  {
    title: "What is your cancellation or refund policy?",
    text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
    active: false,
  },    
]
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

            <PageHeader class="mb-12 md:mb-20" title="Let's talk about software"
              description="Here we provide answers for the most common questions. From registering and accessing your account to payments and paid subscriptions.">
              Quick Answers
            </PageHeader>

            <div class="max-w-3xl mx-auto">
              <div class="space-y-1">
                <template v-for="(faq, index) in faqs">
                  <Accordion :title="faq.title" :id="`faqs-${index}`" :active="faq.active">
                    {{ faq.text }}
                  </Accordion>
                </template>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- <Cta /> -->

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>
