<script setup lang="ts">
import { computed, reactive, ref as vueRef } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { BaseInput, FileInput } from "@/shared";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref as fbRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { auth, db, storage } from "@/app/firebase.config";
import { useToast } from "vue-toastification";
import { email, minLength, required } from "@vuelidate/validators";

type Props = {
  formType: "Login" | "Registration";
};

const props = defineProps<Props>();

const buttonText = computed(() => (props.formType === "Login" ? "Login" : "Register"));

const formState = reactive({
  email: "",
  password: "",
  displayName: "",
  avatar: Blob,
});

const isLoading = vueRef<boolean>(false);

const toast = useToast();

const validateRules = {
  email: { required, email },
  displayName: { required, minLength: minLength(2) },
  password: { required, minLength: minLength(6) },
  avatar: {
    requiredIf: () => {
      return !!formState.avatar?.name;
    },
  },
};

const v$ = useVuelidate(validateRules, formState);

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
              email: formState.displayName,
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
  isLoading.value = false;
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
        :disabled="isLoading"
        :error="v$.email?.$errors[0]?.$message"
      />

      <BaseInput
        class="mb-0.5 w-full"
        v-model="formState.password"
        id="password"
        type="password"
        placeholder="Enter your password"
        :disabled="isLoading"
        :error="v$.password?.$errors[0]?.$message"
      />
      <BaseInput
        class="w-full mb-1.5"
        v-model="formState.displayName"
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
      />
      <button type="submit" class="btn btn-primary w-full mt-1.5" :disabled="isLoading">{{ buttonText }}</button>
    </form>
  </div>
</template>
