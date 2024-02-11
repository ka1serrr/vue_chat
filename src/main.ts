import "./main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

import router from "@/app/router";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast);

app.mount("#app");
