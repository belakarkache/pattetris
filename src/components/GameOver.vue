<template>
    <div class="modal__overlay">
        <div class="modal__container">
            <h2>Você perdeu!</h2>
            <Button text="Jogar novamente" @click="restartGame" />
        </div>
    </div>
</template>
<script>
import Button from './Button.vue';

export default {
    name: 'GameOver',
    components: { Button },
    methods: {
        restartGame() {
            location.reload();
        }
    }
}
</script>
<style lang="scss">
.modal {

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(40, 36, 81, 0.3);
        border-radius: inherit;
        backdrop-filter: blur(4px);
    }

    &__container {
        background: white;
        border-radius: inherit;
        padding: var(--size);
    }
}
</style>