<script setup lang="ts">
import { ChatPreviews, NavBar } from "@/widgets";
import { SearchUser } from "@/features";
</script>

<template>
  <div class="max-h-[600px] h-full bg-neutral rounded-tl-3xl overflow-y-auto">
    <NavBar />
    <SearchUser />
    <ChatPreviews />
  </div>
</template>
