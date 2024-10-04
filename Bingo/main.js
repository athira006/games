import FrontPage from './FrontPageScene.js';
import BingoGame from './BingoGameScene.js';
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 700,
  scene: [FrontPage, BingoGame],
  backgroundColor: "#282828",
  parent: 'game-container'
};

window.game = new Phaser.Game(config);
