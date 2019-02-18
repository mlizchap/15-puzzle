document.addEventListener("DOMContentLoaded", loadGame)

function loadGame() {
  const game = new Board(4,4);
  game.createBoard();

  const shuffleButton = document.getElementById("shuffleButton");
  shuffleButton.addEventListener("click", () => game.shuffleBoard());
}

class Board {
  constructor(width, height) {
    this.blockArray = Array(width * height).fill().map((elem, i) => i === 0 ? null : i); 
    this.width = width; // number of blocks in row
    this.height = height; // number of blocks in column
  }

  createBoard() {
    for (let i = 0; i < this.height; i++) {
      const blockRow = document.createElement("div"); 
      for (let i = 0; i < this.width; i++) {
        const block = this.createBlock(); // creates a block DOM element
        blockRow.append(block);
      }
      document.getElementById("board").append(blockRow);
    }
    this.shuffleBoard();
  }

  // shuffle w/o replacement using Fisher-Yates algorithm
  shuffleBoard() {
    const arr = this.blockArray;
    for (let i = arr.length - 1; i > 0; i--) {
      const iRandom = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[iRandom]] = [arr[iRandom], arr[i]];
    }
    this.render();
  }

  createBlock(clickHandler) {
    const block = document.createElement("div")

    block.addEventListener("click", () => this.moveBlock(block));
    block.className = 'block'
    return block;
  }

  moveBlock(block) {
    if (block.value === null) {
      return
    }

    const arr = this.blockArray
    const iSelected = arr.indexOf(block.value)
    const iEmptyBlock = arr.indexOf(null);

    const movableBlocks = new Set([
     iEmptyBlock + 1,
     iEmptyBlock - 1,
     iEmptyBlock + this.width,
     iEmptyBlock - this.width,
    ])

    if (movableBlocks.has(iSelected)) {
      [arr[iSelected], arr[iEmptyBlock]] = [arr[iEmptyBlock], arr[iSelected]];
      this.render();
    }
  }

  renderBlock(block, blockValue, position) {
    block.innerHTML = blockValue === null ? '&nbsp;' : blockValue
    block.value = blockValue;

    if (blockValue === null) {
      block.className = 'block empty-block'
    } else if (blockValue === position + 1) {
      block.className = 'block correct-block'
    } else {
      block.className = 'block incorrect-block'
    }
  }

  render() {
    const board = document.getElementById("board");
    Array(...board.children).forEach((boardRow, i) => {
      Array(...boardRow.children).forEach((block, j) => {
        const position = i * this.width + j;
        const blockValue = this.blockArray[position];
        this.renderBlock(block, blockValue, position);
      });
    });
  }
}

function displayInfo() {

}