import { describe, expect, it } from "vitest";
import {
  COLS,
  ROWS,
  advanceLevel,
  createBoard,
  dropDistance,
  findFullRows,
  getCells,
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
import { PIECES, PIECE_TYPES, createBag, getKicks } from "./pieces";
import createPiece from "./PieceFactory";

const fillRow = (board, y, type = "o") => {
  for (let x = 0; x < COLS; x++) board[y * COLS + x] = type;
  return board;
};

describe("piece factory", () => {
  it("creates the 7 pieces with 4 cells per rotation", () => {
    expect(PIECE_TYPES).toHaveLength(7);
    PIECE_TYPES.forEach((type) => {
      const rotations = createPiece(type);
      expect(rotations).toHaveLength(type === "o" ? 1 : 4);
      rotations.forEach((rotation) => expect(rotation).toHaveLength(4));
    });
  });

  it("throws for unknown types", () => {
    expect(() => createPiece("x")).toThrow();
  });

  it("exposes rotations as coordinates", () => {
    expect(PIECES.t.rotations[0]).toEqual([[1, 0], [0, 1], [1, 1], [2, 1]]);
  });
});

describe("7-bag randomizer", () => {
  it("deals every piece once per bag", () => {
    const next = createBag();
    const first = Array.from({ length: 7 }, next);
    const second = Array.from({ length: 7 }, next);
    expect([...first].sort()).toEqual([...PIECE_TYPES].sort());
    expect([...second].sort()).toEqual([...PIECE_TYPES].sort());
  });
});

describe("movement", () => {
  it("moves inside the board and stops at walls", () => {
    const board = createBoard();
    const piece = spawnPiece("o");
    expect(movePiece(board, piece, 1, 0)).toMatchObject({ x: 4 });
    expect(movePiece(board, { ...piece, x: -1 }, -1, 0)).toBeNull();
    expect(movePiece(board, { ...piece, x: COLS - 3 }, 1, 0)).toBeNull();
  });

  it("blocks moves into filled cells", () => {
    const board = createBoard();
    board[2 * COLS + 4] = "t";
    expect(movePiece(board, spawnPiece("o"), 0, 1)).toBeNull();
  });

  it("measures the hard drop distance to the floor", () => {
    expect(dropDistance(createBoard(), spawnPiece("o"))).toBe(ROWS - 2);
  });
});

describe("rotation", () => {
  it("rotates both ways", () => {
    const board = createBoard();
    const piece = { ...spawnPiece("t"), y: 5 };
    expect(rotatePiece(board, piece, 1).rotation).toBe(1);
    expect(rotatePiece(board, piece, -1).rotation).toBe(3);
  });

  it("uses wall kicks instead of wrapping around the board", () => {
    const board = createBoard();
    const piece = { ...spawnPiece("i"), rotation: 1, x: -2, y: 5 };
    expect(isValidPosition(board, piece)).toBe(true);
    const rotated = rotatePiece(board, piece, 1);
    expect(rotated).not.toBeNull();
    getCells(rotated).forEach(([x]) => expect(x).toBeGreaterThanOrEqual(0));
  });

  it("refuses to rotate into filled cells when no kick fits", () => {
    const board = createBoard();
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) if (x !== 5) board[y * COLS + x] = "o";
    }
    const piece = { type: "i", rotation: 1, x: 3, y: 4 };
    expect(isValidPosition(board, piece)).toBe(true);
    expect(rotatePiece(board, piece, 1)).toBeNull();
  });

  it("keeps the O piece in place", () => {
    expect(getKicks("o", 0, 1)).toEqual([[0, 0]]);
  });
});

describe("locking and clearing", () => {
  it("stores the piece type in the board", () => {
    const board = lockPiece(createBoard(), spawnPiece("o"));
    expect(board.filter(Boolean)).toEqual(["o", "o", "o", "o"]);
  });

  it("finds and clears full rows, shifting the rest down", () => {
    const board = fillRow(fillRow(createBoard(), ROWS - 1), ROWS - 2);
    board[(ROWS - 3) * COLS] = "z";

    expect(findFullRows(board)).toEqual([ROWS - 2, ROWS - 1]);
    const result = removeRows(board, findFullRows(board));
    expect(result).toHaveLength(COLS * ROWS);
    expect(result[(ROWS - 1) * COLS]).toBe("z");
    expect(result.filter(Boolean)).toHaveLength(1);
  });
});

describe("scoring and progression", () => {
  it("rewards clearing more lines at once", () => {
    expect([1, 2, 3, 4].map((count) => scoreForLines(count, 1))).toEqual([100, 300, 500, 800]);
    expect(scoreForLines(4, 3)).toBe(2400);
  });

  it("doubles the lines needed every two levels", () => {
    expect([1, 2, 3, 4, 5].map(linesForLevel)).toEqual([2, 2, 4, 4, 8]);
  });

  it("carries extra lines into the next level", () => {
    expect(advanceLevel(1, 1, 1)).toEqual({ level: 2, levelLines: 0 });
    expect(advanceLevel(1, 0, 4)).toEqual({ level: 3, levelLines: 0 });
    expect(advanceLevel(3, 3, 3)).toEqual({ level: 4, levelLines: 2 });
  });

  it("speeds up with a floor", () => {
    expect(speedForLevel(1)).toBe(1000);
    expect(speedForLevel(2)).toBe(850);
    expect(speedForLevel(40)).toBe(80);
  });
});
