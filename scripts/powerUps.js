class SlowDownItem {
  constructor(game) {
    this.game = game;

    this.positionX;
    this.positionY;
    this.width = 50;
    this.height = 50;
    this.speed = 5;
    this.usage = [];

    this.setPosition();
  }

  setPosition() {
    const positionX = Math.floor(Math.random() * 7) * 100 + 50;
    const positionY = -Math.floor(Math.random() * 7) * 100 - 50;
    this.positionX = positionX;
    this.positionY = positionY;
  }

  checkCollision() {
    const playerPositionX = this.game.player.positionX;
    const playerPositionY = this.game.player.positionY;

    for (let el of this.game.slowItems) {
      const collides =
        el.positionX === playerPositionX &&
        ((el.positionY <= playerPositionY + SQUARE_SIZE &&
          el.positionY >= playerPositionY) ||
          (el.positionY >= playerPositionY - SQUARE_SIZE &&
            el.positionY <= playerPositionY));

      if (collides) {
        this.game.slowItems.splice(0, 1);
      }
    }
  }

  slowDown() {
    if (this.game.slowItems.length === 0 && this.usage.length < 3) {
      const playerPositionX = this.game.player.positionX;
      const playerPositionY = this.game.player.positionY;

      for (let el of this.game.items) {
        const collides =
          el.positionX === playerPositionX &&
          ((el.positionY <= playerPositionY + SQUARE_SIZE &&
            el.positionY >= playerPositionY) ||
            (el.positionY >= playerPositionY - SQUARE_SIZE &&
              el.positionY <= playerPositionY));
        el.speed = 5;
        if (collides) {
          this.usage.push('used');
        }
      }
    }
  }

  runLogic() {
    this.checkCollision();
    this.slowDown();
  }

  paint() {
    const context = this.game.context;
    const itemImg = new Image();
    itemImg.src = '/images/BrownCharacter.png';
    context.save();
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
