<template>
    <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.33331 25.3333V6.66667C5.33331 5.95942 5.61426 5.28115 6.11436 4.78105C6.61446 4.28095 7.29274 4 7.99998 4H25.8666C26.0788 4 26.2823 4.08429 26.4323 4.23431C26.5824 4.38434 26.6666 4.58783 26.6666 4.8V22.2853"
            :stroke="color" stroke-width="3" stroke-linecap="round" />
        <path d="M10.6666 4V14.6667L14 12.5333L17.3333 14.6667V4" :stroke="color" stroke-width="3" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M8 22.6667H26.6667M8 28H26.6667" :stroke="color" stroke-width="3" stroke-linecap="round" />
        <path
            d="M7.99998 28C7.29274 28 6.61446 27.7191 6.11436 27.219C5.61426 26.7189 5.33331 26.0406 5.33331 25.3333C5.33331 24.6261 5.61426 23.9478 6.11436 23.4477C6.61446 22.9476 7.29274 22.6667 7.99998 22.6667"
            :stroke="color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>
<script>
export default {
    name: 'IconBookmark',
    props: {
        size: {
            type: Number,
            default: 24,
        },
        color: {
            type: String,
            default: 'var(--dark-blue)',
        },
    },
}
</script>