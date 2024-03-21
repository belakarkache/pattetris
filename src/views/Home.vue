<template>
  <main>
    <GameBoard />

    <Toast :show="isToastOpen">
      <Vue3Lottie :animationData="Medal" :width="60" :height="60" :loop="1" :autoplay="true" :speed="1.2"
        @on-complete="() => (isToastOpen = false)" />

      <div class="toast-text">
        <p class="toast-text--small">Novo conteúdo liberado!</p>
        <p class="toast-text--large">
          {{ contents[store.content - 1].title }}
        </p>
      </div>
    </Toast>
  </main>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import Toast from "@/components/Toast.vue";
import { useMainStore } from "@/store/main";
import { useContentStore } from "@/store/content";
import PinkConfetti from "@/assets/animations/pink-confetti.json";
import Medal from "@/assets/animations/medal.json";
import unlockedContentSound from "@/assets/sounds/unlocked-content.mp3";

export default {
  name: "Home",
  components: {
    GameBoard,
    Toast,
  },
  data() {
    return {
      store: useMainStore(),
      PinkConfetti,
      Medal,
      isToastOpen: false,
      contents: useContentStore().contents,
      audio: new Audio(unlockedContentSound),
    };
  },
  watch: {
    "store.content"(newVal, oldVal) {
      if (newVal > oldVal) {
        this.audio.volume = JSON.parse(this.store.soundPreference) ? 0.5 : 0;
        this.audio.play();
        this.isToastOpen = true;
      }
    },
  },
};
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding-right: var(--size);
  justify-content: center;
  overflow: hidden;

  @media (max-width: $tablet) {
    padding: calc(var(--size) / 2);
  }

  @media (max-width: $mobile) {
    height: fit-content;
    padding: 4px 20px !important;
    flex-direction: column;
    justify-content: flex-start;
    background-color: white;
  }
}
</style>
