import { defineStore } from "pinia";

type State = {
  loading: boolean;
};

export const loadingStore = defineStore("loading", {
  state: (): State => ({ loading: false }),
});
