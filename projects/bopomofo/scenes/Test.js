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
            x: 400, y: 300,
            width: 100, height: 120,

            // background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
            initials: GetLabel(this, 'ㄑ'),
            media: GetLabel(this, 'ㄧ'),
            vowel: GetLabel(this, 'ㄢ'),
            tone: GetLabel(this, 'ˊ'),
        })
        
        bopomofo
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000);

        console.log(`${bopomofo.width}x${bopomofo.height}`)

        this.add.text(0, 580, 'ㄧ')
    }

    update() { }
}

var GetLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.add.text(0, 0, text, { fontSize: 20 }),

        align: 'center',
        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })
}

export default Test;