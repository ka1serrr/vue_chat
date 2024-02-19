<script setup lang="ts">
import { searchUserStore } from "@/features";

const searchUserState = searchUserStore();
</script>

<template>
  <div v-if="searchUserState.username"></div>
</template>
