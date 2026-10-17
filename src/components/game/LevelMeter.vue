<template>
  <div class="meter" role="progressbar" :aria-valuenow="filled" aria-valuemin="0" :aria-valuemax="total"
    :aria-label="`Linhas para o nível ${level + 1}`">
    <template v-if="total <= MAX_SEGMENTS">
      <span v-for="index in total" :key="index" class="meter__segment" :class="{ 'is-filled': index <= filled }" />
    </template>
    <span v-else class="meter__bar" :style="{ '--fill': filled / total }" />
  </div>
</template>

<script setup>
const MAX_SEGMENTS = 16;

defineProps({
  filled: { type: Number, required: true },
  total: { type: Number, required: true },
  level: { type: Number, required: true },
});
</script>

<style lang="scss">
.meter {
  display: flex;
  gap: 3px;
  height: 12px;

  &__segment {
    flex: 1;
    border-radius: 3px;
    background: var(--well);
    transition: background 200ms ease;

    &.is-filled {
      background: var(--hot);
      box-shadow: var(--bevel);
    }
  }

  &__bar {
    flex: 1;
    border-radius: 4px;
    background: linear-gradient(90deg, var(--hot) calc(var(--fill) * 100%), var(--well) 0);
  }
}
</style>
