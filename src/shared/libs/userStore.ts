import { defineStore } from "pinia";
import type { TUser } from "@/shared";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase.config";

interface State {
  user: TUser;
}
export const userStore = defineStore("user", {
  state: (): State => ({ user: null }),
  getters: {
    isAuth: (state) => state.user !== null,
  },
  actions: {
    setUser(user: TUser) {
      this.user = user;
    },
  },
});
