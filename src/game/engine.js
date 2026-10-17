import { PIECES, getKicks } from "./pieces";

export const COLS = 10;
export const ROWS = 20;
const SPAWN_X = 3;
const MIN_SPEED = 80;
const BASE_SPEED = 1000;
const SPEED_FACTOR = 0.85;
export const SOFT_DROP_POINTS = 1;
export const HARD_DROP_POINTS = 2;

const LINE_POINTS = [0, 100, 300, 500, 800];

export const createBoard = () => Array(COLS * ROWS).fill(null);

export const spawnPiece = (type) => ({ type, rotation: 0, x: SPAWN_X, y: 0 });

export const getCells = ({ type, rotation, x, y }) =>
  PIECES[type].rotations[rotation].map(([cx, cy]) => [x + cx, y + cy]);

export const isValidPosition = (board, piece) =>
  getCells(piece).every(
    ([x, y]) =>
      x >= 0 && x < COLS && y >= 0 && y < ROWS && board[y * COLS + x] === null
  );

export const movePiece = (board, piece, dx, dy) => {
  const moved = { ...piece, x: piece.x + dx, y: piece.y + dy };
  return isValidPosition(board, moved) ? moved : null;
};

export const rotatePiece = (board, piece, direction = 1) => {
  const total = PIECES[piece.type].rotations.length;
  const rotation = (piece.rotation + direction + total) % total;

  for (const [dx, dy] of getKicks(piece.type, piece.rotation, rotation)) {
    const rotated = { ...piece, rotation, x: piece.x + dx, y: piece.y + dy };
    if (isValidPosition(board, rotated)) return rotated;
  }
  return null;
};

export const isGrounded = (board, piece) => !movePiece(board, piece, 0, 1);

export const dropDistance = (board, piece) => {
  let distance = 0;
  while (movePiece(board, piece, 0, distance + 1)) distance++;
  return distance;
};

export const lockPiece = (board, piece) => {
  const next = board.slice();
  getCells(piece).forEach(([x, y]) => {
    next[y * COLS + x] = piece.type;
  });
  return next;
};

export const findFullRows = (board) => {
  const rows = [];
  for (let y = 0; y < ROWS; y++) {
    const start = y * COLS;
    if (board.slice(start, start + COLS).every((cell) => cell !== null)) {
      rows.push(y);
    }
  }
  return rows;
};

export const removeRows = (board, rows) => {
  const remaining = [];
  for (let y = 0; y < ROWS; y++) {
    if (!rows.includes(y)) remaining.push(...board.slice(y * COLS, (y + 1) * COLS));
  }
  return Array(rows.length * COLS).fill(null).concat(remaining);
};

export const scoreForLines = (count, level) => LINE_POINTS[count] * level;

export const linesForLevel = (level) => 2 ** (Math.floor((level - 1) / 2) + 1);

export const advanceLevel = (level, levelLines, cleared) => {
  let nextLevel = level;
  let remaining = levelLines + cleared;
  while (remaining >= linesForLevel(nextLevel)) {
    remaining -= linesForLevel(nextLevel);
    nextLevel++;
  }
  return { level: nextLevel, levelLines: remaining };
};

export const speedForLevel = (level) =>
  Math.max(MIN_SPEED, Math.round(BASE_SPEED * SPEED_FACTOR ** (level - 1)));
