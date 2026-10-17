import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { levelToUnlock, useProgressStore } from "./progress";

const createStorage = (initial = {}) => {
  const data = { ...initial };
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
    removeItem: (key) => {
      delete data[key];
    },
  };
};

const setup = (initial) => {
  const storage = createStorage(initial);
  vi.stubGlobal("localStorage", storage);
  setActivePinia(createPinia());
  return { store: useProgressStore(), storage };
};

describe("progress store", () => {
  beforeEach(() => vi.unstubAllGlobals());

  it("keeps progress saved by the previous version", () => {
    const { store } = setup({ content: "3", maxScore: "500" });
    expect(store.unlocked).toBe(3);
    expect(store.bestScore).toBe(500);
    expect(store.nextPattern.slug).toBe("iterator");
    expect(store.nextLevel).toBe(5);
  });

  it("ignores invalid saved numbers", () => {
    expect(setup({ content: "-1", maxScore: "abc" }).store.unlocked).toBe(0);
    expect(setup({ content: "2.5", maxScore: "-10" }).store.unlocked).toBe(2);
    expect(setup({ maxScore: "-10" }).store.bestScore).toBe(0);
  });

  it("unlocks one pattern per level reached", () => {
    const { store, storage } = setup();
    expect(store.unlockForLevel(2).map(({ slug }) => slug)).toEqual(["factory"]);
    expect(store.unlockForLevel(2)).toEqual([]);
    expect(store.unlockForLevel(4).map(({ slug }) => slug)).toEqual(["strategy", "singleton"]);
    expect(storage.data.content).toBe("3");
    expect(levelToUnlock(0)).toBe(2);
  });

  it("never unlocks more than the available patterns", () => {
    const { store } = setup({ content: "10" });
    expect(store.unlockForLevel(30)).toEqual([]);
    expect(store.unlocked).toBe(10);
    expect(store.nextPattern).toBeNull();
  });

  it("only unlocks known patterns", () => {
    const { store } = setup({ content: "2" });
    expect(store.isUnlocked("factory")).toBe(true);
    expect(store.isUnlocked("singleton")).toBe(false);
    expect(store.isUnlocked("unknown")).toBe(false);
  });

  it("only saves a higher score", () => {
    const { store } = setup({ maxScore: "300" });
    expect(store.submitScore(200)).toBe(false);
    expect(store.submitScore(400)).toBe(true);
    expect(store.bestScore).toBe(400);
  });

  it("tracks read lessons and resets everything", () => {
    const { store, storage } = setup({ content: "2" });
    store.markRead("factory");
    expect(store.isRead("factory")).toBe(true);
    expect(store.unreadCount).toBe(1);

    store.resetProgress();
    expect(store.unlocked).toBe(0);
    expect(storage.data).toEqual({});
  });
});
