import EE from 'eventemitter3';

class IAP extends EE {
    constructor(store, products) {
        super();

        this.store = store;

        var self = this;
        // fovea receipt validator
        store.validator = "https://validator.fovea.cc/v1/validate?appName=com.playone.cp&apiKey=6b024545-4f20-4c11-9848-a30a9682823c";
        // Route events
        RouteEvent(this, 'registered');
        RouteEvent(this, 'loaded');
        RouteEvent(this, 'updated');
        RouteEvent(this, 'approved', function (p) { p.verify(); });
        RouteEvent(this, 'verified', function (p) { p.finish(); });
        RouteEvent(this, 'unverified');
        RouteEvent(this, 'finished');

        store.error(function (error) {
            self.emit('error', error);
        })
        store.ready(function () {
            self.emit('ready');
        })

        // Also register products if provided
        if (products) {
            for (var i = 0, cnt = products.length; i < cnt; i++) {
                this.register(products[i]);
            }
            this.refresh();
        }
    }

    register(id, type, alias) {
        if (typeof (id) === 'object') {
            var product = id;
            id = product.id;
            type = product.type;
            alias = product.alias;
        }

        if (alias === undefined) {
            alias = id;
        }

        this.store.register({
            id: id,
            alias: alias,
            type: this.store[type],  // 'CONSUMABLE', 'NON_CONSUMABLE'
        });
        return this;
    }

    refresh() {
        // After we've done our setup, we tell the store to do
        // it's first refresh. Nothing will happen if we do not call store.refresh()
        this.store.refresh();
        return this;
    }
}

var RouteEvent = function (iap, eventName, postCallback) {
    iap.store.when('product')[eventName](function (param) {
        iap.emit(eventName, param);

        if (postCallback) {
            postCallback(param);
        }
    });
}

export default IAP;