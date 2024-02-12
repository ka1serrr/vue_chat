<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Loader } from "@/shared";
const RegistrationForm = defineAsyncComponent({
  loader: () => import("@/widgets/AuthForm/ui/Registration/RegistrationForm.vue"),
  loadingComponent: Loader,
  delay: 200,
});
</script>

<template>
  <RegistrationForm form-type="Registration" />
</template>
