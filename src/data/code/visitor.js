class Block {
  constructor(color) {
    this.color = color;
  }

  accept(visitor) {
    return visitor.visitBlock(this);
  }
}

class EmptyCell {
  accept(visitor) {
    return visitor.visitEmpty(this);
  }
}

const countBlocks = {
  visitBlock: () => 1,
  visitEmpty: () => 0,
};

const drawAscii = {
  visitBlock: () => "■",
  visitEmpty: () => "·",
};

const row = [new Block("pink"), new EmptyCell(), new Block("sky"), new Block("mint")];

const total = row.reduce((sum, cell) => sum + cell.accept(countBlocks), 0);
const picture = row.map((cell) => cell.accept(drawAscii)).join("");

console.log(total);
console.log(picture);
