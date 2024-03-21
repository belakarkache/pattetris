<template>
  <div class="progress-bar-container">
    <div class="progress-bar shadow" :style="{ width:     progress + '%' }"></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.progress-bar-container {
  width: 100%;
  height: clamp(16px, 1.8vw, 24px);
  background-color: var(--background);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--inner-shadow);

  @media (max-width: $mobile) {
    border: 2px solid white;
  }
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease-in-out;
  background: linear-gradient(270deg,
      var(--tetris-blue) 0%,
      var(--tetris-green) 100%);
  background-position: 0 0;
  background-repeat: repeat-x;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;

  &:after,
  &:before {
    content: "";
    position: absolute;
    background-color: white;
    top: 6px;
    height: 3px;
    border-radius: 2px;
    opacity: 0.6;
  }

  &:after {
    right: 10px;
    width: 16px;
  }

  &:before {
    right: 30px;
    width: 6px;
  }
}
</style>
