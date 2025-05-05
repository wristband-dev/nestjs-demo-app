import { createApp } from "vue";
import { createPinia } from "pinia";

import FontAwesomeIcon from './font-awesome';
import { router } from "./router";
import App from "./App.vue";
import { useWristbandStore } from "./stores/wristbandStore";

import "./css/style.css";

const init = async () => {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.component('font-awesome-icon', FontAwesomeIcon);

  // Validate session before using the router
  const wristbandStore = useWristbandStore();
  try {
    await wristbandStore.validateAndGetSession();
  } catch (error) {
    // Redirect to home if session validation fails
    console.error("Error validating session:", error);
    router.push('/home');
  }

  // Now we can set up the router and mount the app
  app.use(router);
  app.mount('#app'); 
};

init();
