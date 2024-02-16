<script setup lang="ts">
type Props = {
  profilePhoto: string;
};

defineProps<Props>();
</script>
<template>
  <div class="rounded-3xl object-contain h-10 w-10 overflow-hidden" v-bind="$attrs">
    <img :src="profilePhoto" alt="This is profile photo" class="w-full h-full" />
  </div>
</template>
