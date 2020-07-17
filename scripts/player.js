class Player {
  constructor(game) {
    this.game = game;

    this.positionX = 700 - SQUARE_SIZE;
    this.positionY = 700 - SQUARE_SIZE;
    this.direction = 'none';
    this.health = 3;
    this.character = new Image();
    this.character.src = '/images/player.png';

    this.speed = 50;
  }

  //Logic

  setDirection(direction) {
    this.direction = direction;
  }

  runMovement(direction) {
    const labyrinth = this.game.labyrinth.labyrinth;
    switch (direction) {
      case 'right':
        for (let el of labyrinth) {
          if (
            (this.positionX > el[0] - this.speed - SQUARE_SIZE &&
              this.positionX + SQUARE_SIZE === el[0] &&
              this.positionY === el[1]) ||
            (this.positionX === 750 - 2 * SQUARE_SIZE && this.positionY <= 750)
          ) {
            return;
          }
        }
        this.positionX += this.speed;
        break;
      case 'left':
        for (let el of labyrinth) {
          if (
            (this.positionX < el[0] + SQUARE_SIZE + this.speed &&
              this.positionX === el[0] + SQUARE_SIZE &&
              this.positionY === el[1]) ||
            (this.positionX === SQUARE_SIZE && this.positionY <= 750)
          ) {
            return;
          }
        }
        this.positionX -= this.speed;
        break;
      case 'up':
        for (let el of labyrinth) {
          if (
            (this.positionY > el[1] + SQUARE_SIZE - this.speed &&
              this.positionX === el[0]) ||
            (this.positionX <= 750 && this.positionY === SQUARE_SIZE)
          ) {
            return;
          }
        }
        this.positionY -= this.speed;
        break;
      case 'down':
        for (let el of labyrinth) {
          if (
            (this.positionY > el[1] - SQUARE_SIZE - this.speed &&
              this.positionX === el[0]) ||
            (this.positionX <= 750 && this.positionY === 750 - 2 * SQUARE_SIZE)
          ) {
            return;
          }
        }
        this.positionY += this.speed;
        break;
    }
  }
  runLogic() {
    this.runMovement(this.direction);
  }
  //Paint
  paint() {
    const context = this.game.context;

    context.drawImage(
      this.character,
      this.positionX,
      this.positionY,
      SQUARE_SIZE,
      SQUARE_SIZE
    );
  }
}
