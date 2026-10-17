<template>
  <Transition name="overlay">
    <div v-if="status !== 'running'" class="overlay" :class="`overlay--${status}`">
      <ConfettiBurst v-if="status === 'over' && isRecord" mode="rain" :count="48" />
      <div v-if="status === 'idle'" class="overlay__card">
        <AppLogo mark-only class="overlay__mark" />
        <h1 class="overlay__title">Encaixe peças, desbloqueie padrões</h1>
        <p class="overlay__text">
          Cada nível novo libera um padrão de projeto na sua coleção, com explicação e exemplo em JavaScript.
        </p>
        <KeyButton size="lg" icon="play" class="overlay__primary" @click="emit('start')">Jogar</KeyButton>
        <p v-if="!isTouch" class="overlay__hint">ou aperte <KeyCap code="Enter" /></p>
        <button type="button" class="overlay__link" @click="emit('help')">Como jogar</button>
      </div>

      <div v-else-if="status === 'paused'" class="overlay__card">
        <h2 class="overlay__title">Jogo pausado</h2>
        <p class="overlay__text">Sua partida fica guardada enquanto você navega pelo site.</p>
        <div class="overlay__actions">
          <KeyButton size="lg" icon="play" @click="emit('resume')">Continuar</KeyButton>
          <KeyButton tone="plain" icon="restart" @click="emit('restart')">Recomeçar</KeyButton>
        </div>
        <p v-if="!isTouch" class="overlay__hint">Aperte <KeyCap code="KeyP" /> para continuar</p>
      </div>

      <div v-else-if="status === 'over'" class="overlay__card">
        <BlockArt v-if="isRecord" shape="trophy" :block="11" class="overlay__celebration" />
        <h2 class="overlay__title">{{ isRecord ? "Novo recorde!" : "Fim de jogo" }}</h2>
        <p class="overlay__score" :class="{ 'rainbow-text': isRecord }">{{ formatNumber(score) }}</p>
        <dl class="overlay__stats">
          <div><dt>Nível</dt><dd>{{ level }}</dd></div>
          <div><dt>Linhas</dt><dd>{{ lines }}</dd></div>
          <div><dt>Recorde</dt><dd>{{ formatNumber(best) }}</dd></div>
        </dl>

        <section v-if="unlocked.length" class="overlay__unlocked" aria-label="Desbloqueados nesta partida">
          <p class="overlay__subtitle">
            {{ unlocked.length === 1 ? "Você desbloqueou um padrão" : `Você desbloqueou ${unlocked.length} padrões` }}
          </p>
          <ul>
            <li v-for="pattern in unlocked" :key="pattern.slug">
              <RouterLink :to="{ name: 'lesson', params: { slug: pattern.slug } }">
                <img :src="pattern.icon" alt="" width="28" height="28" />
                <span>{{ pattern.title }}</span>
                <span class="overlay__read">Ler agora</span>
              </RouterLink>
            </li>
          </ul>
        </section>

        <div class="overlay__actions">
          <KeyButton size="lg" icon="restart" @click="emit('restart')">Jogar de novo</KeyButton>
        </div>
        <p v-if="!isTouch" class="overlay__hint">ou aperte <KeyCap code="Enter" /></p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { formatNumber } from "@/utils/format";
import AppLogo from "@/components/ui/AppLogo.vue";
import BlockArt from "@/components/ui/BlockArt.vue";
import ConfettiBurst from "@/components/ui/ConfettiBurst.vue";
import KeyButton from "@/components/ui/KeyButton.vue";
import KeyCap from "@/components/ui/KeyCap.vue";

defineProps({
  status: { type: String, required: true },
  score: { type: Number, default: 0 },
  best: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  lines: { type: Number, default: 0 },
  isRecord: { type: Boolean, default: false },
  unlocked: { type: Array, default: () => [] },
  isTouch: { type: Boolean, default: false },
});

const emit = defineEmits(["start", "resume", "restart", "help"]);
</script>

<style lang="scss">
.overlay {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  place-items: center;
  padding: 12px;
  border-radius: var(--r-panel);
  background: color-mix(in srgb, var(--surface) 58%, transparent);
  backdrop-filter: blur(6px);
  overflow-y: auto;

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: min(100%, 320px);
    text-align: center;
  }

  &__mark svg {
    height: 44px;
  }

  &__title {
    font-size: var(--text-xl);
    font-weight: 800;
  }

  &__text {
    max-width: 30ch;
    font-size: var(--text-sm);
    color: var(--ink-soft);
  }

  &__primary {
    margin-top: 8px;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 8px;
  }

  &__hint {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--text-sm);
    color: var(--ink-soft);
  }

  &__link {
    padding: 0;
    border: 0;
    background: none;
    color: var(--ink);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  &__celebration {
    margin-bottom: 4px;
  }

  &__score {
    font-size: var(--text-3xl);
    font-weight: 800;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  &__stats {
    display: flex;
    gap: 20px;
    margin: 0;

    div {
      display: flex;
      flex-direction: column-reverse;
    }

    dt {
      font-size: var(--text-xs);
      color: var(--ink-soft);
    }

    dd {
      margin: 0;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
  }

  &__unlocked {
    width: 100%;
    padding: 12px;
    border-radius: 16px;
    background: var(--hot-soft);

    ul {
      display: grid;
      gap: 6px;
      margin-top: 8px;
      padding: 0;
      list-style: none;
    }

    a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 8px;
      border-radius: 10px;
      background: var(--surface);
      font-weight: 600;
      text-decoration: none;
    }
  }

  &__subtitle {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  &__read {
    margin-left: auto;
    font-size: var(--text-xs);
    color: var(--ink-soft);
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 200ms ease;

  .overlay__card {
    transition: transform 320ms var(--ease-out);
  }
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;

  .overlay__card {
    transform: translateY(12px) scale(0.97);
  }
}
</style>
