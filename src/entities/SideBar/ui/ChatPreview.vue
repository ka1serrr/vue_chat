<script setup lang="ts">
import type { TChatPreview } from "@/shared";
import { UserProfilePhoto } from "@/entities";

type Props = {
  userPreview: TChatPreview;
  id: string;
};

defineProps<Props>();
</script>

<template>
  <article class="flex items-center gap-1 w-full p-layout hover:bg-accent-content/20 transition-colors cursor-pointer">
    <UserProfilePhoto :profile-photo="userPreview.photoUrl" class="w-12 h-12" />
    <div>
      <span class="block text-white font-bold text-lg capitalize">{{ userPreview.displayName }}</span>
      <span class="block italic text-sm">{{ userPreview.lastMessage }}</span>
    </div>
  </article>
</template>
