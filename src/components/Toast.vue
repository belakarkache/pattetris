<template>
  <transition name="slide">
    <div
      class="toast"
      :class="{ 'is-active': show }"
    >
      <div class="border-rainbow rainbow">
        <div class="toast-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  border-radius: 30px;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;

  .border-rainbow {
    background-clip: unset;
    border-radius: 30px;
    padding: 2px;
    padding-bottom: 6px;
    box-shadow: inset 0px -2.5px 0px rgba(0, 0, 0, 0.15);
  }

  .toast-content {
    background: white;
    padding: 20px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &.is-active {
    opacity: 1;
    pointer-events: auto;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
