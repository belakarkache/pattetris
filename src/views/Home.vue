<template>
  <main>
    <GameBoard />

    <NextContent v-if="store.content < 10" />
  </main>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import NextContent from "@/components/NextContent.vue";
import { useMainStore } from "@/store/main";

export default {
  name: "Home",
  components: {
    GameBoard,
    NextContent,
  },
  data() {
    return {
      store: useMainStore(),
    };
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

  @media (max-width: 1280px) {
    padding: calc(var(--size) / 2);
    justify-content: center;
  }

  @media (max-width: 767px) {
    padding: 10px;
    flex-direction: column;
  }
}
</style>
