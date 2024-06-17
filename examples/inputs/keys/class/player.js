class Player extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, number) {
      super(scene, x, y, 64, 100, 0x00ff00);
      this.setOrigin(0.5);
      this.scene.add.existing(this);
      this.setScale(1);
      this.init("main", x, y);
  }
  init(layerName, x, y){
    this._locate({layerName:layerName, vpxOffset: x, vpyOffset: y})//必須先locate才賦予body否則layer會錯亂
    this.scene.physics.add.existing(this);

    this.body.collideWorldBounds = true;
    this.jumping = false;
    this.invincible = false;
    this.health = 10;
    this.body.mass = 10;
    this.body.setDragY = 10;
    this.body.setBounce(0.2);
  }
}

export default Player;
