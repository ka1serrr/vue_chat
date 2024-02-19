import { collection, query, where } from "firebase/firestore";
import { db } from "@/app/firebase.config";

export const searchUser = (identifier: string) => {
  return query(collection(db, "users"), where("displayName", "==", identifier));
};
