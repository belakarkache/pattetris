<template>
  <dialog ref="dialog" class="dialog" :aria-labelledby="titleId" @close="emit('close')"
    @pointerdown="pressedBackdrop = isBackdrop($event)" @click="onBackdrop">
    <div class="dialog__panel" tabindex="-1" autofocus>
      <header class="dialog__header">
        <h2 :id="titleId" class="dialog__title">{{ title }}</h2>
        <button type="button" class="dialog__close" aria-label="Fechar" @click="close">
          <AppIcon name="close" :size="20" />
        </button>
      </header>
      <slot />
    </div>
  </dialog>
</template>

<script setup>
import { onMounted, ref, useId } from "vue";
import AppIcon from "./AppIcon.vue";

defineProps({
  title: { type: String, required: true },
});

const emit = defineEmits(["close"]);
const dialog = ref(null);
const titleId = useId();

const close = () => dialog.value?.close();

let pressedBackdrop = false;

const isBackdrop = (event) => {
  if (event.target !== dialog.value) return false;
  const { left, right, top, bottom } = dialog.value.getBoundingClientRect();
  return event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom;
};

const onBackdrop = (event) => {
  if (pressedBackdrop && isBackdrop(event)) close();
  pressedBackdrop = false;
};

onMounted(() => dialog.value.showModal());

defineExpose({ close });
</script>

<style lang="scss">
.dialog {
  width: min(520px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  padding: 0;
  border: 0;
  border-radius: var(--r-panel);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 6px 0 var(--line);
  animation: dialog-in 320ms var(--ease-out);

  &::backdrop {
    background: var(--scrim);
    backdrop-filter: blur(4px);
  }

  &__panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__title {
    font-size: var(--text-xl);
    font-weight: 800;
  }

  &__close {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background: var(--well);
    cursor: pointer;
  }
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }
}
</style>
