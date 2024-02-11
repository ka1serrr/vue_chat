<script setup lang="ts">
type Props = {
  id: string;
  label?: string;
  modelValue?: string;
  error?: string;
};

withDefaults(defineProps<Props>(), {});
const modelValue = defineModel();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="my-2">
    <label class="" v-if="label" :for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      v-model="modelValue"
      type="text"
      :id="id"
      class="input input-bordered input-primary"
      :class="{ 'input-warning': error }"
    />
    <div v-if="error" class="text-red-500 font-bold text-xl">
      {{ error }}
    </div>
  </div>
</template>
