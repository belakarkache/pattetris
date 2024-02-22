<template>
    <div class="mobile-controls">
        <button class="rotate-button" @click="$emit('up')">
            <IconRotate color="var(--hl-purple)" />
        </button>

        <div class="arrow-keys">
            <button>
                <IconArrow @click="$emit('left')" />
            </button>
            <button>
                <IconArrow @click="$emit('bottom')" />
            </button>
            <button>
                <IconArrow @click="$emit('right')" />
            </button>
        </div>
    </div>
</template>
<script>
import IconArrow from '@/components/icons/IconArrow.vue';
import IconRotate from '@/components/icons/IconRotate.vue';

export default {
    name: 'MobileControls',
    components: {
        IconArrow,
        IconRotate
    },
}
</script>

<style lang="scss">
.mobile-controls {
    display: none;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    svg {
        width: 30px;
        height: 30px;
    }

    button {
        padding: 12px 10px;
    }

    .arrow-keys {
        display: flex;
        gap: 30px;

        button {
            background: white;
            width: fit-content;

            &:nth-child(2) {
                transform: rotate(-90deg);
            }

            &:nth-child(3) {
                transform: rotate(180deg);
            }
        }
    }

    .rotate-button {
        background: var(--tetris-purple);
        height: fit-content;
        width: 100%;
    }

    @media(min-width: 330px) and (max-width: 1280px) {
        display: flex;
    }

    @media(min-width: 980px) and (max-width: 1280px) {
        left: unset;
        transform: none;
        right: 30px;
        top: 65%;
    }
}
</style>