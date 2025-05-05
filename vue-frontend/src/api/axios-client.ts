import axios from "axios";
import { getActivePinia } from 'pinia';

import { router } from "../router";
import { useWristbandStore } from '../stores/wristbandStore';
import { nextTick } from "vue";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  withXSRFToken: true,
  withCredentials: true,
});

/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
// Any HTTP 401s should trigger the user to go log in again.  This happens when their
// session cookie has expired and/or the CSRF cookie/header are missing in the request.
const unauthorizedAccessInterceptor = async (error) => {
  if (error.response && error.response.status === 401) {
    // Ensure that Pinia is active
    const pinia = getActivePinia();
    if (pinia) {
      const wristbandStore = useWristbandStore(pinia);
      await wristbandStore.clearSession();
      await nextTick();
    }
    
    // Redirect to home page so user can log in again
    router.push("/home");
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(undefined, unauthorizedAccessInterceptor);

export { apiClient };
