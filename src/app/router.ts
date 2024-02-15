import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "@/shared";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase.config";

const RegisterPage = () => import("@/pages/RegisterPage.vue");
const LoginPage = () => import("@/pages/LoginPage.vue");
const HomePage = () => import("@/pages/HomePage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      requireAuth: true,
      requireUnauth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      requireAuth: false,
      requireUnauth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      requireAuth: false,
      requireUnauth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = userStore();
  const requireAuth = to.meta.requireAuth;
  const requireUnauth = to.meta.requireUnauth;
  onAuthStateChanged(auth, (user) => {
    store.setUser(user);
    if (requireAuth) {
      if (user) {
        next();
      } else {
        next("/login");
      }
    } else if (requireUnauth) {
      if (user) {
        next("/");
      } else {
        next();
      }
    }
  });
});

export default router;
