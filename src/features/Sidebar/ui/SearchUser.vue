<script setup lang="ts">
import { BaseInput, combineIds, Loader, userStore } from "@/shared";
import { searchChat, searchUserStore } from "@/features";
import { watch } from "vue";
import { useToast } from "vue-toastification";
import { UserProfilePhoto } from "@/entities";
import { getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase.config";

const store = searchUserStore();
const toast = useToast();
const userStoreState = userStore();

watch(
  () => store.isError,
  () => {
    toast.error("An error occurred on the server");
  },
);

const createChat = async () => {
  const combinedId = combineIds(userStoreState.user?.uid as string, store.chats?.uid as string);

  try {
    const res = await getDoc(doc(db, "chats", combinedId));
    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      if (userStoreState.user) {
        await updateDoc(doc(db, "userChats", userStoreState.user.uid), {
          [combinedId + ".userInfo"]: {
            uid: store.chats?.uid,
            displayName: store?.chats?.displayName,
            photoUrl: store?.chats?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", store.chats.uid), {
          [combinedId + ".userInfo"]: {
            uid: userStoreState.user?.uid,
            displayName: userStoreState?.user?.displayName,
            photoUrl: userStoreState?.user?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    }
  } catch (e) {
    console.log(e);
    toast.error("An error occurred on the server");
  }

  store.reset();
};
</script>
<template>
  <div>
    <BaseInput
      v-model="store.username"
      @keyup.enter="store.setChats"
      id="username"
      class="w-full border-0 border-b border-b-accent focus:outline-0 focus:border-b focus:border-secondary rounded-none bg-inherit"
      placeholder="Search user"
    />
    <Loader v-if="store.isLoading" class="m-auto" />
    <div
      @click="createChat"
      v-if="store.chats"
      class="border-b border-secondary flex items-center p-layout gap-5 cursor-pointer hover:opacity-75 transition-opacity duration-200"
    >
      <UserProfilePhoto :profile-photo="store?.chats?.photoURL" class="w-12 h-12" />
      <div class="text-xl font-bold">
        <span>{{ store.chats?.displayName }}</span>
      </div>
    </div>
  </div>
</template>
