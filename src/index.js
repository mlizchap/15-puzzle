document.addEventListener("DOMContentLoaded", function(event) {
    class Board {
      constructor() {
        this.selectedBlock = null;
        this.blockArray = this.createRandomBlockArray();
      }

      createRandomBlockArray() {
        let orderedArray = Array.from({length: 16}, (_, item) => item);        
        const shuffledArray = () => {
          for (let i = orderedArray.length - 1; i > 0; i--) {
            let j = i - 1;
            let randIndex = Math.floor(Math.random() * j);
            let temp = orderedArray[i];
            orderedArray[i] = orderedArray[randIndex];
            orderedArray[randIndex] = temp;
          } 
          return orderedArray;       
        }
        return shuffledArray();
      }

      _createBlock(val) {
        const blockDiv= document.createElement("div")
        
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

      renderBoard() {
        this._clearBoard();

        this.blockArray.forEach(blockItem => {
          const block = this._createBlock(blockItem)
          document.getElementById("board").append(block);
        })
      }

      selectBlock(blockDiv) {
        this.selectedBlock = blockDiv;
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