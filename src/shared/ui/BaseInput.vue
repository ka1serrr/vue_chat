<script setup lang="ts">
type Props = {
  id: string;
  label?: string;
  modelValue?: string;
  error?: string;
  className?: string;
};

withDefaults(defineProps<Props>(), {});
const modelValue = defineModel();
</script>

<template>
  <div class="my-2" :class="className">
    <label class="" v-if="label" :for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      v-model="modelValue"
      :id="id"
      class="input input-bordered input-primary"
      :class="{ 'input-error': error }"
    />

    <span v-if="error" class="text-error text-xl">
      {{ error }}
    </span>
  </div>
</template>
