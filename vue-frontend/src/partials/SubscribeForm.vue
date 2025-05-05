<template>
  <div
    class="relative flex items-center justify-center gap-10 before:h-px before:w-full before:border-b before:[border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.8),transparent)1] dark:before:[border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.16),transparent)1] before:shadow-sm before:shadow-white/20 dark:before:shadow-none after:h-px after:w-full after:border-b after:[border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.8),transparent)1] dark:after:[border-image:linear-gradient(to_right,transparent,theme(colors.indigo.300/.16),transparent)1] after:shadow-sm after:shadow-white/20 dark:after:shadow-none mb-11"
  >
    <div class="w-[65vw] mx-auto shrink-0">
      <form @submit.prevent="handleSearch" class="relative">
        <!-- Border with dots in corners -->
        <div
          class="absolute -inset-3 bg-indigo-500/15 dark:bg-transparent dark:bg-gradient-to-b dark:from-gray-700/80 dark:to-gray-700/70 rounded-lg -z-10 before:absolute before:inset-y-0 before:left-0 before:w-[15px] before:bg-[length:15px_15px] before:[background-position:top_center,bottom_center] before:bg-no-repeat before:[background-image:radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1.5px,transparent_1.5px)] dark:before:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px)] after:absolute after:inset-y-0 after:right-0 after:w-[15px] after:bg-[length:15px_15px] after:[background-position:top_center,bottom_center] after:bg-no-repeat after:[background-image:radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1.5px,transparent_1.5px)] dark:after:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px)]"
          aria-hidden="true"
        ></div>

        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <div class="flex-grow">
              <label class="sr-only" for="email">Email</label>
              <div class="relative">
                <input
                  id="email"
                  class="form-input text-sm w-full"
                  placeholder="Your API URL"
                  v-model="apiUrl"
                  required
                />
              </div>
            </div>
            <div>
              <!-- <button
                class="btn text-gray-100 bg-gray-900 hover:bg-gray-800 dark:text-gray-800 dark:bg-gray-100 dark:hover:bg-white"
              >
                Submit
              </button> -->
              <button
                class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-black rounded-full shadow-md group dark:bg-gray-800 dark:text-white dark:border-white"
              >
                <span class="relative z-10">Submit</span>
                <span
                  class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { apiClient } from "../api/axios-client";


const response = ref(null);
const apiUrl = ref("https://petstore.swagger.io/v2/swagger.yaml");

const emit = defineEmits(["updateData", "update:loading"]);

const handleSearch = async () => {
  try {
    emit("update:loading", true);
    const requestBody = { openapi_spec: apiUrl.value };
    const scanResponse = await apiClient.post("/governance-ai/scan", requestBody);
    response.value = scanResponse.data;

    if (response.value) {
      emit("updateData", response.value);
    } else {
      alert("Invalid response");
    }
  } catch (error) {
    console.log(error);
  } finally {
    emit("update:loading", false);
  }
};
</script>
