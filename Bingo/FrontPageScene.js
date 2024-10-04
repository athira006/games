class FrontPage extends Phaser.Scene {
  constructor() {
    super({ key: "FrontPage" });
  }

  preload() {
    
    this.load.image("bgf", "assets/bgf.png");
    this.load.image("dragon-1", "assets/dragon-1.png");
    this.load.image("loadingbar", "assets/loadingbar.png"); 

    // Add a loading bar image
    let loadingBar = this.add.image(400, 500, "loadingbar"); 
    loadingBar.setOrigin(0.5, 0.5);

    
    loadingBar.setScale(0, 1);

    this.load.on("progress", (percent) => {
      console.log(`Loading progress: ${percent * 100}%`); 
      loadingBar.setScale(percent, 1); 
    });

    this.load.on("complete", () => {
      console.log("Assets loaded, will transition after a delay...");
    });
  }

  create() {

    this.add.image(400, 300, "bgf").setDisplaySize(800, 800);

    
    this.add.image(400, 300, "dragon-1").setDisplaySize(400, 300);


    this.time.delayedCall(3000, () => {
      console.log("Hi Bingo");
      this.scene.start("BingoGame");
    });
  }
}

export default FrontPage;
