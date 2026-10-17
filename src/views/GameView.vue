<template>
  <main class="game" :class="{ 'game--touch': isTouch }">
    <aside class="game__left">
      <PieceSlot
        class="game__hold"
        label="Guardada"
        :types="holdTypes"
        empty-text="Nenhuma"
        :dimmed="!tetris.canHold.value"
        interactive
        action-label="Guardar peça"
        @click="actions.holdPiece"
      />
      <GameHud
        class="game__hud"
        :score="tetris.score.value"
        :level="tetris.level.value"
        :lines="tetris.lines.value"
        :level-lines="tetris.levelLines.value"
        :lines-to-next-level="tetris.linesToNextLevel.value"
        :best="Math.max(progress.bestScore, tetris.score.value)"
      />
      <NextUnlock class="game__unlock" />
    </aside>

    <div class="game__stage">
      <GameBoard ref="board" :cells="tetris.cells" :status="status" :gestures="gestures">
        <div v-if="showLevelUp" :key="levelUpId" class="game__levelup">
          <ConfettiBurst mode="burst" :count="32" />
          <p class="game__levelup-text" @animationend="showLevelUp = false">
            <span>Nível</span>
            <strong>{{ tetris.level.value }}</strong>
          </p>
        </div>
        <GameOverlay
          :status="status"
          :score="tetris.score.value"
          :best="progress.bestScore"
          :level="tetris.level.value"
          :lines="tetris.lines.value"
          :is-record="isRecord"
          :unlocked="unlockedThisRun"
          :is-touch="isTouch"
          @start="start"
          @resume="tetris.resume"
          @restart="start"
          @help="open('howto')"
        />
      </GameBoard>
    </div>

    <aside class="game__right">
      <PieceSlot class="game__next" label="Próximas" :types="tetris.queue.value" />
      <KeyButton
        class="game__pause"
        tone="plain"
        size="sm"
        :icon="status === 'paused' ? 'play' : 'pause'"
        :icon-only="isCompact"
        :disabled="status !== 'running' && status !== 'paused'"
        @click="onPauseClick"
      >
        {{ status === "paused" ? "Continuar" : "Pausar" }}
      </KeyButton>
      <KeyHints v-if="!isTouch" class="game__hints" />
    </aside>

    <TouchControls v-if="isTouch" class="game__touch" :actions="actions" />

    <p class="visually-hidden" aria-live="polite">{{ announcement }}</p>
  </main>
</template>

<script setup>
import { computed, onActivated, onDeactivated, onMounted, ref, useTemplateRef, watch } from "vue";
import GameBoard from "@/components/game/GameBoard.vue";
import GameHud from "@/components/game/GameHud.vue";
import GameOverlay from "@/components/game/GameOverlay.vue";
import KeyHints from "@/components/game/KeyHints.vue";
import NextUnlock from "@/components/game/NextUnlock.vue";
import PieceSlot from "@/components/game/PieceSlot.vue";
import TouchControls from "@/components/game/TouchControls.vue";
import ConfettiBurst from "@/components/ui/ConfettiBurst.vue";
import KeyButton from "@/components/ui/KeyButton.vue";
import { useTetris } from "@/game/useTetris";
import { useKeyboardControls } from "@/game/useKeyboardControls";
import { useBoardGestures } from "@/game/useBoardGestures";
import { useSound } from "@/composables/useSound";
import { useMediaQuery } from "@/composables/useMediaQuery";
import { useToasts } from "@/composables/useToasts";
import { useAppDialogs } from "@/composables/useAppDialogs";
import { useProgressStore } from "@/stores/progress";
import { useSettingsStore } from "@/stores/settings";
import { COMPACT } from "@/utils/breakpoints";

defineOptions({ name: "GameView" });

const LINE_NAMES = ["", "Uma linha", "Duas linhas", "Três linhas", "Quatro linhas"];

const progress = useProgressStore();
const settings = useSettingsStore();
const { play } = useSound();
const { show } = useToasts();
const { openDialog, open } = useAppDialogs();
const isTouch = useMediaQuery("(pointer: coarse)");
const isCompact = useMediaQuery(`(max-width: ${COMPACT}px)`);

