import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    level: 0,
    lines: 0,
    score: 0,
    content: localStorage.getItem("content") || 0,
    maxScore: localStorage.getItem("maxScore") || 0,
    linesToNextLevel: 2,
    isGameRunning: false,
    triggerPause: false,
    soundPreference: localStorage.getItem("soundPreference") || true,
  }),
  actions: {
    toggleGameRunning(status) {
      this.isGameRunning = status;
    },
    toggleTriggerPause(status) {
      this.triggerPause = status;
    },
    incrementLevel() {
      this.level++;
    },
    incrementLines() {
      this.lines++;
    },
    incrementScore() {
      this.score += 100;
    },
    incrementContent() {
      if (this.content <= 10 && this.level > this.content) {
        this.content++;
        localStorage.setItem("content", this.content);
      }
    },
    incrementLinesToNextLevel() {
      this.linesToNextLevel = this.linesToNextLevel * 2;
    },
    setHighestScore() {
      if (this.score > this.maxScore) {
        localStorage.setItem("maxScore", this.score);
        this.maxScore = localStorage.getItem("maxScore");
      }
    },
    setSoundPreference(status) {
      localStorage.setItem("soundPreference", status);
      this.soundPreference = localStorage.getItem("soundPreference");
    },
  },
});
