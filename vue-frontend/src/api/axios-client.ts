import axios from "axios";
import { getActivePinia } from "pinia";
import { router } from "../router";
import { nextTick } from "vue";

const baseURL = "http://localhost:6001/api";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const apiClient = axios.create({
  baseURL,
  headers,
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
      await nextTick();
    }

    // Redirect the user to go log in again
    router.push("/login");
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(undefined, unauthorizedAccessInterceptor);

const apiClientWithJwt = axios.create({
  baseURL,
  headers,
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-TOKEN",
  withXSRFToken: true,
  withCredentials: true,
});

export { apiClient, apiClientWithJwt };
