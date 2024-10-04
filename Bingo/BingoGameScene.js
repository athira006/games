class BingoGame extends Phaser.Scene {
  constructor() {
    super({ key: "BingoGame" });
    this.reelSymbols = ['symbol1', 'symbol2', 'symbol3', 'symbol4', 'symboll1'];
    this.reels = [];
    this.score = 0;
    this.scoreText = null;
  }

  preload() {
    this.load.image("background1", "assets/background1.png");
    this.load.image("symbol1", "assets/symbol1.png");
    this.load.image("symboll1", "assets/symboll1.png");
    this.load.image("symbol2", "assets/symbol2.png");
    this.load.image("symbol3", "assets/symbol3.png");
    this.load.image("symbol4", "assets/symbol4.png");
    this.load.image("wild", "assets/wild.png"); 
    this.load.image('spinwheel', 'assets/spinwheel.png'); 
    this.load.image('spinutton', 'assets/spinbutton.png');
  }

  create() {
    this.add.image(400, 300, "background1").setDisplaySize(800, 800).setDepth(0);
    this.createReels();
    this.createSpinButton();
    this.displayScore();
  }

  createReels() {
    const reelPositions = [100, 250, 400, 550, 700]; 
    const symbolHeight = 120;
    const rows = 5;

    reelPositions.forEach((x, colIndex) => {
        const reel = [];
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            let symbolKey;

            if (colIndex === 2 && rowIndex === 2) {
                symbolKey = Phaser.Math.RND.pick(['wild']); 
            } else {
                symbolKey = Phaser.Math.RND.pick(this.reelSymbols); // pick other symbols
            }

            const symbol = this.add.sprite(x, 100 + rowIndex * (symbolHeight + 10), symbolKey)
              .setDisplaySize(90, 90)
              .setOrigin(0.5, 0.5)
              .setDepth(15);
            reel.push(symbol);
        }
        this.reels.push(reel);
    });
  }

  createSpinButton() {
    const spinButton = this.add.text(400, 670, "SPIN", {
      fontSize: "40px",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { left: 20, right: 20, top: 10, bottom: 10 },
    }).setDepth(10);
    spinButton.setOrigin(0.5);
    spinButton.setInteractive();

    spinButton.on("pointerdown", () => {
      this.spinReels();
    });
  }

  spinReels() {
    this.reels.forEach((reel, colIndex) => {
        reel.forEach((symbol, rowIndex) => {
            if (colIndex === 2 && rowIndex === 2) {
                return;
            }
            const newSymbolKey = Phaser.Math.RND.pick(this.reelSymbols);
            symbol.setTexture(newSymbolKey); 
            symbol.setPosition(100 + colIndex * 150, 100 + rowIndex * 130); 
        });
    });

    this.checkForWin();
  }

  checkForWin() {
    const columnCount = this.reels.length;
    const rowCount = this.reels[0].length;
    let win = false;  

    const isMatch = (symbol1, symbol2) => {
      return symbol1 === symbol2 || symbol1 === "wild" || symbol2 === "wild";
    };

    // V
    for (let col = 0; col < columnCount; col++) {
      let firstSymbolKey = this.reels[col][0].texture.key;  
      let verticalMatch = true;

      for (let row = 1; row < rowCount; row++) {
        const currentSymbolKey = this.reels[col][row].texture.key;
        if (!isMatch(firstSymbolKey, currentSymbolKey)) {
          verticalMatch = false;
          break;
        }
      }
                                          
      if (verticalMatch) {
        this.displayWinMessage(firstSymbolKey);
        win = true;
        break;  
      }
    }

    // H
    for (let row = 0; row < rowCount; row++) {
      let firstSymbolKey = this.reels[0][row].texture.key;  
      let horizontalMatch = true;

      for (let col = 1; col < columnCount; col++) {
        const currentSymbolKey = this.reels[col][row].texture.key;
        if (!isMatch(firstSymbolKey, currentSymbolKey)) {
          horizontalMatch = false;
          break;
        }
      }

      if (horizontalMatch) {
        this.displayWinMessage(firstSymbolKey);
        win = true;
        break;  
      }
    }

    
    let diagonalMatch1 = true;
    let firstSymbolKey = this.reels[0][0].texture.key;
    for (let i = 1; i < Math.min(columnCount, rowCount); i++) {
      const currentSymbolKey = this.reels[i][i].texture.key;
      if (!isMatch(firstSymbolKey, currentSymbolKey)) {
        diagonalMatch1 = false;
        break;
      }
    }

    if (diagonalMatch1) {
      this.displayWinMessage(firstSymbolKey);
      win = true;
    }

    
    let diagonalMatch2 = true;
    firstSymbolKey = this.reels[columnCount - 1][0].texture.key;
    for (let i = 1; i < Math.min(columnCount, rowCount); i++) {
      const currentSymbolKey = this.reels[columnCount - 1 - i][i].texture.key;
      if (!isMatch(firstSymbolKey, currentSymbolKey)) {
        diagonalMatch2 = false;
        break;
      }
    }

    if (diagonalMatch2) {
      this.displayWinMessage(firstSymbolKey);
      win = true;
    }

    if (win) {
      this.updateScore(); 
    }
  }

  updateScore(points = 5) {
    this.score += points;
    this.displayScore();
  }

  displayWinMessage(symbolKey) {
    this.add.text(400, 300, `You win with ${symbolKey}!`, {
      fontSize: "32px",
      color: "#ff0000",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(20);
  }

  displayScore() {
    if (this.scoreText) {
      this.scoreText.setText(`Score: ${this.score}`);
    } else {
      this.scoreText = this.add.text(100, 50, `Score: ${this.score}`, {
        fontSize: "32px",
        color: "#ffffff",
        fontStyle: "bold",
      }).setOrigin(0.5).setDepth(10);
    }
  }
}

export default BingoGame;
