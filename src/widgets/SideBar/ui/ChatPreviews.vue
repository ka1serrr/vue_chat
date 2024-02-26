<script setup lang="ts">
import { ChatPreview } from "@/entities";
import { onMounted, ref } from "vue";
import { Loader, type TChats, userStore } from "@/shared";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase.config";

const previews = ref<TChats[] | null>([]);
const currentUser = userStore();

const isLoading = ref(true);

onMounted(() => {
  isLoading.value = true;
  try {
    if (currentUser.user) {
      onSnapshot(doc(db, "userChats", currentUser.user.uid), (doc) => {
        // @ts-ignore
        let arrayedDataWithUser = Object.entries(doc.data());
        const newArrayWithData = [];
        for (let item of arrayedDataWithUser) {
          newArrayWithData.push({ ...item[1], id: item[0] });
          item.shift();
        }
        previews.value = newArrayWithData as unknown as TChats[];
      });
    }
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Loader v-if="isLoading" class="m-auto" />
  <ChatPreview v-else v-for="preview in previews" :user-preview="preview?.userInfo" :id="preview?.id" />
</template>
