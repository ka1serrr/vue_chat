<script setup lang="ts">
import { computed, reactive, ref as vueRef } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { BaseInput, FileInput, Heading, transformError } from "@/shared";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref as fbRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "@/app/firebase.config";

import { useToast } from "vue-toastification";
import { email, minLength, required, requiredIf } from "@vuelidate/validators";
import type { TRegister } from "@/widgets";
import { Redirect } from "@/entities";
import { validateRules } from "@/widgets/AuthForm/ui/Registration/validateRules";
import { useRouter } from "vue-router";

const formState = reactive<TRegister>({
  email: "",
  password: "",
  displayName: "",
  avatar: null,
});

const isLoading = vueRef<boolean>(false);

const toast = useToast();
const router = useRouter();

const v$ = useVuelidate(validateRules(formState.avatar), formState);

const changeAvatar = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target?.files;

  if (files) {
    formState.avatar = files[0];
  }
};

const handleSubmit = async () => {
  const isValidated = await v$.value.$validate();

  if (!isValidated) {
    return;
  }

  try {
    isLoading.value = true;
    const res = await createUserWithEmailAndPassword(auth, formState.email, formState.password);

    await updateProfile(res.user, {
      displayName: formState.displayName,
    });

    if (formState.avatar) {
      const storageRef = fbRef(storage, formState.displayName);
      const uploadTask = uploadBytesResumable(storageRef, formState.avatar as unknown as Blob);

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
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: formState.displayName,
              email: formState.email,
              photoURL: downloadUrl,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        },
      );
    }

    toast.success("You are successfully registered");
    await router.push({ name: "home" });
  } catch (e) {
    toast.error(transformError(e));
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="center w-full h-full">
    <form @submit.prevent="handleSubmit" class="form">
      <heading>Registration</heading>
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
      <BaseInput
        class="w-full"
        v-model="formState.displayName"
        class-name="mb-1.5"
        id="displayName"
        placeholder="Enter your display name"
        :disabled="isLoading"
        :error="v$.displayName?.$errors[0]?.$message"
      />

      <FileInput
        @change="changeAvatar"
        :disabled="isLoading"
        class="w-full"
        accept="image/png, image/jpeg"
        label="Choose your avatar"
        :error="v$.avatar?.$errors[0]?.$uid"
      />
      <button
        type="submit"
        class="btn btn-primary w-full mt-1.5 capitalize"
        :disabled="isLoading"
        :class="{ 'btn-error': v$.$error }"
      >
        Register
      </button>
      <Redirect link="/login" />
    </form>
  </main>
</template>
