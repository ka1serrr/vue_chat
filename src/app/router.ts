import { createRouter, createWebHistory } from "vue-router";

const RegisterPage = () => import("@/pages/RegisterPage.vue");
const LoginPage = () => import("@/pages/LoginPage.vue");
const HomePage = () => import("@/pages/HomePage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
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
  history: createWebHistory(),
  routes,
});

export default router;
