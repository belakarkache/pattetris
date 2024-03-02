<template>
  <div class="game-paused">
    <h2 class="modal-content__title">Jogo pausado</h2>

    <Vue3Lottie
      :animationData="Pause"
      autoplay
      :width="200"
      :height="200"
      :loop="true"
      :delay="200"
    />

    <p class="game-paused__helper-text">
      Se você sair desta tela, apenas o
      <strong>progresso do jogo atual será perdido.</strong>
    </p>

    <div class="game-paused__actions">
      <Button
        text="Continuar"
        bgColor="var(--tetris-pink)"
        @click="$emit('continue')"
        class="continue-button"
        data-location="container"
      />
      <Button
        hasIcon
        bgColor="var(--tetris-yellow)"
        @click="$emit('restart')"
      >
        <IconRestart
          :size="24"
          color="rgba(0,0,0,0.55)"
        />
      </Button>
    </div>
  </div>
</template>
<script>
import Pause from "@/assets/animations/sleeping.json";
import Button from "./Button.vue";
import IconRestart from "./icons/IconRestart.vue";

export default {
  name: "GamePaused",
  components: {
    Button,
    IconRestart,
  },
  emits: ["continue", "restart"],
  data() {
    return {
      Pause,
    };
  },
};
</script>
<style lang="scss">
.game-paused {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
  align-items: center;

  &__helper-text {
    font-size: 14px;
    text-align: center;
    max-width: 260px;
    strong {
      font-weight: 600;
    }
  }

  &__actions {
    display: flex;
    gap: 14px;
    width: 100%;

    .continue-button {
      width: 100%;
    }
  }
}
</style>
