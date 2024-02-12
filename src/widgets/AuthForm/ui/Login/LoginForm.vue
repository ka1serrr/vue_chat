<script setup lang="ts">
import { BaseInput } from "@/shared";
import { reactive, ref } from "vue";
import type { TLogin } from "@/widgets";
import { Redirect } from "@/entities";
import { useVuelidate } from "@vuelidate/core";
import { validateRules } from "./validateRules";

const formState = reactive<TLogin>({
  email: "",
  password: "",
});

const isLoading = ref<boolean>(false);

const v$ = useVuelidate(validateRules, formState);
</script>

<template>
  <main class="center h-full">
    <form @submit.prevent="" class="form">
      <BaseInput
        class="w-full"
        v-model="formState.email"
        class-name="mb-0.5"
        id="email"
        type="email"
        placeholder="Enter your email"
        :disabled="isLoading"
        :error="v$.email?.$errors[0]?.$message"
      />
      <BaseInput
        class="w-full"
        v-model="formState.password"
        class-name="mb-0.5"
        id="password"
        type="password"
        placeholder="Enter your password"
        :disabled="isLoading"
        :error="v$.password?.$errors[0]?.$message"
      />
      <button
        type="submit"
        class="btn btn-primary w-full mt-1.5"
        :disabled="isLoading"
        :class="{ 'btn-error': v$.$error }"
      >
        Sign in
      </button>

      <Redirect link="/register" />
    </form>
  </main>
</template>
