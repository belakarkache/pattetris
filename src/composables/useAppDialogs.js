import { ref } from "vue";

const openDialog = ref(null);

export function useAppDialogs() {
  const open = (name) => {
    openDialog.value = name;
  };
  const close = () => {
    openDialog.value = null;
  };
  return { openDialog, open, close };
}
