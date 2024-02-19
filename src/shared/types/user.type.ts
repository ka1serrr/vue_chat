import type { UserInfo } from "@firebase/auth";

export type TUser = UserInfo | null;

export type TChatPreview = {
  imgLink: string;
  photoURL: string;
  lastMessage: string;
  uid: string;
  displayName: string;
};

export type TChatPreviews = TChatPreview[];
