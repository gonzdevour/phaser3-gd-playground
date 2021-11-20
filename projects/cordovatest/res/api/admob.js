import { getOS } from "./os.js";
//get OS status
var OS = getOS();

//admob

class cdv_ads {
  constructor() {
    this.testMode = true; //上架時要切換為false
    this.admobid = {};
    if (OS.android) {
      // for android & amazon-fireos
      this.admobid = {
        banner: "ca-app-pub-9463460868384198/9749832066", // or DFP format "/6253334/dfp_example_ad"
        interstitial: "ca-app-pub-9463460868384198/2226565269",
        rewardVideoAd: "ca-app-pub-9463460868384198/1793550943",
      };
    } else if (OS.iOS) {
      // for ios
      this.admobid = {
        banner: "ca-app-pub-9463460868384198/1587436860", // or DFP format "/6253334/dfp_example_ad"
        interstitial: "ca-app-pub-9463460868384198/3064170064",
        rewardVideoAd: "ca-app-pub-9463460868384198/7763195324",
      };
    } else {
      // for windows phone
      this.admobid = {
        banner: "ca-app-pub-9463460868384198/9749832066", // or DFP format "/6253334/dfp_example_ad"
        interstitial: "ca-app-pub-9463460868384198/2226565269",
        rewardVideoAd: "ca-app-pub-9463460868384198/1793550943",
      };
    }
    document.addEventListener("onAdLoaded", function (e) {
      this.onEvent(e);
    });
    document.addEventListener("onAdFailLoad", function (e) {
      this.onEvent(e);
    });
    document.addEventListener("onAdPresent", function (e) {
      this.onEvent(e);
    });
    document.addEventListener("onAdDismiss", function (e) {
      this.onEvent(e);
    });
    document.addEventListener("onAdLeaveApp", function (e) {
      this.onEvent(e);
    });
  }
  /* Banner位置設定：
  AdMob.AD_POSITION.NO_CHANGE    	= 0
  AdMob.AD_POSITION.TOP_LEFT 	    = 1
  AdMob.AD_POSITION.TOP_CENTER 	  = 2
  AdMob.AD_POSITION.TOP_RIGHT   	= 3
  AdMob.AD_POSITION.LEFT 		      = 4
  AdMob.AD_POSITION.CENTER 		    = 5
  AdMob.AD_POSITION.RIGHT 		    = 6
  AdMob.AD_POSITION.BOTTOM_LEFT 	= 7
  AdMob.AD_POSITION.BOTTOM_CENTER = 8
  AdMob.AD_POSITION.BOTTOM_RIGHT 	= 9
  AdMob.AD_POSITION.POS_XY 		    = 10 // 用於指定位置 X 和 Y */
  createBanner() {
    log("cdv ads createBanner");
    var ads = this;
    if (AdMob) {
      AdMob.createBanner({
        adId: ads.admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        isTesting: ads.testMode,
        autoShow: true,
      });
    }
  }
  prepareInter() {
    log("cdv ads prepare inter");
    var ads = this;
    if (AdMob) {
      AdMob.prepareInterstitial(
        {
          adId: ads.admobid.interstitial,
          isTesting: ads.testMode,
          autoShow: false,
        },
        ads.onPrepareInterSuccess,
        ads.onPrepareInterErr
      );
    }
  }
  onPrepareInterSuccess() {
    log("onPrepareInterSuccess");
  }
  onPrepareInterErr() {
    log("onPrepareInterErr");
  }
  showInter() {
    log("cdv ads show inter");
    if (AdMob) {
      AdMob.showInterstitial();
    }
  }
  prepareRwv() {
    log("cdv ads prepare rwv");
    var ads = this;
    if (AdMob) {
      AdMob.prepareRewardVideoAd(
        {
          adId: ads.admobid.rewardVideoAd,
          isTesting: ads.testMode,
          autoShow: false,
        },
        ads.onPrepareRwvSuccess,
        ads.onPrepareRwvErr
      );
    }
  }
  onPrepareRwvSuccess() {
    log("onPrepareRwvSuccess");
  }
  onPrepareRwvErr() {
    log("onPrepareRwvErr");
  }
  showRwv() {
    log("cdv ads show Rwv");
    if (AdMob) {
      AdMob.showRewardVideoAd();
    }
  }
  onEvent(e){
    log(e.adType);
    log(e.adEvent);
    log(e.adNetwork);
  }
}

class p3_ads {
  //目前沒有網頁用的廣告服務
  constructor() {
    this.testMode = true; //上架時要切換為false
    this.admobid = {};
    this.admobid = {
      banner: "ca-app-pub-9463460868384198/9749832066",
      interstitial: "ca-app-pub-9463460868384198/2226565269",
      rewardVideoAd: "ca-app-pub-9463460868384198/1793550943",
    };
  }
  createBanner() {
    log("web ads createBanner");
  }
  prepareInter() {
    log("web ads prepare inter");
  }
  onPrepareInterSuccess() {
    log("onPrepareInterSuccess");
  }
  onPrepareInterErr() {
    log("onPrepareInterErr");
  }
  showInter() {
    log("web ads show inter");
  }
  prepareRwv() {
    log("web ads prepare rwv");
  }
  onPrepareRwvSuccess() {
    log("onPrepareRwvSuccess");
  }
  onPrepareRwvErr() {
    log("onPrepareRwvErr");
  }
  showRwv() {
    log("web ads show Rwv");
  }
}

function admobInit() {
  if (OS.cordova) {
    var ads = new cdv_ads();
    ads.createBanner();
  } else {
    var ads = new p3_ads();
  }
  return ads;
}

export { admobInit };
