document.addEventListener("DOMContentLoaded", function(event) {
    class Board {
      constructor() {
        this.selectBlock = null;
        this.blockArray = [12, 14, 11, 7, 6, 3, 4, 9, 1, 2, 5, 8, 10, 13, 15, 0];
      }

      createBlock(val) {
        const blockDiv= document.createElement("div")
        blockDiv.innerHTML = val;
        blockDiv.className = "block";
        blockDiv.addEventListener("click", () => this.selectBlock(blockDiv));
        return blockDiv;
      }

      createBoard() {
        this.blockArray.forEach(blockItem => {
          const block = this.createBlock(blockItem)
          document.getElementById("board").append(block);
        })
      }

      selectBlock(blockDiv) {
        this.selectedBlock = blockDiv;
        this.reOrderBlocks();
      }
  }

  const game = new Board();
  game.createBoard();


})