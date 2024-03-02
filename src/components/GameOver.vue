<template>
  <div class="game-over">
    <h2 class="modal-content__title">Fim de jogo</h2>
    <Vue3Lottie
      :animationData="isHighscore ? Highscore : GameOver"
      autoplay
      :width="200"
      :height="200"
      :loop="0"
      :delay="200"
    />

    <div class="game-over__score">
      <p class="game-over__score-label">Sua pontuação</p>
      <span class="game-over__score-container">
        <p :class="{ rainbow: isHighscore }">
          {{ store.score }}
        </p>
      </span>

      <span
        class="rainbow"
        v-if="isHighscore"
        >Nova pontuação máxima</span
      >
    </div>

    <Button
      text="Jogar novamente"
      @click="restartGame"
      class="game-over__play-again"
    />
  </div>
</template>
<script>
import Button from "./Button.vue";
import Highscore from "@/assets/animations/highscore.json";
import GameOver from "@/assets/animations/gameover.json";
import { useMainStore } from "@/store/main";

export default {
  name: "GameOver",
  components: { Button },
  props: {
    isHighscore: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      store: useMainStore(),
      Highscore,
      GameOver,
    };
  },
  methods: {
    restartGame() {
      location.reload();
    },
  },
};
</script>
<style lang="scss">
.game-over {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 6px;

  &__score {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    &-label {
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
    }

    &-container {
      background: var(--background);
      padding: 4px 22px;
      border-radius: 8px;
      box-shadow: var(--inner-shadow);
      p {
        font-size: 28px;
        font-weight: 700;
      }
    }
  }

  &__play-again {
    margin-top: 16px;
    width: 100%;
  }
}
</style>
