<script setup>
import { ref, onMounted } from "vue";

import BgShapes from "../partials/BgShapes.vue";
import VerticalLines from "../partials/VerticalLines.vue";
import Header from "../partials/Header.vue";
import Footer from "../partials/Footer.vue";
import { apiClient } from "../api/axios-client";

const displayNameInput = ref("");
const descriptionInput = ref("");
const isSubmitDisabled = ref(true);
const createdOnDate = ref('');
const loading = ref(true);
const tenant = ref({ id: "", displayName: "", description: "", metadata: { creationTime: "" } });

const fetchOrganization = async () => {
  try {
    const response = await apiClient.get("/organization-settings");

    tenant.value = response.data;
    displayNameInput.value = response.data.displayName || "";
    descriptionInput.value = response.data.description || "";
    createdOnDate.value = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(response.data.metadata.creationTime));
    isSubmitDisabled.value = false;
  } catch (error) {
    console.log(error);
    alert("An error occurred while fetching organization data. Please try again later.");
  } finally {
    loading.value = false;
  }
};

const cancelUpdateForm = () => {
  displayNameInput.value = tenant.value.displayName || "";
  descriptionInput.value = tenant.value.description || "";
};

const updateOrganization = async () => {
  try {
    isSubmitDisabled.value = true;
    const response = await apiClient.patch("/organization-settings", {
      displayName: displayNameInput.value,
      displayName: displayNameInput.value
    });

    tenant.value = response.data;
    alert("Organization updated successfully!");
  } catch (error) {
    console.log(error);
    alert("An error occurred while updating your organization.");
  } finally {
    isSubmitDisabled.value = false;
  }
};

onMounted(() => {
  fetchOrganization();
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
                <h1 class="text-4xl font-bold mb-4">Organization</h1>
                <p class="text-xl mb-8">Update your organization details below.</p>
              </div>
              <div class="text-center mb-6">
                <p class="text-lg font-semibold mb-4">Org ID: {{ tenant.id }}</p>
                <p class="text-lg font-semibold">Created On: {{ createdOnDate }}</p>
              </div>
              <form @submit.prevent="updateOrganization" class="space-y-6">
                <div>
                  <label for="displayName" class="block text-lg font-medium text-gray-700">Org Display Name</label>
                  <input
                    v-model="displayNameInput"
                    id="displayName"
                    name="displayName"
                    type="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-700"
                    required
                    maxlength="60"
                  />
                </div>
                <div>
                  <label for="description" class="block text-lg font-medium text-gray-700">Description</label>
                  <textarea
                    v-model="descriptionInput"
                    id="description"
                    name="description"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-700 resize-none"
                    rows="5"
                    maxlength="500"
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
                    @click="updateOrganization"
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
