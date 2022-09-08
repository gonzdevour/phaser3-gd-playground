import { getOS } from "../../../../plugins/os.js";
//get OS status
var OS = getOS();

//idfa
class cdv_idfa {
  constructor() {}
  getInfo() {
    log('cdv idfa getInfo');
    cordova.plugins.idfa
      .getInfo()
      .then((info) => {
        log('idfa info');
        log(info);
        if (!info.trackingLimited) {
          return info.idfa || info.aaid;
        } else if (info.trackingPermission === cordova.plugins.idfa.TRACKING_PERMISSION_NOT_DETERMINED) {
          return cordova.plugins.idfa.requestPermission().then((result) => {
            if (result === cordova.plugins.idfa.TRACKING_PERMISSION_AUTHORIZED) {
              return cordova.plugins.idfa.getInfo().then((info) => {
                return info.idfa || info.aaid;
              });
            }
          });
        }
      })
      .then((idfaOrAaid) => {
        if (idfaOrAaid) {
          log("idfa return:" + idfaOrAaid);
        }
      });
  }
}

class web_idfa {
  constructor() {}
  getInfo() {
    log('web idfa getInfo');
  }
}

function idfaInit() {
  var idfa;
  if (OS.cordova && (OS.iOS || OS.android)) {
    log("init cdv idfa");
    idfa = new cdv_idfa();
  } else {
    log("init web idfa");
    idfa = new web_idfa();
  }
  return idfa;
}

export { idfaInit };
