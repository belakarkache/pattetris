<template>
  <div id="vue-gist" v-pre />
</template>
<script>
import gistSimple from "gist-simple";

export default {
  name: "VueGist",
  props: {
    gistId: {
      type: String,
      default: "",
    },
  },
  watch: {
    gistId: {
      handler() {
        if (this.gistId) {
          gistSimple(document.getElementById("vue-gist"), {
            id: this.gistId,
          });
        }
      },
      immediate: true
    },
  },
};
</script>
