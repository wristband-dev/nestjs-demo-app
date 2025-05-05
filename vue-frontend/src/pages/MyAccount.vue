<script setup>
import { ref, onMounted } from "vue";

import BgShapes from "../partials/BgShapes.vue";
import VerticalLines from "../partials/VerticalLines.vue";
import Header from "../partials/Header.vue";
import Footer from "../partials/Footer.vue";
import { apiClient } from "../api/axios-client";

const fullNameInput = ref("");
const isSubmitDisabled = ref(true);
const joinedDate = ref('');
const loading = ref(true);
const user = ref({ email: "", fullName: "", metadata: { creationTime: "" } });

const fetchAccount = async () => {
  try {
    const response = await apiClient.get("/account-settings");

    user.value = response.data;
    fullNameInput.value = response.data.fullName || "";
    joinedDate.value = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(response.data.metadata.creationTime));
    isSubmitDisabled.value = false;
  } catch (error) {
    console.log(error);
    alert("An error occurred while fetching account data. Please try again later.");
  } finally {
    loading.value = false;
  }
};

const cancelUpdateForm = () => {
  fullNameInput.value = user.value.fullName || "";
};

const updateAccount = async () => {
  try {
    isSubmitDisabled.value = true;
    const response = await apiClient.patch("/account-settings", { fullName: fullNameInput.value });

    user.value = response.data;
    alert("Account updated successfully!");
  } catch (error) {
    console.log(error);
    alert("An error occurred while updating your account.");
  } finally {
    isSubmitDisabled.value = false;
  }
};

onMounted(() => {
  fetchAccount();
});
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
            <div class="max-w-3xl mx-auto">
              <div class="text-center">
                <h1 class="text-4xl font-bold mb-4">My Account</h1>
                <p class="text-xl mb-8">Update your profile information below.</p>
              </div>
              <div class="text-center mb-6">
                <p class="text-lg font-semibold mb-4">Email: {{ user.email }}</p>
                <p class="text-lg font-semibold">Joined Date: {{ joinedDate }}</p>
              </div>
              <form @submit.prevent="updateAccount" class="space-y-6">
                <div>
                  <label for="fullName" class="block text-lg font-medium text-gray-700">Full Name</label>
                  <input
                    v-model="fullNameInput"
                    id="fullName"
                    name="fullName"
                    type="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-700"
                    required
                    maxlength="100"
                  />
                </div>
                <div class="flex justify-center">
                  <button
                    type="button"
                    @click="cancelUpdateForm"
                    class="inline-flex items-center justify-center px-6 py-3 mr-4 font-medium transition duration-300 ease-out border-2 border-black rounded-full shadow-md bg-slate-600 text-white disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="isSubmitDisabled"
                    @click="updateAccount"
                    class="inline-flex items-center justify-center px-6 py-3 font-medium transition duration-300 ease-out border-2 border-black rounded-full shadow-md bg-indigo-500 text-white disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </form>

              <div v-if="loading" class="flex items-center justify-center mt-8">
                <div class="w-64 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
                  <div class="flex space-x-2">
                    <div class="w-4 h-4 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div class="w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                    <div class="w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-400"></div>
                  </div>
                  <p class="mt-4 text-center text-white font-semibold text-xl">
                    Loading...
                  </p>
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

body {
  font-family: "Roboto", sans-serif;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-bounce.delay-200 {
  animation-delay: 0.2s;
}

.animate-bounce.delay-400 {
  animation-delay: 0.4s;
}
</style>
