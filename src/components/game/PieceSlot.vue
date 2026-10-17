<template>
  <component
    :is="interactive ? 'button' : 'div'"
    :type="interactive ? 'button' : undefined"
    class="slot"
    :class="{ 'slot--dimmed': dimmed, 'slot--interactive': interactive }"
    :aria-label="interactive ? actionLabel : undefined"
    @mousedown="interactive && $event.preventDefault()"
  >
    <span class="slot__label">{{ label }}</span>
    <div class="slot__pieces">
      <PieceMini v-for="(type, index) in types" :key="`${index}-${type}`" :type="type" />
      <span v-if="types.length === 0" class="slot__empty">{{ emptyText }}</span>
    </div>
  </component>
</template>

<script setup>
import PieceMini from "./PieceMini.vue";

defineProps({
  label: { type: String, required: true },
  types: { type: Array, default: () => [] },
  emptyText: { type: String, default: "" },
  dimmed: { type: Boolean, default: false },
  interactive: { type: Boolean, default: false },
  actionLabel: { type: String, default: "" },
});
</script>

<style lang="scss">
.slot {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px 16px;
  border: 0;
  border-radius: 18px;
  background: var(--surface);
  color: var(--ink);
  text-align: left;
  font: inherit;
  transition: opacity 200ms ease;

  &--interactive {
    cursor: pointer;
    touch-action: manipulation;
  }

  &--dimmed {
    opacity: 0.45;
  }

  &__label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--ink-soft);
  }

  &__pieces {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    min-height: 34px;

    .mini:not(:first-child) {
      --mini: 12px;
      opacity: 0.85;
    }
  }

  &__empty {
    font-size: var(--text-xs);
    color: var(--ink-faint);
    text-align: center;
  }
}
</style>
