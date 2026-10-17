import { COLS } from "./engine";

const TAP_DISTANCE = 10;
const TAP_DURATION = 280;
const FLICK_SPEED = 0.9;
const FLICK_CELLS = 2;

export function useBoardGestures(actions) {
  let gesture = null;

  const onPointerdown = (event) => {
    if (event.pointerType === "mouse") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture = {
      id: event.pointerId,
      cell: event.currentTarget.clientWidth / COLS,
      startX: event.clientX,
      startY: event.clientY,
      anchorX: event.clientX,
      anchorY: event.clientY,
      startTime: event.timeStamp,
      moved: false,
      axis: null,
    };
  };

  const onPointermove = (event) => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const { cell } = gesture;

    if (!gesture.axis) {
      const dx = Math.abs(event.clientX - gesture.startX);
      const dy = Math.abs(event.clientY - gesture.startY);
      if (Math.max(dx, dy) < cell) return;
      gesture.axis = dx >= dy ? "x" : "y";
    }

    if (gesture.axis === "y") {
      while (event.clientY - gesture.anchorY >= cell) {
        actions.softDrop();
        gesture.anchorY += cell;
        gesture.moved = true;
      }
      return;
    }

    while (event.clientX - gesture.anchorX >= cell) {
      actions.moveRight();
      gesture.anchorX += cell;
      gesture.moved = true;
    }
    while (gesture.anchorX - event.clientX >= cell) {
      actions.moveLeft();
      gesture.anchorX -= cell;
      gesture.moved = true;
    }
  };

  const onPointerup = (event) => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    const duration = event.timeStamp - gesture.startTime;
    const isFlick =
      dy > gesture.cell * FLICK_CELLS &&
      Math.abs(dy) > Math.abs(dx) * 2 &&
      dy / duration > FLICK_SPEED;

    if (isFlick) actions.hardDrop();
    else if (!gesture.moved && Math.hypot(dx, dy) < TAP_DISTANCE && duration < TAP_DURATION) {
      actions.rotateCw();
    }
    gesture = null;
  };

  const onPointercancel = () => {
    gesture = null;
  };

  return {
    onPointerdown,
    onPointermove,
    onPointerup,
    onPointercancel,
  };
}
