<template>
  <div
    class="hamburguer-button"
    :class="{ 'hamburguer-button--active': status }"
  >
    <div class="hamburguer-button__line"></div>
    <div class="hamburguer-button__line"></div>
    <div class="hamburguer-button__line"></div>
  </div>
</template>
<script>
export default {
  name: "Burger",
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.hamburguer-button {
  width: 22px;
  height: 22px;
  position: relative;
  cursor: pointer;

  &__line {
    width: 100%;
    height: 4px;
    background: var(--dark-blue);
    position: absolute;
    left: 0;
    transition: all 0.3s;
    border-radius: 4px;

    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
    }

    &:nth-child(3) {
      bottom: 0;
    }
  }

  &--active {
    .hamburguer-button__line {
      &:nth-child(1) {
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        top: 50%;
        transform: translateY(-50%) rotate(-45deg);
      }
    }
  }
}
</style>
