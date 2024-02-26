import { defineStore } from "pinia";
import type { TChatPreview } from "@/shared";
import { getDocs } from "firebase/firestore";
import { searchUser } from "@/features";

interface Store {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  user: TChatPreview | null;
  username: string;
}

export const searchUserStore = defineStore("searchUser", {
  state: (): Store => ({
    isError: false,
    isLoading: false,
    errorMessage: "",
    user: null,
    username: "",
  }),
  actions: {
    async setChats() {
      if (this.username.length === 0) {
        return;
      }

      const query = searchUser(this.username);
      try {
        this.isLoading = true;
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
          // @ts-ignore
          this.user = doc.data();
        });
      } catch (e) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
    reset() {
      this.user = null;
      this.username = "";
    },
  },
});
