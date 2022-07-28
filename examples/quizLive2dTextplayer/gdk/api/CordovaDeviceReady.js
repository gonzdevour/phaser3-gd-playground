import { getOS } from "../../../../plugins/os.js";

var CordovaDeviceReady = function () {
  return new Promise(function (resolve, reject) {
    var OS = getOS();
    if (OS.cordova) {
      document.addEventListener(
        "deviceready",
        () => {
          log("cordova deviceready");
          log("cdv_device:");
          log(device.cordova);
          log(device.uuid);
          resolve()
        },
        false
      );
    } else {
      resolve()
    }
  });
};

export default CordovaDeviceReady;
