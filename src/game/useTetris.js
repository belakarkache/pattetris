import { computed, onBeforeUnmount, ref, shallowRef } from "vue";
import { createBag } from "./pieces";
import {
  COLS,
  HARD_DROP_POINTS,
  SOFT_DROP_POINTS,
  advanceLevel,
  createBoard,
  dropDistance,
  findFullRows,
  getCells,
  isGrounded,
  isValidPosition,
  linesForLevel,
  lockPiece,
  movePiece,
  removeRows,
  rotatePiece,
  scoreForLines,
  speedForLevel,
  spawnPiece,
} from "./engine";

const QUEUE_SIZE = 3;
const LOCK_DELAY = 500;
const MAX_LOCK_RESETS = 15;
const CLEAR_DURATION = 260;
const MAX_FRAME_DELTA = 100;

export function useTetris({
  showGhost = ref(true),
  onLock,
  onClear,
  onLevelUp,
  onGameOver,
  onHardDrop,
} = {}) {
  const board = shallowRef(createBoard());
  const piece = shallowRef(null);
  const queue = ref([]);
  const hold = ref(null);
  const canHold = ref(true);
  const status = ref("idle");
  const clearing = shallowRef([]);
  const score = ref(0);
  const level = ref(1);
  const lines = ref(0);
  const levelLines = ref(0);

  let nextFromBag = createBag();
  let frameId = null;
  let lastTime = 0;
  let gravityTimer = 0;
  let lockTimer = 0;
  let lockResets = 0;
  let lowestY = 0;
  let clearTimer = 0;

  const grounded = computed(() => piece.value !== null && isGrounded(board.value, piece.value));

  const linesToNextLevel = computed(() => linesForLevel(level.value));

  const ghost = computed(() => {
    if (!showGhost.value || !piece.value) return null;
    const distance = dropDistance(board.value, piece.value);
    return distance > 0 ? { ...piece.value, y: piece.value.y + distance } : null;
  });

  const cellClass = (type, state) => `piece-${type} cell--${state}`;

  const settledCells = computed(() => {
    const view = board.value.map((type) => (type ? cellClass(type, "locked") : ""));
    clearing.value.forEach((y) => {
      for (let index = y * COLS; index < (y + 1) * COLS; index++) {
        view[index] = cellClass(board.value[index], "clearing");
      }
    });
    return view;
  });

  const paint = (view, target, state) => {
    getCells(target).forEach(([x, y]) => {
      view[y * COLS + x] = cellClass(target.type, state);
    });
  };

  const cells = computed(() => {
    const view = settledCells.value.slice();
    if (ghost.value) paint(view, ghost.value, "ghost");
    if (piece.value) paint(view, piece.value, "active");
    return view;
  });

  const isRunning = () => status.value === "running";
  const canAct = () => isRunning() && piece.value && clearing.value.length === 0;

  const takeNext = () => {
    const [type, ...rest] = queue.value;
    queue.value = [...rest, nextFromBag()];
    return type;
  };

  const endGame = () => {
    status.value = "over";
    stopLoop();
    onGameOver?.();
  };

  const spawn = (type = takeNext()) => {
    const spawned = spawnPiece(type);
    if (!isValidPosition(board.value, spawned)) {
      piece.value = null;
      endGame();
      return;
    }
    piece.value = spawned;
    gravityTimer = 0;
    lockTimer = 0;
    lockResets = 0;
    lowestY = spawned.y;
  };

  const addLines = (count) => {
    const points = scoreForLines(count, level.value);
    score.value += points;
    lines.value += count;
    const next = advanceLevel(level.value, levelLines.value, count);
    level.value = next.level;
    levelLines.value = next.levelLines;
    return points;
  };

  const lock = () => {
    board.value = lockPiece(board.value, piece.value);
    piece.value = null;
    canHold.value = true;
    onLock?.();

    const rows = findFullRows(board.value);
    if (rows.length === 0) {
      spawn();
      return;
    }

    clearing.value = rows;
    clearTimer = CLEAR_DURATION;
    const types = rows.map((y) => board.value.slice(y * COLS, (y + 1) * COLS));
    const previous = level.value;
    const points = addLines(rows.length);
    onClear?.({ count: rows.length, rows, types, points });
    for (let reached = previous + 1; reached <= level.value; reached++) onLevelUp?.(reached);
  };

  const trackDepth = ({ y }) => {
    if (y <= lowestY) return;
    lowestY = y;
    lockResets = 0;
  };

  const finishClear = () => {
    board.value = removeRows(board.value, clearing.value);
    clearing.value = [];
    spawn();
  };

  const tick = (time) => {
    const delta = Math.min(Math.max(time - lastTime, 0), MAX_FRAME_DELTA);
    lastTime = time;

    if (clearing.value.length > 0) {
      clearTimer -= delta;
      if (clearTimer <= 0) finishClear();
    } else if (piece.value) {
      if (grounded.value) {
        lockTimer += delta;
        if (lockTimer >= LOCK_DELAY) lock();
      } else {
        gravityTimer += delta;
        if (gravityTimer >= speedForLevel(level.value)) {
          gravityTimer = 0;
          lockTimer = 0;
          piece.value = movePiece(board.value, piece.value, 0, 1);
          trackDepth(piece.value);
        }
      }
    }

    if (isRunning()) frameId = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    lastTime = performance.now();
    frameId = requestAnimationFrame(tick);
  };

  function stopLoop() {
    cancelAnimationFrame(frameId);
    frameId = null;
  }

  const applyMove = (moved) => {
    if (!moved) return false;
    piece.value = moved;
    trackDepth(moved);
    if (grounded.value && lockResets < MAX_LOCK_RESETS) {
      lockTimer = 0;
      lockResets++;
    }
    return true;
  };

  const moveLeft = () => canAct() && applyMove(movePiece(board.value, piece.value, -1, 0));
  const moveRight = () => canAct() && applyMove(movePiece(board.value, piece.value, 1, 0));
  const rotateCw = () => canAct() && applyMove(rotatePiece(board.value, piece.value, 1));
  const rotateCcw = () => canAct() && applyMove(rotatePiece(board.value, piece.value, -1));

  const softDrop = () => {
    if (!canAct()) return false;
    const moved = movePiece(board.value, piece.value, 0, 1);
    if (!moved) return false;
    piece.value = moved;
    trackDepth(moved);
    score.value += SOFT_DROP_POINTS;
    gravityTimer = 0;
    lockTimer = 0;
    return true;
  };

  const hardDrop = () => {
    if (!canAct()) return false;
    const distance = dropDistance(board.value, piece.value);
    piece.value = { ...piece.value, y: piece.value.y + distance };
    score.value += distance * HARD_DROP_POINTS;
    onHardDrop?.(distance);
    lock();
    return true;
  };

  const holdPiece = () => {
    if (!canAct() || !canHold.value) return false;
    const current = piece.value.type;
    const stored = hold.value;
    hold.value = current;
    canHold.value = false;
    spawn(stored ?? takeNext());
    return true;
  };

  const resetState = () => {
    stopLoop();
    nextFromBag = createBag();
    board.value = createBoard();
    piece.value = null;
    queue.value = Array.from({ length: QUEUE_SIZE }, () => nextFromBag());
    hold.value = null;
    canHold.value = true;
    clearing.value = [];
    score.value = 0;
    level.value = 1;
    lines.value = 0;
    levelLines.value = 0;
  };

  const start = () => {
    resetState();
    status.value = "running";
    spawn();
    if (isRunning()) startLoop();
  };

  const pause = () => {
    if (!isRunning()) return;
    status.value = "paused";
    stopLoop();
  };

  const resume = () => {
    if (status.value !== "paused") return;
    status.value = "running";
    startLoop();
  };

  const togglePause = () => (isRunning() ? pause() : resume());

  const reset = () => {
    resetState();
    status.value = "idle";
  };

  resetState();
  onBeforeUnmount(stopLoop);

  return {
    cells,
    queue,
    hold,
    canHold,
    status,
    score,
    level,
    lines,
    linesToNextLevel,
    levelLines,
    start,
    pause,
    resume,
    togglePause,
    reset,
    moveLeft,
    moveRight,
    rotateCw,
    rotateCcw,
    softDrop,
    hardDrop,
    holdPiece,
  };
}
