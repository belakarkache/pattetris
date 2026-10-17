<template>
  <header class="header">
    <RouterLink to="/" class="header__brand" aria-label="Pattetris, início">
      <AppLogo class="header__logo" />
      <AppLogo mark-only class="header__mark" />
    </RouterLink>

    <nav class="header__nav" aria-label="Principal">
      <RouterLink :to="{ name: 'game' }" class="header__link" active-class="" exact-active-class="is-active">
        <AppIcon name="game" :size="20" />
        Jogar
      </RouterLink>
      <RouterLink :to="{ name: 'collection' }" class="header__link"
        :class="{ 'is-active': route.matched.some((record) => record.path.startsWith('/colecao')) }">
        <AppIcon name="collection" :size="20" />
        Coleção
        <span class="header__count" :aria-label="`${progress.unlocked} de ${progress.total} desbloqueados`">
          {{ progress.unlocked }}/{{ progress.total }}
        </span>
        <span v-if="progress.unreadCount" class="header__dot" aria-label="Há padrões novos para ler" />
      </RouterLink>
    </nav>

    <div class="header__tools">
      <button type="button" class="header__tool" aria-label="Como jogar" @click="open('howto')">
        <AppIcon name="help" :size="20" />
      </button>
      <button type="button" class="header__tool" aria-label="Configurações" @click="open('settings')">
        <AppIcon name="settings" :size="20" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import AppIcon from "@/components/ui/AppIcon.vue";
import AppLogo from "@/components/ui/AppLogo.vue";
import { useProgressStore } from "@/stores/progress";
import { useAppDialogs } from "@/composables/useAppDialogs";

const route = useRoute();
const progress = useProgressStore();
const { open } = useAppDialogs();
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 16px;
  height: var(--header-height);
  padding: 0 var(--gutter);
  padding-top: env(safe-area-inset-top);
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter: blur(10px);

  &__brand {
    display: flex;
    flex: none;
    text-decoration: none;
  }

  .header__mark {
    display: none;
  }

  &__nav {
    display: flex;
    gap: 4px;
    margin: 0 auto;
    padding: 4px;
    border-radius: 16px;
    background: var(--surface);
  }

  &__link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 0 16px;
    border-radius: 12px;
    color: var(--ink-soft);
    font-weight: 600;
    text-decoration: none;
    transition: background 160ms ease, color 160ms ease;

    &:hover {
      color: var(--ink);
    }

    &.is-active {
      background: var(--hot-soft);
      color: var(--ink);

      svg {
        color: var(--hot);
      }
    }
  }

  &__count {
    padding: 2px 7px;
    border-radius: 8px;
    background: var(--well);
    font-size: var(--text-xs);
    font-variant-numeric: tabular-nums;
  }

  &__dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--hot);
  }

  &__tools {
    display: flex;
    gap: 4px;
  }

  &__tool {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 12px;
    background: transparent;
    color: var(--ink-soft);
    cursor: pointer;

    &:hover {
      background: var(--surface);
      color: var(--ink);
    }
  }

  @media (max-width: 640px) {
    gap: 8px;

    .header__logo {
      display: none;
    }

    .header__mark {
      display: flex;
    }

    &__link {
      padding: 0 12px;
    }
  }

  @media (max-width: 380px) {
    &__link svg {
      display: none;
    }
  }
}
</style>
