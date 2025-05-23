import axios from "axios";
import { getActivePinia } from 'pinia';

import { router } from "../router";
import { useWristbandStore } from '../stores/wristbandStore';
import { nextTick } from "vue";

const apiClient = axios.create({
  baseURL: 'http://localhost:6001/api/v1',
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-TOKEN",
  withXSRFToken: true,
  withCredentials: true,
});

/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
// Any HTTP 401/403 should trigger the user to go log in again.  This happens when their
// session cookie has expired and/or the CSRF cookie/header are missing in the request.
const unauthorizedAccessInterceptor = async (error) => {
  if (error.response && [401, 403].includes(error.response.status)) {
    // Ensure that Pinia is active
    const pinia = getActivePinia();
    if (pinia) {
      const wristbandStore = useWristbandStore(pinia);
      await wristbandStore.clearSession();
      await nextTick();
    }
    
    // Redirect the user to go log in again
    router.push("/login");
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(undefined, unauthorizedAccessInterceptor);

export { apiClient };
