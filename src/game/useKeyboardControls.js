import { onActivated, onDeactivated } from "vue";
import { useAppDialogs } from "@/composables/useAppDialogs";
import { CONTROL_BY_ACTION, createRepeater, findControl } from "./controls";

const HORIZONTAL = ["moveLeft", "moveRight"];

export function useKeyboardControls({ actions, isPlaying, onStart }) {
  const { openDialog } = useAppDialogs();
  const repeaters = new Map();
  const heldHorizontal = new Set();
  const heldKeys = new Map();

  const stopAll = () => {
    repeaters.forEach((repeater) => repeater.stop());
    repeaters.clear();
    heldHorizontal.clear();
    heldKeys.clear();
  };

  const isHeld = (action) => [...heldKeys.values()].includes(action);

  const stopAction = (action) => {
    repeaters.get(action)?.stop();
    repeaters.delete(action);
  };

  const isTyping = (target) =>
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

  const isInteractive = (target) => target instanceof Element && target.closest("button:not(:disabled), a[href], summary");

  const startRepeater = ({ action, repeat }) => {
    const repeater = createRepeater(actions[action], repeat);
    repeaters.set(action, repeater);
    repeater.start();
  };

  const onKeydown = (event) => {
    if (isTyping(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
    if (openDialog.value) return;

    if (event.code === "Enter" && !isPlaying() && !isInteractive(event.target) && onStart?.()) {
      event.preventDefault();
      return;
    }

    const control = findControl(event.code);
    if (!control) return;
    if (control.action !== "togglePause" && !isPlaying()) return;

    event.preventDefault();
    if (event.repeat) return;

    if (!control.repeat) {
      actions[control.action]();
      return;
    }

    const alreadyHeld = isHeld(control.action);
    heldKeys.set(event.code, control.action);
    if (alreadyHeld && repeaters.has(control.action)) return;

    if (HORIZONTAL.includes(control.action)) {
      heldHorizontal.add(control.action);
      HORIZONTAL.forEach(stopAction);
    }
    startRepeater(control);
  };

  const onKeyup = (event) => {
    const control = findControl(event.code);
    if (!control) return;
    if (isPlaying()) event.preventDefault();
    heldKeys.delete(event.code);
    if (isHeld(control.action)) return;
    stopAction(control.action);
    if (!heldHorizontal.delete(control.action)) return;
    const [other] = heldHorizontal;
    if (other && isPlaying() && !repeaters.has(other)) startRepeater(CONTROL_BY_ACTION[other]);
  };

  onActivated(() => {
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("keyup", onKeyup);
    window.addEventListener("blur", stopAll);
  });

  onDeactivated(() => {
    stopAll();
    window.removeEventListener("keydown", onKeydown);
    window.removeEventListener("keyup", onKeyup);
    window.removeEventListener("blur", stopAll);
  });
}
