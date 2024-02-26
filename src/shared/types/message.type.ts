type TDate = {
  nanoseconds: number;
  seconds: number;
};

export type TMessage = {
  date: TDate;
  senderId: string;
  text: string;
  id: string;
};
