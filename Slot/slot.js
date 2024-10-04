class SlotGame extends Phaser.Scene {
  constructor() {
    super({ key: "SlotGame" });
    this.reelSymbols = ['symbol1', 'symbol2', 'symbol3', 'symbol4', 'symbol5'];
    this.reels = [];
 
  this.winningPatterns = [
    [[0,0], [0,1], [0,2], [0,3], [0,4]],
    [[1,0], [1,1], [1,2], [1,3], [1,4]],
    [[2,0], [2,1], [2,2], [2,3], [2,4]],
    [[3,0], [3,1], [3,2], [3,3], [3,4]],
    [[4,0], [4,1], [4,2], [4,3], [4,4]],

    [[0,0], [1,0], [2,0], [3,0], [4,0]],
    [[0,1], [1,1], [2,1], [3,1], [4,1]],
    [[0,2], [1,2], [2,2], [3,2], [4,2]],
    [[0,3], [1,3], [2,3], [3,3], [4,3]],
    [[0,4], [1,4], [2,4], [3,4], [4,4]],


    [[0,0], [1,1], [2,2], [3,3], [4,4]],
    [[0,4], [1,3], [2,2], [3,1], [4,0]],

    [[1,0], [1,1], [1,2], [1,3], [1,4]],
    [[2,0], [2,1], [2,2], [2,3], [2,4]],
    [[3,0], [3,1], [3,2], [3,3], [3,4]],
    [[4,0], [4,1], [4,2], [4,3], [4,4]],

    [[1,0], [2,1], [3,2], [4,3], [4,4]],
    [[1,1], [2,2], [3,3], [4,4], [4,3]],
    [[1,2], [2,3], [3,4], [4,4], [4,3]],
    
    [[1,3], [2,4], [3,0], [4,1], [4,2]],
    [[2,0], [2,1], [2,2], [2,3], [2,4]],
    [[2,1], [2,2], [2,3], [2,4], [2,0]],
    [[2,2], [2,3], [2,4], [2,0], [2,1]],
    [[2,3], [2,4], [2,0], [2,1], [2,2]],
    [[2,4], [2,0], [2,1], [2,2], [2,3]],
    [[3,0], [3,1], [3,2], [3,3], [3,4]],
    [[3,1], [3,2], [3,3], [3,4], [3,0]],
    [[3,2], [3,3], [3,4], [3,0], [3,1]],
    [[3,3], [3,4], [3,0], [3,1], [3,2]],
    [[3,4], [3,0], [3,1], [3,2], [3,3]],
    [[4,0], [4,1], [4,2], [4,3], [4,4]],
    [[4,1], [4,2], [4,3], [4,4], [4,0]],
    [[4,2], [4,3], [4,4], [4,0], [4,1]],
    [[4,3], [4,4], [4,0], [4,1], [4,2]],
    [[4,4], [4,0], [4,1], [4,2], [4,3]],
  ];
}

  preload() {
    this.load.image("symbol1", "assets/symbol1.png");
    this.load.image("symbol2", "assets/symbol2.png");
    this.load.image("symbol3", "assets/symbol3.png");
    this.load.image("symbol4", "assets/symbol4.png");
    this.load.image("symbol5", "assets/symbol5.png");
    this.load.image("wild", "assets/wild.png"); 
  }

  create() {
    this.createReels();
    this.createSpinButton();
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
          symbolKey = "wild"; 
        } else {
          symbolKey = Phaser.Math.RND.pick(this.reelSymbols); 
        }

        const symbol = this.add.sprite(x, 100 + rowIndex * (symbolHeight + 10), symbolKey)
          .setDisplaySize(90, 90)
          .setOrigin(0.5, 0.5);
        reel.push(symbol);
      }
      this.reels.push(reel);
    });
  }

  createSpinButton() {
    const spinButton = this.add.text(400, 750, "SPIN", {
      fontSize: "40px",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { left: 20, right: 20, top: 10, bottom: 10 },
    }).setOrigin(0.5);

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
  }

  displayWinMessage(symbolKey) {
    this.add.text(400, 300, `You win with ${symbolKey}!`, {
      fontSize: "32px",
      color: "#ff0000",
      fontStyle: "bold",
    }).setOrigin(0.5);
  }
}

export default SlotGame;
