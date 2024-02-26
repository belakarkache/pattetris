<template>
  <div class="stats">
    <div class="stats__wrapper">
      <div class="stat__wrapper">
        <IconCheck
          :size="26"
          class="stat__icon"
        />
        <div class="stat__wrapper--text">
          <h3>{{ store.lines < 10 ? "0" + store.lines : store.lines }}</h3>
          <p>linhas completas</p>
        </div>
      </div>

      <div class="stat__wrapper">
        <IconThreeStars
          :size="26"
          class="stat__icon"
        />
        <div class="stat__wrapper--text">
          <h3>{{ store.maxScore }}</h3>
          <p>pontuação máxima</p>
        </div>
      </div>

      <div class="stat__wrapper">
        <IconStar
          :size="26"
          class="stat__icon"
        />
        <div class="stat__wrapper--text">
          <h3 :class="{ rainbow: store.score > store.maxScore }">
            {{ store.score }}
          </h3>
          <p :class="{ rainbow: store.score > store.maxScore }">
            pontuação atual
          </p>
        </div>
      </div>

      <div class="stat__wrapper">
        <IconUnlock
          :size="26"
          class="stat__icon"
        />
        <div class="stat__wrapper--text">
          <h3>{{ store.content }}/10</h3>
          <p>conteúdos liberados</p>
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
};
</script>
<style lang="scss">
.stats {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
          font-size: clamp(12px, 1.3vw, 20px);
          font-weight: 600;
        }

        p {
          margin: 0;
          font-size: clamp(10px, 0.8vw, 14px);
        }
      }
    }

    &__icon {
      background-color: var(--background);
      box-shadow: var(--inner-shadow);
      padding: clamp(4px, 1vw, 10px);
      border-radius: 10px;
      width: clamp(16px, 2.5vw, 30px);
      height: clamp(16px, 2.5vw, 30px);

      @media (max-width: $mobile) {
        padding: 0;
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
}
</style>
