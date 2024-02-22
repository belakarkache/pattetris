<template>
  <div class="app-wrapper">
    <Sidebar />

    <router-view class="router-view"></router-view>

    <div class="too-small-warning">
      <Vue3Lottie class="sad-animation" :animationData="sad" :height="200" :width="200" :loop="true" :autoPlay="true" />

      <p style="line-height: 1.4">Ops! Seu dispositivo é pequeno demais para visualizar a aplicação corretamente. Por
        favor, acesse novamente por
        um computador ou um dispositivo maior 📱</p>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import GameBoard from '@/components/GameBoard.vue';
import { Vue3Lottie } from 'vue3-lottie';
import Sad from '@/assets/sad.json';

export default {
  name: 'Home',
  components: {
    GameBoard,
    Sidebar,
    Vue3Lottie,
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
    gap: var(--size);
    flex-direction: row;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .router-view {
    display: flex;

    @media(max-width: 330px) {
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

    @media(max-width: 330px) {
      display: flex;
    }
  }
}
</style>