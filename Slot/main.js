import SlotGame from './slot.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: SlotGame,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      },
    },
};

const game = new Phaser.Game(config);
