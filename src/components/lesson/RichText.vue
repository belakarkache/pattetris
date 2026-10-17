<template>
  <component :is="tag">
    <template v-for="(part, index) in parts" :key="index">
      <code v-if="part.code">{{ part.text }}</code>
      <template v-else>{{ part.text }}</template>
    </template>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: "p" },
});

const parts = computed(() =>
  props.text.split(/`([^`]+)`/).map((text, index) => ({ text, code: index % 2 === 1 }))
);
</script>
