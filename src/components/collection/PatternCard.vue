<template>
  <component
    :is="unlocked ? RouterLink : 'div'"
    :to="unlocked ? { name: 'lesson', params: { slug: pattern.slug } } : undefined"
    class="card"
    :class="[unlocked ? `tone-${category.tone}` : 'card--locked']"
    :aria-label="unlocked ? undefined : `${pattern.title}, bloqueado até o nível ${level}`"
  >
    <span class="card__tile">
      <img :src="pattern.icon" alt="" width="56" height="56" />
      <AppIcon v-if="!unlocked" name="lock" :size="16" class="card__lock" />
    </span>
    <span class="card__body">
      <span class="card__meta">
        <span class="card__category">{{ category.label }}</span>
        <span v-if="isNew" class="card__new">Novo</span>
      </span>
      <strong class="card__title">{{ pattern.title }}</strong>
      <span class="card__summary">
        {{ unlocked ? pattern.summary : `Chegue ao nível ${level} para desbloquear.` }}
      </span>
    </span>
  </component>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import AppIcon from "@/components/ui/AppIcon.vue";
import { CATEGORIES } from "@/data/patterns";

const props = defineProps({
  pattern: { type: Object, required: true },
  unlocked: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  level: { type: Number, required: true },
});

const category = computed(() => CATEGORIES[props.pattern.category]);
</script>

<style lang="scss">
.card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 20px;
  background: var(--surface);
  color: var(--ink);
  text-decoration: none;
  transition: transform 160ms var(--ease-out), box-shadow 160ms ease;

  &--locked { --tone: var(--well); }

  &:is(a) {
    box-shadow: 0 4px 0 var(--line);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 0 color-mix(in oklab, var(--tone), var(--on-pastel) 20%);
    }

    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px 0 var(--line);
    }
  }

  &__tile {
    position: relative;
    flex: none;
    display: grid;
    place-items: center;
    width: 76px;
    height: 76px;
    border-radius: 16px;
    background: var(--tone);
    box-shadow: var(--bevel);
  }

  &__lock {
    position: absolute;
    right: -6px;
    bottom: -6px;
    padding: 5px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--surface);
    box-sizing: content-box;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--text-xs);
    color: var(--ink-soft);
  }

  &__new {
    padding: 1px 8px;
    border-radius: 6px;
    background: var(--hot);
    color: #ffffff;
    font-weight: 600;
  }

  &__title {
    font-size: var(--text-lg);
    font-weight: 700;
  }

  &__summary {
    font-size: var(--text-sm);
    color: var(--ink-soft);
  }

  &--locked {
    background: transparent;
    box-shadow: inset 0 0 0 2px var(--line);

    .card__tile {
      background: var(--well);
      box-shadow: none;

      img {
        filter: grayscale(1) opacity(0.4);
      }
    }

    .card__title {
      color: var(--ink-soft);
    }
  }
}
</style>
