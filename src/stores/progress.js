import { defineStore } from "pinia";
import { PATTERNS } from "@/data/patterns";
import { readList, readNumber, removeStorage, writeStorage } from "@/utils/storage";

const KEYS = {
  unlocked: "content",
  bestScore: "maxScore",
  read: "readPatterns",
};

export const levelToUnlock = (patternIndex) => patternIndex + 2;

export const useProgressStore = defineStore("progress", {
  state: () => ({
    unlocked: Math.min(readNumber(KEYS.unlocked), PATTERNS.length),
    bestScore: readNumber(KEYS.bestScore),
    read: readList(KEYS.read),
  }),
  getters: {
    total: () => PATTERNS.length,
    unlockedPatterns: (state) => PATTERNS.slice(0, state.unlocked),
    nextPattern: (state) => PATTERNS[state.unlocked] ?? null,
    nextLevel: (state) => levelToUnlock(state.unlocked),
    isUnlocked: (state) => (slug) => {
      const index = PATTERNS.findIndex((pattern) => pattern.slug === slug);
      return index >= 0 && index < state.unlocked;
    },
    isRead: (state) => (slug) => state.read.includes(slug),
    unreadCount(state) {
      return this.unlockedPatterns.filter(({ slug }) => !state.read.includes(slug)).length;
    },
  },
  actions: {
    unlockForLevel(level) {
      const reachable = Math.min(Math.max(level - 1, 0), PATTERNS.length);
      if (reachable <= this.unlocked) return [];
      const fresh = PATTERNS.slice(this.unlocked, reachable);
      this.unlocked = reachable;
      writeStorage(KEYS.unlocked, reachable);
      return fresh;
    },
    submitScore(score) {
      if (score <= this.bestScore) return false;
      this.bestScore = score;
      writeStorage(KEYS.bestScore, score);
      return true;
    },
    markRead(slug) {
      if (this.read.includes(slug)) return;
      this.read = [...this.read, slug];
      writeStorage(KEYS.read, JSON.stringify(this.read));
    },
    resetProgress() {
      this.unlocked = 0;
      this.bestScore = 0;
      this.read = [];
      Object.values(KEYS).forEach(removeStorage);
    },
  },
});
