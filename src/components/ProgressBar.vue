<template>
    <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Number,
            required: true
        }

    }
};
</script>


<style lang="scss">
.progress-bar-container {
    width: 100%;
    height: clamp(16px, 1.3vw, 20px);
    background-color: var(--background);
    border-radius: 10px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    transition: width 0.3s ease;
    background: linear-gradient(270deg, var(--tetris-blue) 0%, var(--tetris-green) 100%);
}
</style>