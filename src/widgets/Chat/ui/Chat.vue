<script setup lang="ts">
import { ChatInfo, ChatMessages, NoActiveChat } from "@/entities";
import { InputSendMessage } from "@/features";
import { currentChatStore } from "@/widgets/Chat/model";

const currentChatStoreState = currentChatStore();
</script>
<template>
  <section v-if="currentChatStoreState.user" class="h-full max-h-[600px]">
    <ChatInfo :display-name="currentChatStoreState.user.displayName" :photo-url="currentChatStoreState.user.photoUrl" />
    <ChatMessages />
    <InputSendMessage />
  </section>
  <section v-else class="h-full max-h-[600px]">
    <NoActiveChat />
  </section>
</template>
