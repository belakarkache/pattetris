<template>
  <div class="board" :class="`board--${status}`">
    <div
      ref="grid"
      class="board__grid"
      aria-hidden="true"
      @pointerdown="gestures.onPointerdown"
      @pointermove="gestures.onPointermove"
      @pointerup="gestures.onPointerup"
      @pointercancel="gestures.onPointercancel"
      @animationend.self="stopShake"
    >
      <div
        v-for="(cell, index) in cells.value"
        :key="index"
        class="cell"
        :class="cell"
      />
      <div class="fx">
        <template v-for="effect in effects" :key="effect.id">
          <div
            v-for="row in effect.rows"
            :key="row"
            class="fx__beam"
            :class="{ 'fx__beam--max': effect.count === 4 }"
            :style="{ '--row': row }"
          />
          <span
            v-for="(shard, index) in effect.shards"
            :key="index"
            class="fx__shard block"
            :class="`piece-${shard.type}`"
            :style="shard.style"
          />
          <p class="fx__score" :class="{ 'fx__score--max': effect.count === 4 }" :style="{ '--row': effect.center }">
            <strong>+{{ formatNumber(effect.points) }}</strong>
            <span v-if="effect.label">{{ effect.label }}</span>
          </p>
        </template>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { formatNumber } from "@/utils/format";
import { onBeforeUnmount, shallowRef, useTemplateRef } from "vue";
import { useMediaQuery } from "@/composables/useMediaQuery";
import { between } from "@/utils/random";

defineProps({
  cells: { type: Object, required: true },
  status: { type: String, required: true },
  gestures: { type: Object, required: true },
});

const CLEAR_LABELS = ["", "", "Dupla!", "Tripla!", "Pattetris!"];
const EFFECT_DURATION = 1200;
const SHAKES = ["board__grid--thud", "board__grid--quake"];

const grid = useTemplateRef("grid");
const effects = shallowRef([]);
const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
let nextId = 0;
const timers = new Set();

const createShards = (rows, types) =>
  rows.flatMap((row, rowIndex) =>
    types[rowIndex].map((type, column) => ({
      type,
      style: {
        "--x": column,
        "--row": row,
        "--dx": `${(column - 4.5) * 10 + between(-40, 40)}px`,
        "--rise": `${between(-90, -30)}px`,
        "--fall": `${between(60, 160)}px`,
        "--spin": `${between(-280, 280)}deg`,
        "--delay": `${Math.abs(column - 4.5) * 16}ms`,
      },
    }))
  );

const stopShake = () => grid.value?.classList.remove(...SHAKES);

const shake = (name) => {
  const element = grid.value;
  if (!element || reducedMotion.value) return;
  stopShake();
  void element.offsetWidth;
  element.classList.add(`board__grid--${name}`);
};

const playClear = ({ rows, types, count, points }) => {
  const effect = {
    id: nextId++,
    rows: reducedMotion.value ? [] : rows,
    count,
    points,
    label: CLEAR_LABELS[count],
    center: rows.reduce((sum, row) => sum + row, 0) / rows.length,
    shards: reducedMotion.value ? [] : createShards(rows, types),
  };
  effects.value = [...effects.value, effect];
  const timer = setTimeout(() => {
    timers.delete(timer);
    effects.value = effects.value.filter((item) => item !== effect);
  }, EFFECT_DURATION);
  timers.add(timer);
  if (count === 4) shake("quake");
};

const playDrop = () => shake("thud");

onBeforeUnmount(() => timers.forEach(clearTimeout));

defineExpose({ playClear, playDrop });
</script>

<style lang="scss">
.board {
  position: relative;
  padding: 8px;
  border-radius: var(--r-panel);
  background: var(--surface);
  box-shadow: 0 6px 0 var(--line);

  &__grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(10, var(--cell));
    grid-auto-rows: var(--cell);
    gap: 2px;
    touch-action: none;
    user-select: none;

    &--thud {
      animation: board-thud 180ms ease-out;
    }

    &--quake {
      animation: board-quake 460ms ease-out;
    }
  }
}

