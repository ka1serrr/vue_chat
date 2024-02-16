import { userStore } from "@/shared";
import type { TUser } from "@/shared";
import { onMounted, onUnmounted } from "vue";
import { auth } from "@/app/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import router from "@/app/router";
export const useAuthState = async () => {
  const store = userStore();

  let unsubscribe: any;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(auth, (data) => {
      store.setUser(data);
    });
  });
  onUnmounted(() => unsubscribe());
};

export const getUserState = async (): Promise<TUser> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, resolve, reject);
  });
};
