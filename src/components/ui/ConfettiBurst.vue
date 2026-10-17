<template>
  <div v-if="!reducedMotion" class="confetti" :class="`confetti--${mode}`" aria-hidden="true">
    <span
      v-for="(piece, index) in pieces"
      :key="index"
      class="confetti__piece block"
      :class="`piece-${piece.type}`"
      :style="piece.style"
    />
  </div>
</template>

<script setup>
import { PIECE_TYPES } from "@/game/pieces";
import { useMediaQuery } from "@/composables/useMediaQuery";
import { between } from "@/utils/random";

const props = defineProps({
  mode: { type: String, default: "rain", validator: (value) => ["rain", "burst"].includes(value) },
  count: { type: Number, default: 40 },
});

const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

const rainStyle = () => ({
  "--left": `${between(0, 100)}%`,
  "--size": `${between(7, 14)}px`,
  "--dx": `${between(-50, 50)}px`,
  "--spin": `${between(-540, 540)}deg`,
  "--delay": `${between(0, 900)}ms`,
  "--duration": `${between(1700, 2800)}ms`,
});

const burstStyle = () => ({
  "--size": `${between(8, 15)}px`,
  "--dx": `${between(-170, 170)}px`,
  "--rise": `${between(-180, -60)}px`,
  "--fall": `${between(40, 200)}px`,
  "--spin": `${between(-360, 360)}deg`,
  "--delay": `${between(0, 120)}ms`,
  "--duration": `${between(900, 1400)}ms`,
});

const createStyle = props.mode === "rain" ? rainStyle : burstStyle;

const pieces = Array.from({ length: props.count }, (_, index) => ({
  type: PIECE_TYPES[index % PIECE_TYPES.length],
  style: createStyle(),
}));
</script>

<style lang="scss">
.confetti {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
  container-type: size;

  &__piece {
    position: absolute;
    width: var(--size);
    height: var(--size);
    border-radius: 3px;
    opacity: 0;
  }

  &--rain &__piece {
    top: calc(-1 * var(--size));
    left: var(--left);
    animation: confetti-rain var(--duration) linear var(--delay) both;
  }

  &--burst &__piece {
    top: 45%;
    left: 50%;
    animation: block-fly var(--duration) var(--delay) both;
  }
}

@keyframes confetti-rain {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(var(--dx), 25cqh) rotate(calc(var(--spin) * 0.25));
  }
  50% {
    transform: translate(calc(var(--dx) * -0.6), 50cqh) rotate(calc(var(--spin) * 0.5));
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), calc(100cqh + 20px)) rotate(var(--spin));
  }
}
</style>
