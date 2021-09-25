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

        switch (keyName) {
            case 'backspace': // Clear
                this.reset();
                this.eventEmitter.emit('change', this.bopomofo);
                break;

            case 'enter':  // Submit
                this.eventEmitter.emit('submit', this.bopomofo);
                this.reset();
                break;

            default:  // Set
                var char = KeyToBopomofoMap[keyName];
                // Fill to bopomofo
                for (var typeName in Bopomofo) {
                    if (Bopomofo[typeName].indexOf(char) !== -1) {
                        this.bopomofo[typeName] = char;
                        break;
                    }
                }

                this.eventEmitter.emit('change', this.bopomofo);
                break;
        }
    }
}

export default KeyboardToBopomofo;