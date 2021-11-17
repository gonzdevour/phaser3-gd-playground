import { getOS } from "./os.js";
//get OS status
var OS = getOS();

//admob

function admobInit() {
  if (OS.cordova) {
    // select the right Ad Id according to platform
    var admobid = {};
    if (OS.android) {
      // for android & amazon-fireos
      admobid = {
        banner: "ca-app-pub-9463460868384198/9749832066", // or DFP format "/6253334/dfp_example_ad"
        interstitial: "ca-app-pub-9463460868384198/2226565269",
      };
    } else if (OS.iOS) {
      // for ios
      admobid = {
        banner: "ca-app-pub-9463460868384198/1587436860", // or DFP format "/6253334/dfp_example_ad"
        interstitial: "ca-app-pub-9463460868384198/3064170064",
      };
    } else {
      // for windows phone
      admobid = {
        banner: "ca-app-pub-xxx/zzz", // or DFP format "/6253334/dfp_example_ad"
        interstitial: "ca-app-pub-xxx/kkk",
      };
    }
    if (AdMob)
      AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true,
      });
  }
}

export { admobInit };
