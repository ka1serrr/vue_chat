<script setup lang="ts">
import { computed } from "vue";

type Props = {
  link: "/login" | "/register";
};

const props = defineProps<Props>();

const redirectText = computed(() => {
  return props.link === "/login" ? "Login" : "Register";
});

const ifHaveAnAccount = computed(() => {
  return props.link === "/login" ? "Already have" : "Do not have";
});
</script>

<template>
  <router-link class="mt-2" :to="link"
    ><span class="text-main-pink"> {{ ifHaveAnAccount }}</span> an account? You may
    <span class="text-main-pink">{{ redirectText }}</span> here.</router-link
  >
</template>