const board = useTemplateRef("board");
const showLevelUp = ref(false);
const levelUpId = ref(0);
const isRecord = ref(false);
const unlockedThisRun = ref([]);
const announcement = ref("");

const tetris = useTetris({
  showGhost: computed(() => settings.ghost),
  onLock: () => play("lock"),
  onClear: (clear) => {
    play("clear");
    board.value?.playClear(clear);
    announcement.value = `${LINE_NAMES[clear.count]}! ${tetris.score.value} pontos.`;
  },
  onHardDrop: (distance) => {
    if (distance > 1) board.value?.playDrop();
  },
  onLevelUp: (level) => {
    showLevelUp.value = true;
    levelUpId.value++;
    announcement.value = `${announcement.value} Nível ${level}.`;
    const fresh = progress.unlockForLevel(level);
    unlockedThisRun.value = [...unlockedThisRun.value, ...fresh];
    fresh.forEach((pattern) => {
      play("unlock");
      show({ pattern, title: `${pattern.title} desbloqueado`, text: "Leia na coleção quando quiser." });
    });
  },
  onGameOver: () => {
    isRecord.value = tetris.score.value > bestAtStart;
    progress.submitScore(tetris.score.value);
    announcement.value = `Fim de jogo com ${tetris.score.value} pontos.`;
  },
});

const status = tetris.status;
const holdTypes = computed(() => (tetris.hold.value ? [tetris.hold.value] : []));

const withSound = (action) => () => {
  if (action()) play("rotate");
};

const actions = {
  moveLeft: tetris.moveLeft,
  moveRight: tetris.moveRight,
  softDrop: tetris.softDrop,
  hardDrop: tetris.hardDrop,
  rotateCw: withSound(tetris.rotateCw),
  rotateCcw: withSound(tetris.rotateCcw),
  holdPiece: tetris.holdPiece,
  togglePause: tetris.togglePause,
};

const gestures = useBoardGestures(actions);

const onPauseClick = (event) => {
  tetris.togglePause();
  if (event.detail > 0) event.currentTarget.blur();
};

let bestAtStart = progress.bestScore;

const resetRun = () => {
  bestAtStart = progress.bestScore;
  isRecord.value = false;
  unlockedThisRun.value = [];
  showLevelUp.value = false;
};

const start = () => {
  resetRun();
  tetris.start();
};

useKeyboardControls({
  actions,
  isPlaying: () => status.value === "running",
  onStart: () => {
    if (status.value === "paused") tetris.resume();
    else if (status.value === "idle" || status.value === "over") start();
    else return false;
    return true;
  },
});

progress.$onAction(({ name, after }) => {
  if (name !== "resetProgress") return;
  after(() => {
    tetris.reset();
    resetRun();
  });
});

const pauseWhenHidden = () => {
  if (document.hidden) tetris.pause();
};

watch(openDialog, (dialog) => {
  if (dialog) tetris.pause();
});

onMounted(() => {
  if (!settings.hasSeenTutorial) open("howto");
});

onActivated(() => {
  document.addEventListener("visibilitychange", pauseWhenHidden);
  window.addEventListener("blur", tetris.pause);
});

onDeactivated(() => {
  tetris.pause();
  document.removeEventListener("visibilitychange", pauseWhenHidden);
  window.removeEventListener("blur", tetris.pause);
});
</script>

