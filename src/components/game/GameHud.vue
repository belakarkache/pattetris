<template>
  <section class="hud" aria-label="Placar">
    <div class="hud__score">
      <span class="hud__label">Pontos</span>
      <strong class="hud__value hud__value--big">{{ formatNumber(score) }}</strong>
    </div>

    <div class="hud__level">
      <div class="hud__row">
        <span class="hud__label">Nível <strong>{{ level }}</strong></span>
        <span class="hud__hint">{{ linesLeftText }}</span>
      </div>
      <LevelMeter :filled="levelLines" :total="linesToNextLevel" :level="level" />
    </div>

    <dl class="hud__extra">
      <div>
        <dt class="hud__label">Linhas</dt>
        <dd class="hud__value">{{ lines }}</dd>
      </div>
      <div>
        <dt class="hud__label">Recorde</dt>
        <dd class="hud__value">{{ formatNumber(best) }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup>
import { formatNumber } from "@/utils/format";
import { computed } from "vue";
import LevelMeter from "./LevelMeter.vue";

const props = defineProps({
  score: { type: Number, required: true },
  level: { type: Number, required: true },
  lines: { type: Number, required: true },
  levelLines: { type: Number, required: true },
  linesToNextLevel: { type: Number, required: true },
  best: { type: Number, required: true },
});

const linesLeftText = computed(() => {
  const left = props.linesToNextLevel - props.levelLines;
  return left === 1 ? "falta 1 linha" : `faltam ${left} linhas`;
});
</script>

<style lang="scss">
.hud {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 18px;
  border-radius: 18px;
  background: var(--surface);

  &__label {
    font-size: var(--text-sm);
    color: var(--ink-soft);

    strong {
      color: var(--ink);
      font-weight: 700;
    }
  }

  &__value {
    margin: 0;
    font-size: var(--text-lg);
    font-weight: 700;
    font-variant-numeric: tabular-nums;

    &--big {
      display: block;
      font-size: var(--text-2xl);
      font-weight: 800;
      line-height: 1.1;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
  }

  &__hint {
    font-size: var(--text-xs);
    color: var(--ink-faint);
  }

  &__extra {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 0;

    dd {
      margin: 0;
    }
  }

  @media (max-width: $compact) {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-content: center;
    gap: 6px 12px;
    padding: 10px 14px;

    &__score {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    &__value--big {
      font-size: var(--text-lg);
    }

    &__level {
      display: contents;
    }

    &__row {
      margin: 0;
      align-self: baseline;
      white-space: nowrap;
    }

    &__hint {
      display: none;
    }

    .meter {
      grid-column: 1 / -1;
      height: 8px;
    }

    &__extra {
      display: none;
    }
  }

  @media (max-width: 480px) {
    &__score .hud__label {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
    }
  }
}
</style>
