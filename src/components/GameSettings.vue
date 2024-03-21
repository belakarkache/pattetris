<template>
  <div class="game-settings">
    <div v-for="setting in settings" :key="setting.name" class="game-settings__setting"
      @click="handleSettingClick(setting)" :class="{
      'game-settings__setting--disabled':
        setting.name === 'Placar' ||
        (store.isGameRunning && setting.name !== 'Som'),
    }" data-location="container">
      <component :is="setting.icon" :size="20" :aria-label="setting.name" :isOn="JSON.parse(store.soundPreference)" />
    </div>

    <Modal v-if="isInstructionsOpen">
      <GameInstructions @close="isInstructionsOpen = !isInstructionsOpen" />
    </Modal>
  </div>
</template>
<script>
import IconGamepad from "./icons/IconGamepad.vue";
import IconLeaderboard from "./icons/IconLeaderboard.vue";
import IconSound from "./icons/IconSound.vue";
import { useMainStore } from "@/store/main";
import Modal from "./Modal.vue";
import GameInstructions from "./GameInstructions.vue";

export default {
  name: "GameSettings",
  components: {
    IconGamepad,
    IconLeaderboard,
    IconSound,
    Modal,
    GameInstructions,
  },
  emits: ["toggle-sound"],
  data() {
    return {
      settings: [
        {
          name: "Som",
          icon: "IconSound",
        },
        {
          name: "Instruções",
          icon: "IconGamepad",
        },
        {
          name: "Placar",
          icon: "IconLeaderboard",
        },
      ],
      isSoundOn: true,
      isInstructionsOpen: false,
      isLeaderboardOpen: false,
      store: useMainStore(),
    };
  },
  methods: {
    handleSettingClick(setting) {
      if (setting.name === "Som") {
        this.isSoundOn = !this.isSoundOn;
        this.store.setSoundPreference(this.isSoundOn);
      } else if (setting.name === "Instruções") {
        this.isInstructionsOpen = !this.isInstructionsOpen;
      } else if (setting.name === "Placar") {
        this.isLeaderboardOpen = !this.isLeaderboardOpen;
      }
    },
  },
  mounted() {
    if (
      !localStorage.getItem("hasVisited") &&
      this.$router.currentRoute.value.name === "home"
    ) {
      this.isInstructionsOpen = true;
      localStorage.setItem("hasVisited", true);
    }
  },
};
</script>

<style lang="scss">
.game-settings {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;

  &__setting {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: var(--background);
    display: grid;
    place-items: center;
    cursor: pointer;

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    svg {
      pointer-events: none;
    }
  }

  @media (max-width: $mobile) {
    flex-direction: column;

    &__setting {
      background-color: white;
    }
  }
}
</style>
