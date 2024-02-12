export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = TLogin & {
  displayName: string;
  avatar: null | Blob;
};
