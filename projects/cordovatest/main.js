import "phaser";
import InitLog from "../../plugins/logger/InitLog.js";
import AllPlugins from "../../plugins/AllPlugins.js";
import { loading, getOS } from "./res/api/index.js";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const RandomInt = Phaser.Math.Between;

//log init

InitLog({
  width: "80%",
  height: "30%",
  fontSize: Math.round(window.innerWidth / 20) + "px",
  backgroundColor: "Navy",
  opacity: 0.7,
  active: true,
});
log("logger start");

//get OS status

var OS = getOS();
for (var key in OS) {
  if (OS[key]) {
    log(key + " : " + OS[key]);
  }
}

var speech; // speechSynthesis
var dialog; // cordova dialog
var sound; // web/cdv_media sound player
var tb_audio; // rex-csv2JSON table

//create btn

function createButton(scene, key) {
  var btn = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 500, 10, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
    text: scene.add.text(0, 0, key.txt, {
      fontSize: 24,
    }),
    align: "center",
  });
  btn.fn = key.fn; //callback
  btn.say = key.say; //voice text
  return btn;
}

class Test extends Phaser.Scene {
  constructor() {
    super({
      key: "cordova",
    });
  }
  preload() {
    var _scene = this;
    async function load() {
      var api = await loading(_scene, tb_audio);
      sound = api.sound;
      dialog = api.dialog;
      speech = api.speech;
      console.log("api:" + api);
    }
    load();
  }
  
  create() {
    var background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK);

    var btns = {};
    var keys = [
        {
          txt: "火影忍者",
          fn: function () {
            dialog.show();
          },
          say: "火影忍者跑去總統府洗澡",
        },
        {
          txt: "老虎",
          fn: function () {
            dialog.alert();
          },
          say: "老虎掌海底",
        },
        {
          txt: "馬桶",
          fn: function () {
            dialog.prompt();
          },
          say: "馬桶",
        },
        {
          txt: "葉公好龍",
          fn: function () {
            dialog.prompt();
          },
          say: "葉公好龍鑷子",
        },
      ],
      key,
      btnsRow = [],
      btnsBundle = [];

    for (var i = 0, cnt = keys.length; i < cnt; i++) {
      key = keys[i];
      btns[key] = createButton(this, key);
      if (i > 0 && i % 2 == 0) {
        //log("換列");//換列
        btnsBundle.push(btnsRow);
        btnsRow = [];
        btnsRow.push(btns[key]);
        //log(JSON.stringify(btnsBundle));
        if (i == cnt - 1) {
          //log("剛好loop結束");//如果剛好loop結束
          btnsBundle.push(btnsRow);
          //log(JSON.stringify(btnsBundle));
        }
      } else if (i == cnt - 1) {
        //log("沒換列但loop結束");//沒換列但loop結束
        btnsRow.push(btns[key]);
        btnsBundle.push(btnsRow);
        //log(JSON.stringify(btnsBundle));
      } else {
        //log("沒換列");//沒換列
        btnsRow.push(btns[key]);
        //log(JSON.stringify(btnsBundle));
      }
    }
    //log(JSON.stringify(btnsBundle));
    var vpt = this.rexScaleOuter.outerViewport;

    this.rexUI.add
      .gridButtons({
        x: 0.5 * this.game.config.width,
        y: 0.5 * this.game.config.height,
        width: vpt.width,
        height: vpt.height,
        background: background,
        buttons: btnsBundle,
        space: { left: 10, right: 10, top: 20, bottom: 20, row: 20, column: 20 },
        expand: true,
      })
      .layout()
      //.drawBounds(this.add.graphics(), 0xff0000)
      .on(
        "button.click",
        function (button, index, pointer, event) {
          //navigator.vibrate(3000);
          //this.sound.play("ok");
          log("clicked");
          sound.play("ok");
          speech.say(button.say);
          var fn = button.fn;
          fn();
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
  audio: {
    disableWebAudio: false,
  },
  plugins: AllPlugins,
  scene: Test,
};

var game = new Phaser.Game(config);
