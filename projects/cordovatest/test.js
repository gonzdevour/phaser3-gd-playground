import "phaser";
import AllPlugins from "../../plugins/AllPlugins.js";
import * as gfn from "./res/api/global.js";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const RandomInt = Phaser.Math.Between;

//speech setting

const synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance();
utter.text = "火影忍者跑去總統府洗澡";
utter.lang = "zh-TW";
setTimeout(function () {
  setVoice();
}, 1000);
var setVoice = function () {
  var voices = synth.getVoices();
  //console.log(voices);
  var foundVoices = voices.filter(function (voice) {
    return voice.name == "Google 國語（臺灣）";
    //return voice.name == "Microsoft Hanhan - Chinese (Traditional, Taiwan)";
  });

  if (foundVoices.length === 1) {
    utter.voice = foundVoices[0];
  }
};

//create btn

var createButton = function (scene, key) {
  var btn = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 500, 10, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
    text: scene.add.text(0, 0, key.txt, {
      fontSize: 24,
    }),
    align: "center",
  });
  btn.fn = key.fn;
  return btn;
};

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
    //get viewport in resize mode with scaleOuter

    var vw, vh;
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    var wr = wh / ww;
    var cw = this.game.config.width;
    var ch = this.game.config.height;
    var cr = ch / cw;
    if (wr != cr) {
      //若螢幕比例與畫面比例不同
      if (wr > cr) {
        //螢幕比例比畫面比例長，改變vh
        vw = cw;
        vh = ch * ((wh * cw) / (ch * ww));
      } else {
        //螢幕比例比畫面比例寬，改變vw
        vw = cw * ((ch * ww) / (wh * cw));
        vh = ch;
      }
    }

    var print = this.add.text(0, 0, "");
    var background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK);

    var btns = {};
    var keys = [
        { txt: "dialog_show", fn: "dialog_show" },
        { txt: "dialog_prompt", fn: "dialog_prompt" },
        { txt: "dialog_2", fn: "dialog_prompt" },
        { txt: "dialog_3", fn: "dialog_prompt" },
      ],
      key,
      btnsRow = [],
      btnsBundle = [];

    for (var i = 0, cnt = keys.length; i < cnt; i++) {
      key = keys[i];
      btns[key] = createButton(this, key);
      if (i > 0 && i%2 == 0) {
        console.log("換列");//換列
        btnsBundle.push(btnsRow);
        btnsRow = [];
        btnsRow.push(btns[key]);
        console.log(JSON.stringify(btnsBundle));
        if (i == cnt - 1) {
          console.log("剛好loop結束");//如果剛好loop結束
          btnsBundle.push(btnsRow);
          console.log(JSON.stringify(btnsBundle));
        };
      } else if (i == cnt - 1) { 
        console.log("沒換列但loop結束");//沒換列但loop結束       
        btnsRow.push(btns[key]);
        btnsBundle.push(btnsRow);
        console.log(JSON.stringify(btnsBundle));
      } else { 
        console.log("沒換列");//沒換列      
        btnsRow.push(btns[key]);
        console.log(JSON.stringify(btnsBundle));
      }
    }

    //console.log(JSON.stringify(btnsBundle));

    this.rexUI.add
      .gridButtons({
        x: 0.5 * this.game.config.width,
        y: 0.5 * this.game.config.height,
        width: vw,
        height: vh,

        background: background,

        //buttons: [[btns["0"]], [btns["1"]], [btns["2"]], [btns["3"]], [btns["4"]]],
        buttons: btnsBundle,
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
      .on(
        "button.click",
        function (button, index, pointer, event) {
          //gfn.se.play(this, "ok");
          //this.sound.play("ok");

          setVoice();
          synth.speak(utter);

          gfn.cdvPlugin[button.fn]();

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
        },
        this
      );
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
  plugins: AllPlugins,
  scene: Test,
};

var game = new Phaser.Game(config);
