<script setup lang="ts">
import { inputMessageStore, sendMessage } from "@/features";
import { ref } from "vue";

const textMessageState = inputMessageStore();

const handleSend = () => {
  if (textMessageState.messageText.length === 0) {
    return;
  }
  sendMessage(textMessageState.messageText);
  textMessageState.messageText = "";
};
</script>
<template>
  <input
    @keyup.enter="handleSend"
    v-model="textMessageState.messageText"
    type="text"
    class="h-12 bg-white p-layout w-full text-base-300"
    placeholder="Enter your message"
  />
</template>
