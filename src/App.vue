<template>
  <AppHeader />

  <RouterView v-slot="{ Component, route }">
    <KeepAlive include="GameView">
      <component :is="Component" :key="route.name === 'lesson' ? route.fullPath : route.name" />
    </KeepAlive>
  </RouterView>

  <ToastHost />
  <HowToPlayDialog v-if="openDialog === 'howto'" @close="onHowToClose" />
  <SettingsDialog v-if="openDialog === 'settings'" @close="close" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import AppHeader from "@/components/app/AppHeader.vue";
import ToastHost from "@/components/app/ToastHost.vue";
import { useAppDialogs } from "@/composables/useAppDialogs";
import { applyTheme, useSettingsStore } from "@/stores/settings";

const HowToPlayDialog = defineAsyncComponent(() => import("@/components/app/HowToPlayDialog.vue"));
const SettingsDialog = defineAsyncComponent(() => import("@/components/app/SettingsDialog.vue"));

const { openDialog, close } = useAppDialogs();
const settings = useSettingsStore();
applyTheme(settings.theme);

const onHowToClose = () => {
  settings.markTutorialSeen();
  close();
};
</script>
