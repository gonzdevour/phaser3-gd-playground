import "phaser";

class Test extends Phaser.Scene {
  constructor() {
    super({
      key: "cordova",
    });
  }
  preload() {
    this.load.audio("ok", ["assets/sound/right.m4a", "assets/sound/right.ogg"]);
    this.load.audio("what", ["assets/sound/what.opus"]);
  }

  create() {
    this.input.on('pointerup', function(pointer){
      this.sound.play("ok");
      console.log("clicked");
   },this);
  }

  update() {}
}

var config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 768,
  height: 1334,
  backgroundColor: "#333333",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  audio: {
    disableWebAudio: true,
  },
  scene: Test,
};

var game = new Phaser.Game(config);
