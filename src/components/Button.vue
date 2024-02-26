<template>
  <button
    :style="{ background: bgColor }"
    class="button shadow"
    :disabled="disabled"
    @click="triggerAnimation"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "Button",
    },
    bgColor: {
      type: String,
      default: "var(--tetris-green)",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
button {
  all: unset;
  padding: 16px 28px;
  font-weight: 600;
  font-size: clamp(12px, 1.3vw, 18px);
  text-transform: uppercase;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease all;
  color: rgba(0, 0, 0, 0.55);

  &:active {
    transform: scale(0.96);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  @media (max-width: $tablet) {
    padding: 12px 24px;
  }
}
</style>
