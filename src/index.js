document.addEventListener("DOMContentLoaded", function(event) {
    class Board {
      constructor() {
        this.blockArray = [12, 14, 11, 7, 6, 3, 4, 9, 1, 2, 5, 8, 10, 13, 15, 0];
      }

      createBlock(val) {
        const blockDiv= document.createElement("div")
        blockDiv.innerHTML = val;
        blockDiv.className = "block";
        return blockDiv;
      }

      createBoard() {
        this.blockArray.forEach(blockItem => {
          const block = this.createBlock(blockItem)
          document.getElementById("board").append(block);
      })
    }
  }

  const game = new Board();
  game.createBoard();


})