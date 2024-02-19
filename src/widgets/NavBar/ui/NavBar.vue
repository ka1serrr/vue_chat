<script setup lang="ts">
import { UserProfilePhoto } from "@/entities";
import { Heading, userStore } from "@/shared";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase.config";

const user = userStore();
</script>

<template>
  <div class="flex items-center justify-between p-layout border-b border-secondary">
    <heading heading-size="sm">My chat</heading>
    <div class="flex items-center gap-2">
      <UserProfilePhoto :profile-photo="user.user?.photoURL" />
      <span
        @click="signOut(auth)"
        class="block text-2xl cursor-pointer active:text-slate-200 transition-colors duration-150"
        >{{ user.user?.displayName }}</span
      >
    </div>
  </div>
</template>
