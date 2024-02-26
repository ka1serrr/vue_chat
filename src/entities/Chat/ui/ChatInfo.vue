<script setup lang="ts">
import { Heading } from "@/shared";
import { UserProfilePhoto } from "@/entities";

type Props = {
  displayName: string;
  photoUrl: string;
};
defineProps<Props>();
</script>
<template>
  <div class="flex items-center justify-between min-h-[56px] bg-neutral-content/10 p-layout rounded-tr-3xl">
    <heading heading-size="sm">{{ displayName }}</heading>
    <UserProfilePhoto :profile-photo="photoUrl" />
  </div>
</template>
