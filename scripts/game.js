class Game {
  constructor(canvas) {
    this.context = canvas.getContext('2d');

    this.labyrinth = new Labyrinth(this);
    this.player = new Player(this);
    this.item = new Items(this);
    this.score = new Score(this);
    this.slowItem = new SlowDownItem(this);
    this.items = [];
    this.slowItems = [];
    this.gameRunning = false;

    this.setKeyBindings();
    this.generateItems();
    this.generateSlowItems();
  }

  generateItems() {
    for (let i = 0; i < 5; i++) {
      const item = new Items(this);
      this.items.push(item);
    }
  }

  generateSlowItems() {
    const slowItem = new SlowDownItem(this);
    this.slowItems.push(slowItem);
  }

  addItemAfterColliding() {
    if (this.items.length < 5) {
      const item = new Items(this);
      this.items.push(item);
    }
  }

  checkCollisionLogic() {
    const playerPositionX = this.player.positionX;
    const playerPositionY = this.player.positionY;

    for (let el of this.items) {
      const collides =
        el.positionX === playerPositionX &&
        ((el.positionY <= playerPositionY + SQUARE_SIZE &&
          el.positionY >= playerPositionY) ||
          (el.positionY >= playerPositionY - SQUARE_SIZE &&
            el.positionY <= playerPositionY));

      if (this.score.score <= 150 && collides) {
        this.score.score += 10;
        this.items.splice(this.items.indexOf(el), 1);
      } else if (
        this.score.score > 150 &&
        this.score.score <= 200 &&
        collides
      ) {
        this.score.score += 10;
        this.items.splice(this.items.indexOf(el), 1);
        const positionX = Math.floor(1 + Math.random() * 6) * 100;
        const positionY = Math.floor(1 + Math.random() * 5) * 100 + 50;
        this.labyrinth.labyrinth.push([positionX, positionY]);
      } else if (
        this.score.score > 250 &&
        this.score.score <= 300 &&
        collides
      ) {
        this.score.score += 10;
        this.items.splice(this.items.indexOf(el), 1);
        const positionX = Math.floor(1 + Math.random() * 6) * 100;
        const positionY = Math.floor(1 + Math.random() * 5) * 100 + 50;
        this.labyrinth.labyrinth.push([positionX, positionY]);
      } else if (this.score.score === 350 && collides) {
        this.score.score += 10;
        this.items.splice(this.items.indexOf(el), 1);
        this.labyrinth.labyrinth.push([300, 650]);
        this.labyrinth.labyrinth.push([400, 650]);
      } else if (collides) {
        this.score.score += 10;
        this.items.splice(this.items.indexOf(el), 1);
      }
    }
  }

  dropItem() {
    for (let el of this.items) {
      if (el.positionY >= 650 && this.player.health > 1) {
        this.items.splice(this.items.indexOf(el), 1);
        this.player.health--;
        return;
      } else if (el.positionY >= 650 && this.player.health === 1) {
        this.player.health = 0;
        this.gameRunning = false;
        const body = document.querySelector('body');
        const section = document.createElement('section');
        section.innerHTML = `
        <div class="container">
        <h2 class="game-over">Game Over</h2>
        <p class="points">Points: ${this.score.score}</p>
        <button class="restart">Restart</button>
      </div>
        `;
        body.appendChild(section);
        const button = document.querySelector('.restart');

        button.addEventListener('click', () => {
          this.player.health = 3;
          this.score.score = 0;
          this.items.splice(0, this.items.length);
          this.player.positionX = 700 - SQUARE_SIZE;
          this.player.positionY = 700 - SQUARE_SIZE;
          for (let i = this.labyrinth.labyrinth.length; i > 36; i--) {
            this.labyrinth.labyrinth.pop();
          }
          this.gameRunning = true;
          section.remove();
          this.loop();
        });

        this.player.health--;
        el.positionY = 650;
        return;
      } else {
        el.positionY = el.positionY + el.speed;
      }
    }
  }

  //SLOW ITEMS DROM
  dropSlowItem() {
    if (this.score.score > 300) {
      for (let el of this.slowItems) {
        el.positionY += el.speed;
        if (el.positionY >= 650) {
          this.slowItems.splice(0, 1);
        }
      }
    }
  }

  startGame() {
    const startGameEl = document.querySelector('.start-menu');
    startGameEl.addEventListener('click', () => {
      startGameEl.remove();
      this.gameRunning = true;
      setTimeout(() => {
        this.loop();
      }, 70);
    });
  }

  setKeyBindings() {
    window.addEventListener('keyup', e => {
      e.preventDefault;
      this.player.setDirection('none');
    });

    window.addEventListener('keydown', e => {
      const key = e.key;
      switch (key) {
        case 'ArrowUp':
          e.preventDefault();
          this.player.setDirection('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.player.setDirection('down');
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.player.setDirection('right');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.player.setDirection('left');
          break;
      }
    });
  }

  runLogic() {
    this.player.runLogic();
    this.labyrinth.runLogic();
    this.item.runLogic();
    this.score.runLogic();
    this.slowItem.runLogic();
    this.checkCollisionLogic();
    this.addItemAfterColliding();
    this.dropItem();
    this.dropSlowItem();

    for (let el of this.items) {
      el.runLogic();
    }
  }

  clearScreen() {
    this.context.clearRect(0, 0, 750, 750);
  }

  paint() {
    this.labyrinth.paint();
    this.player.paint();
    this.score.paint();

    for (let el of this.items) {
      el.paint();
    }

    for (let el of this.slowItems) {
      el.paint();
    }
  }

  loop() {
    if (!this.gameRunning) {
      this.startGame();
      return;
    } else {
      this.runLogic();
      this.clearScreen();
      this.paint();
      if (this.player.health === 0) {
        return;
      }
      setTimeout(() => {
        this.loop();
      }, 70);
    }
  }
}
