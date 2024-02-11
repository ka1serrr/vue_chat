import { createRouter, createWebHistory } from "vue-router";

const RegisterPage = () => import("@/pages/AuthPage.vue");

const routes = [
  {
    path: "/",
    name: "register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
