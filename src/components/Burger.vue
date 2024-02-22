<template>
    <div class="hamburger">
        <input class="checkbox" type="checkbox" v-model="isOpen" name="burger-menu" />
        <svg fill="none" viewBox="0 0 50 50" height="28" width="28">
            <path class="lineTop line" stroke-linecap="round" stroke-width="4" stroke="black" d="M6 11L44 11"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="black" d="M6 24H43" class="lineMid line"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="black" d="M6 37H43" class="lineBottom line"></path>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'Burger',
    data() {
        return {
            isOpen: false
        }
    },
    watch: {
        isOpen() {
            this.$emit('toggle', this.isOpen)
        }
    }
}
</script>
<style lang="scss" scoped>
.hamburger {
    height: 28px;
    width: 28px;
    transform: 0.2s;
    position: relative;

    @media(min-width: 1280px) {
        display: none;
    }

    .checkbox {
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;
        cursor: pointer;

        &:checked+svg {
            .line {
                stroke: var(--hl-pink);
            }

            .lineTop {
                stroke-dashoffset: 0;
                transform-origin: left;
                transform: rotateZ(45deg) translate(-7px, -5px);
            }

            .lineMid {
                stroke-dashoffset: 40;
            }

            .lineBottom {
                stroke-dashoffset: 0;
                transform-origin: left;
                transform: rotateZ(-45deg) translate(-5px, 5px);
            }
        }
    }
}

.line {
    transition: 0.5s;
    stroke-width: 6px;
    stroke: var(--dark-blue);
}

.lineTop {
    stroke-dasharray: 40 40;
    stroke-dashoffset: 25;
}

.lineBottom {
    stroke-dasharray: 40 40;
    stroke-dashoffset: 60;
}

.lineMid {
    stroke-dasharray: 40 40;
}
</style>