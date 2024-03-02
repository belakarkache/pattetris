<template>
  <div class="container">
    <GameBoardHeader class="game-board-header" />

    <div class="grid">
      <div
        v-for="(cell, index) in grid"
        :key="index"
        :class="{
          filled: cell.filled,
          'filled--hidden': index >= 200 && index <= 209,
        }"
      />
    </div>

    <div class="preview">
      <p
        class="preview-text"
        v-show="hasStarted"
      >
        Próxima peça:
      </p>
      <div class="preview-grid">
        <div
          v-for="(cell, index) in miniGrid"
          :key="index"
          :class="{ piece: cell.piece }"
        ></div>
      </div>
    </div>

    <GameStats class="game-stats" />

    <div class="actions">
      <GameSettings />

      <Button
        :text="$matches.small.max ? '' : 'Jogar'"
        @click="startGame"
        v-if="!store.isGameRunning && !gamePaused"
        data-location="container"
        :hasIcon="$matches.small.max"
      >
        <IconPlay
          v-if="$matches.small.max"
          :size="22"
          color="rgba(0,0,0,0.7)"
        />
      </Button>
      <Button
        :text="$matches.small.max ? '' : 'Reiniciar'"
        @click="restartGame"
        textColor="var(--hl-yellow)"
        bgColor="var(--tetris-yellow)"
        :hasIcon="$matches.small.max"
        v-else
      >
        <IconRestart
          v-if="$matches.small.max"
          :size="22"
          color="rgba(0,0,0,0.7)"
        />
      </Button>
      <Button
        :text="$matches.small.max ? '' : 'Pausar'"
        @click="pauseGame"
        v-if="hasStarted"
        textColor="var(--hl-purple)"
        bgColor="var(--tetris-purple)"
        :hasIcon="$matches.small.max"
      >
        <IconPause
          v-if="$matches.small.max"
          :size="22"
          color="rgba(0,0,0,0.7)"
        />
      </Button>
    </div>

    <Teleport
      to="body"
      v-if="store.isGameRunning && $matches.medium.max"
    >
      <MobileControls
        @tap="rotate()"
        @left="moveLeft()"
        @right="moveRight()"
        @bottom="moveDown()"
      />
    </Teleport>

    <Modal v-if="isGameOver">
      <GameOver :isHighscore="isHighscore" />
    </Modal>

    <Modal v-if="gamePaused && !isGameOver">
      <GamePaused
        @continue="pauseGame"
        @restart="restartGame"
      />
    </Modal>

    <Vue3Lottie
      :animationData="Confetti"
      :autoPlay="false"
      :loop="false"
      ref="confetti"
      @on-complete="completeAnimation('confetti')"
      class="board-animation confetti"
    />

    <Vue3Lottie
      :animationData="LevelUp"
      :autoPlay="false"
      :loop="false"
      ref="levelup"
      @on-complete="completeAnimation('levelup')"
      class="board-animation levelup"
    />
  </div>
</template>

<script>
import PieceFactory from "../../PieceFactory.js";
import Confetti from "@/assets/animations/confetti.json";
import LevelUp from "@/assets/animations/levelup.json";
import Button from "./Button.vue";
import { useMainStore } from "@/store/main";
import GameOver from "./GameOver.vue";
import GameBoardHeader from "./GameBoardHeader.vue";
import GameStats from "./GameStats.vue";
import MobileControls from "./MobileControls.vue";
import Modal from "./Modal.vue";
import popSound from "@/assets/sounds/pop.mp3";
import scoreSound from "@/assets/sounds/score.mp3";
import blockSound from "@/assets/sounds/block.mp3";
import GamePaused from "./GamePaused.vue";
import GameSettings from "./GameSettings.vue";
import IconPlay from "./icons/IconPlay.vue";
import IconRestart from "./icons/IconRestart.vue";
import IconPause from "./icons/IconPause.vue";

