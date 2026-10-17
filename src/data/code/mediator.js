class GameMediator {
  constructor({ board, scoreboard, speaker }) {
    this.board = board;
    this.scoreboard = scoreboard;
    this.speaker = speaker;
  }

  notify(event, data) {
    switch (event) {
      case "piece-locked": {
        const cleared = this.board.clearFullRows();
        if (cleared > 0) this.notify("lines-cleared", cleared);
        else this.speaker.play("lock");
        break;
      }
      case "lines-cleared":
        this.scoreboard.add(data);
        this.speaker.play("clear");
        break;
    }
  }
}

const mediator = new GameMediator({
  board: { clearFullRows: () => 2 },
  scoreboard: { add: (lines) => console.log(`Pontos por ${lines} linhas`) },
  speaker: { play: (sound) => console.log(`Som: ${sound}`) },
});

mediator.notify("piece-locked");
