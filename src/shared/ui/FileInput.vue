<script setup lang="ts">
type Props = {
  label?: string;
  className?: string;
};

defineProps<Props>();
</script>
<template>
  <div class="flex flex-col items-start" :class="className">
    <label v-if="label" class="text-main-white text-small block mb-1">{{ label }}</label>
    <input v-bind="$attrs" type="file" class="file-input file-input-bordered file-input-primary" />
  </div>
</template>
