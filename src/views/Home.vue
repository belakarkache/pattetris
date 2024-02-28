<template>
  <main>
    <GameBoard />

    <NextContent v-if="store.content < 10" />

    <Toast :show="isToastOpen">
      <Vue3Lottie
        :animationData="Medal"
        :width="60"
        :height="60"
        :loop="1"
        :autoplay="true"
        :speed="1.2"
        @on-complete="() => (isToastOpen = false)"
      />

      <div class="toast-text">
        <p class="toast-text--small">Novo conteúdo liberado!</p>
        <p class="toast-text--large">
          {{ contents[store.content - 1].title }}
        </p>
      </div>

      <Button
        text="Ver"
        bgColor="var(--tetris-pink)"
        @click="$router.push(`/content/${contents[store.content - 1].id}`)"
      />
    </Toast>
  </main>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import NextContent from "@/components/NextContent.vue";
import Toast from "@/components/Toast.vue";
import { useMainStore } from "@/store/main";
import { useContentStore } from "@/store/content";
import PinkConfetti from "@/assets/animations/pink-confetti.json";
import Medal from "@/assets/animations/medal.json";
import Button from "@/components/Button.vue";

export default {
  name: "Home",
  components: {
    GameBoard,
    NextContent,
    Toast,
    Button,
  },
  data() {
    return {
      store: useMainStore(),
      PinkConfetti,
      Medal,
      isToastOpen: false,
      contents: useContentStore().contents,
    };
  },
  watch: {
    "store.content"(newVal, oldVal) {
      if (newVal > oldVal) {
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

  @media (max-width: $tablet) {
    padding: calc(var(--size) / 2);
    justify-content: center;
  }

  @media (max-width: $mobile) {
    padding: 10px;
    flex-direction: column;
  }
}
</style>
