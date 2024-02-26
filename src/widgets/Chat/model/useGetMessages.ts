import { onMounted, onUnmounted, reactive, watch, watchEffect } from "vue";
import { currentChatStore } from "@/widgets/Chat/model/currentChatStore";

export const useGetMessages = () => {
  const currentChatStoreState = currentChatStore();
  watch(
    () => currentChatStoreState.activeChatId,
    async () => {
      await currentChatStoreState.getChatMessages();
    },
    {
      immediate: true,
    },
  );
};
