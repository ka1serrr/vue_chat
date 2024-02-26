import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase.config";
import { currentChatStore } from "@/widgets";
import { v4 as uuid } from "uuid";
import { userStore } from "@/shared";

export const sendMessage = async (text: string) => {
  const currentChatStoreState = currentChatStore();
  const currentUser = userStore();
  if (currentChatStoreState.activeChatId) {
    return await updateDoc(doc(db, "chats", currentChatStoreState.activeChatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser?.user?.uid,
        date: Timestamp.now(),
      }),
    });
  }
};
