<template>
  <div class="game-instructions">
    <h2 class="modal-content__title">Como jogar</h2>

    <div class="game-instructions__image"></div>

    <p>
      Ao perder o jogo ou trocar de tela durante o jogo, você não perderá os
      conteúdos já liberados, apenas o progresso do jogo atual.
    </p>

    <Button
      text="Fechar"
      bgColor="var(--tetris-purple)"
      @click="$emit('close')"
    />
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "GameInstructions",
  components: {
    Button,
  },
};
</script>

<style lang="scss">
.game-instructions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--size);

  p {
    max-width: 424px;
    font-size: 16px;
  }

  &__image {
    width: 100%;
    max-width: 424px;
    max-height: 294px;
    height: 36vh;
    background: url("@/assets/content-images/instructions-desktop.png")
      no-repeat center;
    background-size: contain;
  }

  @media (max-width: $tablet) {
    &__image {
      background: url("@/assets/content-images/instructions-medium.png")
        no-repeat center;
      max-width: 240px;
      max-height: 300px;
    }
    p {
      max-width: 240px;
      font-size: 12px;
    }
  }
}
</style>
