<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="(path, index) in paths"
      :key="index"
      :d="path.d"
      :fill="path.fill ? 'currentColor' : 'none'"
      :stroke-width="path.strokeWidth"
    />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const ICONS = {
  "arrow-left": ["M15 5l-7 7 7 7"],
  "arrow-right": ["M9 5l7 7-7 7"],
  "arrow-down": ["M5 9l7 7 7-7"],
  drop: ["M7 4l5 5 5-5", "M7 10l5 5 5-5", "M5 20h14"],
  "rotate-cw": ["M20 12a8 8 0 1 1-2.4-5.7", "M20 4v5h-5"],
  "rotate-ccw": ["M4 12a8 8 0 1 0 2.4-5.7", "M4 4v5h5"],
  pause: ["M9 5v14", "M15 5v14"],
  play: ["M8 5.5v13l10.5-6.5z"],
  restart: ["M3.5 12a8.5 8.5 0 1 0 2.6-6.1", "M3.5 4v5h5"],
  settings: ["M4 7h9", "M17 7h3", "M4 17h3", "M11 17h9", "M15 4.5v5", "M9 14.5v5"],
  help: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M9.6 9.4a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .8-1 1.5v.4", "M12 17h.01"],
  close: ["M6 6l12 12", "M18 6L6 18"],
  lock: ["M6 11h12v9H6z", "M8.5 11V8a3.5 3.5 0 0 1 7 0v3"],
  collection: [
    "M6.65 16.8L3.75 6.7l2.75-.8",
    "M17.35 16.8l2.9-10.1-2.75-.8",
    "M9.5 5h5A1.5 1.5 0 0 1 16 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 17.5v-11A1.5 1.5 0 0 1 9.5 5z",
    { d: "M12 9.2l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z", fill: true, strokeWidth: 1.4 },
  ],
  game: [
    "M7.5 5h9a4.5 4.5 0 0 1 4.5 4.5V16a3 3 0 0 1-5.3 1.9L14 16h-4l-1.7 1.9A3 3 0 0 1 3 16V9.5A4.5 4.5 0 0 1 7.5 5z",
    "M7.5 8.5v4",
    "M5.5 10.5h4",
    "M15.5 9.5h.01",
    "M17.5 11.5h.01",
  ],
  "chevron-left": ["M14 6l-6 6 6 6"],
  "chevron-right": ["M10 6l6 6-6 6"],
  copy: ["M9 9h11v11H9z", "M5 15H4V4h11v1"],
  check: ["M5 12.5l4.5 4.5L19 7.5"],
  sun: ["M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M12 2.5v2", "M12 19.5v2", "M4.6 4.6L6 6", "M18 18l1.4 1.4", "M2.5 12h2", "M19.5 12h2", "M4.6 19.4L6 18", "M18 6l1.4-1.4"],
  moon: ["M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"],
  monitor: ["M3.5 5h17v11h-17z", "M9 20h6", "M12 16v4"],
  hold: ["M7 8h12", "M16 5l3 3-3 3", "M17 16H5", "M8 13l-3 3 3 3"],
  link: ["M14 4h6v6", "M20 4l-9 9", "M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"],
};

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 22 },
});

const FILLED = ["play"];

const paths = computed(() =>
  (ICONS[props.name] ?? []).map((path) =>
    typeof path === "string" ? { d: path, fill: FILLED.includes(props.name) } : path
  )
);
</script>
