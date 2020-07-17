class Items {
  constructor(game) {
    this.game = game;

    this.positionX = 50;
    this.positionY = 50;
    this.width = 50;
    this.height = 50;
    this.speed = 7.5;

    this.setPosition();
  }

  setPosition() {
    const positionX = Math.floor(Math.random() * 7) * 100 + 50;
    const positionY = -Math.floor(Math.random() * 7) * 100 - 50;
    this.positionX = positionX;
    this.positionY = positionY;
  }

  levelUp() {
    if (this.game.score.score >= 0 && this.game.score.score <= 50) {
      this.speed = 5;
    } else if (this.game.score.score > 50 && this.game.score.score <= 100) {
      this.speed = 7.5;
    } else if (this.game.score.score > 100 && this.game.score.score <= 150) {
      this.speed = 10;
    } else {
      this.speed = 12.5;
    }
  }

  runLogic() {
    this.levelUp();
  }

  paint() {
    const context = this.game.context;
    context.save();
    const itemImg = new Image();
    itemImg.src = '/images/m&m.png';

    context.drawImage(
      itemImg,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    context.restore();
  }
}
