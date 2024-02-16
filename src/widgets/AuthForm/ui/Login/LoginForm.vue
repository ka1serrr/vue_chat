<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";

import { BaseInput, Heading, transformError } from "@/shared";
import { reactive, ref } from "vue";
import type { TLogin } from "@/widgets";
import { Redirect } from "@/entities";
import { useVuelidate } from "@vuelidate/core";
import { validateRules } from "./validateRules";
import { auth } from "@/app/firebase.config";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const formState = reactive<TLogin>({
  email: "",
  password: "",
});

const isLoading = ref<boolean>(false);
const toast = useToast();

const v$ = useVuelidate(validateRules, formState);

const router = useRouter();

const handleSubmit = async () => {
  try {
    await signInWithEmailAndPassword(auth, formState.email, formState.password);
    toast.success("You are successfully logged in");
    await router.push({ name: "home" });
  } catch (e) {
    toast.error(transformError(e));
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="center h-full w-full">
    <form @submit.prevent="handleSubmit" class="form">
      <heading>Login</heading>
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
