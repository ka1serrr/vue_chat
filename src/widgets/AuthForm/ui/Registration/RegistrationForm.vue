<script setup lang="ts">
import { computed, reactive, ref as vueRef } from "vue";
import { validateRules } from "./validateRueles";
import { useVuelidate } from "@vuelidate/core";
import { BaseInput, FileInput } from "@/shared";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref as fbRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "@/app/firebase.config";
import { useToast } from "vue-toastification";

type Props = {
  formType: "Login" | "Registration";
};

const props = defineProps<Props>();

const buttonText = computed(() => (props.formType === "Login" ? "Login" : "Register"));

const formState = reactive({
  email: "",
  password: "",
  displayName: "",
});

const toast = useToast();

const v$ = useVuelidate(validateRules, formState);

const avatar = vueRef<Blob | null>(null);

const changeAvatar = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target?.files;

  if (files) {
    avatar.value = files[0];
  }
};

const handleSubmit = async () => {
  const isValidated = await v$.value.$validate();

  if (!isValidated) {
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, formState.email, formState.password);

    await updateProfile(res.user, {
      displayName: formState.displayName,
    });

    if (avatar.value) {
      const storageRef = fbRef(storage, formState.displayName);
      const uploadTask = uploadBytesResumable(storageRef, avatar.value);

      uploadTask.on(
        "state_changed",
        () => {},
        (error: unknown) => {
          toast.error("An error occurred on the server");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            await updateProfile(res.user, {
              photoURL: downloadUrl,
            });
          });
        },
      );
    }

    toast.success("ура");
  } catch (e) {
    toast.error("An error occurred on the server");
  }
};
</script>

<template>
  <div class="center h-full">
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col items-center w-1/3 border rounded-xl border-slate-600 p-10"
    >
      <h1 class="text-3xl font-bold mb-5">{{ formType }}</h1>
      <BaseInput
        class="mb-0.5 w-full"
        v-model="formState.email"
        id="email"
        type="email"
        placeholder="Enter your email"
        :error="v$.email?.$errors[0]?.$message"
      />

      <BaseInput
        class="mb-0.5 w-full"
        v-model="formState.password"
        id="password"
        type="password"
        placeholder="Enter your password"
        :error="v$.password?.$errors[0]?.$message"
      />
      <BaseInput
        class="w-full mb-1.5"
        v-model="formState.displayName"
        id="displayName"
        placeholder="Enter your display name"
        :error="v$.displayName?.$errors[0]?.$message"
      />

      <FileInput @change="changeAvatar" class="w-full" accept="image/png, image/jpeg" label="Choose your avatar" />
      <button type="submit" class="btn btn-primary w-full mt-1.5">{{ buttonText }}</button>
    </form>
  </div>
</template>
