<template>
  <main class="collection">
    <header class="collection__header">
      <h1>Sua coleção de padrões</h1>
      <p>
        Cada nível que você alcança no jogo libera um padrão de projeto, explicado com uma analogia
        do próprio Pattetris e um exemplo em JavaScript.
      </p>

      <div class="collection__progress">
        <div class="collection__blocks" aria-hidden="true">
          <span
            v-for="(pattern, index) in PATTERNS"
            :key="pattern.slug"
            class="collection__block"
            :class="index < progress.unlocked ? `tone-${CATEGORIES[pattern.category].tone}` : ''"
          />
        </div>
        <p>
          <strong>{{ progress.unlocked }} de {{ progress.total }}</strong> desbloqueados.
          <template v-if="progress.nextPattern">
            Próximo: {{ progress.nextPattern.title }}, no nível {{ progress.nextLevel }}.
          </template>
        </p>
      </div>
    </header>

    <section v-if="progress.unlocked === 0" class="collection__empty">
      <p>Sua coleção ainda está vazia. Complete {{ linesForLevel(1) }} linhas no jogo para chegar ao nível {{ levelToUnlock(0) }} e liberar o primeiro padrão.</p>
      <KeyButton :to="{ name: 'game' }" icon="play">Jogar agora</KeyButton>
    </section>

    <ul class="collection__grid">
      <li v-for="(pattern, index) in PATTERNS" :key="pattern.slug">
        <PatternCard
          :pattern="pattern"
          :unlocked="index < progress.unlocked"
          :is-new="index < progress.unlocked && !progress.isRead(pattern.slug)"
          :level="levelToUnlock(index)"
        />
      </li>
    </ul>
  </main>
</template>

<script setup>
import PatternCard from "@/components/collection/PatternCard.vue";
import KeyButton from "@/components/ui/KeyButton.vue";
import { CATEGORIES, PATTERNS } from "@/data/patterns";
import { linesForLevel } from "@/game/engine";
import { levelToUnlock, useProgressStore } from "@/stores/progress";

const progress = useProgressStore();
</script>

<style lang="scss">
.collection {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 32px var(--gutter) 64px;

  &__header {
    display: grid;
    gap: 14px;
    max-width: 64ch;

    h1 {
      font-size: var(--text-3xl);
      font-weight: 800;
    }

    > p {
      color: var(--ink-soft);
    }
  }

  &__progress {
    display: grid;
    gap: 10px;
    margin-top: 8px;
    font-size: var(--text-sm);
  }

  &__blocks {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 28px));
    gap: 4px;
  }

  &__block {
    aspect-ratio: 1;
    border-radius: 6px;
    background: var(--surface);
    box-shadow: inset 0 0 0 2px var(--line);

    &[class*="tone-"] {
      background: var(--tone);
      box-shadow: var(--bevel);
    }
  }

  &__empty {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px;
    border-radius: 20px;
    background: var(--hot-soft);

    p {
      max-width: 52ch;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: 16px;
    padding: 0;
    list-style: none;

    li {
      display: grid;
    }
  }
}
</style>
