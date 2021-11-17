import "phaser";
import InitLog from "../../plugins/logger/InitLog.js";
import AllPlugins from "../../plugins/AllPlugins.js";
//import * as gfn from "./res/api/index.js";
//import speech from "./res/api/speech.js";
import { speechSynthesis, cdvp } from "./res/api/index.js";

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

//speech init

//var speech = new speechSynthesis("zh-TW", "Google 國語（臺灣）");

//cordova plugins init
var tb_audio = undefined;
//dialog
var dialog = new cdvp.dialog();
//var media = undefined;

document.addEventListener(
  "deviceready",
  () => {
    log("cordova deviceready");
    cdvInit();
    admobInit();
  },
  false
);

var cdvInit = function(){

  var player = new Media(
    "assets/sound/what.mp3",
    //"assets/sound/right.wav",
    function playSuccess() {
      log("media success");
      player.release();
    },
    function playError(err) {
      log("uh oh: " + err.code);
    }
  );
  //player.play();
  log("dialog obj:");
  log("device:");
  log(device.cordova);
  log(device.uuid);
  // basic usage
  log("TTS:" + JSON.stringify(TTS));
  //log("TTSVoice:" + TTSVoice);
  TTS
      .speak({
        text: "火影忍者光著身子去總統府洗澡",
        identifier: "com.apple.ttsbundle.siri_female_zh-CN_compact",
        locale: "zh-TW",
        rate: 0,
        pitch: 0,
        cancel: true
      }).then(function () {
    log('speak success');
  }, function (reason) {
    log(reason);
  });
  // or with more options
  TTS.getVoices().then(
    function (voices) {
      // Array of voices [{name:'', identifier: '', language: ''},..] see TS-declarations
      voices.forEach(function(voice){
        for(var key in voice){
          log(key + ' : ' + voice[key])
        }
      });
    },
    function (reason) {
      log(reason);
    }
  );
};

//admob init

function admobInit(){
  // select the right Ad Id according to platform
  var admobid = {};
  if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
    admobid = {
      banner: 'ca-app-pub-9463460868384198/9749832066', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-9463460868384198/2226565269'
    };
  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    admobid = {
      banner: 'ca-app-pub-9463460868384198/1587436860', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-9463460868384198/3064170064'
    };
  } else { // for windows phone
    admobid = {
      banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-xxx/kkk'
    };
  }
  if(AdMob) AdMob.createBanner({
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    autoShow: true });
}

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
    var loadAudio = function (key, filetype, data) {
      tb_audio = this.plugins.get("rexCsvToHashTable").add().loadCSV(data);
      tb_audio.eachRow(
        "key",
        function (tb_audio, rowKey, colKey, value) {
          // Load sound file
          this.load.audio(rowKey, [tb_audio.get(rowKey, "ogg"), tb_audio.get(rowKey, "m4a")]);
        },
        this
      );
    };
    // Load csv file
    this.load.text("audiosrc", "assets/audiosrc.csv");
    this.load.on("filecomplete-text-audiosrc", loadAudio, this);
    //Load image file
    this.load.image("confirm", "assets/img/confirm.png");
    this.load.image("eraser", "assets/img/eraser.png");
    this.load.image("yes", "assets/img/yes.png");
  }

  create() {
    var background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK);

    var btns = {};
    var keys = [
        { txt: "火影忍者", fn: dialog.show, say: "火影忍者跑去總統府洗澡" },
        { txt: "老虎", fn: dialog.alert, say: "老虎掌海底" },
        { txt: "馬桶", fn: dialog.prompt, say: "馬桶" },
        { txt: "葉公好龍", fn: dialog.prompt, say: "葉公好龍鑷子" },
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
          //audio.play("ok");
          /*           if (!!window.cordova) {
            media = new Media(tb_audio.get("ok", "ogg"));
            media.play();
            log("cordova media play");
          } else {
            this.sound.play("ok");
          } */
          navigator.vibrate(3000);
          this.sound.play("ok");
          //speech.say(button.say);
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
    disableWebAudio: true,
  },
  plugins: AllPlugins,
  scene: Test,
};

var game = new Phaser.Game(config);
