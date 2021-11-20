import { soundInit } from "./sound.js";
import { speechInit } from "./speech.js";
import { dialogInit } from "./dialog.js";
import { admobInit } from "./admob.js";
import { iapInit } from "./iap.js";
import { getOS } from "./os.js";
//get OS status
var OS = getOS();

//loading promise

var loading = function (scene, tb_audio) {
  return new Promise(function (resolve, reject) {
    //Load image file
    scene.load.image("confirm", "assets/img/confirm.png");
    scene.load.image("eraser", "assets/img/eraser.png");
    scene.load.image("yes", "assets/img/yes.png");

    var apiInit = function (scene, tb_audio) {
      var api = {};
      api.sound = soundInit(scene, tb_audio);
      api.speech = speechInit();
      api.dialog = dialogInit();
      api.iap = iapInit();
      api.ads = admobInit();
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
    scene.load.text("audiosrc", "assets/audiosrc.csv");
    scene.load.on("filecomplete-text-audiosrc", loadAudio, scene);
  });
};

export { loading };
