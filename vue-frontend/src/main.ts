import { createApp } from "vue";
import { createPinia } from "pinia";
import { WristbandAuthStore } from "@wristband/vue-client-auth"
import FontAwesomeIcon from './font-awesome';
import { router } from "./router";
import App from "./App.vue";
import './css/style.css';

const init = async () => {
  const pinia = createPinia();
  const app = createApp(App);
  app.use(pinia);
  // Now we can set up the router and mount the app
  app.component('font-awesome-icon', FontAwesomeIcon);
  app.use(router);
  app.mount('#app');
  const wristbandAuth = WristbandAuthStore(pinia); 
  await wristbandAuth.setConfig({
    loginUrl: '/api/auth/login',
    logoutUrl: '/api/auth/logout',
    sessionUrl: '/api/v1/session',
    tokenUrl: '/api/v1/token',
  });
  await wristbandAuth.fetchSession();
};

init();
