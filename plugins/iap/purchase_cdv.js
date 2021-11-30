import EE from "eventemitter3";

class purchase_cdv extends EE {
  constructor(store) {
    super();

    this.store = store;

    var self = this;
    // fovea receipt validator
    //store.validator = "https://validator.fovea.cc/v1/validate?appName=com.playone.cp&apiKey=6b024545-4f20-4c11-9848-a30a9682823c";
    // Route events
    RouteProductEvent(this, "registered");
    RouteProductEvent(this, "loaded");
    RouteProductEvent(this, "updated");
    //RouteProductEvent(this, 'approved', function (p) { p.verify(); }); //fovea wait and see
    RouteProductEvent(this, "approved", function (p) {
      p.finish();
    });
    RouteProductEvent(this, "verified", function (p) {
      p.finish();
    });
    RouteProductEvent(this, "unverified");
    RouteProductEvent(this, "finished");
    RouteProductEvent(this, "cancelled");

    store.error(function (error) {
      self.emit("error", error);
    });
    store.ready(function () {
      self.emit("ready");
    });
  }

  register(id, type, alias) {
    // Register products //給一組含id,type,alias的JSON物件array
    if (Array.isArray(id)) {
      var products = id;
      for (var i = 0, cnt = products.length; i < cnt; i++) {
        this.register(products[i]);
      }
      return this;
    }

    // Register a product//直接給一個含id,type,alias的JSON物件
    if (typeof id === "object") {
      var product = id;
      id = product.id;
      type = product.type;
      alias = product.alias;
    }

    if (alias === undefined) {
      //不給alias時，自動以id為alias
      alias = id;
    }

    this.store.register({
      id: id,
      alias: alias,
      type: this.store[type], // 'CONSUMABLE', 'NON_CONSUMABLE'
    });
    return this;
  }

  order(itemID) {
    this.store.order(itemID);
    return this;
  }

  refresh() {
    // After we've done our setup, we tell the store to do
    // it's first refresh. Nothing will happen if we do not call store.refresh()
    this.store.refresh();
    return this;
  }

  restore() {
    if (this.store.restore) {
      //如果有支援回購才執行
      this.store.restore();
      return this;
    }
  }
}

var RouteProductEvent = function (iap, eventName, postCallback) {
  iap.store.when("product")[eventName](function (param) {
    iap.emit(eventName, param);

    if (postCallback) {
      postCallback(param);
    }
  });
};

export default purchase_cdv;
