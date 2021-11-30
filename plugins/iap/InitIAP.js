import purchase_cdv from './purchase_cdv.js';
import purchase_web from './purchase_web.js';
import { getOS } from "../os.js";
//get OS status
var OS = getOS();

var InitIAP = function () {
    // We must wait for the "deviceready" event to fire
    // before we can use the store object.
    if (OS.cordova && store) {
        var iap = new purchase_cdv(store);
    } else {
        var iap = new purchase_web();
    }
    // Register log event
    iap.on('registered', function (p) {
        var message = `product registered ${p.id}`;
        iap.emit('log', message);
    })
    iap.on('loaded', function (p) {
        var message = `product loaded ${p.id}`;
        iap.emit('log', message);
    })
    iap.on('approved', function (p) {
        var message = `product approved ${p.id}`;
        iap.emit('log', message);
    })
    iap.on('verified', function (p) {
        var message = `product verified ${p.id}`;
        iap.emit('log', message);
    })
    iap.on('unverified', function (p) {
        var message = `product unverified ${p.id}`;
        iap.emit('log', message);
    })
    iap.on('cancelled', function (p) {
        var message = `purchase cancelled ${p.id}`;
        iap.emit('log', message);
    })
    iap.on('error', function (error) {
        var message = `product error ${error.code}, ${error.message}`;
        iap.emit('log', message);
    })
    return iap;
}

export default InitIAP;