<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.95783 23.5369C5.72471 20.9884 3.91446 15.7202 5.91462 11.1016C8.11797 6.01254 14.1113 3.63819 19.3021 5.79833C24.493 7.95848 26.9148 13.8353 24.7115 18.9244C23.8865 20.8377 22.4721 22.4504 20.6662 23.5369"
      :stroke="color"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.4976 18.9655V23.3698C20.4976 23.5291 20.5622 23.6819 20.6771 23.7945C20.792 23.9071 20.9478 23.9704 21.1103 23.9704H25.6027M15.3926 24.9814L15.4028 24.9704"
      :stroke="color"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script>
export default {
  name: "IconRestart",
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
