<template>
  <kbd class="keycap" :class="{ 'keycap--wide': label.length > 2 }">{{ label }}</kbd>
</template>

<script setup>
import { computed } from "vue";
import { keyName } from "@/game/controls";

const props = defineProps({
  code: { type: String, required: true },
});

const label = computed(() => keyName(props.code));
</script>

<style lang="scss">
.keycap {
  display: inline-grid;
  place-items: center;
  min-width: 28px;
  height: 28px;
  padding: 0 6px;
  border-radius: 7px;
  background: var(--surface);
  color: var(--ink);
  font-family: var(--font);
  font-size: var(--text-xs);
  font-weight: 600;
  box-shadow: inset 0 0 0 1.5px var(--line), 0 2px 0 var(--line);

  &--wide {
    padding: 0 10px;
  }
}
</style>
