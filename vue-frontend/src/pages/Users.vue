<script setup>
import { ref, onMounted } from "vue";

import BgShapes from "../partials/BgShapes.vue";
import VerticalLines from "../partials/VerticalLines.vue";
import Header from "../partials/Header.vue";
import Footer from "../partials/Footer.vue";
import { apiClient } from "../api/axios-client";

const inviteEmailInput = ref("");
const isSubmitDisabled = ref(true);
const loading = ref(true);

// Table states
const invitesLoading = ref(true);
const usersLoading = ref(true);
const invites = ref([]);
const users = ref([]);

const dateFormat = { month: 'long', day: 'numeric', year: 'numeric' };
const creationTimeToDateString = (creationTime) => {
  return new Intl.DateTimeFormat('en-US', dateFormat).format(new Date(creationTime));
}

const fetchUsersSettings = async () => {
  try {
    const response = await apiClient.get("/users-settings");
    invites.value = response.data.invites;
    users.value = response.data.users;
    isSubmitDisabled.value = false;
  } catch (error) {
    console.log(error);
    alert("An error occurred while fetching users data. Please try again later.");
  } finally {
    loading.value = false;
    invitesLoading.value = false;
    usersLoading.value = false;
  }
};

const cancelInvite = async (newUserInvitationRequestId) => {
  try {
    // First cancel the invite
    isSubmitDisabled.value = true;
    await apiClient.post("/users-settings/cancel-invite", { newUserInvitationRequestId });

    // Now reload the settings to ensure the tables have the most recent data
    const response = await apiClient.get("/users-settings");
    invites.value = response.data.invites;
    users.value = response.data.users;

    alert("Invite cancelled successfully.");
  } catch (error) {
    console.log(error);
    alert("An error occurred while fetching users data. Please try again later.");
  } finally {
    isSubmitDisabled.value = false;
  }
};

const submitInviteForm = () => {
  inviteUser(inviteEmailInput.value);
}

const inviteUser = async (email) => {
  try {
    // First send the invite
    isSubmitDisabled.value = true;
    await apiClient.post("/users-settings/invite-user", { email });

    // Now reload the settings to ensure the tables have the most recent data
    const response = await apiClient.get("/users-settings");
    invites.value = response.data.invites;
    users.value = response.data.users;
    inviteEmailInput.value = '';

    alert("User invitation sent successfully.");
  } catch (error) {
    console.log(error);
    alert("An error occurred while inviting the user. Please try again later.");
  } finally {
    isSubmitDisabled.value = false;
  }
};

onMounted(() => {
  fetchUsersSettings();
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
                <h1 class="text-4xl font-bold mb-4">Users</h1>
                <p class="text-xl mb-8">Collaborate with your team.</p>
              </div>
              <form @submit.prevent="submitInviteForm" class="space-y-6">
                <div>
                  <label for="inviteEmail" class="block text-lg font-medium">Email to Invite</label>
                  <input
                    v-model="inviteEmailInput"
                    id="inviteEmail"
                    name="inviteEmail"
                    type="email"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-700"
                    required
                    maxlength="200"
                  />
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="isSubmitDisabled"
                    class="inline-flex items-center justify-center px-6 py-3 font-medium transition duration-300 ease-out border-2 border-black rounded-full shadow-md bg-indigo-500 text-white disabled:opacity-50"
                  >
                    Invite
                  </button>
                </div>
              </form>

              <!-- Users table -->
              <div class="text-center mt-8">
                <h2 class="text-2xl font-bold mb-4">Teammates</h2>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full table-auto">
                  <thead>
                    <tr class="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-left">Email</th>
                      <th class="py-3 px-6 text-left">Role</th>
                      <th class="py-3 px-6 text-left">Joined On</th>
                      <th class="py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id" class="bg-white border-b border-gray-200 text-gray-700">
                      <td class="py-3 px-6 text-left">{{ user.email }}</td>
                      <td class="py-3 px-6 text-left">Org Admin</td>
                      <td class="py-3 px-6 text-left">{{ creationTimeToDateString(user.metadata.creationTime) }}</td>
                      <td class="py-3 px-6 text-left">{{ user.status }}</td>
                    </tr>
                    <!-- Show this when there are no users -->
                    <tr v-if="users.length === 0 && !usersLoading" class="bg-white">
                      <td colspan="5" class="py-6 text-center text-gray-500">
                        No teammates found.
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="usersLoading" class="flex items-center justify-center mt-8">
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

              <!-- Invitations table -->
              <div class="text-center mt-8">
                <h2 class="text-2xl font-bold mb-4">Pending Invitations</h2>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full table-auto">
                  <thead>
                    <tr class="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-left">Email</th>
                      <th class="py-3 px-6 text-left">Role</th>
                      <th class="py-3 px-6 text-left">Sent On</th>
                      <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="invite in invites" :key="invite.id" class="bg-white border-b border-gray-200 text-gray-700">
                      <td class="py-3 px-6 text-left">{{ invite.email }}</td>
                      <td class="py-3 px-6 text-left">Org Admin</td>
                      <td class="py-3 px-6 text-left">{{ creationTimeToDateString(invite.metadata.creationTime) }}</td>
                      <td class="py-3 px-6 text-center">
                        <button
                          @click="inviteUser(invite.email)"
                          class="text-blue-500 hover:text-blue-700 mr-4"
                          title="Resend Invite"
                        >
                          <font-awesome-icon icon="envelope" />
                        </button>
                        <button
                          @click="cancelInvite(invite.id)"
                          class="text-red-500 hover:text-red-700"
                          title="Delete Invite"
                        >
                          <font-awesome-icon icon="trash" />
                        </button>
                      </td>
                    </tr>
                    <!-- Show this when there are no invites -->
                    <tr v-if="invites.length === 0 && !invitesLoading" class="bg-white">
                      <td colspan="5" class="py-6 text-center text-gray-500">
                        No pending invitations found.
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="invitesLoading" class="flex items-center justify-center mt-8">
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

              <!-- Page Loading Spinner -->
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
