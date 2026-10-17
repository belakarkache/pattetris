class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    const listeners = this.#listeners.get(event) ?? new Set();
    listeners.add(listener);
    this.#listeners.set(event, listeners);
    return () => listeners.delete(listener);
  }

  emit(event, payload) {
    this.#listeners.get(event)?.forEach((listener) => listener(payload));
  }
}

const game = new EventEmitter();

game.on("lines-cleared", ({ count }) => console.log(`+${count} linhas`));
game.on("lines-cleared", () => console.log("Tocando som"));
const stopConfetti = game.on("lines-cleared", () => console.log("Confete!"));

game.emit("lines-cleared", { count: 2 });

stopConfetti();
game.emit("lines-cleared", { count: 1 });
