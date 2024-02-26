import { defineStore } from "pinia";

type State = {
  messageText: string;
};
export const inputMessageStore = defineStore("inputMessageStore", {
  state: (): State => ({
    messageText: "",
  }),
});
