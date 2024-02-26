import { defineStore } from "pinia";
import type { TUser } from "@/shared";

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
