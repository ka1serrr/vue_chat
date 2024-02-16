<script setup lang="ts">
import { UserProfilePhoto } from "@/entities";
import { Heading, userStore } from "@/shared";

const user = userStore();
</script>

<template>
  <div class="flex items-center justify-between bg-neutral p-layout rounded-tl-3xl">
    <heading heading-size="sm">My chat</heading>
    <div class="flex items-center gap-2">
      <UserProfilePhoto :profile-photo="user.user?.photoURL" />
      <span class="block text-2xl">{{ user.user?.displayName }}</span>
    </div>
  </div>
</template>
