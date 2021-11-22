import "phaser";
import InitLog from "../../plugins/logger/InitLog.js";
import AllPlugins from "../../plugins/AllPlugins.js";
import { loading, getOS } from "./res/api/index.js";
import { createButtons } from "./ui/createButtons.js";

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
var iap;
var ads;

class Test extends Phaser.Scene {
  constructor() {
    super({
      key: "cordova",
    });
  }
  preload() {
    var _scene = this;
    async function load(onLoadSuccess, onLoaderror) {
      var api = await loading(_scene, tb_audio);
      sound = api.sound;
      dialog = api.dialog;
      speech = api.speech;
      iap = api.iap;
      ads = api.ads;
      console.log("api:" + api);
      onLoadSuccess();
    }
    this.load.rexAwait(load);
  }

  create() {
    //iap events
    iap.on("productUpdated", function (p) {
      log("productUpdated:");
      log(p.id);
      log(p.title);
      log(p.priceMicros);
      log(p.currency);
    });
    iap.on("productUnverified", function (p) {
      log("productUnverified:" + p.id);
    });
    iap.on("productFinished", function (p) {
      log("productFinished:" + p.id);
    });
    iap.on("error", function (e) {
      log("iap error:");
      log(e.code);
      log(e.message);
    });

    //ads events
    ads.on("onAdLoaded", function (e) {
      log("onAdLoaded");
      log(e.adType + e.adEvent)
      //log(e.adNetwork);
    });
    ads.on("onAdFailLoad", function (e) {
      log(e.adType + e.adEvent)
      //log(e.adNetwork);
    });
    ads.on("onAdPresent", function (e) {
      log(e.adType + e.adEvent)
      //log(e.adNetwork);
    });
    ads.on("onAdDismiss", function (e) {
      log(e.adType + e.adEvent)
      //log(e.adNetwork);
    });
    ads.on("onAdLeaveApp", function (e) {
      log(e.adType + e.adEvent)
      //log(e.adNetwork);
    });

    var keys = [
        {
          txt: "火影忍者",
          fn: function () {
            dialog.show();
            speech.say("火影忍者跑去總統府洗澡");
          },
        },
        {
          txt: "老虎",
          fn: function () {
            dialog.alert();
            speech.say("老虎掌海底");
          },
        },
        {
          txt: "馬桶",
          fn: function () {
            dialog.prompt();
            speech.say("馬桶");
          },
        },
        {
          txt: "購買道具1",
          fn: function () {
            sound.play("ok");
            iap.order("gems.lv1.cp");
          },
        },
        {
          txt: "移除廣告",
          fn: function () {
            sound.play("ok");
            iap.order("removeads.cp");
          },
        },
        {
          txt: "準備整頁廣告",
          fn: function () {
            if (navigator) {
              navigator.vibrate(3000);
            }
            ads.prepareInter();
          },
        },
        {
          txt: "彈出整頁廣告",
          fn: function () {
            ads.showInter();
          },
        },
        {
          txt: "準備獎勵廣告",
          fn: function () {
            if (navigator) {
              navigator.vibrate(3000);
            }
            ads.prepareRwv();
          },
        },
        {
          txt: "彈出獎勵廣告",
          fn: function () {
            ads.showRwv();
          },
        },
      ];
      
      createButtons(this, keys);
      
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
