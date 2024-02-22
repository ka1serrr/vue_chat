<script setup lang="ts">
import { ChatPreview } from "@/entities";
import { onMounted, ref } from "vue";
import { type TChats, userStore } from "@/shared";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase.config";

const previews = ref<TChats[] | null>([]);
const currentUser = userStore();

onMounted(() => {
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
});
</script>

<template>
  <ChatPreview v-for="preview in previews" :user-preview="preview?.userInfo" :id="preview?.id" />
</template>
