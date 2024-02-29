<template>
  <div
    class="mobile-controls"
    id="mobile-controls"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      didMove: false,
      throttleTimeout: null,
    };
  },
  methods: {
    handleTouchStart(event) {
      const touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      this.didMove = false;
    },
    handleTouchMove(event) {
      if (this.throttleTimeout !== null) return;
      const touch = event.touches[0];
      const distX = touch.clientX - this.startX;
      const distY = touch.clientY - this.startY;

      if (Math.abs(distX) > 20 || Math.abs(distY) > 20) {
        if (Math.abs(distX) > Math.abs(distY)) {
          if (distX > 0) {
            this.$emit("right");
          } else {
            this.$emit("left");
          }
        } else {
          if (distY > 0) {
            this.$emit("bottom");
          } else {
            this.$emit("tap");
          }
        }
        this.didMove = true;
      }

      this.throttleTimeout = setTimeout(() => {
        this.throttleTimeout = null;
      }, 90);
    },
    handleTouchEnd() {
      if (!this.didMove) {
        this.$emit("tap");
      }
    },
  },
};
</script>

<style lang="scss">
.mobile-controls {
  position: absolute;
  background: transparent;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  touch-action: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
