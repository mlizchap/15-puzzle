document.addEventListener("DOMContentLoaded", function(event) {
    class Board {
      constructor() {
        this.selectedBlock = null;
        this.blockArray = [12, 14, 11, 7, 6, 3, 4, 9, 1, 2, 5, 8, 10, 13, 15, 0];
      }

      createBlock(val) {
        const blockDiv= document.createElement("div")
        blockDiv.innerHTML = val;
        blockDiv.className = "block";
        blockDiv.addEventListener("click", () => this.selectBlock(val));
        return blockDiv;
      }

      clearBoard() {
        let element = document.getElementById("board");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }

      renderBoard() {
        // if (this.selectedBlock) {
          this.clearBoard();
        //}
        this.blockArray.forEach(blockItem => {
          const block = this.createBlock(blockItem)
          document.getElementById("board").append(block);
        })
      }

      selectBlock(blockDiv) {
        this.selectedBlock = blockDiv;
        console.log(blockDiv)
        this.reOrderBlocks();
      }

      reOrderBlocks() {
        const selectedIndex = this.blockArray.indexOf(this.selectedBlock)
        const emptyIndex = this.blockArray.indexOf(0);
        
        const itemIsToRightOfEmptySlot = selectedIndex + 1 === emptyIndex;
        const itemIsToLeftOfEmptySlot = selectedIndex - 1 === emptyIndex;
        const itemIsAboveEmptySlot = selectedIndex + 4 === emptyIndex;
        const itemIsBelowEmptyItem = selectedIndex - 4 === emptyIndex;
        
        if (itemIsToRightOfEmptySlot || itemIsToLeftOfEmptySlot || itemIsAboveEmptySlot || itemIsBelowEmptyItem) {
          [this.blockArray[selectedIndex], this.blockArray[emptyIndex]] = [this.blockArray[emptyIndex], this.blockArray[selectedIndex]]
        }
        
        this.renderBoard();
      }
  }

  const game = new Board();
  game.renderBoard();


})