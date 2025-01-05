import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  // Declare sourceConnections as a reactive reference with an initial value of undefined
  const outputData = ref<string>();
  const disabled = reactive({
    deploy: true,
    run: false,
  });

  return {
    outputData,
    disabled,
  };
});
