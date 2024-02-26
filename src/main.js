import "@/assets/scss/main.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "../router";
import { createPinia } from "pinia";
import Vue3Lottie from "vue3-lottie";
import Vue3TouchEvents from "vue3-touch-events";
import { VueResponsiveness } from "vue-responsiveness";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueResponsiveness, {
    small: 0,
    medium: 768,
    large: 1024,
  })
  .use(Vue3Lottie)
  .use(Vue3TouchEvents)
  .mount("#app");
