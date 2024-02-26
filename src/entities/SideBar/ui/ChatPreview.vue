<script setup lang="ts">
import type { TChatPreview } from "@/shared";
import { UserProfilePhoto } from "@/entities";
import { currentChatStore } from "@/widgets/Chat/model";

type Props = {
  userPreview: TChatPreview;
  id: string;
};

const currentChatStoreState = currentChatStore();

defineProps<Props>();
</script>

<template>
  <article
    @click="currentChatStoreState.changeUser(userPreview)"
    @keyup.enter="currentChatStoreState.changeUser(userPreview)"
    class="flex items-center gap-1 w-full p-layout hover:bg-accent-content/20 transition-colors cursor-pointer"
    tabindex="0"
  >
    <UserProfilePhoto :profile-photo="userPreview.photoUrl" class="w-12 h-12" />
    <div>
      <span class="block text-white font-bold text-lg capitalize">{{ userPreview.displayName }}</span>
      <span class="block italic text-sm">{{ userPreview.lastMessage }}</span>
    </div>
  </article>
</template>
