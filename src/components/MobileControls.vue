<template>
  <div
    class="mobile-controls"
    v-touch:swipe="swipeHandler"
  ></div>
</template>
<script>
import IconArrow from "@/components/icons/IconArrow.vue";
import IconRotate from "@/components/icons/IconRotate.vue";

export default {
  name: "MobileControls",
  components: {
    IconArrow,
    IconRotate,
  },
  methods: {
    swipeHandler(e) {
      this.$emit(e);
    },
  },
};
</script>

<style lang="scss">
.mobile-controls {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
