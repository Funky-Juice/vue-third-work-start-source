import { createApp } from "vue";
import { createPinia } from "pinia";
import "animate.css";

import App from "./App.vue";
import router from "./router";

import { clickOutside } from "./common/directives";

const app = createApp(App);

app.directive("click-outside", clickOutside);

app.use(router);

app.use(createPinia());

app.mount("#app");
