import { defineStore } from "pinia";
import { readStorage, writeStorage } from "@/utils/storage";

const THEMES = ["system", "light", "dark"];
const THEME_COLORS = { light: "#eff2f7", dark: "#16143a" };

export const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    const scheme = meta.media.includes("dark") ? "dark" : "light";
    meta.content = THEME_COLORS[theme === "system" ? scheme : theme];
  });
};

export const useSettingsStore = defineStore("settings", {
  state: () => {
    const theme = readStorage("theme");
    return {
      sound: readStorage("soundPreference") !== "false",
      ghost: readStorage("ghostPiece") !== "false",
      theme: THEMES.includes(theme) ? theme : "system",
      hasSeenTutorial: readStorage("hasVisited") !== null,
    };
  },
  actions: {
    setSound(value) {
      this.sound = value;
      writeStorage("soundPreference", value);
    },
    setGhost(value) {
      this.ghost = value;
      writeStorage("ghostPiece", value);
    },
    setTheme(value) {
      this.theme = value;
      writeStorage("theme", value);
      applyTheme(value);
    },
    markTutorialSeen() {
      this.hasSeenTutorial = true;
      writeStorage("hasVisited", true);
    },
  },
});
