<template>
  <Teleport to="body">
    <TransitionGroup tag="ol" name="toast" class="toasts" aria-live="polite">
      <li v-for="toast in toasts" :key="toast.id" class="toast" :class="{ 'toast--unlock': toast.pattern }">
        <span v-if="toast.pattern" class="toast__art" :class="`tone-${CATEGORIES[toast.pattern.category].tone}`">
          <img :src="toast.pattern.icon" alt="" width="36" height="36" />
          <BlockArt shape="medal" :block="6" class="toast__medal" />
        </span>
        <span class="toast__text">
          <strong>{{ toast.title }}</strong>
          <span v-if="toast.text">{{ toast.text }}</span>
        </span>
        <button type="button" class="toast__close" aria-label="Fechar aviso" @click="dismiss(toast.id)">
          <AppIcon name="close" :size="16" />
        </button>
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import AppIcon from "@/components/ui/AppIcon.vue";
import BlockArt from "@/components/ui/BlockArt.vue";
import { useToasts } from "@/composables/useToasts";
import { CATEGORIES } from "@/data/patterns";

const { toasts, dismiss } = useToasts();
</script>

<style lang="scss">
.toasts {
  position: fixed;
  top: calc(var(--header-height) + 12px);
  right: 16px;
  z-index: 50;
  display: grid;
  gap: 8px;
  width: min(360px, calc(100vw - 32px));
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: none;

  @media (max-width: $compact) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px 12px 16px;
  border-radius: 18px;
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 4px 0 var(--line), 0 12px 32px rgb(40 36 81 / 0.12);
  pointer-events: auto;

  &--unlock {
    box-shadow: 0 4px 0 color-mix(in oklab, var(--pink), var(--on-pastel) 24%), 0 12px 32px rgb(40 36 81 / 0.16);
  }

  &__art {
    position: relative;
    flex: none;
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: var(--tone);
    box-shadow: var(--bevel);
    animation: toast-pop 520ms var(--ease-out);
  }

  &__medal {
    position: absolute;
    top: -16px;
    left: -12px;
    filter: drop-shadow(0 2px 0 rgb(40 36 81 / 0.18));
  }

  &__text {
    display: grid;
    flex: 1;
    font-size: var(--text-sm);
    line-height: 1.3;

    span {
      color: var(--ink-soft);
    }
  }

  &__close {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--ink-soft);
    cursor: pointer;
  }
}

@keyframes toast-pop {
  0% {
    transform: scale(0.4) rotate(-12deg);
  }
  60% {
    transform: scale(1.12) rotate(4deg);
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 240ms ease, transform 320ms var(--ease-out);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.96);
}
</style>
