import "phaser";
import AllPlugins from "../../plugins/AllPlugins.js";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const RandomInt = Phaser.Math.Between;

class Test extends Phaser.Scene {
  constructor() {
    super({
      key: "cordova",
    });
  }

  preload() {
    // Load sound file
    this.load.audio("ok", ["assets/sound/right.ogg", "assets/sound/right.m4a"]);
    //Load image file
    this.load.image("confirm", "assets/img/confirm.png");
    this.load.image("eraser", "assets/img/eraser.png");

    this.load.image("yes", "assets/img/yes.png");
  }

  create() {
    var background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK);
    var btns = {};
    var keys = "01234",
      key;
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
      key = keys[i];
      btns[key] = createButton(this, key);
    }

    var print = this.add.text(0, 0, "");

    var bw = this.game.scale.baseSize.width;
    var bh = this.game.scale.baseSize.height;
    var dw = this.game.scale.displaySize.width;
    var dh = this.game.scale.displaySize.height;
    var gw = this.game.scale.gameSize.width;
    var gh = this.game.scale.gameSize.height;
    var pw = this.game.scale.parentSize.width;
    var ph = this.game.scale.parentSize.height;
    
    console.log("bw: " + bw);
    console.log("bh: " + bh);
    console.log("dw: " + dw);
    console.log("dh: " + dh);
    console.log("gw: " + gw);
    console.log("gh: " + gh);
    console.log("pw: " + pw);
    console.log("ph: " + ph);

    var vw,vh;
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    var wr = wh / ww;
    var cw = this.game.config.width;
    var ch = this.game.config.height;
    var cr = ch / cw;
    if (wr != cr) {//若螢幕比例與畫面比例不同
        if (wr > cr) { //螢幕比例比畫面比例長，改變vh
            vw = cw;
            vh = ch*((wh*cw)/(ch*ww));
        } else { //螢幕比例比畫面比例寬，改變vw
            vw = cw*((ch*ww)/(wh*cw));
            vh = ch;
        };
    };
    console.log("cw: " + cw);
    console.log("ch: " + ch);
    console.log("ww: " + ww);
    console.log("wh: " + wh);
    console.log("wr: " + wr);
    console.log("cr: " + cr);
    console.log("vw: " + vw);
    console.log("vh: " + vh);

    this.rexUI.add
      .gridButtons({
        x: 0.5 * this.game.config.width,
        y: 0.5 * this.game.config.height,
        width: vw,
        height: vh,

        background: background,

        buttons: [[btns["0"]], [btns["1"]], [btns["2"]], [btns["3"]], [btns["4"]]],
        space: {
          left: 10,
          right: 10,
          top: 20,
          bottom: 20,
          row: 20,
          column: 20,
        },
        expand: true,
      })
      .layout()
      //.drawBounds(this.add.graphics(), 0xff0000)
      .on("button.click", function (button, index, pointer, event) {
        var key = button.text;
        var word = print.text;
        if (key === "<") {
          if (word.length > 0) {
            word = word.substring(0, word.length - 1);
          }
        } else {
          word += key;
        }
        print.text = word;
      });
  }

  update() {}
}

var createButton = function (scene, text) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 500, 10, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
    text: scene.add.text(0, 0, text, {
      fontSize: 96,
    }),
    align: "center",
  });
};

var config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 768,
  height: 1334,
  backgroundColor: '#333333',
  scale: {
    // mode: Phaser.Scale.ENVELOP,
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: AllPlugins,
  scene: Test,
};

var game = new Phaser.Game(config);
