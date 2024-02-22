<template>
  <div class="lesson">
    <div class="lesson__breadcrumb">
      <router-link to="/content">
        <img
          src="@/assets/content-icons/folder.svg"
          width="24"
          height="24"
        />
        Conteúdos
      </router-link>
      /
      <div class="current-lesson">
        <img
          :src="lessonInfo.icon"
          width="24"
          height="24"
        />
        {{ lessonInfo.title }}
      </div>
    </div>

    <div class="lesson__cover">
      <img
        :src="fullContent.coverImage"
        height="280"
        width="1024"
      />

      <img
        :src="lessonInfo.icon"
        width="120"
        height="120"
        class="cover-icon"
      />
    </div>

    <div class="lesson__content">
      <h1 class="content-title">{{ lessonInfo.title }}</h1>

      <p class="content-subtitle">O que é o {{ lessonInfo.title }}?</p>
      <p class="content-description">
        {{ fullContent.definition }}
      </p>

      <p class="content-subtitle">Benefícios</p>
      <ul class="content-benefits">
        <li
          v-for="benefit in fullContent.benefits"
          :key="benefit"
        >
          <img
            src="@/assets/content-icons/sparkles.svg"
            height="20"
            width="20"
          />
          <div
            v-html="benefit"
            class="benefit-text"
          />
        </li>
      </ul>

      <p class="content-subtitle">Exemplo em Javascript</p>

      <div
        v-for="(step, index) in fullContent.steps"
        :key="index"
      >
        <span>{{ step.instruction }}</span>

        <pre>
          {{ step.code }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { useContentStore } from "@/store/content";
import { useMainStore } from "@/store/main";
import lessons from "@/data/lessons";

export default {
  name: "lesson",
  data() {
    return {
      contents: useContentStore().contents,
      store: useMainStore(),
      lessonInfo: {},
      fullContent: {},
    };
  },
  mounted() {
    this.lessonInfo = this.contents[Number(this.$route.params.id) - 1];
    lessons.forEach((lesson) => {
      if (lesson.id === Number(this.$route.params.id)) {
        this.fullContent = lesson;
      }
    });
  },
};
</script>
<style lang="scss">
.lesson {
  background: white;
  width: 65%;
  overflow-x: hidden;
  overflow-y: scroll;
  flex-direction: column;
  height: 95vh;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 0 auto;

  &__breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: calc(var(--size) / 2);
    a {
      text-decoration: none;
    }

    a,
    .current-lesson {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
    }
  }

  &__cover {
    height: 280px;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    position: relative;
    img:not(.cover-icon) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .cover-icon {
      position: absolute;
      left: 100px;
      bottom: -38px;
    }
  }

  &__content {
    padding: 100px;
    padding-top: 50px !important;

    .content {
      &-title {
        font-size: 36px;
        margin-bottom: 20px;
      }

      &-subtitle {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 8px;
        margin-top: 40px;
      }

      &-description {
        font-size: 16px;
      }

      &-benefits {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;

        .benefit-text {
          strong {
            font-weight: 500;
          }
        }

        li {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
    }
  }

  @media (max-width: 1280px) {
    padding-top: 70px;
    width: 85%;

    &__content {
      padding: 60px;
    }

    &__cover {
      .cover-icon {
        left: 60px;
      }
    }
  }
  @media (max-width: 767px) {
    width: 100%;
    &__content {
      padding: 30px;
    }

    &__cover {
      height: 200px;
      .cover-icon {
        left: 30px;
      }
    }
  }
}
</style>