.cell {
  border-radius: var(--r-cell);
  background: var(--well);

  &--locked,
  &--active {
    background: var(--c);
    box-shadow: var(--bevel);
  }

  &--ghost {
    background: color-mix(in srgb, var(--c) 22%, transparent);
    box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--c) 85%, transparent);
  }

  &--clearing {
    background: var(--c);
    animation: cell-clear 260ms ease-in forwards;
  }
}

.board--over .cell--locked {
  filter: saturate(0.35);
  transition: filter 600ms ease;
}

.fx {
  --pad: 8px;
  --pitch: calc(var(--cell) + 2px);

  position: absolute;
  inset: calc(-1 * var(--pad));
  overflow: hidden;
  border-radius: var(--r-panel);
  pointer-events: none;

  &__beam {
    position: absolute;
    top: calc(var(--pad) + var(--row) * var(--pitch));
    left: 0;
    right: 0;
    height: var(--cell);
    border-radius: var(--r-cell);
    background: linear-gradient(90deg, transparent, #ffffff 25%, #ffffff 75%, transparent);
    box-shadow: 0 0 18px 4px color-mix(in srgb, var(--hot) 45%, transparent);
    animation: fx-beam 460ms var(--ease-out) forwards;

    &--max {
      background: linear-gradient(90deg, var(--sky), var(--lilac), var(--pink), var(--butter), var(--mint));
      box-shadow: 0 0 24px 8px color-mix(in srgb, var(--hot) 55%, transparent);
    }
  }

  &__shard {
    position: absolute;
    top: calc(var(--pad) + var(--row) * var(--pitch));
    left: calc(var(--pad) + var(--x) * var(--pitch));
    width: var(--cell);
    height: var(--cell);
    opacity: 0;
    animation: block-fly 820ms var(--delay) both;
  }

  &__score {
    position: absolute;
    top: calc(var(--pad) + var(--row) * var(--pitch) + var(--cell) / 2);
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--ink);
    font-weight: 800;
    line-height: 1;
    text-align: center;
    -webkit-text-stroke: 6px var(--surface);
    paint-order: stroke fill;
    animation: fx-score 1100ms var(--ease-out) forwards;

    strong {
      font-size: max(1.25rem, calc(var(--cell) * 1.1));
      font-variant-numeric: tabular-nums;
    }

    span {
      margin-top: 4px;
      font-size: max(0.875rem, calc(var(--cell) * 0.6));
    }

    &--max {
      color: var(--hot);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .fx__score {
    animation: none;
    transform: translateY(-50%);
  }
}

@keyframes cell-clear {
  0% {
    box-shadow: var(--bevel);
  }
  35% {
    background: #ffffff;
    transform: scale(1.08);
  }
  100% {
    background: #ffffff;
    opacity: 0;
    transform: scale(0.3);
  }
}

@keyframes fx-beam {
  0% {
    opacity: 1;
    transform: scaleX(0);
  }
  45% {
    opacity: 1;
    transform: scaleX(1);
  }
  100% {
    opacity: 0;
    transform: scaleX(1) scaleY(0.15);
  }
}

@keyframes fx-score {
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0.5);
  }
  18% {
    opacity: 1;
    transform: translateY(-50%) scale(1.12);
  }
  30% {
    transform: translateY(-50%) scale(1);
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(calc(-50% - 36px)) scale(1);
  }
}

@keyframes board-thud {
  35% {
    transform: translateY(4px);
  }
}

@keyframes board-quake {
  15% {
    transform: translate(-5px, 3px) rotate(-0.6deg);
  }
  30% {
    transform: translate(5px, -2px) rotate(0.6deg);
  }
  45% {
    transform: translate(-4px, 2px) rotate(-0.4deg);
  }
  60% {
    transform: translate(3px, -1px) rotate(0.3deg);
  }
  80% {
    transform: translate(-1px, 1px);
  }
}
</style>
