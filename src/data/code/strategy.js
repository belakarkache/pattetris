function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const randomizers = {
  pure: (types) => () =>
    types[Math.floor(Math.random() * types.length)],

  bag: (types) => {
    let bag = [];
    return () => {
      if (bag.length === 0) bag = shuffle(types);
      return bag.pop();
    };
  },
};

class PieceQueue {
  #next;

  constructor(types, strategy = "bag") {
    this.types = types;
    this.use(strategy);
  }

  use(strategy) {
    this.#next = randomizers[strategy](this.types);
  }

  next() {
    return this.#next();
  }
}

const queue = new PieceQueue(["i", "o", "t", "s", "z", "j", "l"]);
console.log(queue.next());

queue.use("pure");
console.log(queue.next());
