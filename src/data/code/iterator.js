class Board {
  #cells;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.#cells = Array(width * height).fill(null);
  }

  *rows() {
    for (let y = 0; y < this.height; y++) {
      yield this.#cells.slice(y * this.width, (y + 1) * this.width);
    }
  }

  *[Symbol.iterator]() {
    for (const [index, cell] of this.#cells.entries()) {
      yield { x: index % this.width, y: Math.floor(index / this.width), cell };
    }
  }
}

const board = new Board(4, 3);

for (const row of board.rows()) {
  console.log(row);
}

const empty = [...board].filter(({ cell }) => cell === null);
console.log(`${empty.length} células livres`);
