import { onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useWristbandStore } from '../stores/wristbandStore';

export const useAuthPopup = () => {
  const popupClosedInterval = ref<ReturnType<typeof setInterval> | null>(null);
  const authPopup = ref<Window | null>(null);

  const router = useRouter();
  const { validateAndGetSession } = useWristbandStore();

  const handleLoginPopupMessage = async (event) => {
    if (event.data.type === "login_success") {
      // Update the auth state and session data.
      await validateAndGetSession();

      // If desired, you can pass a return_url query param to your /login endpoint.
      // After the /callback endpoint completes, you can return to that location.
      if (event.data.returnUrl) {
        window.location = event.data.returnUrl;
      } else {
        router.push('/hello-world');
      }

      if (authPopup.value) {
        authPopup.value.close();
        authPopup.value = null;
      }
    }
  };

  const openAuthPopup = (isSignup = false) => {
    // Prevent opening a new popup if one is already open
    if (authPopup.value && !authPopup.value.closed) {
      authPopup.value.focus();
      return;
    }

    // Guard clause to prevent null access
    const windowTop = window.top as Window | null;
    if (!windowTop) {
      console.error('Unexpected access of window object!');
      return;
    }

    // Make sure the popup window is centered on the parent window
    const x = windowTop.outerWidth / 2 + windowTop.screenX - 250;
    const y = windowTop.outerHeight / 2 + windowTop.screenY - 325;
    const authUrl = `${process.env.VUE_APP_API_URL}/auth/${isSignup ? 'signup-with-popup' : 'login-with-popup'}`;
    authPopup.value = window.open(authUrl, 'PerfAI: Login', `width=500, height=650, left=${x}, top=${y}`);
    window.addEventListener("message", handleLoginPopupMessage);

    // Start checking if the popup is closed
    checkPopupClosed();
  };

  const checkPopupClosed = () => {
    popupClosedInterval.value = setInterval(() => {
      if (authPopup.value && authPopup.value.closed) {
        clearInterval(popupClosedInterval.value!);
        window.removeEventListener('message', handleLoginPopupMessage);
        authPopup.value = null;
        popupClosedInterval.value = null;
      }
    }, 1000);
  };

  onUnmounted(() => {
    // Clear the interval if it's still running
    if (popupClosedInterval.value) {
      clearInterval(popupClosedInterval.value);
      popupClosedInterval.value = null;
    }
    // Remove listener if the popup is not closed
    if (authPopup.value && !authPopup.value.closed) {
      window.removeEventListener('message', handleLoginPopupMessage);
      authPopup.value = null;
    }
  });

  return { openAuthPopup };
};
