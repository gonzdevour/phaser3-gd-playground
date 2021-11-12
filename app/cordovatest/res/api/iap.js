// We must wait for the "deviceready" event to fire
// before we can use the store object.
function initiap() {

// fovea receipt validator
	store.validator = "https://validator.fovea.cc/v1/validate?appName=com.playone.cp&apiKey=6b024545-4f20-4c11-9848-a30a9682823c";
// Add When events
	//register只回傳id，沒有其它資料
    store.when("product").registered(function(p) {
        c2_callFunction("log", ["product registered " + p.id]);
    });
    store.when("product").loaded(function(p) {
        c2_callFunction("log", ["product loaded " + p.id]);
    });
    store.when("product").updated(function(p) {
        c2_callFunction("iap_updated", [p.id, p.title, p.priceMicros, p.currency]);
    });
    store.when("product").approved(function(p) {
        c2_callFunction("log", ["product approved " + p.id]);
		p.verify();
    });
    store.when("product").verified(function(p) {
        c2_callFunction("log", ["product verified " + p.id]);
        p.finish();
    });
    store.when("product").unverified(function(p) {
        c2_callFunction("log", ["product unverified " + p.id]);
    });
    store.when("product").finished(function(p) {
        c2_callFunction("iap_finished", [p.id]);
    });
    store.error(function(e) {
        c2_callFunction("log", ["product error"]);
        c2_callFunction("log", [e.code]);
		c2_callFunction("log", [e.message]);
        c2_callFunction("iap_error");
    });
// product register
    store.register({
        id:    "gems.lv1.cp",
        alias: "gems.lv1.cp",
        type:  store.CONSUMABLE
    });
    store.register({
        id:    "gems.lv2.cp",
        alias: "gems.lv2.cp",
        type:  store.CONSUMABLE
    });	
    store.register({
        id:    "gems.lv3.cp",
        alias: "gems.lv3.cp",
        type:  store.CONSUMABLE
    });
    store.register({
        id:    "removeads.cp",
        alias: "removeads.cp",
        type:  store.NON_CONSUMABLE
    });
    // When every goes as expected, it's time to celebrate!
    // The "ready" event should be welcomed with music and fireworks,
    // go ask your boss about it! (just in case)
    store.ready(function() {
        c2_callFunction("iap_ready");
    });

    // After we've done our setup, we tell the store to do
    // it's first refresh. Nothing will happen if we do not call store.refresh()
    store.refresh();
}