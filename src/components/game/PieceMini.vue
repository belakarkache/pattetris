<template>
  <div class="mini" :class="`piece-${type}`" :style="{ '--cols': box.cols, '--rows': box.rows }">
    <span
      v-for="([x, y], index) in box.cells"
      :key="index"
      class="block"
      :style="{ gridColumn: x + 1, gridRow: y + 1 }"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { PIECES } from "@/game/pieces";

const props = defineProps({
  type: { type: String, required: true },
});

const box = computed(() => {
  const cells = PIECES[props.type].rotations[0];
  const xs = cells.map(([x]) => x);
  const ys = cells.map(([, y]) => y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  return {
    cells: cells.map(([x, y]) => [x - minX, y - minY]),
    cols: Math.max(...xs) - minX + 1,
    rows: Math.max(...ys) - minY + 1,
  };
});
</script>

<style lang="scss">
.mini {
  --mini: 16px;

  display: grid;
  grid-template-columns: repeat(var(--cols), var(--mini));
  grid-template-rows: repeat(var(--rows), var(--mini));
  gap: 2px;

  .block {
    border-radius: 4px;
  }
}
</style>
