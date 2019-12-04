import EventEmitterMethods from '../../../../phaser3-rex-notes/plugins/utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../../phaser3-rex-notes/plugins/utils/object/GetValue.js';
import Setup from './Setup.js';
import Request from './Request.js';
import Play from './Play.js';
import Callbacks from './Callbacks.js';


class IMA {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.setup(config);
        // Request video ads.
        this.request(config);
    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }
}

var methods = {
    setup: Setup,
    request: Request,
    play: Play
}
Object.assign(
    IMA.prototype,
    EventEmitterMethods,
    methods,
    Callbacks
);

export default IMA;