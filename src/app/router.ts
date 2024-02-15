import { createRouter, createWebHistory } from "vue-router";

const RegisterPage = () => import("@/pages/RegisterPage.vue");
const LoginPage = () => import("@/pages/LoginPage.vue");
const HomePage = () => import("@/pages/HomePage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      isAuth: true,
      inNotAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      isAuth: false,
      isNotAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      isAuth: false,
      isNotAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {});

export default router;
