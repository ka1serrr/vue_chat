<script setup lang="ts">
import type { TChatPreview, TMessage, TUser } from "@/shared";
import { computed } from "vue";

type Props = {
  user: TChatPreview;
  message: TMessage;
  currentUser: TUser;
};

const props = defineProps<Props>();

const userPhoto = computed(() => {
  return props.message.senderId === props?.currentUser?.uid ? props.currentUser?.photoURL : props.user?.photoUrl;
});
</script>
<template>
  <div class="chat chat-start" :class="{ 'chat-end': message.senderId === currentUser?.uid }">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="userPhoto as string" alt="User Photo" />
      </div>
    </div>
    <!--    <div class="chat-header">-->
    <!--      Obi-Wan Kenobi-->
    <!--      <time class="text-xs opacity-50">12:45</time>-->
    <!--    </div>-->
    <div class="chat-bubble">{{ message.text }}</div>
  </div>
</template>
