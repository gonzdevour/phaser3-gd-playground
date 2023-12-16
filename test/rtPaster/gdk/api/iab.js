import { getOS } from "../../../../plugins/os.js";
//get OS status
var OS = getOS();

//speech

class cdv_inAppBrowser {
  open(url,closeBtnTxt) {
    var caption = 'closebuttoncaption:' + closeBtnTxt;
    cordova.InAppBrowser.open(url, '_blank', 'location=no', caption);
  }
}

class inAppBrowser {
  open(url) {
    window.open(url, '_blank').focus();
  }
}

function iabInit() {
  var iab;
  if (OS.cordova && (OS.iOS || OS.android)) {
    //speech
    if (OS.iOS) {
      log("init ios iab");
      iab = new cdv_inAppBrowser();
    } else if (OS.android) {
      log("init android iab");
      iab = new cdv_inAppBrowser();
    } else {
      log("iab not support");
    }
  } else {
    //speech
    log("init web iab");
    iab = new inAppBrowser();
  }
  return iab;
}

export { iabInit };