<style lang="scss">
.game {
  --board-chrome: 60px;
  --side: clamp(190px, 18vw, 240px);
  --gap: 24px;
  --cell-by-height: calc((100dvh - var(--header-height) - 2 * var(--gap) - var(--board-chrome)) / 20);
  --cell-by-width: calc((100vw - 2 * var(--side) - 2 * var(--gap) - 2 * var(--gutter) - 56px) / 10);
  --cell: clamp(14px, min(var(--cell-by-height), var(--cell-by-width)), 34px);

  display: grid;
  grid-template-columns: var(--side) auto var(--side);
  grid-template-areas: "left stage right";
  justify-content: center;
  align-content: center;
  align-items: start;
  gap: var(--gap);
  min-height: calc(100dvh - var(--header-height));
  padding: var(--gap) var(--gutter);
  overscroll-behavior: none;

  &__left,
  &__right {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__left {
    grid-area: left;
  }

  &__right {
    grid-area: right;
  }

  &__stage {
    grid-area: stage;
    position: relative;
  }

  &__unlock {
    margin-top: auto;
  }

  &__pause {
    align-self: stretch;
  }

  &__levelup {
    position: absolute;
    inset: 0;
    z-index: 4;
    display: grid;
    place-items: center;
    border-radius: var(--r-panel);
    pointer-events: none;
  }

  &__levelup-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 28px 16px;
    border-radius: 20px;
    background: var(--butter);
    color: var(--on-pastel);
    box-shadow: var(--bevel), 0 6px 0 color-mix(in oklab, var(--butter), var(--on-pastel) 24%);
    line-height: 1;
    animation: level-up 1600ms var(--ease-out) forwards;

    span {
      font-size: var(--text-sm);
      font-weight: 700;
    }

    strong {
      font-size: var(--text-3xl);
      font-weight: 800;
      font-variant-numeric: tabular-nums;
    }
  }

  @media (max-width: $compact) {
    --gap: 10px;
    --gutter: 12px;
    --top-row: 64px;
    --controls: 0px;
    --cell-by-height: calc(
      (100dvh - var(--header-height) - var(--top-row) - var(--controls) - 4 * var(--gap) - var(--board-chrome)) / 20
    );
    --cell-by-width: calc((100vw - 2 * var(--gutter) - 34px) / 10);

    grid-template-columns: auto minmax(0, 1fr) auto auto;
    grid-template-areas:
      "hold hud next pause"
      "stage stage stage stage"
      "touch touch touch touch";
    align-items: stretch;
    align-content: start;
    justify-content: stretch;
    height: calc(100dvh - var(--header-height));
    min-height: 0;
    overflow: hidden;

    &--touch {
      --controls: calc(62px + env(safe-area-inset-bottom));
    }

    &__left,
    &__right {
      display: contents;
    }

    &__hold {
      grid-area: hold;
    }

    &__hud {
      grid-area: hud;
    }

    &__next {
      grid-area: next;

      .mini:not(:first-child) {
        display: none;
      }
    }

    &__pause {
      grid-area: pause;
      align-self: center;
      width: 44px;
      height: 44px;
    }

    &__unlock,
    &__hints {
      display: none;
    }

    &__stage {
      display: flex;
      justify-content: center;
    }

    &__touch {
      grid-area: touch;
      align-self: end;
    }

    .slot {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 14px;

      &__label {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-size: 10px;
      }

      &__pieces {
        min-width: 40px;
        min-height: 40px;
      }

      &__empty {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        box-shadow: inset 0 0 0 2px var(--line);
        font-size: 0;
      }

      .mini {
        --mini: 10px;
      }
    }
  }

  @media (max-height: 500px) and (orientation: landscape) and (pointer: coarse) {
    --gap: 8px;
    --cell-by-height: calc((100dvh - var(--header-height) - 2 * var(--gap) - var(--board-chrome)) / 20);

    grid-template-columns: auto auto auto auto auto;
    grid-template-areas: "move left stage right act";
    justify-content: center;
    align-items: center;
    height: calc(100dvh - var(--header-height));

    &__left,
    &__right {
      display: flex;
      width: 150px;
    }

    &__unlock {
      display: none;
    }

    .touch {
      display: contents;

      &__group {
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: center;
        gap: 10px;

        .key:last-child {
          grid-column: 1 / -1;
          justify-self: center;
        }
      }

      &__group--move .key:nth-child(2) {
        order: 3;
        grid-column: 1 / -1;
        justify-self: center;
      }

      &__group--move .key:last-child {
        grid-column: auto;
      }

      &__group--move {
        grid-area: move;
      }

      &__group--act {
        grid-area: act;
      }
    }

    .hud {
      flex-direction: column;
      align-items: stretch;
    }
  }
}
@keyframes level-up {
  0% {
    opacity: 0;
    transform: scale(0.4) rotate(-8deg);
  }
  18% {
    opacity: 1;
    transform: scale(1.12) rotate(3deg);
  }
  28% {
    transform: scale(1) rotate(0deg);
  }
  80% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-24px) scale(0.96);
  }
}
</style>
