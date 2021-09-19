import 'phaser';
import Character from '../gameobjects/character/Character';
import Word from '../gameobjects/word/Word';


class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
        var word = new Word(this, {
            x: 400, y: 300,           // Position
            width: 150,               // Minimun size
            orientation: 'y',         // Vertical

            background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

            characters: [
                GetCharacter(this),
                GetCharacter(this),
                GetCharacter(this),
                GetCharacter(this)
            ]
        })
            .layout()
        // .drawBounds(this.add.graphics(), 0xff0000);

        console.log(`${word.width}x${word.height}`)

        word
            .setWord(
                [
                    { character: '一', initials: '', media: '一', vowel: '', tone: '' },
                    { character: '葉', initials: '', media: '一', vowel: 'ㄝ', tone: 'ˋ' },
                    { character: '知', initials: 'ㄓ', media: '', vowel: '', tone: '' },
                    { character: '秋', initials: 'ㄑ', media: '一', vowel: 'ㄡ', tone: '' }
                ]
            )
    }

    update() { }
}

var GetCharacter = function (scene) {
    return new Character(scene, {
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        character: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, '',
                { fontSize: 40, fixedWidth: 48, fixedHeight: 48, halign: 'center', valign: 'center' }
            ),
            align: 'center',
            space: { left: 5, right: 5, top: 5, bottom: 5 }
        }),

        bopomofo: {
            getLabelCallback: GetLabel
        }
    })
}

var GetLabel = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '',
            { fontSize: 16, fixedWidth: 20, fixedHeight: 20, halign: 'center', valign: 'center' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 5, right: 5, top: 5, bottom: 5 }
    })
}

export default Test;