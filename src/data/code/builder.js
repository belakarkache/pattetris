class GameModeBuilder {
  #mode = {
    name: "Clássico",
    columns: 10,
    rows: 20,
    startLevel: 1,
    ghostPiece: true,
    pieces: ["i", "j", "l", "o", "s", "t", "z"],
  };

  named(name) {
    this.#mode.name = name;
    return this;
  }

  board(columns, rows) {
    Object.assign(this.#mode, { columns, rows });
    return this;
  }

  startingAt(level) {
    this.#mode.startLevel = level;
    return this;
  }

  withoutGhost() {
    this.#mode.ghostPiece = false;
    return this;
  }

  onlyPieces(...pieces) {
    this.#mode.pieces = pieces;
    return this;
  }

  build() {
    if (this.#mode.pieces.length === 0) throw new Error("Escolha ao menos uma peça");
    return Object.freeze(structuredClone(this.#mode));
  }
}

const sprint = new GameModeBuilder()
  .named("Desafio das retas")
  .board(6, 16)
  .startingAt(5)
  .withoutGhost()
  .onlyPieces("i", "o")
  .build();

console.log(sprint);
