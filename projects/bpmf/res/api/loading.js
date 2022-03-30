import { soundInit } from "./sound.js";
import { speechInit } from "./speech.js";
import { dialogInit } from "./dialog.js";
import { admobInit } from "./admob.js";
import { iapInit } from "./iap.js";
import { iabInit } from "./iab.js";
import { idfaInit } from "./idfa.js";
import { getOS } from "../../../../plugins/os.js";
//get OS status
var OS = getOS();

//loading promise

var loading = function (scene, audioUrls) {
  return new Promise(function (resolve, reject) {
    //之後應該會想不起來為什麼會加audioUrls：
    //audioUrls是記錄音效路徑用的字典，p3本體load audio後無法取得路徑，
    //但cdv_audio(cordova media)要靠路徑才能正確播放
    var apiInit = function (scene, audioUrls) {
      var api = {};
      api.iab = iabInit();
      api.sound = soundInit(audioUrls);
      api.speech = speechInit();
      api.dialog = dialogInit();
      api.iap = iapInit();
      //api.ads = admobInit();
      //api.idfa = idfaInit();
      resolve(api);
    };

    //ready api
    var apiReady = function (scene, audioUrls) {
      log("api ready");
      if (OS.cordova) {
        document.addEventListener(
          "deviceready",
          () => {
            log("cordova deviceready");
            log("cdv_device:");
            log(device.cordova);
            log(device.uuid);
            log("dvcrdy: " + audioUrls);
            apiInit(scene, audioUrls);
          },
          false
        );
      } else {
        apiInit(scene, audioUrls);
      }
    };
    apiReady(scene, audioUrls);

  });
};

export { loading };
