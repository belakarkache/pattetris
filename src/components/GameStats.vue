<template>
  <div class="stats">
    <div class="stats__wrapper">
      <div class="stat__wrapper" v-for="stat, index in stats" :key="index">
        <div class="stat__icon">
          <component :is="stat.icon" :size="26" />
        </div>
        <div class="stat__wrapper--text">
          <h3>{{ stat.value }}</h3>
          <p>{{ stat.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "@/store/main";
import IconCheck from "./icons/IconCheck.vue";
import IconStar from "./icons/IconStar.vue";
import IconThreeStars from "./icons/IconThreeStars.vue";
import IconUnlock from "./icons/IconUnlock.vue";

export default {
  name: "GameStats",
  components: { IconCheck, IconStar, IconThreeStars, IconUnlock },
  data() {
    return {
      store: useMainStore(),
    };
  },
  computed: {
    stats() {
      return [
        {
          icon: "IconCheck",
          text: "linhas completas",
          value: this.store.lines < 10 ? "0" + this.store.lines : this.store.lines,
        },
        {
          icon: "IconThreeStars",
          text: "pontuação máxima",
          value: this.store.maxScore,
        },
        {
          icon: "IconStar",
          text: "pontuação atual",
          value: this.store.score,
        },
        {
          icon: "IconUnlock",
          text: "conteúdos liberados",
          value: `${this.store.content}/10`,
        },
      ];
    }
  },
};
</script>
<style lang="scss">
.stats {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: $mobile) {
      gap: 6px;
      flex-direction: row;
    }
  }

  .stat {
    &__wrapper {
      display: flex;
      gap: clamp(6px, 1vw, 12px);
      align-items: center;

      &--text {
        display: flex;
        flex-direction: column;
        user-select: none;

        h3 {
          margin: 0;
          font-size: clamp(12px, 1.3vw, 18px);
          font-weight: 600;
        }

        p {
          margin: 0;
          font-size: clamp(10px, 0.8vw, 14px);
        }
      }

      @media (max-width: $mobile) {
        background-color: white;
        border-radius: 10px;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
      }
    }

    &__icon {
      background-color: var(--background);
      box-shadow: var(--inner-shadow);
      padding: 8px;
      border-radius: 10px;
      width: var(--size);
      height: var(--size);
      display: grid;
      place-items: center;

      svg {
        width: 100%;
        height: 100%;
      }

      @media (max-width: $mobile) {
        display: none;
      }
    }
  }
}
</style>
