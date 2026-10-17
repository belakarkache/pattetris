import popSound from "@/assets/sounds/pop.mp3";
import scoreSound from "@/assets/sounds/score.mp3";
import blockSound from "@/assets/sounds/block.mp3";
import unlockSound from "@/assets/sounds/unlocked-content.mp3";
import { useSettingsStore } from "@/stores/settings";

const SOURCES = {
  rotate: { src: popSound, volume: 0.15 },
  clear: { src: scoreSound, volume: 0.25 },
  lock: { src: blockSound, volume: 0.2 },
  unlock: { src: unlockSound, volume: 0.4 },
};

let cache = null;

const getAudio = (name) => {
  cache ??= Object.fromEntries(
    Object.entries(SOURCES).map(([key, { src, volume }]) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = volume;
      return [key, audio];
    })
  );
  return cache[name];
};

export function useSound() {
  const settings = useSettingsStore();

  const play = (name) => {
    if (!settings.sound) return;
    const audio = getAudio(name);
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return { play };
}
