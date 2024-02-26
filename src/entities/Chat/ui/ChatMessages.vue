<script setup lang="ts">
import { currentChatStore, useGetMessages } from "@/widgets";
import ChatMessage from "@/entities/Chat/ui/ChatMessage.vue";
import { Loader, userStore } from "@/shared";
import { computed, nextTick, onMounted, onUpdated, ref, watch } from "vue";
import { inputMessageStore } from "@/features";

useGetMessages();
const currentChatStoreState = currentChatStore();
const currentUser = userStore();

const sortedMessages = computed(() => {
  return currentChatStoreState.messages?.sort((a, b) => a.date.seconds - b.date.seconds);
});

const lastMessage = ref();

watch(
  [sortedMessages, () => currentChatStoreState.messages, () => currentChatStoreState.isLoading],
  async () => {
    if (lastMessage.value) {
      await nextTick();
      lastMessage.value.scrollIntoView();
    }
  },
  { immediate: true },
);
</script>
<template>
  <div class="bg-neutral/40 p-layout h-[calc(100%-105px)] overflow-y-auto">
    <Loader v-if="currentChatStoreState.isLoading" />
    <ChatMessage
      v-else
      v-for="message in sortedMessages"
      :message="message"
      :user="currentChatStoreState.user"
      :current-user="currentUser.user"
      :key="message"
    />
    <div class="invisible" ref="lastMessage"></div>
  </div>
</template>
