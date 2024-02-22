class PieceFactory {
  constructor(width) {
    this.width = width;
  }

  createLPiece() {
    return [
      [1, this.width + 1, this.width * 2 + 1, 2],
      [this.width, this.width + 1, this.width + 2, this.width * 2 + 2],
      [1, this.width + 1, this.width * 2 + 1, this.width * 2],
      [this.width, this.width * 2, this.width * 2 + 1, this.width * 2 + 2],
    ];
  }

  createZPiece() {
    return [
      [0, this.width, this.width + 1, this.width * 2 + 1],
      [this.width + 1, this.width + 2, this.width * 2, this.width * 2 + 1],
      [0, this.width, this.width + 1, this.width * 2 + 1],
      [this.width + 1, this.width + 2, this.width * 2, this.width * 2 + 1],
    ];
  }

  createTPiece() {
    return [
      [1, this.width, this.width + 1, this.width + 2],
      [1, this.width + 1, this.width + 2, this.width * 2 + 1],
      [this.width, this.width + 1, this.width + 2, this.width * 2 + 1],
      [1, this.width, this.width + 1, this.width * 2 + 1],
    ];
  }

  createOPiece() {
    return [
      [0, 1, this.width, this.width + 1],
      [0, 1, this.width, this.width + 1],
      [0, 1, this.width, this.width + 1],
      [0, 1, this.width, this.width + 1],
    ];
  }

  createIPiece() {
    return [
      [1, this.width + 1, this.width * 2 + 1, this.width * 3 + 1],
      [this.width, this.width + 1, this.width + 2, this.width + 3],
      [1, this.width + 1, this.width * 2 + 1, this.width * 3 + 1],
      [this.width, this.width + 1, this.width + 2, this.width + 3],
    ];
  }

  createPiece(type) {
    switch (type) {
      case "l":
        return this.createLPiece();
      case "z":
        return this.createZPiece();
      case "t":
        return this.createTPiece();
      case "o":
        return this.createOPiece();
      case "i":
        return this.createIPiece();
      default:
        return [];
    }
  }
}

export default PieceFactory;
