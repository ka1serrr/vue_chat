import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "@/shared";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase.config";
import { loadingStore } from "@/shared/libs/loadingStore";
import { getUserState } from "@/app/useCheckAuth";

const RegisterPage = () => import("@/pages/RegisterPage.vue");
const LoginPage = () => import("@/pages/LoginPage.vue");
const HomePage = () => import("@/pages/HomePage.vue");
const LeftSidebar = () => import("@/shared/layouts/LayoutSideBar.vue");

const routes = [
  {
    path: "/",
    name: "home",
    components: { default: HomePage, LeftSidebar },
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

router.beforeEach(async (to, from, next) => {
  const user = userStore();
  const loadingStatus = loadingStore();
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);
  const requireUnauth = to.matched.some((record) => record.meta.requireUnauth);

  loadingStatus.loading = true;
  const isAuth = await getUserState();
  if (await isAuth) {
    await user.setUser(isAuth);
  }
  if (requireAuth && !isAuth) {
    next("/login");
  } else if (requireUnauth && isAuth) {
    next("/");
  } else next();
});

router.afterEach(() => {
  const loadingStatus = loadingStore();
  loadingStatus.loading = false;
});

export default router;
