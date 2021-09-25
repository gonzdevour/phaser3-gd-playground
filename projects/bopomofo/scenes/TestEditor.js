import 'phaser';
import KeyboardToBopomofo from '../input/keyboardtobopomofo/KeyboardToBopomofo';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {

    }

    create() {
        var input = new KeyboardToBopomofo(this);
        var history = this.add.text(0, 0, '', { fontSize: 24 });
        var currentInput = this.add.text(384, 667, '', { fontSize: 48 });

        input
            .on('change', function (bopomofo) {
                currentInput.text = `${bopomofo.initials}${bopomofo.media}${bopomofo.vowel}${bopomofo.tone}`
            })
            .on('submit', function (bopomofo) {
                history.text += `${bopomofo.initials}${bopomofo.media}${bopomofo.vowel}${bopomofo.tone}\n`
            })
    }

    update() { }
}

export default Test;