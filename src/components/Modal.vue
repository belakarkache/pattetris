<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(40, 36, 81, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: white;
  padding: var(--size) calc(var(--size) * 2);
  border-radius: 20px;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25), inset 0px -8px 0px #d1d8ff;
  animation: modal-appear 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-appear {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  60% {
    opacity: 1;
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
</style>
