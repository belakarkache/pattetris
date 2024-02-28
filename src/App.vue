<template>
  <div class="app-wrapper">
    <Sidebar />

    <div class="too-small-warning">
      <Vue3Lottie
        class="sad-animation"
        :animationData="sad"
        :height="200"
        :width="200"
        :loop="true"
        :autoPlay="true"
      />

      <p style="line-height: 1.4">
        Ops! Seu dispositivo é pequeno demais para visualizar a aplicação
        corretamente. Por favor, acesse novamente por um computador ou um
        dispositivo maior 📱
      </p>
    </div>

    <router-view
      v-slot="{ Component }"
      class="router-view"
    >
      <transition
        name="scale"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import GameBoard from "@/components/GameBoard.vue";
import Sad from "@/assets/animations/sad.json";

export default {
  name: "Home",
  components: {
    GameBoard,
    Sidebar,
  },
  data() {
    return {
      sad: Sad,
    };
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;

  .app-wrapper {
    display: flex;
    gap: calc(var(--size) / 2);
    flex-direction: row;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .router-view {
    display: flex;

    @media (max-width: $tablet) {
      margin-top: 70px;
    }

    @media (max-width: $min) {
      display: none;
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

    @media (max-width: $min) {
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
