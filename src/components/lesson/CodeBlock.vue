<template>
  <figure class="code">
    <figcaption class="code__bar">
      <span class="code__tab">
        <span class="code__dot" aria-hidden="true" />
        {{ file }}
      </span>
      <button type="button" class="code__copy" @click="copy">
        <AppIcon :name="copied ? 'check' : 'copy'" :size="16" />
        {{ copied ? "Copiado" : "Copiar" }}
      </button>
    </figcaption>
    <div v-if="html" class="code__body" v-html="html" />
    <pre v-else class="code__body"><code>{{ source }}</code></pre>
  </figure>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppIcon from "@/components/ui/AppIcon.vue";
import { highlight } from "./highlighter";

const props = defineProps({
  file: { type: String, required: true },
  source: { type: String, required: true },
});

const html = ref("");
const copied = ref(false);

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.source);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1800);
  } catch {}
};

onMounted(async () => {
  try {
    html.value = await highlight(props.source.trimEnd());
  } catch {}
});
</script>

<style lang="scss">
.code {
  --code-foreground: #e8e9fb;
  --code-background: transparent;
  --code-token-keyword: var(--pink);
  --code-token-string: var(--mint);
  --code-token-string-expression: var(--mint);
  --code-token-constant: var(--butter);
  --code-token-function: var(--sky);
  --code-token-parameter: var(--peach);
  --code-token-punctuation: #9b98c9;
  --code-token-comment: #7d7aab;
  --code-token-link: var(--lilac);

  overflow: hidden;
  border-radius: 20px;
  background: var(--on-pastel);
  box-shadow: 0 6px 0 #1a1740;

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 8px 0 16px;
    background: #1f1c45;
  }

  &__tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px 12px;
    margin-left: -16px;
    border-radius: 12px 12px 0 0;
    background: var(--on-pastel);
    color: #e8e9fb;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: var(--butter);
    box-shadow: var(--bevel);
  }

  &__copy {
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 34px;
    padding: 0 12px;
    margin-bottom: 8px;
    border: 0;
    border-radius: 10px;
    background: rgb(255 255 255 / 0.08);
    color: #e8e9fb;
    font-size: var(--text-sm);
    cursor: pointer;

    &:hover {
      background: rgb(255 255 255 / 0.14);
    }
  }

  &__body {
    margin: 0;
    overflow-x: auto;
    color: var(--code-foreground);

    pre {
      margin: 0;
      padding: 18px 20px 22px 0;
      background: transparent !important;
      counter-reset: line;
    }

    code {
      display: block;
      min-width: max-content;
      font-size: 0.875rem;
      font-variant-ligatures: none;
      line-height: 1.7;
    }

    .line::before {
      content: counter(line);
      counter-increment: line;
      display: inline-block;
      width: 3.25em;
      padding-right: 1.25em;
      text-align: right;
      color: #6d6a9c;
      user-select: none;
    }
  }

  > pre.code__body {
    padding: 18px 20px;
  }
}
</style>
