<template>
  <div class="next-content">
    <small>Próximo conteúdo a liberar: </small>
    <p>
      {{ contents[store.content].title }}
    </p>
  </div>
</template>
<script>
import { useMainStore } from "@/store/main";
import { useContentStore } from "@/store/content";

export default {
  name: "NextContent",
  data() {
    return {
      store: useMainStore(),
      contents: useContentStore().contents,
    };
  },
};
</script>
<style lang="scss">
.next-content {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: clamp(20px, 2.5vw, var(--size));
  background: white;
  border-top-left-radius: 30px;

  small {
    font-size: 14px;
    margin-bottom: 10px;
  }

  p {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    padding-top: 4px;
  }

  @media (max-width: $tablet) {
    top: 12%;
    bottom: unset;
    border-bottom-left-radius: 30px;
  }
}
</style>
