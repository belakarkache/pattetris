<template>
    <nav class="sidebar">
        <router-link to="/">
            <img src="@/assets/logo.svg" width="150" class="logo" />
        </router-link>

        <Burger @toggle="openMenu" />

        <ul class="sidebar__links" :class="{ 'sidebar__links--open': isMenuOpen }">
            <router-link to="/">
                <IconGamepad :size="26"
                    :color="$router.currentRoute.value.name === 'home' ? 'var(--hl-pink)' : 'var(--dark-blue)'" />
                Jogar
            </router-link>
            <router-link to="/content">
                <IconGift :size="26"
                    :color="$router.currentRoute.value.name === 'content' ? 'var(--hl-pink)' : 'var(--dark-blue)'" />
                Conteúdos
            </router-link>
            <router-link to="/about">
                <IconInfo :size="26"
                    :color="$router.currentRoute.value.name === 'about' ? 'var(--hl-pink)' : 'var(--dark-blue)'" />
                Sobre o Pattetris
            </router-link>
            <router-link to="/credits">
                <IconBookmark :size="26"
                    :color="$router.currentRoute.value.name === 'credits' ? 'var(--hl-pink)' : 'var(--dark-blue)'" />
                Créditos
            </router-link>
        </ul>
    </nav>
</template>

<script>
import Burger from './Burger.vue';
import IconBookmark from './icons/IconBookmark.vue';
import IconGamepad from './icons/IconGamepad.vue';
import IconGift from './icons/IconGift.vue';
import IconInfo from './icons/IconInfo.vue';

export default {
    name: 'Sidebar',
    components: { IconGamepad, IconGift, IconInfo, IconBookmark, Burger },
    data() {
        return {
            isMenuOpen: false
        }
    },
    methods: {
        openMenu(isOpen) {
            this.isMenuOpen = isOpen;
        }
    }
}
</script>

<style lang="scss">
.sidebar {
    background: white;
    width: fit-content;
    padding: var(--size);
    padding-left: calc(var(--size)/ 2);
    padding-right: calc(var(--size)/ 2);
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
        }
    }


    @media(max-width: 1280px) {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: calc(var(--size) / 2);
        display: flex;
        flex-direction: row;
        height: fit-content;
        z-index: 2;
        justify-content: space-between;
        box-sizing: border-box;

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

            &--open {
                display: flex;
            }
        }
    }

    @media(max-width: 940px) {
        &__links {
            flex-direction: column;
        }
    }
}
</style>