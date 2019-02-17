document.addEventListener("DOMContentLoaded", function(event) {
    class Board {
      constructor() {
        this.selectedBlock = null;
        this.blockArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.touched = false;
      }

      _createBlock(val, index) {
        console.log(val/2)
        const blockDiv= document.createElement("div")
        


        if (val === index + 1 && val !== 0 ) {
          blockDiv.style.backgroundColor = "#feffdd"
        } else if (val !== 0) {
          blockDiv.style.backgroundColor = "white"
        }

        if (val === 0) {
          blockDiv.className = "emptyBlock";
        } else {
          blockDiv.innerHTML = val;
          blockDiv.className = "block";
        }
        
        blockDiv.addEventListener("click", () => this.selectBlock(val));
        return blockDiv;
      }

      _clearBoard() {
        let element = document.getElementById("board");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }

      renderBoard(restartGame = false) {
        this._clearBoard()

        if (restartGame || !this.touched) {
          this.shuffleArray()
        } 

        this.blockArray.forEach((blockItem, index) => {
          const block = this._createBlock(blockItem, index)
          document.getElementById("board").append(block);
        })

        this.touched = true;
      }

      

      selectBlock(blockDiv) {
        this.selectedBlock = blockDiv;
        this.reOrderBlocks();
      }

      reOrderBlocks() {
        const selectedIndex = this.blockArray.indexOf(this.selectedBlock)
        const emptyIndex = this.blockArray.indexOf(0);

        const onRightEdge = ( (selectedIndex + 1) % 4 === 0);
        //const onTopEdge = ( (selectedIndex + 1) % 4 === 0);
        const itemIsToRightOfEmptySlot = selectedIndex - 1 === emptyIndex;
        const itemIsToLeftOfEmptySlot = selectedIndex + 1 === emptyIndex && !onRightEdge;
        const itemIsAboveEmptySlot = selectedIndex + 4 === emptyIndex;
        const itemIsBelowEmptyItem = selectedIndex - 4 === emptyIndex;
        
        if (itemIsToRightOfEmptySlot || itemIsToLeftOfEmptySlot || itemIsAboveEmptySlot || itemIsBelowEmptyItem) {
          [this.blockArray[selectedIndex], this.blockArray[emptyIndex]] = [this.blockArray[emptyIndex], this.blockArray[selectedIndex]]
        }
        
        this.renderBoard();
      }

      shuffleArray() {
        for (let i = this.blockArray.length - 1; i > 0; i--) {
          let j = i - 1;
          let randIndex = Math.floor(Math.random() * j);
          let temp = this.blockArray[i];
          this.blockArray[i] = this.blockArray[randIndex];
          this.blockArray[randIndex] = temp;
        } 
      }

      resetBoard() {
        console.log("RESET")
        this.shuffleArray();
      }
  }



  const game = new Board();
  game.renderBoard();

  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", () => game.renderBoard(true));

})