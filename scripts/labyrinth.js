const SQUARE_SIZE = 50;

class Labyrinth {
  constructor(game) {
    this.game = game;
    this.labyrinth = [];
    this.buildLabyrinth();
  }
  //Methods
  //Logic
  buildLabyrinth() {
    for (let i = 2; i < 13; i++) {
      for (let j = 2; j < 13; j++) {
        if (i % 2 === 0 && j % 2 === 0) {
          this.labyrinth.push([i * SQUARE_SIZE, j * SQUARE_SIZE]);
        }
      }
    }
    console.log(this.labyrinth);
  }

  paintWalls() {
    const context = this.game.context;
    for (let i = 0; i < 15; i++) {
      const itemImg = new Image();
      itemImg.src = '/images/wall.jpg';
      for (let j = 0; j < 2; j++) {
        context.drawImage(itemImg, j * 700, i * 50, SQUARE_SIZE, SQUARE_SIZE);
      }
    }
  }

  paintTrashCans() {
    const context = this.game.context;
    for (let i = 0; i < 13; i++) {
      const itemImg = new Image();
      itemImg.src = '/images/Trash-Can.png';
      context.drawImage(itemImg, (i + 1) * 50, 700, SQUARE_SIZE, SQUARE_SIZE);
    }
  }

  paintObstacles() {
    const context = this.game.context;
    for (let element of this.labyrinth) {
      const itemImg = new Image();
      itemImg.src = '/images/grass.png';
      context.drawImage(
        itemImg,
        element[0],
        element[1],
        SQUARE_SIZE,
        SQUARE_SIZE
      );
      //context.fillRect(element[0], element[1], SQUARE_SIZE, SQUARE_SIZE);
    }
  }

  runLogic() {}
  //Paint
  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'red';
    context.fillRect(0, 49.5, 750, 0.5);
    context.restore();

    this.paintWalls();
    this.paintTrashCans();
    this.paintObstacles();
  }
}
