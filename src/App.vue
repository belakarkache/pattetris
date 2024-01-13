<template>
  <div id="app">
    <h3>Score: <span>{{ score }}</span></h3>
    <h1>Level: <span>{{ level }}</span></h1>
    <button @click="toggleGame">{{ gameRunning ? 'Pause' : 'Start' }}</button>

    <div class="container">
      <div class="grid">
        <div v-for="(cell, index) in grid" :key="index" :class="{ 'taken': cell.taken }"></div>
      </div>
      <div class="mini-grid">
        <div v-for="(cell, index) in miniGrid" :key="index" :class="{ 'tetromino': cell.tetromino }"></div>
      </div>
    </div>

    <Vue3Lottie :animationData="Confetti" :height="200" :width="200" :loop="1" :autoPlay="false" ref="confetti"
      @on-complete="completeAnimation" />

  </div>
</template>

<script>
import TetrominoFactory from '../TetrominoFactory.js';
import { Vue3Lottie } from 'vue3-lottie';
import Confetti from './assets/confetti.json';

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      Confetti,
      width: 10,
      grid: Array(200).fill({ taken: false }).concat(Array(10).fill({ taken: true })),
      miniGrid: Array(16).fill({ tetromino: false }),
      squares: Array.from(document.querySelectorAll(".grid div")),
      displaySquares: Array.from(document.querySelectorAll(".mini-grid div")),
      score: 0,
      level: 1,
      speed: 1000,
      gameRunning: false,
      linesCleared: 0,
      timerId: null,
      currentPosition: 4,
      currentRotation: 0,
      current: [],
      nextRandom: 0,
      colors: ["orange", "red", "purple", "green", "blue"],
      random: null,
      displayWidth: 4,
      displayIndex: 0,
      tetrominoFactory: new TetrominoFactory(10),
      currentTetromino: [],
    };
  },
  computed: {
    lTetromino() {
      return [
        [1, this.width + 1, this.width * 2 + 1, 2],
        [this.width, this.width + 1, this.width + 2, this.width * 2 + 2],
        [1, this.width + 1, this.width * 2 + 1, this.width * 2],
        [this.width, this.width * 2, this.width * 2 + 1, this.width * 2 + 2],
      ]
    },
    zTetromino() {
      return [
        [0, this.width, this.width + 1, this.width * 2 + 1],
        [this.width + 1, this.width + 2, this.width * 2, this.width * 2 + 1],
        [0, this.width, this.width + 1, this.width * 2 + 1],
        [this.width + 1, this.width + 2, this.width * 2, this.width * 2 + 1],
      ]
    },
    tTetromino() {
      return [
        [1, this.width, this.width + 1, this.width + 2],
        [1, this.width + 1, this.width + 2, this.width * 2 + 1],
        [this.width, this.width + 1, this.width + 2, this.width * 2 + 1],
        [1, this.width, this.width + 1, this.width * 2 + 1],
      ]
    },
    oTetromino() {
      return [
        [0, 1, this.width, this.width + 1],
        [0, 1, this.width, this.width + 1],
        [0, 1, this.width, this.width + 1],
        [0, 1, this.width, this.width + 1],
      ]
    },
    iTetromino() {
      return [
        [1, this.width + 1, this.width * 2 + 1, this.width * 3 + 1],
        [this.width, this.width + 1, this.width + 2, this.width + 3],
        [1, this.width + 1, this.width * 2 + 1, this.width * 3 + 1],
        [this.width, this.width + 1, this.width + 2, this.width + 3],
      ]
    },
    theTetrominoes() {
      return [this.lTetromino, this.zTetromino, this.tTetromino, this.oTetromino, this.iTetromino];
    },
    currentTetrominoShape() {
      return this.tetrominoFactory.createTetromino('l'); // Change 'l' to the desired Tetromino type
    },
    upNextTetrominoes() {
      return [
        [1, this.displayWidth + 1, this.displayWidth * 2 + 1, 2], //lTetromino
        [0, this.displayWidth, this.displayWidth + 1, this.displayWidth * 2 + 1], //zTetromino
        [1, this.displayWidth, this.displayWidth + 1, this.displayWidth + 2], //tTetromino
        [0, 1, this.displayWidth, this.displayWidth + 1], //oTetromino
        [1, this.displayWidth + 1, this.displayWidth * 2 + 1, this.displayWidth * 3 + 1], //iTetromino
      ];
    },
  },
  mounted() {
    document.addEventListener("keydown", this.control);
    this.random = Math.floor(Math.random() * this.theTetrominoes.length);
    this.current = this.theTetrominoes[this.random][this.currentRotation];
    this.grid = Array(200).fill({ taken: false }).concat(Array(10).fill({ taken: true }));
    this.squares = Array.from(document.querySelectorAll(".grid div"));
    this.displaySquares = Array.from(document.querySelectorAll(".mini-grid div"));
  },
  methods: {
    //draw the Tetromino
    draw() {
      this.current.forEach((index) => {
        this.squares[this.currentPosition + index].classList.add("tetromino");
        this.squares[this.currentPosition + index].style.backgroundColor = this.colors[this.random];
      });
    },
    //undraw the Tetromino
    undraw() {
      this.current.forEach((index) => {
        this.squares[this.currentPosition + index].classList.remove("tetromino");
        this.squares[this.currentPosition + index].style.backgroundColor = "";
      });
    },
    //assign functions to keyCodes
    control(e) {
      if (e.keyCode === 37) {
        this.moveLeft();
      } else if (e.keyCode === 38) {
        this.rotate();
      } else if (e.keyCode === 39) {
        this.moveRight();
      } else if (e.keyCode === 40) {
        this.moveDown();
      }
    },
    moveDown() {
      this.undraw();
      this.currentPosition += this.width;
      this.draw();
      this.freeze();
    },
    increaseLevel() {
      this.level += 1;
      this.speed = Math.max(100, this.speed - 100); // Decrease speed by 100 milliseconds, but not below 100
      clearInterval(this.timerId);
      this.timerId = setInterval(this.moveDown, this.speed);
    },
    freeze() {
      if (
        this.current.some((index) =>
          this.squares[this.currentPosition + index + this.width].classList.contains("taken")
        )
      ) {
        this.current.forEach((index) =>
          this.squares[this.currentPosition + index].classList.add("taken")
        );
        // Start a new tetromino falling
        this.random = this.nextRandom;
        this.nextRandom = Math.floor(Math.random() * this.theTetrominoes.length);
        this.current = this.theTetrominoes[this.random][this.currentRotation];
        this.currentPosition = 4;
        this.draw();
        this.displayShape();
        this.addScore();
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
          this.squares[this.currentPosition + index].classList.contains("taken")
        )
      ) {
        this.currentPosition += 1;
      }
      this.draw();
    },
    moveRight() {
      this.undraw();
      const isAtRightEdge = this.current.some(
        (index) => (this.currentPosition + index) % this.width === this.width - 1
      );
      if (!isAtRightEdge) this.currentPosition += 1;
      if (
        this.current.some((index) =>
          this.squares[this.currentPosition + index].classList.contains("taken")
        )
      ) {
        this.currentPosition -= 1;
      }
      this.draw();
    },

    isAtRight() {
      return this.current.some((index) => (this.currentPosition + index + 1) % this.width === 0);
    },

    isAtLeft() {
      return this.current.some((index) => (this.currentPosition + index) % this.width === 0);
    },

    checkRotatedPosition(P) {
      P = P || this.currentPosition; //get current position.  Then, check if the piece is near the left side.
      if ((P + 1) % this.width < 4) {
        //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).
        if (this.isAtRight()) {
          //use actual position to check if it's flipped over to right side
          this.currentPosition += 1; //if so, add one to wrap it back around
          this.checkRotatedPosition(P); //check again.  Pass position from start, since long block might need to move more.
        }
      } else if (P % this.width > 5) {
        if (this.isAtLeft()) {
          this.currentPosition -= 1;
          this.checkRotatedPosition(P);
        }
      }
    },

    rotate() {
      this.undraw();
      this.currentRotation++;
      if (this.currentRotation === this.current.length) {
        //if the current rotation gets to 4, make it go back to 0
        this.currentRotation = 0;
      }
      this.current = this.theTetrominoes[this.random][this.currentRotation];
      this.checkRotatedPosition();
      this.draw();
    },

    //display the shape in the mini-grid display
    displayShape() {
      //remove any trace of a tetromino form the entire grid
      this.displaySquares.forEach((square) => {
        square.classList.remove("tetromino");
        square.style.backgroundColor = "";
      });
      this.upNextTetrominoes[this.nextRandom].forEach((index) => {
        this.displaySquares[this.displayIndex + index].classList.add("tetromino");
        this.displaySquares[this.displayIndex + index].style.backgroundColor =
          this.colors[this.nextRandom];
      });
    },

    // Add your existing methods here, e.g., moveLeft, moveRight, moveDown, rotate, etc.
    toggleGame() {
      if (this.gameRunning) {
        clearInterval(this.timerId);
        this.timerId = null;
      } else {
        this.startGame();
      }
    },
    startGame() {
      this.gameRunning = true;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      } else {
        this.draw();
        this.timerId = setInterval(this.moveDown, 1000);
        this.nextRandom = Math.floor(Math.random() * this.theTetrominoes.length);
        this.displayShape();
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

        if (row.every((index) => this.squares[index].classList.contains("taken"))) {
          this.score += 100; // Award 100 points per line
          this.linesCleared += 1;

          this.$refs.confetti.play();

          // bodymovin.loadAnimation({
          //   container: animationContainer,
          //   renderer: "svg",
          //   loop: false,
          //   autoplay: true,
          //   path: "./assets/confetti.json", // Provide the path to your confetti animation JSON file
          // });

          if (this.linesCleared % 5 === 0) {
            this.increaseLevel();
          }

          row.forEach((index) => {
            this.squares[index].classList.remove("taken");
            this.squares[index].classList.remove("tetromino");
            this.squares[index].style.backgroundColor = "";
          });

          const squaresRemoved = this.squares.splice(i, this.width);
          this.squares = squaresRemoved.concat(this.squares);
          this.squares.forEach((cell) => this.$el.querySelector('.grid').appendChild(cell));
        }
      }
    },
    completeAnimation() {
      console.log('completeAnimation')
      this.$refs.confetti.stop();
    },
    gameOver() {
      if (
        this.current.some((index) =>
          this.squares[this.currentPosition + index].classList.contains("taken")
        )
      ) {
        alert("Game Over");
        clearInterval(this.timerId);
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.control);
  },
};
</script>

<style scoped lang="scss">
body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
}

#confetti-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  user-select: none;
  width: 150px;
  height: 150px;
}

.container {
  display: flex;
}


.grid {
  width: 200px;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  background-color: yellow;
}

.grid div {
  height: 20px;
  width: 20px;
}

.tetromino {
  background-color: blue;
}


.mini-grid {
  margin-left: 50px;
  width: 80px;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  background-color: yellow;
}

.mini-grid div {
  height: 20px;
  width: 20px;
}
</style>