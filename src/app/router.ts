import { createRouter, createWebHistory } from "vue-router";

const RegisterPage = () => import("@/pages/RegisterPage.vue");
const LoginPage = () => import("@/pages/LoginPage.vue");

const routes = [
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
