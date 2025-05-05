<script setup>
import BgShapes from "../partials/BgShapes.vue";
import VerticalLines from "../partials/VerticalLines.vue";
import Header from "../partials/Header.vue";
import PageHeader from "../partials/PageHeader.vue";
import Footer from "../partials/Footer.vue";
import Table from "../partials/Table.vue";
import { ref } from "vue";

const items = ref([
  {
    Name: "Security",
    Category: "Security Config Missing",
    Count: "1",
    Priority: " HIGH",
    Status: "OK",
    Pass: "FAIL",
  },
  {
    Name: "Security",
    Category: "Security Config Missing",
    Count: "1",
    Priority: " HIGH",
    Status: "OK",
    Pass: "FAIL",
  },
  {
    Name: "Security",
    Category: "Security Config Missing",
    Count: "1",
    Priority: " HIGH",
    Status: "OK",
    Pass: "FAIL",
  },

]);

</script>

<template>
  <div
    class="relative flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"
  >
    <BgShapes />
    <VerticalLines />

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      <section>
        <div class="pt-32 pb-12 md:pt-44 md:pb-20">
          <div class="px-4 sm:px-6">
            <PageHeader
              class="mb-12 md:mb-20"
              title="Result"
              description="Top 10 issues listed below"
            >
              AI Trained on 10k Public APIs.
            </PageHeader>
            <!-- The code for the table  -->
            <div class="flex items-center justify-center">
              <div
                class="bg-white dark:bg-slate-800 rounded shadow-lg"
                style="width: 70%"
              >
                <div
                  class="px-5 py-3 border-b border-slate-200 dark:border-slate-700"
                >
                  <div class="flex justify-end">
                    <button
                      class="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400"
                    >
                      <svg class="w-4 h-4 fill-current">
                        <path
                          d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="px-5 pb-1">
                  <div class="text-sm">
                    <div>
                      <div class="">
                        <table class="w-full dark:text-slate-300">
                          <!-- head of the table -->
                          <thead
                            class="text-xs uppercase text-slate-400 dark:dark:text-slate-100 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm"
                          >
                            <tr>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">No.</div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div
                                  class="font-semibold text-left cursor-pointer"
                                >
                                  Top-10
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div
                                  class="font-semibold text-left cursor-pointer"
                                >
                                  Category
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div
                                  class="font-semibold text-left cursor-pointer"
                                >
                                  Count
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div
                                  class="font-semibold text-left cursor-pointer"
                                >
                                  Priority
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div
                                  class="font-semibold text-left cursor-pointer"
                                >
                                  Status
                                </div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div
                                  class="font-semibold text-left cursor-pointer"
                                >
                                  PASS/FAIL
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <!-- we can send a prop into this page and change the vlaues based on the values in the table passed into the prop -->
                          <tbody
                            class="text-sm divide-y divide-slate-100 dark:divide-slate-700"
                          >
                          <Table
                          v-for="(item, index) in items"
                          :key="index"
                          :Num="index + 1"
                          :Name="item.Name"
                          :Category="item.Category"
                          :Count="item.Count"
                          :Priority= "item.Priority"
                          :Status = "item.Status"
                          :Pass = "item.Pass"
                          />
                          </tbody>
                        </table>
                      </div>
                      <br />
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>
