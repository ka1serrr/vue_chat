<script setup lang="ts">
type Props = {
  headingSize?: "lg" | "sm";
};
withDefaults(defineProps<Props>(), {
  headingSize: "lg",
});
</script>

<template>
  <h2
    v-bind="$attrs"
    class="font-bold"
    :class="{
      'text-3xl mb-5 uppercase': headingSize === 'lg',
      'text-xl capitalize': headingSize === 'sm',
    }"
  >
    <slot></slot>
  </h2>
</template>
