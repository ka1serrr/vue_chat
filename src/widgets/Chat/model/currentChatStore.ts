import { defineStore } from "pinia";
import { combineIds, userStore } from "@/shared";
import type { TChatPreview, TMessage } from "@/shared";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase.config";

interface State {
  activeChatId: string | null;
  user: TChatPreview | null;
  messages: TMessage[] | null;
  isLoading: boolean;
  isError: boolean;
}

export const currentChatStore = defineStore("currentChat", {
  state: (): State => ({
    activeChatId: null,
    user: null,
    messages: null,
    isLoading: false,
    isError: false,
  }),
  actions: {
    changeUser(user: TChatPreview) {
      const currentUserState = userStore();
      this.user = user;
      if (currentUserState.user) {
        this.activeChatId = combineIds(currentUserState.user.uid, user.uid);
      }
    },
    async getChatMessages() {
      this.isLoading = true;
      if (!this.activeChatId) return;
      try {
        await onSnapshot(doc(db, "chats", this.activeChatId), (doc) => {
          if (doc.exists()) {
            this.messages = doc.data().messages;
          }
        });
      } catch (e) {
      } finally {
        this.isLoading = false;
      }
    },
  },
});
