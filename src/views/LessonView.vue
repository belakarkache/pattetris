<template>
  <main class="lesson">
    <nav class="lesson__crumbs" aria-label="Navegação da lição">
      <RouterLink :to="{ name: 'collection' }">
        <AppIcon name="chevron-left" :size="18" />
        Coleção
      </RouterLink>
    </nav>

    <div v-if="failed" class="lesson__error" role="alert">
      <p>Não foi possível carregar esta lição.</p>
      <KeyButton tone="plain" size="sm" @click="reload">Tentar de novo</KeyButton>
    </div>

    <article v-else-if="lesson" class="lesson__article">
      <header class="lesson__hero" :class="`tone-${category.tone}`">
        <img class="lesson__cover" :src="lesson.cover" alt="" width="1400" height="600" />
        <span class="lesson__icon">
          <img :src="pattern.icon" alt="" width="64" height="64" />
        </span>
      </header>

      <div class="lesson__intro">
        <span class="lesson__category">Padrão {{ category.label.toLowerCase() }}</span>
        <h1>{{ pattern.title }}</h1>
        <p class="lesson__lead">{{ lesson.oneLiner }}</p>
      </div>

      <section class="lesson__section">
        <h2>O que é</h2>
        <RichText :text="lesson.definition" />
      </section>

      <aside class="lesson__analogy">
        <div class="lesson__analogy-mark" aria-hidden="true">
          <span v-for="index in 4" :key="index" class="block piece-t" />
        </div>
        <div>
          <h2>No Pattetris</h2>
          <RichText :text="lesson.analogy" />
        </div>
      </aside>

      <section class="lesson__section">
        <h2>Exemplo em JavaScript</h2>
        <CodeBlock :file="lesson.code.file" :source="lesson.code.source" />
      </section>

      <section v-for="section in POINT_SECTIONS" :key="section.key" class="lesson__section">
        <h2>{{ section.title }}</h2>
        <ul class="lesson__points" :class="section.modifier">
          <li v-for="item in lesson[section.key]" :key="item.title">
            <strong>{{ item.title }}</strong>
            <RichText :text="item.text" tag="span" />
          </li>
        </ul>
      </section>

      <section class="lesson__section">
        <h2>Para ir além</h2>
        <ul class="lesson__refs">
          <li v-for="reference in lesson.references" :key="reference.url">
            <a :href="reference.url" target="_blank" rel="noopener noreferrer">
              {{ reference.name }}
              <AppIcon name="link" :size="16" />
            </a>
          </li>
        </ul>
      </section>

      <footer class="lesson__footer">
        <RouterLink v-if="previous" :to="{ name: 'lesson', params: { slug: previous.slug } }" class="lesson__pager">
          <AppIcon name="chevron-left" :size="18" />
          <span><small>Anterior</small>{{ previous.title }}</span>
        </RouterLink>
        <RouterLink v-if="next" :to="{ name: 'lesson', params: { slug: next.slug } }"
          class="lesson__pager lesson__pager--next">
          <span><small>Próximo</small>{{ next.title }}</span>
          <AppIcon name="chevron-right" :size="18" />
        </RouterLink>
        <KeyButton v-else :to="{ name: 'game' }" icon="play" class="lesson__play">
          Voltar ao jogo
        </KeyButton>
      </footer>
    </article>
  </main>
</template>

<script setup>
import { computed, ref, shallowRef, watch } from "vue";
import { useRouter } from "vue-router";
import AppIcon from "@/components/ui/AppIcon.vue";
import KeyButton from "@/components/ui/KeyButton.vue";
import CodeBlock from "@/components/lesson/CodeBlock.vue";
import RichText from "@/components/lesson/RichText.vue";
import { preloadHighlighter } from "@/components/lesson/highlighter";
import { CATEGORIES, PATTERNS, findPattern } from "@/data/patterns";
import { useProgressStore } from "@/stores/progress";

const LESSONS = import.meta.glob("@/data/lessons/*.js", { import: "default" });

const POINT_SECTIONS = [
  { key: "benefits", title: "Por que usar", modifier: "lesson__points--good" },
  { key: "drawbacks", title: "Cuidados", modifier: "lesson__points--care" },
  { key: "useCases", title: "Onde aparece", modifier: "" },
];

const props = defineProps({
  slug: { type: String, required: true },
});

const progress = useProgressStore();
const router = useRouter();
const lesson = shallowRef(null);
const failed = ref(false);

