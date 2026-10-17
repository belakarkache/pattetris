import { ref } from "vue";

const TOAST_DURATION = 4200;
const toasts = ref([]);
const timers = new Map();
let nextId = 0;

const dismiss = (id) => {
  clearTimeout(timers.get(id));
  timers.delete(id);
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

const show = (toast) => {
  const id = nextId++;
  toasts.value = [...toasts.value, { ...toast, id }];
  timers.set(id, setTimeout(() => dismiss(id), TOAST_DURATION));
};

export function useToasts() {
  return { toasts, show, dismiss };
}
