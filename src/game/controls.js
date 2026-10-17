const MOVE_REPEAT = { delay: 160, interval: 45 };
const DROP_REPEAT = { delay: 0, interval: 40 };

export const CONTROLS = [
  {
    action: "moveLeft",
    label: "Mover para a esquerda",
    hint: "Mover",
    keys: ["ArrowLeft", "KeyA"],
    repeat: MOVE_REPEAT,
  },
  {
    action: "moveRight",
    label: "Mover para a direita",
    hint: "Mover",
    keys: ["ArrowRight", "KeyD"],
    repeat: MOVE_REPEAT,
  },
  { action: "rotateCw", label: "Girar", hint: "Girar", keys: ["ArrowUp", "KeyX", "KeyW"] },
  { action: "rotateCcw", label: "Girar ao contrário", hint: "Girar ao contrário", keys: ["KeyZ", "KeyQ"] },
  {
    action: "softDrop",
    label: "Descer mais rápido",
    hint: "Descer",
    keys: ["ArrowDown", "KeyS"],
    repeat: DROP_REPEAT,
  },
  { action: "hardDrop", label: "Soltar de uma vez", hint: "Soltar", keys: ["Space"] },
  { action: "holdPiece", label: "Guardar peça", hint: "Guardar", keys: ["KeyC", "ShiftLeft", "ShiftRight"] },
  { action: "togglePause", label: "Pausar", hint: "Pausar", keys: ["KeyP", "Escape"] },
];

export const KEY_HINTS = Object.values(
  CONTROLS.reduce((hints, { hint, keys: [key] }) => {
    hints[hint] ??= { label: hint, keys: [] };
    hints[hint].keys.push(key);
    return hints;
  }, {})
);

const KEY_NAMES = {
  ArrowLeft: "←",
  ArrowRight: "→",
  ArrowUp: "↑",
  ArrowDown: "↓",
  Space: "Espaço",
  Escape: "Esc",
  ShiftLeft: "Shift",
  ShiftRight: "Shift",
};

export const keyName = (code) => KEY_NAMES[code] ?? code.replace(/^Key/, "");

export const CONTROL_BY_ACTION = Object.fromEntries(CONTROLS.map((control) => [control.action, control]));

export const findControl = (code) =>
  CONTROLS.find((control) => control.keys.includes(code));

export const createRepeater = (fn, { delay, interval }) => {
  let delayId = null;
  let intervalId = null;

  const stop = () => {
    clearTimeout(delayId);
    clearInterval(intervalId);
    delayId = null;
    intervalId = null;
  };

  const start = () => {
    stop();
    fn();
    delayId = setTimeout(() => {
      intervalId = setInterval(fn, interval);
    }, delay);
  };

  return { start, stop };
};
