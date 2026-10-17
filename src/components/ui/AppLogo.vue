<template>
  <span class="logo" :class="{ 'logo--mark': markOnly }" v-html="svg" />
</template>

<script setup>
import { computed } from "vue";
import logo from "@/assets/logo.svg?raw";
import mark from "@/assets/logo-no-txt.svg?raw";

const props = defineProps({
  markOnly: { type: Boolean, default: false },
});

const svg = computed(() =>
  (props.markOnly ? mark : logo)
    .replaceAll('fill="#282451"', 'fill="currentColor"')
    .replace("<svg", '<svg aria-hidden="true" focusable="false"')
);
</script>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  color: var(--ink);

  :deep(svg) {
    height: 26px;
    width: auto;
  }
}
</style>
