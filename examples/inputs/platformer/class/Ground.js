class Ground extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height) {
      super(scene, x, y, width, height, 0xff0000);
      scene.add.existing(this);
      this.setOrigin(0,1);
      this.init("main", x, y);
  }
  init(layerName, x, y){
    this._locate({layerName:layerName, vpxOffset: x, vpyOffset: y}) //必須先locate才賦予body否則layer會錯亂
    this.scene.physics.add.existing(this, true);
  }
}

export default Ground;
