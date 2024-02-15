<script setup lang="ts">
type Props = {
  headingSize?: "lg";
};
withDefaults(defineProps<Props>(), {
  headingSize: "lg",
});
</script>

<template>
  <h2
    v-bind="$attrs"
    :class="{
      'text-3xl font-bold mb-5 uppercase': headingSize === 'lg',
    }"
  >
    <slot></slot>
  </h2>
</template>
