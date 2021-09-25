import KeyToBopomofoMap from './KeyToBopomofoMap';
import { Bopomofo } from '../../model/bopomofo/Bopomofo.js';

const EventEmitter = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class KeyboardToBopomofo extends EventEmitter {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        this.bopomofo = { initials: '', media: '', vowel: '', tone: '', };

        var start = GetValue(config, 'start', true);
        if (start) {
            this.start();
        }
    }

    destroy() {
        this.stop();
        this.scene = undefined;
        this.eventEmitter = undefined;
    }

    start() {
        this.scene.input.keyboard.on('keydown', this.onKeydown, this);
    }

    stop() {
        this.scene.input.keyboard.off('keydown', this.onKeydown, this);
    }

    reset() {
        var bopomofo = this.bopomofo;
        bopomofo.initials = '';
        bopomofo.media = '';
        bopomofo.vowel = '';
        bopomofo.tone = '';
        return this;
    }

    onKeydown(event) {
        var keyName = event.key.toLowerCase();

        var isClearKey = (keyName === 'backspace') || (keyName === 'escape');
        if (isClearKey) {  // Clear
            this.reset();
            this.eventEmitter.emit('change', this.bopomofo);
            return;
        }

        var char = KeyToBopomofoMap[keyName];
        if (!char) { // Invalid input
            return;
        }

        // Fill to bopomofo
        var isTone;
        for (var typeName in Bopomofo) {
            if (Bopomofo[typeName].indexOf(char) !== -1) {
                this.bopomofo[typeName] = char;
                isTone = (typeName === 'tone');
                break;
            }
        }

        this.eventEmitter.emit('change', this.bopomofo);

        if (isTone) {
            this.eventEmitter.emit('submit', this.bopomofo);
            this.reset();
        }
    }
}

export default KeyboardToBopomofo;