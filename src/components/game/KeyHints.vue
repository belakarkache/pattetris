<template>
  <section class="hints" aria-label="Atalhos de teclado">
    <ul>
      <li v-for="hint in KEY_HINTS" :key="hint.label">
        <span class="hints__keys">
          <KeyCap v-for="code in hint.keys" :key="code" :code="code" />
        </span>
        <span>{{ hint.label }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import KeyCap from "@/components/ui/KeyCap.vue";
import { KEY_HINTS } from "@/game/controls";
</script>

<style lang="scss">
.hints {
  padding: 4px 4px 0;

  ul {
    display: grid;
    gap: 8px;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--text-sm);
    color: var(--ink-soft);
  }

  &__keys {
    display: flex;
    gap: 4px;
    min-width: 78px;
  }
}
</style>
