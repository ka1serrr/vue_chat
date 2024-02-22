import type { UserInfo } from "@firebase/auth";

export type TUser = UserInfo | null;

export type TChatPreview = {
  imgLink: string;
  photoUrl: string;
  lastMessage: string;
  uid: string;
  displayName: string;
};

export type TChats = {
  date: string;
  userInfo: TChatPreview;
  id: string;
};
