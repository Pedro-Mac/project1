class Score {
  constructor(game) {
    this.game = game;
    this.score = 0;
  }

  displayScore() {
    const score = document.querySelector('.score-health');
    score.innerHTML = `<h3>Score: ${this.score}</h3>
                       <h3>Health: ${this.game.player.health}</h3>`;
  }
  //Logic
  runLogic() {
    this.displayScore();
  }
  //Paint
  paint() {
    const context = this.game.context;
    context.save();
    context.font = '32px sans-serif';
    context.fillStyle = '#6984cf';
    context.fillText(`Score: ${this.score}`, 50, 790);
    context.fillText(`Health: ${this.game.player.health}`, 570, 790);
    context.restore();
  }
}
