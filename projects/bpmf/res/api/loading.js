import { soundInit } from "./sound.js";
import { speechInit } from "./speech.js";
import { dialogInit } from "./dialog.js";
import { admobInit } from "./admob.js";
import { iapInit } from "./iap.js";
import { idfaInit } from "./idfa.js";
import { getOS } from "../../../../plugins/os.js";
//get OS status
var OS = getOS();

//loading promise

var loading = function (scene, tb_audio) {
  return new Promise(function (resolve, reject) {
    //Load db file
    scene.load.text('db0', 'assets/db0.compress');
    scene.load.text('db1', 'assets/db1.compress');
    //btn image
    scene.load.image('confirm', 'assets/img/confirm.png');
    scene.load.image('eraser', 'assets/img/eraser.png');
    scene.load.image('yes', 'assets/img/yes.png');
    scene.load.image('cfg', 'assets/img/cfg.png');
    scene.load.image('info', 'assets/img/info.png');

    //之後應該會想不起來為什麼會加tb_audio：
    //tb_audio是記錄音效路徑用的字典，p3本體load audio後無法取得路徑，
    //但cdv_audio(cordova media)要靠路徑才能正確播放
    var apiInit = function (scene, tb_audio) {
      var api = {};
      api.sound = soundInit(scene, tb_audio);
      api.speech = speechInit();
      api.dialog = dialogInit();
      api.iap = iapInit();
      api.ads = admobInit();
      api.idfa = idfaInit();
      resolve(api);
    };

    //ready api
    var apiReady = function (scene, tb_audio) {
      log("api ready");
      if (OS.cordova) {
        document.addEventListener(
          "deviceready",
          () => {
            log("cordova deviceready");
            log("cdv_device:");
            log(device.cordova);
            log(device.uuid);
            log("dvcrdy: " + tb_audio);
            apiInit(scene, tb_audio);
          },
          false
        );
      } else {
        apiInit(scene, tb_audio);
      }
    };

    //load audio file after loading csv table
    var loadAudio = function (key, filetype, data) {
      log("loadAudio from csv");
      tb_audio = scene.plugins.get("rexCsvToHashTable").add().loadCSV(data);
      tb_audio.eachRow(
        "key",
        function (tb_audio, rowKey, colKey, value) {
          // Load sound file
          scene.load.audio(rowKey, [tb_audio.get(rowKey, "ogg"), tb_audio.get(rowKey, "m4a")]);
          //this.load.on("filecomplete-audio-" + rowKey, function(){log("filecomplete-audio-" + rowKey)}, this)
        },
        scene
      );
      apiReady(scene, tb_audio);
    };

    // Load csv file
    scene.load.text("audiosrc", "assets/audiosrc.csv"); //這裡是整串loading的出發點
    scene.load.on("filecomplete-text-audiosrc", loadAudio, scene);
  });
};

export { loading };
