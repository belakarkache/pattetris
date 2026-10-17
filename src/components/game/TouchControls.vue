<template>
  <div class="touch" aria-label="Controles" role="group">
    <div v-for="group in GROUPS" :key="group.name" class="touch__group" :class="`touch__group--${group.name}`">
      <KeyButton
        v-for="button in group.buttons"
        :key="button.action"
        :tone="button.tone"
        :icon="button.icon"
        size="lg"
        icon-only
        class="touch__key"
        :class="{ 'is-pressed': pressed.has(button.action) }"
        @pointerdown.prevent="press(button.action, $event)"
        @pointerup="release(button.action)"
        @pointercancel="release(button.action)"
        @lostpointercapture="release(button.action)"
        @contextmenu.prevent
      >
        {{ CONTROL_BY_ACTION[button.action].label }}
      </KeyButton>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onDeactivated, reactive } from "vue";
import KeyButton from "@/components/ui/KeyButton.vue";
import { CONTROL_BY_ACTION, createRepeater } from "@/game/controls";

const props = defineProps({
  actions: { type: Object, required: true },
});

const GROUPS = [
  {
    name: "move",
    buttons: [
      { action: "moveLeft", icon: "arrow-left", tone: "sky" },
      { action: "softDrop", icon: "arrow-down", tone: "sky" },
      { action: "moveRight", icon: "arrow-right", tone: "sky" },
    ],
  },
  {
    name: "act",
    buttons: [
      { action: "rotateCcw", icon: "rotate-ccw", tone: "lilac" },
      { action: "rotateCw", icon: "rotate-cw", tone: "lilac" },
      { action: "hardDrop", icon: "drop", tone: "pink" },
    ],
  },
];

const pressed = reactive(new Set());
const repeaters = new Map();

const press = (action, event) => {
  event.currentTarget.setPointerCapture?.(event.pointerId);
  navigator.vibrate?.(8);
  pressed.add(action);
  const run = props.actions[action];
  const { repeat } = CONTROL_BY_ACTION[action];
  if (!repeat) {
    run();
    return;
  }
  repeaters.get(action)?.stop();
  const repeater = createRepeater(run, repeat);
  repeaters.set(action, repeater);
  repeater.start();
};

const release = (action) => {
  pressed.delete(action);
  repeaters.get(action)?.stop();
  repeaters.delete(action);
};

const releaseAll = () => [...pressed].forEach(release);

onDeactivated(releaseAll);
onBeforeUnmount(releaseAll);
</script>

<style lang="scss">
.touch {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding-bottom: env(safe-area-inset-bottom);
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;

  &__group {
    display: flex;
    gap: 8px;
  }

  &__key.key {
    width: clamp(46px, 13.5vw, 64px);
    min-height: 0;
    border-radius: 14px;
  }
}
</style>
