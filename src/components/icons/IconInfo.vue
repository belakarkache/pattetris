<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 15.3333V22M16 10.0133L16.0134 9.99867M16 29.3333C23.364 29.3333 29.3334 23.364 29.3334 16C29.3334 8.636 23.364 2.66667 16 2.66667C8.63602 2.66667 2.66669 8.636 2.66669 16C2.66669 23.364 8.63602 29.3333 16 29.3333Z"
      :stroke="color"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: "IconInfo",
  props: {
    size: {
      type: Number,
      default: 24,
    },
    color: {
      type: String,
      default: "var(--dark-blue)",
    },
  },
};
</script>
