<template>
  <button
    :style="{ color: textColor, background: bgColor }"
    class="button"
    :disabled="disabled"
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
    textColor: {
      type: String,
      default: "var(--hl-green)",
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
  padding: 12px 26px;
  font-weight: 600;
  font-size: clamp(12px, 1.3vw, 18px);
  text-transform: uppercase;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease all;

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  @media (max-width: 1280px) {
    padding: 10px 22px;
  }
}
</style>