const pattern = computed(() => findPattern(props.slug));
const category = computed(() => CATEGORIES[pattern.value.category]);
const index = computed(() => PATTERNS.indexOf(pattern.value));
const previous = computed(() => PATTERNS[index.value - 1] ?? null);
const next = computed(() => (index.value + 1 < progress.unlocked ? PATTERNS[index.value + 1] : null));

const load = async (slug) => {
  preloadHighlighter();
  const loader = LESSONS[`/src/data/lessons/${slug}.js`];
  failed.value = !loader;
  if (!loader) return;
  try {
    lesson.value = await loader();
    progress.markRead(slug);
  } catch {
    failed.value = true;
  }
};

watch(() => props.slug, load, { immediate: true });

watch(
  () => progress.isUnlocked(props.slug),
  (unlocked) => unlocked || router.replace({ name: "collection" })
);

const reload = () => load(props.slug);
</script>

<style lang="scss">
.lesson {
  width: min(820px, 100%);
  margin: 0 auto;
  padding: 16px var(--gutter) 80px;

  &__error {
    display: grid;
    justify-items: start;
    gap: 12px;
    padding: 24px 0;
    color: var(--ink-soft);
  }

  &__crumbs a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 40px;
    color: var(--ink-soft);
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: var(--ink);
    }
  }

  &__article {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 8px;
  }

  &__hero {
    position: relative;
    margin-bottom: 8px;
  }

  &__cover {
    width: 100%;
    height: auto;
    aspect-ratio: 7 / 3;
    object-fit: cover;
    border-radius: var(--r-panel);
    background: var(--tone);
  }

  &__icon {
    position: absolute;
    left: 28px;
    bottom: -36px;
    display: grid;
    place-items: center;
    width: 96px;
    height: 96px;
    border-radius: 22px;
    background: var(--tone);
    box-shadow: var(--bevel), 0 0 0 6px var(--paper);
  }

  &__intro {
    display: grid;
    gap: 10px;
    margin-top: 12px;

    h1 {
      font-size: var(--text-3xl);
      font-weight: 800;
    }
  }

  &__category {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--ink-soft);
  }

  &__lead {
    max-width: 52ch;
    font-size: var(--text-lg);
    color: var(--ink-soft);
  }

  &__section {
    display: grid;
    gap: 14px;

    h2 {
      font-size: var(--text-xl);
      font-weight: 700;
    }

    > p {
      max-width: 68ch;
      line-height: 1.7;
    }
  }

  p code,
  li code {
    padding: 1px 6px;
    border-radius: 6px;
    background: var(--well);
  }

  &__analogy {
    display: flex;
    gap: 20px;
    padding: 24px;
    border-radius: var(--r-panel);
    background: var(--surface);
    box-shadow: 0 6px 0 var(--line);

    h2 {
      margin-bottom: 8px;
      font-size: var(--text-lg);
      font-weight: 700;
    }

    p {
      line-height: 1.7;
    }
  }

  &__analogy-mark {
    flex: none;
    display: grid;
    grid-template-columns: repeat(3, 14px);
    grid-template-rows: repeat(2, 14px);
    gap: 2px;
    margin-top: 6px;

    .block:first-child {
      grid-column: 2;
    }

    .block {
      border-radius: 3px;
    }
  }

  &__points {
    display: grid;
    gap: 12px;
    padding: 0;
    list-style: none;

    li {
      display: grid;
      gap: 2px;
      padding-left: 22px;
      position: relative;
      max-width: 68ch;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 6px;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        background: var(--sky);
        box-shadow: var(--bevel);
      }

      span {
        color: var(--ink-soft);
      }
    }

    &--good li::before {
      background: var(--mint);
    }

    &--care li::before {
      background: var(--butter);
    }
  }

  &__refs {
    display: grid;
    gap: 8px;
    padding: 0;
    list-style: none;

    a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      text-underline-offset: 3px;
    }
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
  }

  &__pager {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 16px;
    background: var(--surface);
    text-decoration: none;
    font-weight: 600;

    span {
      display: grid;
    }

    small {
      font-weight: 400;
      font-size: var(--text-xs);
      color: var(--ink-soft);
    }

    &--next {
      margin-left: auto;
      text-align: right;
    }
  }

  &__play {
    margin-left: auto;
  }

  @media (max-width: 640px) {
    &__article {
      gap: 32px;
    }

    &__icon {
      left: 16px;
      bottom: -28px;
      width: 76px;
      height: 76px;

      img {
        width: 52px;
        height: 52px;
      }
    }

    &__analogy {
      flex-direction: column;
      gap: 12px;
      padding: 20px;
    }
  }
}
</style>
