<template>
  <div class="game-board-header">
    <div class="game-board-header__text">
      <h2 class="title">Nível {{ store.level }}</h2>
      <span class="progress-helper"
        >{{ progress }}% para nível {{ store.level + 1 }}</span
      >
    </div>
    <ProgressBar :progress="progress" />
  </div>
</template>

<script>
import { useMainStore } from "@/store/main";
import ProgressBar from "./ProgressBar.vue";

export default {
  name: "GameBoardHeader",
  components: { ProgressBar },
  data() {
    return {
      store: useMainStore(),
      progress: 0,
    };
  },
  watch: {
    store: {
      handler() {
        this.updateProgress(this.store.lines);
      },
      deep: true,
    },
  },

  methods: {
    updateProgress(value) {
      if (value % this.store.linesToNextLevel === 0) {
        this.progress = 0;
      }
      this.progress =
        (value % this.store.linesToNextLevel) *
        (100 / this.store.linesToNextLevel);
    },
  },
};
</script>
<style lang="scss">
.game-board-header {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__text {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 4px;
  }

  .progress-helper {
    font-size: 12px;
    color: var(--dark-blue);
    opacity: 0.5;
    float: right;
    display: block;
  }
}
</style>
