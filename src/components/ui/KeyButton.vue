<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :type="to ? undefined : 'button'"
    class="key"
    :class="[`tone-${tone}`, `key--${tone}`, `key--${size}`, { 'key--icon': iconOnly }]"
  >
    <AppIcon v-if="icon" :name="icon" :size="iconSize" />
    <span v-if="$slots.default" :class="{ 'visually-hidden': iconOnly }"><slot /></span>
  </component>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import AppIcon from "./AppIcon.vue";

const props = defineProps({
  tone: { type: String, default: "mint" },
  size: { type: String, default: "md" },
  icon: { type: String, default: "" },
  iconOnly: { type: Boolean, default: false },
  to: { type: [String, Object], default: null },
});

const iconSize = computed(() => ({ sm: 18, md: 20, lg: 26 })[props.size]);
</script>

<style lang="scss">
.key {
  --lip: color-mix(in oklab, var(--tone), var(--on-pastel) 24%);
  --depth: 4px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: var(--r-key);
  background: var(--tone);
  color: var(--on-pastel);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  box-shadow: var(--bevel), 0 var(--depth) 0 var(--lip);
  transform: translateY(0);
  transition: transform 80ms ease, box-shadow 80ms ease;

  &:active,
  &.is-pressed {
    transform: translateY(var(--depth));
    box-shadow: var(--bevel), 0 0 0 var(--lip);
  }

  &:focus-visible {
    box-shadow: var(--bevel), 0 var(--depth) 0 var(--lip), var(--focus);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  &--plain {
    --tone: var(--surface);
    --lip: var(--line);
    color: var(--ink);
  }

  &--sm {
    min-height: 36px;
    padding: 0 14px;
    font-size: var(--text-sm);
    --depth: 3px;
  }

  &--md {
    min-height: 46px;
    padding: 0 20px;
    font-size: var(--text-md);
  }

  &--lg {
    min-height: 56px;
    padding: 0 28px;
    font-size: var(--text-lg);
    --depth: 5px;
  }

  &--icon {
    padding: 0;
    aspect-ratio: 1;
  }
}
</style>
