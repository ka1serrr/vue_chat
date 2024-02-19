import { collection, query, where } from "firebase/firestore";
import { db } from "@/app/firebase.config";

export const searchChat = (id: string) => {
  return query(collection(db, "chats"), where("combined", "==", id));
};
