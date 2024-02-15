import { userStore } from "@/shared";
import { onMounted, onUnmounted } from "vue";
import { auth } from "@/app/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
export const useCheckAuth = () => {
  const store = userStore();

  const login = () => {
    return onAuthStateChanged(auth, (user) => {
      store.setUser(user);
    });
  };

  onMounted(() => {
    login();
  });
};
