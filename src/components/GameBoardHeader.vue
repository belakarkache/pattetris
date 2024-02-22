<template>
  <div class="game-board-header">
    <div class="game-board-header__text">
      <h2 class="title">Nível {{ store.level || "--" }}</h2>
      <span class="progress-helper"
        >{{ store.lines }}/{{ maxLinesNeeded }} linhas</span
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
      maxLinesNeeded: 2,
    };
  },
  watch: {
    store: {
      handler() {
        this.updateProgress(this.store.lines);
      },
      deep: true,
    },
    "store.level": {
      handler() {
        this.maxLinesNeeded = this.store.lines + this.store.linesToNextLevel;
      },
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
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin-bottom: calc(var(--size) / 2);

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

  @media (max-width: 1280px) {
    max-width: 200px;
  }
}
</style>
