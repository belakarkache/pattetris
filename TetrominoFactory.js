class TetrominoFactory {
  constructor(width) {
    this.width = width;
  }

  createLTetromino() {
    return [
      [1, this.width + 1, this.width * 2 + 1, 2],
      [this.width, this.width + 1, this.width + 2, this.width * 2 + 2],
      [1, this.width + 1, this.width * 2 + 1, this.width * 2],
      [this.width, this.width * 2, this.width * 2 + 1, this.width * 2 + 2],
    ];
  }

  createZTetromino() {
    return [
      [0, this.width, this.width + 1, this.width * 2 + 1],
      [this.width + 1, this.width + 2, this.width * 2, this.width * 2 + 1],
      [0, this.width, this.width + 1, this.width * 2 + 1],
      [this.width + 1, this.width + 2, this.width * 2, this.width * 2 + 1],
    ];
  }

  createTTetromino() {
    return [
      [1, this.width, this.width + 1, this.width + 2],
      [1, this.width + 1, this.width + 2, this.width * 2 + 1],
      [this.width, this.width + 1, this.width + 2, this.width * 2 + 1],
      [1, this.width, this.width + 1, this.width * 2 + 1],
    ];
  }

  createOTetromino() {
    return [
      [0, 1, this.width, this.width + 1],
      [0, 1, this.width, this.width + 1],
      [0, 1, this.width, this.width + 1],
      [0, 1, this.width, this.width + 1],
    ];
  }

  createITetromino() {
    return [
      [1, this.width + 1, this.width * 2 + 1, this.width * 3 + 1],
      [this.width, this.width + 1, this.width + 2, this.width + 3],
      [1, this.width + 1, this.width * 2 + 1, this.width * 3 + 1],
      [this.width, this.width + 1, this.width + 2, this.width + 3],
    ];
  }

  createTetromino(type) {
    switch (type) {
      case "l":
        return this.createLTetromino();
      case "z":
        return this.createZTetromino();
      case "t":
        return this.createTTetromino();
      case "o":
        return this.createOTetromino();
      case "i":
        return this.createITetromino();
      default:
        return [];
    }
  }
}

export default TetrominoFactory;
