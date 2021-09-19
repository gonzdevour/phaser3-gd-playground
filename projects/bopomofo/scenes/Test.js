import 'phaser';
import Character from '../gameobjects/character/Character';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
        var character = new Character(this, {
            x: 400, y: 300,           // Position
            width: 150, height: 120,  // Minimun size

            background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
            character: this.rexUI.add.label({
                background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
                text: this.rexUI.add.BBCodeText(0, 0, '',
                    { fontSize: 40, fixedWidth: 48, fixedHeight: 48, halign: 'center', valign: 'center' }
                ),
                align: 'center',
                space: { left: 5, right: 5, top: 5, bottom: 5 }
            }),

            bopomofo: {
                getLabelCallback: GetLabel
            }
        })
            .layout()
        // .drawBounds(this.add.graphics(), 0xff0000);

        console.log(`${character.width}x${character.height}`)

        character
            .setCharacter(
                { character: '前', initials: 'ㄑ', media: 'ㄧ', vowel: 'ㄢ', tone: 'ˊ' }
            )
    }

    update() { }
}

var GetLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, text,
            { fontSize: 16, fixedWidth: 20, fixedHeight: 20, halign: 'center', valign: 'center' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 5, right: 5, top: 5, bottom: 5 }
    })
}

export default Test;