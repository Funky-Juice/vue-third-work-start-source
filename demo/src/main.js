import { createApp } from "vue";
import { createPinia } from "pinia";
import "animate.css";

import App from "./App.vue";
import router from "./router";

import { getToken, removeToken } from "@/services/token-manager";
import { useAuthStore } from "@/stores";
import { clickOutside } from "./common/directives";

const app = createApp(App);

app.directive("click-outside", clickOutside);

app.use(router);

app.use(createPinia());

app.mount("#app");

// Проверяем, если пользователь уже вошёл в систему
const token = getToken();
if (token) {
  try {
    const authStore = useAuthStore();
    await authStore.getMe();
    await router.push("/");
  } catch (e) {
    removeToken();
    console.log(e);
  }
}
