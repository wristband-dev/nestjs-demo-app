import { nextTick, reactive, ref } from "vue";
import { defineStore } from "pinia";

import { apiClient } from "../api/axios-client";

const unauthenticatedState = { isAuthenticated: false, isLoading: true, roles: [] };
const wristbandDefaultState = ref({ ...unauthenticatedState });

export const useWristbandStore = defineStore("wristband", () => {
  const state = reactive({ wristband: wristbandDefaultState });

  const setState = (newState) => {
    try {
      const wristbandState = { ...state.wristband, ...newState };
      state.wristband = wristbandState;
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const validateAndGetSession = async () => {
    try {
      const authStateResponse = await apiClient.get("/auth/auth-state");
      if (authStateResponse.status !== 200 || !authStateResponse.data.isAuthenticated) {
        setState({ isAuthenticated: false, isLoading: false });
        await nextTick();
        return;
      }

      const sessionResponse = await apiClient.get("/session");
      if (sessionResponse.status !== 200) {
        setState({ isAuthenticated: false, isLoading: false });
        await nextTick();
        return;
      }

      setState({ ...sessionResponse.data, isAuthenticated: true, isLoading: false });      
      await nextTick();
    } catch (error) {
      console.error("Error validating session:", error);
      setState({ isAuthenticated: false, isLoading: false });
    }
  };

  const clearSession = async () => {
    try {
      setState({ isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  return { clearSession, setState, validateAndGetSession, state };
});
