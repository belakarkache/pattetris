const SHAPES = {
  i: [[0, 1], [1, 1], [2, 1], [3, 1]],
  o: [[1, 0], [2, 0], [1, 1], [2, 1]],
  t: [[1, 0], [0, 1], [1, 1], [2, 1]],
};

class Piece {
  constructor(type, cells) {
    this.type = type;
    this.cells = cells;
  }

  moveBy(dx, dy) {
    return new Piece(
      this.type,
      this.cells.map(([x, y]) => [x + dx, y + dy])
    );
  }
}

export function createPiece(type) {
  const cells = SHAPES[type];
  if (!cells) throw new Error(`Peça desconhecida: ${type}`);
  return new Piece(type, cells);
}

const piece = createPiece("t");
console.log(piece.moveBy(3, 0).cells);
