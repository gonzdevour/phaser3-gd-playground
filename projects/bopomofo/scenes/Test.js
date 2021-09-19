import 'phaser';
import Bopomofo from '../gameobjects/bopomofo/Bopomofo';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
        var bopomofo = new Bopomofo(this, {
            x: 400, y: 300,           // Position
            width: 100, height: 120,  // Minimun size

            // background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

            // Use getLabelCallback if initials, media, vowel, tone parameter is not given
            getLabelCallback: GetLabel,

            // Assign element individually
            // initials: GetLabel(this, 'ㄑ'),
            // media: GetLabel(this, 'ㄧ'),
            // vowel: GetLabel(this, 'ㄢ'),
            // tone: GetLabel(this, 'ˊ'),
        })
            .layout()
        // .drawBounds(this.add.graphics(), 0xff0000);

        console.log(`${bopomofo.width}x${bopomofo.height}`)

        bopomofo.setInitials('ㄑ').setMedia('ㄧ').setVowel('ㄢ').setTone('ˊ');
    }

    update() { }
}

var GetLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, text,
            { fontSize: 20, fixedWidth: 24, fixedHeight: 24, halign: 'center', valign: 'center' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })
}

export default Test;