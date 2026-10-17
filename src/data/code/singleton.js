class Scoreboard {
  static #instance = null;
  #best = 0;

  static get instance() {
    Scoreboard.#instance ??= new Scoreboard();
    return Scoreboard.#instance;
  }

  submit(score) {
    if (score > this.#best) this.#best = score;
    return this.#best;
  }

  get best() {
    return this.#best;
  }
}

Scoreboard.instance.submit(1200);
Scoreboard.instance.submit(800);

console.log(Scoreboard.instance.best);
console.log(Scoreboard.instance === Scoreboard.instance);

export const settings = { sound: true, ghostPiece: true };
