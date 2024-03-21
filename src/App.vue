<template>
  <div class="app-wrapper" @click="handleClickOutsideGame">
    <Sidebar />

    <div class="too-small-warning">
      <Vue3Lottie class="sad-animation" :animationData="sad" :height="200" :width="200" :loop="true" :autoPlay="true" />

      <p style="line-height: 1.4">
        Ops! Seu dispositivo é pequeno demais para visualizar a aplicação
        corretamente. Por favor, acesse novamente por um computador ou um
        dispositivo maior 📱
      </p>
    </div>

    <router-view v-slot="{ Component }" class="router-view">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import GameBoard from "@/components/GameBoard.vue";
import Sad from "@/assets/animations/sad.json";
import { useMainStore } from "./store/main";

export default {
  name: "Home",
  components: {
    GameBoard,
    Sidebar,
  },
  data() {
    return {
      sad: Sad,
      store: useMainStore(),
    };
  },
  methods: {
    handleClickOutsideGame(e) {
      if (this.store.triggerPause) return;

      const containerClick =
        e.target.offsetParent?.classList.contains("container") ||
        e.target.classList?.contains("container") ||
        e.target.dataset.location === "container";

      if (
        !containerClick &&
        this.$router.currentRoute.value.name === "home" &&
        this.store.isGameRunning
      ) {
        this.store.toggleTriggerPause(true);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;

  @media (max-width: $mobile) {
    height: 100vh;
    background-color: white;
  }

  .app-wrapper {
    display: flex;
    gap: calc(var(--size) / 2);
    flex-direction: row;
    width: 100%;
    overflow-x: hidden;
  }

  .router-view {
    display: flex;
    margin-left: 300px;

    padding: var(--size);

    @media (max-width: $tablet) {
      margin-top: 58px;
      margin-left: 0;
    }

    @media (max-width: $min),
    (max-height: $min-height) {
      display: none;
    }

    @media (max-width: $mobile) {
      padding: 20px;
      margin-top: 58px;
    }
  }

  .too-small-warning {
    display: none;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    gap: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;

    .sad-animation {
      max-width: 100%;
    }

    @media (max-width: $min),
    (max-height: $min-height) {
      display: flex;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .scale-enter-from,
  .scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
    filter: blur(20px) grayscale(1);
  }
}
</style>
