<template>
  <Teleport to="body">
    <TransitionGroup name="toast">
      <div
        v-if="show"
        class="toast"
        :class="{ 'is-active': show }"
      >
        <div class="border-rainbow rainbow">
          <div class="toast-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </Teleport>
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
.toast-enter-from,
.toast-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.25s ease-in-out all;
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 101;
  border-radius: 30px;
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
    color: var(--dark-blue);
    .toast-text {
      color: var(--dark-blue);
      &--small {
        font-size: 14px;
        font-weight: 400;
      }

      &--large {
        font-size: 22px;
        font-weight: 600;
      }
    }

    .button {
      padding: 12px 22px;
    }
  }

  &.is-active {
    pointer-events: auto;
  }
}
</style>
