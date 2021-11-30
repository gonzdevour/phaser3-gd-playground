import EE from "eventemitter3";

class purchase_web extends EE {
  constructor() {
    super();
  }
  register() {
    log("iap-web register");
  }
  order(itemID) {
    log("iap-web order " + itemID );
  }
  refresh() {
    log("iap-web refresh");
  }
  restore() {
    log("iap-web restore");
  }
}

export default purchase_web;
