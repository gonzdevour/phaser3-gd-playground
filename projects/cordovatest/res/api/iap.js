import { getOS } from "./os.js";
//get OS status
var OS = getOS();

//iap

class cdv_purchase {
  constructor() {}
  init() {
    log("init iap");
    if (store) {
      // fovea receipt validator
      store.validator =
        "https://validator.fovea.cc/v1/validate?appName=com.playone.cp&apiKey=6b024545-4f20-4c11-9848-a30a9682823c";
      // Add When events
      //register只回傳id，沒有其它資料
      store.when("product").registered(function (p) {
        log("product registered " + p.id);
      });
      store.when("product").loaded(function (p) {
        log("product loaded " + p.id);
      });
      store.when("product").updated(function (p) {
        log("iap_updated");
        log(p.id);
        log(p.title);
        log(p.priceMicros);
        log(p.currency);
      });
      store.when("product").approved(function (p) {
        log("product approved " + p.id);
        p.verify();
      });
      store.when("product").verified(function (p) {
        log("product verified " + p.id);
        p.finish();
      });
      store.when("product").unverified(function (p) {
        log("product unverified " + p.id);
      });
      store.when("product").finished(function (p) {
        log("product finished " + p.id);
      });
      store.error(function (e) {
        log("iap error");
        log(e.code);
        log(e.message);
      });
      // product register
      store.register({
        id: "gems.lv1.cp",
        alias: "gems.lv1.cp",
        type: store.CONSUMABLE,
      });
      store.register({
        id: "gems.lv2.cp",
        alias: "gems.lv2.cp",
        type: store.CONSUMABLE,
      });
      store.register({
        id: "gems.lv3.cp",
        alias: "gems.lv3.cp",
        type: store.CONSUMABLE,
      });
      store.register({
        id: "removeads.cp",
        alias: "removeads.cp",
        type: store.NON_CONSUMABLE,
      });
      // When every goes as expected, it's time to celebrate!
      // The "ready" event should be welcomed with music and fireworks,
      // go ask your boss about it! (just in case)
      store.ready(function () {
        log("iap_ready");
        //iap_ready();
      });
      // After we've done our setup, we tell the store to do
      // it's first refresh. Nothing will happen if we do not call store.refresh()
      store.refresh();
    }
  }
  order(itemID) {
    log("iap order");
    if (store) {
      store.order(itemID);
    }
  }
  refresh() {
    log("iap refresh");
    if (store) {
      store.refresh();
    }
  }
}

class p3_purchase {
  constructor() {}
  init() {
    log("init iap");
  }
  order(itemID) {
    log("iap order");
  }
  refresh() {
    log("iap refresh");
  }
}

function iapInit() {
  var iap;
  if (OS.cordova) {
    log("init cdv purchase plugin");
    iap = new cdv_purchase();
    iap.init();
  } else {
    log("use web purchase");
    iap = new p3_purchase();
  }
  return iap;
}

export { iapInit };
