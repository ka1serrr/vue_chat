<script setup lang="ts">
import { RouterView } from "vue-router";
import { loadingStore } from "@/shared/libs/loadingStore";
import { Loader } from "@/shared";
const store = loadingStore();
</script>

<template>
  <div class="center h-full w-full">
    <router-view class="min-w-[350px]" name="LeftSidebar" />
    <div class="center h-full" v-if="store.loading">
      <Loader />
    </div>
    <router-view class="min-w-[500px]" v-else-if="!store.loading" />
  </div>
</template>

<style>
html,
#app,
body {
  height: 100%;
}
</style>
