<script setup lang="ts">
type Props = {
  label?: string;
  className?: string;
  error?: string;
};

defineProps<Props>();
</script>
<template>
  <div class="flex flex-col items-start" :class="className">
    <label v-if="label" class="text-main-white text-small block mb-1" :class="{ 'text-red-500': error }">{{
      label
    }}</label>
    <input
      v-bind="$attrs"
      type="file"
      class="file-input file-input-bordered file-input-primary"
      :class="{ 'file-input-error': error }"
    />

    <span v-if="error" class="text-error text-xl">This field is required</span>
  </div>
</template>
