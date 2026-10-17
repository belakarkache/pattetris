<template>
  <RouterLink :to="{ name: 'collection' }" class="next-unlock">
    <template v-if="progress.nextPattern">
      <span class="next-unlock__icon">
        <img :src="progress.nextPattern.icon" alt="" width="40" height="40" />
        <AppIcon name="lock" :size="14" class="next-unlock__lock" />
      </span>
      <span class="next-unlock__text">
        <span class="next-unlock__label">No nível {{ progress.nextLevel }}</span>
        <strong>{{ progress.nextPattern.title }}</strong>
      </span>
    </template>
    <span v-else class="next-unlock__text">
      <span class="next-unlock__label">Coleção completa</span>
      <strong>{{ progress.total }} de {{ progress.total }} padrões</strong>
    </span>
    <AppIcon name="chevron-right" :size="18" class="next-unlock__chevron" />
  </RouterLink>
</template>

<script setup>
import AppIcon from "@/components/ui/AppIcon.vue";
import { useProgressStore } from "@/stores/progress";

const progress = useProgressStore();
</script>

<style lang="scss">
.next-unlock {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 18px;
  background: var(--surface);
  text-decoration: none;

  &__icon {
    position: relative;
    flex: none;

    img {
      filter: grayscale(1) opacity(0.55);
    }
  }

  &__lock {
    position: absolute;
    right: -4px;
    bottom: -2px;
    padding: 3px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--surface);
    box-sizing: content-box;
  }

  &__text {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    line-height: 1.25;
  }

  &__label {
    font-size: var(--text-xs);
    color: var(--ink-soft);
  }

  &__chevron {
    color: var(--ink-faint);
  }

  &:hover &__chevron {
    color: var(--ink);
  }
}
</style>
