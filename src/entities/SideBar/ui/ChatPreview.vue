<script setup lang="ts">
import type { TChatPreview } from "@/shared";
import { UserProfilePhoto } from "@/entities";

type Props = {
  userPreview: TChatPreview;
};

defineProps<Props>();
</script>

<template>
  <article class="flex w-full p-layout">
    <UserProfilePhoto :profile-photo="userPreview.photoUrl" class="w-12 h-12" />
    <div>
      <span class="block text-white font-bold text-base">{{ userPreview.displayName }}</span>
      <span class="block italic text-sm">{{ userPreview.lastMessage }}</span>
    </div>
  </article>
</template>
