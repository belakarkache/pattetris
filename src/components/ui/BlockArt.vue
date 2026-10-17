<template>
  <div class="art" :style="{ '--columns': columns, '--block': `${block}px` }" aria-hidden="true">
    <span
      v-for="cell in cells"
      :key="cell.index"
      class="art__block"
      :class="cell.type && ['block', `piece-${cell.type}`]"
      :style="cell.type && { '--order': cell.order }"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const SHAPES = {
  trophy: [
    ".ooooooo.",
    "ooooooooo",
    "o.ooooo.o",
    "..ooooo..",
    "...ooo...",
    "....o....",
    "...ttt...",
    "..ttttt..",
  ],
  medal: ["z...z", ".z.z.", ".ooo.", "ooooo", "ooooo", ".ooo."],
};

const props = defineProps({
  shape: { type: String, required: true, validator: (value) => ["trophy", "medal"].includes(value) },
  block: { type: Number, default: 12 },
});

const rows = computed(() => SHAPES[props.shape]);
const columns = computed(() => rows.value[0].length);

const cells = computed(() => {
  const height = rows.value.length;
  return rows.value.flatMap((row, y) =>
    [...row].map((char, x) => ({
      index: y * columns.value + x,
      type: char === "." ? null : char,
      order: height - 1 - y + Math.abs(x - (columns.value - 1) / 2) * 0.5,
    }))
  );
});
</script>

<style lang="scss">
.art {
  display: grid;
  grid-template-columns: repeat(var(--columns), var(--block));
  grid-auto-rows: var(--block);
  gap: max(1px, calc(var(--block) / 8));

  &__block.block {
    border-radius: max(2px, calc(var(--block) / 4));
    animation: art-pop 420ms var(--ease-out) calc(var(--order) * 45ms) both;
  }
}

@keyframes art-pop {
  0% {
    opacity: 0;
    transform: translateY(-60%) scale(0.4);
  }
  70% {
    opacity: 1;
    transform: translateY(6%) scale(1.08);
  }
  100% {
    transform: none;
  }
}
</style>
