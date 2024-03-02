<template>
  <nav class="sidebar">
    <router-link to="/">
      <img
        src="@/assets/logo.svg"
        width="150"
        class="logo"
      />
    </router-link>

    <Burger
      @click="isMenuOpen = !isMenuOpen"
      :status="isMenuOpen"
      v-if="$matches.medium.max && !store.isGameRunning"
    />

    <ul
      class="sidebar__links"
      :class="{ 'sidebar__links--open': isMenuOpen }"
    >
      <router-link
        v-for="item in items"
        :key="item.name"
        :to="item.route"
        :class="{ disabled: store.isGameRunning }"
      >
        <component
          :is="item.icon"
          :size="26"
          :color="
            $router.currentRoute.value.name === item.name
              ? 'var(--hl-pink)'
              : 'var(--dark-blue)'
          "
        />
        {{ item.text }}
      </router-link>
    </ul>
  </nav>
</template>

<script>
import Burger from "./Burger.vue";
import IconBookmark from "./icons/IconBookmark.vue";
import IconGamepad from "./icons/IconGamepad.vue";
import IconGift from "./icons/IconGift.vue";
import IconInfo from "./icons/IconInfo.vue";
import { useMainStore } from "@/store/main";

export default {
  name: "Sidebar",
  components: { IconGamepad, IconGift, IconInfo, IconBookmark, Burger },
  data() {
    return {
      isMenuOpen: false,
      store: useMainStore(),
      items: [
        { name: "home", icon: "IconGamepad", route: "/", text: "Jogar" },
        {
          name: "content",
          icon: "IconGift",
          route: "/content",
          text: "Conteúdos",
        },
        {
          name: "about",
          icon: "IconInfo",
          route: "/about",
          text: "Sobre o Pattetris",
        },
        {
          name: "credits",
          icon: "IconBookmark",
          route: "/credits",
          text: "Créditos",
        },
      ],
    };
  },
  watch: {
    "$router.currentRoute.value.name": {
      handler() {
        this.isMenuOpen = false;
      },
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  background: white;
  width: fit-content;
  padding: var(--size);
  padding-left: calc(var(--size) / 2);
  padding-right: calc(var(--size) / 2);
  height: 80%;
  border-bottom-right-radius: 40px;

  .logo {
    margin-left: 8px;
    margin-top: 80px;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: var(--size);
    padding: 0;
    margin-top: 100px;

    a {
      text-decoration: none;
      color: var(--dark-blue);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 22px;
      border-radius: 40px;
      width: max-content;
      transition: 0.3s ease-in-out all;

      &.router-link-active {
        color: var(--hl-pink);
        background-color: var(--sd-pink);
      }

      &:hover {
        background-color: var(--sd-pink);
      }

      &.disabled {
        pointer-events: none;
        opacity: 0.5;
        filter: blur(2px);
      }
    }
  }

  @media (max-width: $tablet) {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: calc(var(--size) / 2);
    display: flex;
    flex-direction: row;
    height: fit-content;
    max-height: 70px;
    z-index: 100;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 0;
    border: 2px solid var(--sd-pink);

    .logo {
      margin: 0;
      width: 130px;
    }

    &__links {
      margin: 0;
      display: none;
      position: absolute;
      background-color: white;
      top: 86px;
      right: 14px;
      border-radius: 20px;
      padding: calc(var(--size) / 2);
      flex-direction: row;
      border: 2px solid var(--sd-pink);

      &--open {
        display: flex;
      }
    }
  }

  @media (max-width: 940px) {
    &__links {
      flex-direction: column;
    }
  }
}
</style>
