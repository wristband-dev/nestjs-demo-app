<script setup>
import { ref } from "vue";
import { apiClient } from "../api/axios-client";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import PageHeader from "../components/PageHeader.vue";
import ResponseBox from "../components/ResponseBox.vue";
import TabSelectorButton from "../components/TabSelectorButton.vue";
import { useWristbandStore } from "../stores/wristbandStore";
import { useWristbandToken } from "../composables/useWristbandToken";

const { state } = useWristbandStore();
const { getToken, error: tokenError, isLoading: tokenLoading } = useWristbandToken();

const activeTab = ref('cookie');
const cookieMessage = ref(null);
const tokenMessage = ref(null);
const cookieLoading = ref(false);

const handleHelloWithCookie = async () => {
  cookieLoading.value = true;
  try {
    cookieMessage.value = null;
    const response = await apiClient.get("/v1/hello-with-cookie");
    cookieMessage.value = response.data;
  } catch (error) {
    console.log(error);

    if (error.response && [401, 403].includes(error.response.status)) {
      cookieMessage.value = "Your session expired. Please log in again to continue.";
    } else {
      cookieMessage.value = "Something went wrong trying to say hello!";
    }
  } finally {
    cookieLoading.value = false;
  }
};

const handleHelloWithToken = async () => {
  try {
    tokenMessage.value = null;
    const token = await getToken();
    
    if (!token) {
      tokenMessage.value = "Unable to get access token. Please try logging in again.";
      return;
    }

    const response = await apiClient.get("/v1/hello-with-token", {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    tokenMessage.value = response.data;
  } catch (error) {
    console.log(error);

    if (error.response && [401, 403].includes(error.response.status)) {
      tokenMessage.value = "Your token expired. Please refresh your token or log in again.";
    } else {
      tokenMessage.value = "Something went wrong trying to say hello with token!";
    }
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-slate-900">
    <Header />

    <main class="grow pt-24 pb-12">
      <section class="mx-auto max-w-4xl px-6">
        <PageHeader 
          v-if="state.wristband.isAuthenticated" 
          class="my-12"
          title="This is an authenticated page!">
        </PageHeader>
        <PageHeader 
          v-else 
          class="my-12" 
          title="You're not authenticated.">
        </PageHeader>

        <div class="my-8">
          <!-- Loading State -->
          <div v-if="state.wristband.isLoading">
            <h2 class="text-xl font-semibold text-black dark:text-white">Loading...</h2>
          </div>

          <!-- Authenticated Content -->
          <div v-else-if="state.wristband.isAuthenticated" class="flex flex-col gap-2 w-full">
            <hr class="my-2 border-gray-200 dark:border-gray-700" />
            
            <!-- Tab Selector -->
            <div class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <TabSelectorButton
                title="API Route - Session Cookie"
                :isActive="activeTab === 'cookie'"
                @click="activeTab = 'cookie'"
              />
              <TabSelectorButton
                title="API Route - Access Token"
                :isActive="activeTab === 'token'"
                @click="activeTab = 'token'"
              />
            </div>

            <!-- Tab Content -->
            <div class="flex flex-col gap-2 w-full">
              <!-- Cookie Tab -->
              <div v-if="activeTab === 'cookie'" class="flex flex-col gap-4">
                <h2 class="font-bold text-md mb-1 text-black dark:text-white">Using Session Cookie From Browser</h2>
                <p class="my-2 text-black dark:text-white">
                  When the button below is clicked, the browser automatically sends the session cookie in the request to the API
                  route. The auth guard will protect this API using the SESSION strategy before allowing access.
                </p>
                
                <div class="flex justify-center">
                  <button
                    class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group dark:bg-gray-800 dark:text-white border border-pink-500 max-w-md w-full"
                    @click="handleHelloWithCookie"
                    :disabled="cookieLoading">
                    <span class="relative z-10">
                      {{ cookieLoading ? 'Loading...' : 'Test Hello World' }}
                    </span>
                    <span
                      class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"></span>
                  </button>
                </div>

                <ResponseBox 
                  v-if="cookieMessage" 
                  :message="cookieMessage" 
                />
              </div>

              <!-- Token Tab -->
              <div v-if="activeTab === 'token'" class="flex flex-col gap-4">
                <h2 class="font-bold text-md mb-1 text-black dark:text-white">Using Access Tokens From Browser</h2>
                <p class="my-2 text-black dark:text-white">
                  When the button below is clicked, the getToken() function will fetch and
                  cache the access token. Then, the access token is added to the Authorization header in the request to the API
                  route. The auth guard will protect this API using the JWT strategy before allowing access.
                </p>

                <div class="flex justify-center">
                  <button
                    class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group dark:bg-gray-800 dark:text-white border border-pink-500 max-w-md w-full"
                    @click="handleHelloWithToken"
                    :disabled="tokenLoading">
                    <span class="relative z-10">
                      {{ tokenLoading ? 'Loading...' : 'Test Hello World' }}
                    </span>
                    <span
                      class="absolute inset-0 w-full h-full bg-indigo-500 transition-transform duration-500 ease-out transform scale-0 group-hover:scale-100 dark:bg-white opacity-20 rounded-full"></span>
                  </button>
                </div>

                <ResponseBox 
                  v-if="tokenMessage" 
                  :message="tokenMessage" 
                />

                <ResponseBox 
                  v-if="tokenError" 
                  title="Token Error:" 
                  :message="tokenError" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
