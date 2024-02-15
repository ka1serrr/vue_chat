import { userStore } from "@/shared";
import { onMounted, onUnmounted } from "vue";
import { auth } from "@/app/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import router from "@/app/router";
export const useCheckAuth = async () => {
  const store = userStore();

  const login = async () => {
    return onAuthStateChanged(auth, (user) => {
      store.setUser(user);
    });
  };

  onMounted(() => {
    login();
  });

  return { login };
};
