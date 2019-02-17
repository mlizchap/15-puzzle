document.addEventListener("DOMContentLoaded", function(event) {
    // const element = document.createElement('h1')
    // element.innerHTML = "Hello World"
    // document.body.appendChild(element)

    class Board {
      constructor() {
        this.blockArray = [12, 14, 11, 7, 6, 3, 4, 9, 1, 2, 5, 8, 10, 13, 15, 0];
      }

      createBoard() {
        this.blockArray.forEach(blockItem => {
          
          /* refactor to create block item */
          const blockDiv= document.createElement("div")
          blockDiv.innerHTML = blockItem;
          blockDiv.className = "block";
          
          
          document.getElementById("board").append(blockDiv);
      })
    }
  }

  const game = new Board();
  game.createBoard();


})