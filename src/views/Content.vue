<template>
  <section class="content-page">
    <h1>Conteúdos liberados</h1>
    <div class="content-grid">
      <div
        v-for="content in contents"
        :key="content.id"
        class="content-wrapper"
      >
        <div
          class="content"
          :class="content.id > store.content && 'content--blocked'"
        >
          <img
            :src="content.icon"
            width="60"
            height="60"
            :alt="`Ícone do conteúdo ${content.title}`"
          />
          <h3>{{ content.title }}</h3>
          <p>{{ content.description }}</p>

          <Button
            textColor="var(--hl-purple)"
            bgColor="var(--tetris-purple)"
            text="Ver mais"
            :disabled="content.id > store.content"
            @click="$router.push(`/content/${content.id}`)"
          />
        </div>

        <div
          class="unlock-instructions"
          v-if="content.id > store.content"
        >
          <img
            src="@/assets/content-icons/lock.svg"
            width="60"
            height="60"
            alt="Ícone de cadeado"
            class="lock-icon"
          />
          Complete o nível {{ content.id }} para liberar
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useMainStore } from "@/store/main";
import { useContentStore } from "@/store/content";
import Button from "@/components/Button.vue";

export default {
  name: "Content",
  components: { Button },
  data() {
    return {
      contents: useContentStore().contents,
      store: useMainStore(),
    };
  },
};
</script>

<style lang="scss">
.content-page {
  padding: var(--size);
  display: flex;
  flex-direction: column;
  gap: calc(var(--size) + 20px);
  overflow-y: auto;
  overflow-x: hidden;

  .content-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 80px 20px;

    .content-wrapper {
      position: relative;
    }

    .content {
      background: white;
      border-radius: 30px;
      width: 170px;
      position: relative;
      padding: 20px;
      padding-top: 40px;
      user-select: none;
      height: 120px;

      img {
        position: absolute;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
      }

      h3 {
        font-size: 16px;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
      }

      &--blocked {
        filter: grayscale(1) blur(4px) opacity(0.5);
      }

      button {
        font-size: 14px;
        position: absolute;
        bottom: -20px;
        left: 20%;
        padding: 10px 22px;
      }
    }

    .unlock-instructions {
      position: absolute;
      text-align: center;
      padding: 20px;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      gap: 6px;
      user-select: none;

      &:hover {
        .lock-icon {
          -webkit-animation: wobble 0.8s both;
          animation: wobble 0.8s both;
        }
      }
    }
  }

  @media (max-width: $tablet) {
    justify-content: flex-start;

    .content-wrapper {
      justify-content: center;
    }
  }
}

@-webkit-keyframes wobble {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-15px) rotate(3deg);
    transform: translateX(-15px) rotate(3deg);
  }
  30% {
    -webkit-transform: translateX(7.5px) rotate(-3deg);
    transform: translateX(7.5px) rotate(-3deg);
  }
  45% {
    -webkit-transform: translateX(-7.5px) rotate(1.8deg);
    transform: translateX(-7.5px) rotate(1.8deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(-1.2deg);
    transform: translateX(4.5px) rotate(-1.2deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(0.6deg);
    transform: translateX(-3px) rotate(0.6deg);
  }
}
@keyframes wobble {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-15px) rotate(3deg);
    transform: translateX(-15px) rotate(3deg);
  }
  30% {
    -webkit-transform: translateX(7.5px) rotate(-3deg);
    transform: translateX(7.5px) rotate(-3deg);
  }
  45% {
    -webkit-transform: translateX(-7.5px) rotate(1.8deg);
    transform: translateX(-7.5px) rotate(1.8deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(-1.2deg);
    transform: translateX(4.5px) rotate(-1.2deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(0.6deg);
    transform: translateX(-3px) rotate(0.6deg);
  }
}
</style>
