<script setup lang="ts">
import { reactive, ref } from "vue";
import { email, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import BaseInput from "@/shared/ui/BaseInput.vue";

type Props = {
  formType: "Login" | "Registration";
};

defineProps<Props>();

const formState = reactive({
  email: "",
  password: "",
  displayName: "",
});

const validateRules = {
  email: { required, email },
  displayName: { required, minLength: minLength(2) },
  password: { required, minLength: minLength(6) },
};

const text = ref("");

const v$ = useVuelidate(validateRules, formState);
</script>

<template>
  <div class="center h-full">
    <div class="flex flex-col items-center w-1/3 border rounded-xl border-slate-600 p-10">
      <h1 class="text-3xl font-bold mb-5">{{ text }}</h1>
      <BaseInput
        class="mb-0.5"
        v-model="formState.email"
        id="email"
        type="email"
        placeholder="Enter your email"
        :error="v$.email.$error"
      />

      <BaseInput
        class="mb-0.5"
        v-model="formState.password"
        id="email"
        type="password"
        placeholder="Enter your password"
        :error="v$.password.$error"
      />
      <BaseInput
        class="mb-0.5"
        v-model="formState.displayName"
        id="email"
        placeholder="Enter your display name"
        :error="v$.displayName.$error"
      />
    </div>
  </div>
</template>