export default {
  components: {
    Button,
    GameOver,
    GameBoardHeader,
    GameStats,
    MobileControls,
    Modal,
    GamePaused,
    GameSettings,
    IconPlay,
    IconRestart,
    IconPause,
  },
  data() {
    return {
      store: useMainStore(),
      Confetti,
      LevelUp,
      width: 10,
      grid: Array(200)
        .fill({ filled: false })
        .concat(Array(10).fill({ filled: true })),
      miniGrid: Array(16).fill({ piece: false }),
      squares: Array.from(document.querySelectorAll(".grid div")),
      displaySquares: Array.from(
        document.querySelectorAll(".preview-grid div")
      ),
      speed: 1000,
      timerId: null,
      currentPosition: 4,
      currentRotation: 0,
      current: [],
      nextRandom: 0,
      colors: ["#F2A0D5", "#BDC0F2", "#A7DDF2", "#AEF2B9", "#F2D57E"],
      random: null,
      displayWidth: 4,
      displayIndex: 0,
      pieceFactory: new PieceFactory(10),
      currentPiece: [],
      gamePaused: false,
      hasStarted: false,
      isGameOver: false,
      isHighscore: false,
    };
  },
  computed: {
    thePieces() {
      return [
        this.pieceFactory.createPiece("l"),
        this.pieceFactory.createPiece("z"),
        this.pieceFactory.createPiece("t"),
        this.pieceFactory.createPiece("o"),
        this.pieceFactory.createPiece("i"),
      ];
    },
    upNextPieces() {
      return [
        [1, this.displayWidth + 1, this.displayWidth * 2 + 1, 2],
        [
          0,
          this.displayWidth,
          this.displayWidth + 1,
          this.displayWidth * 2 + 1,
        ],
        [1, this.displayWidth, this.displayWidth + 1, this.displayWidth + 2],
        [0, 1, this.displayWidth, this.displayWidth + 1],
        [
          1,
          this.displayWidth + 1,
          this.displayWidth * 2 + 1,
          this.displayWidth * 3 + 1,
        ],
      ];
    },
  },
  watch: {
    "store.level": {
      handler() {
        if (this.store.level % 2 === 0) {
          this.store.incrementLinesToNextLevel();
        }
        this.$refs.levelup.play();
      },
      deep: true,
    },
    "store.triggerPause": {
      handler(newVal) {
        if (newVal) {
          this.pauseGame();
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.random = Math.floor(Math.random() * this.thePieces.length);
    this.current = this.thePieces[this.random][this.currentRotation];
    this.grid = Array(200)
      .fill({ filled: false })
      .concat(Array(10).fill({ filled: true }));
    this.squares = Array.from(document.querySelectorAll(".grid div"));
    this.displaySquares = Array.from(
      document.querySelectorAll(".preview-grid div")
    );
  },
  methods: {
    playSound(file) {
      let audio = new Audio(file);
      audio.volume = JSON.parse(this.store.soundPreference) ? 0.2 : 0;
      audio.play();
    },
    draw() {
      this.current.forEach((index) => {
        this.squares[this.currentPosition + index].classList.add("piece");
        this.squares[this.currentPosition + index].style.backgroundColor =
          this.colors[this.random];
      });
    },
    undraw() {
      this.current.forEach((index) => {
        this.squares[this.currentPosition + index].classList.remove("piece");
        this.squares[this.currentPosition + index].style.backgroundColor = "";
      });
    },
    control(e) {
      if (this.timerId && this.store.isGameRunning) {
        if (e.keyCode === 37) {
          this.moveLeft();
        } else if (e.keyCode === 38) {
          this.rotate();
        } else if (e.keyCode === 39) {
          this.moveRight();
        } else if (e.keyCode === 40) {
          this.moveDown();
        } else if (e.keyCode === 32) {
          this.hardDrop();
        }
      }
      if (e.keyCode === 80) {
        this.pauseGame();
      }
    },
    moveDown() {
      if (
        !this.current.some((index) =>
          this.squares[
            this.currentPosition + index + this.width
          ].classList.contains("filled")
        )
      ) {
        this.undraw();
        this.currentPosition += this.width;
        this.draw();
      } else {
        this.freeze();
      }
    },
    increaseLevel() {
      this.store.incrementLevel();
      this.store.incrementContent();
      this.speed = Math.max(100, this.speed - 100);
      clearInterval(this.timerId);
      this.timerId = setInterval(this.moveDown, this.speed);
    },
    freeze() {
      if (
        this.current.some((index) =>
          this.squares[
            this.currentPosition + index + this.width
          ].classList.contains("filled")
        )
      ) {
        this.current.forEach((index) =>
          this.squares[this.currentPosition + index].classList.add("filled")
        );

        this.random = this.nextRandom;
        this.nextRandom = Math.floor(Math.random() * this.thePieces.length);
        this.current = this.thePieces[this.random][this.currentRotation];
        this.currentPosition = 4;
        this.addScore();
        this.playSound(blockSound);
        this.draw();
        this.previewShape();
        this.gameOver();
      }
    },
    moveLeft() {
      this.undraw();
      const isAtLeftEdge = this.current.some(
        (index) => (this.currentPosition + index) % this.width === 0
      );
      if (!isAtLeftEdge) this.currentPosition -= 1;
      if (
        this.current.some((index) =>
          this.squares[this.currentPosition + index].classList.contains(
            "filled"
          )
        )
      ) {
        this.currentPosition += 1;
      }
      this.draw();
    },
    moveRight() {
      this.undraw();
      const isAtRightEdge = this.current.some(
        (index) =>
          (this.currentPosition + index) % this.width === this.width - 1
      );
      if (!isAtRightEdge) this.currentPosition += 1;
      if (
        this.current.some((index) =>
          this.squares[this.currentPosition + index].classList.contains(
            "filled"
          )
        )
      ) {
        this.currentPosition -= 1;
      }
      this.draw();
    },

    isAtRight() {
      return this.current.some(
        (index) => (this.currentPosition + index + 1) % this.width === 0
      );
    },

    isAtLeft() {
      return this.current.some(
        (index) => (this.currentPosition + index) % this.width === 0
      );
    },

    checkRotatedPosition(originalPosition) {
      originalPosition = originalPosition || this.currentPosition;
      if ((originalPosition + 1) % this.width < 4) {
        if (this.isAtRight()) {
          this.currentPosition += 1;
          this.checkRotatedPosition(originalPosition);
        }
      } else if (originalPosition % this.width > 5) {
        if (this.isAtLeft()) {
          this.currentPosition -= 1;
          this.checkRotatedPosition(originalPosition);
        }
      }
    },
    rotate() {
      this.playSound(popSound);
      this.undraw();
      this.currentRotation++;
      if (this.currentRotation === this.current.length) {
        this.currentRotation = 0;
      }
      this.current = this.thePieces[this.random][this.currentRotation];
      this.checkRotatedPosition();
      this.draw();
    },
    previewShape() {
      this.displaySquares.forEach((square) => {
        square.classList.remove("piece");
        square.style.backgroundColor = "";
      });
      this.upNextPieces[this.nextRandom].forEach((index) => {
        this.displaySquares[this.displayIndex + index].classList.add("piece");
        this.displaySquares[this.displayIndex + index].style.backgroundColor =
          this.colors[this.nextRandom];
      });
    },
    startGame() {
      document.addEventListener("keydown", this.control);
      this.store.toggleGameRunning(true);
      this.hasStarted = true;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      } else {
        this.draw();
        this.timerId = setInterval(this.moveDown, 1000);
        this.nextRandom = Math.floor(Math.random() * this.thePieces.length);
        this.previewShape();
      }
    },
    restartGame() {
      location.reload();
    },
    pauseGame() {
      this.gamePaused = !this.gamePaused;
      this.store.toggleTriggerPause(false);
      if (this.store.isGameRunning) {
        clearInterval(this.timerId);
        this.timerId = null;
        this.store.toggleGameRunning(false);
      } else {
        this.timerId = setInterval(this.moveDown, this.speed);
        this.store.toggleGameRunning(true);
      }
    },
    addScore() {
      for (let i = 0; i < 199; i += this.width) {
        const row = [
          i,
          i + 1,
          i + 2,
          i + 3,
          i + 4,
          i + 5,
          i + 6,
          i + 7,
          i + 8,
          i + 9,
        ];

        if (
          row.every((index) => this.squares[index].classList.contains("filled"))
        ) {
          this.playSound(scoreSound);
          this.store.incrementScore();
          this.store.incrementLines();
          this.$refs.confetti.play();

          if (this.store.lines % this.store.linesToNextLevel === 0) {
            this.increaseLevel();
          }

          row.forEach((index) => {
            this.squares[index].classList.remove("filled");
            this.squares[index].classList.remove("piece");
            this.squares[index].style.backgroundColor = "";
          });

          const squaresRemoved = this.squares.splice(i, this.width);
          this.squares = squaresRemoved.concat(this.squares);
          this.squares.forEach((cell) =>
            this.$el.querySelector(".grid").appendChild(cell)
          );
        }
      }
    },
    completeAnimation(animation) {
      if (animation === "confetti") {
        this.$refs.confetti.stop();
      } else if (animation === "levelup") {
        this.$refs.levelup.stop();
      }
    },
    gameOver() {
      if (
        this.current.some((index) =>
          this.squares[this.currentPosition + index].classList.contains(
            "filled"
          )
        )
      ) {
        if (this.store.score > this.store.maxScore) {
          this.store.setHighestScore();
          this.isHighscore = true;
        }
        this.isGameOver = true;
        this.pauseGame();
        document.removeEventListener("keydown", this.control);
        clearInterval(this.timerId);
      }
    },
    hardDrop() {
      while (
        !this.current.some((index) =>
          this.squares[
            this.currentPosition + index + this.width
          ].classList.contains("filled")
        )
      ) {
        this.moveDown();
      }
      this.freeze();
    },
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.control);
  },
};
</script>

<style scoped lang="scss">
.board-animation {
  position: absolute;
  left: var(--size);
  pointer-events: none;
  user-select: none;
  bottom: var(--size);
  width: var(--grid-width);

  &.confetti {
    height: auto;
  }

  &.levelup {
    height: var(--grid-height);
  }
}

.game-board-header {
  grid-area: game-board-header;
}

.container {
  position: relative;
  background: white;
  padding: var(--size);
  border-radius: 20px;
  height: fit-content;
  width: fit-content;
  gap: calc(var(--size) / 2);
  display: grid;
  grid-template-areas: "game-board-header preview" "grid preview" "grid stats" "grid stats" "grid actions";

  @media (max-width: $tablet) {
    padding: calc(var(--size) / 2);
    gap: calc(var(--size) / 2);

    .board-animation {
      left: calc(var(--size) / 2);
      bottom: calc(var(--size) / 2);
    }
  }

  @media (max-width: $mobile) {
    padding: 16px;
    gap: 12px;
    grid-template-areas: "game-board-header game-board-header" "stats stats" "grid actions" "grid preview";
    width: 100%;
    background: transparent;

    .board-animation {
      left: 16px;
      bottom: 16px;
    }
  }

  @media (max-width: $mobile) {
    padding: 0;
  }
}

.grid {
  grid-area: grid;
  width: var(--grid-width);
  height: var(--grid-height);
  display: flex;
  flex-wrap: wrap;

  div {
    height: var(--piece-size);
    width: var(--piece-size);
    border: 1px solid white;
    box-sizing: border-box;
    background: var(--background);
    border-radius: var(--piece-border-radius);
    @media (max-width: $mobile) {
      border-color: var(--background);
      background: white;
    }
  }
}

.actions {
  grid-area: actions;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eff2f7;
  align-self: flex-end;

  @media (max-width: $tablet) {
    z-index: 4;
  }

  @media (max-width: $mobile) {
    flex-direction: column-reverse;
    border: none;
    align-items: center;
    width: fit-content;
    button {
      padding: 12px !important;
      width: fit-content;
      border-radius: 100%;
      svg {
        pointer-events: none;
      }
    }
  }
}

.game-stats {
  grid-area: stats;
  width: 100%;
}

.piece {
  border-width: 0.5px;
  border-color: white;
  border-style: solid;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: inset -2px 2px 0px rgba(255, 255, 255, 0.5),
    inset 2px -2px 0px rgba(0, 0, 0, 0.1);
}

.preview {
  grid-area: preview;
  .preview-text {
    font-size: 12px;
    margin-top: 0;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  .preview-grid {
    width: var(--preview-grid-size);
    height: var(--preview-grid-size);
    display: flex;
    flex-wrap: wrap;
    grid-area: preview-grid;
    div {
      height: var(--piece-size);
      width: var(--piece-size);
      border: 1px solid white;
      box-sizing: border-box;
      background: none;
      border-radius: var(--piece-border-radius);

      @media (max-width: $mobile) {
        border-color: var(--background);
      }
    }
  }
}

.filled {
  &--hidden {
    visibility: hidden;
  }
}

.information {
  margin-left: 20px;
}
</style>
