import 'phaser';
import CreateWord from '../build/CreateWord.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {

    }

    create() {
        var word = CreateWord(this, {
            character: {
                editable: true
            }
        })
            .setPosition(384, 667)
            .layout()

        word.setWord([
            { character: '萬', initials: '', media: 'ㄧ', vowel: '', tone: 'ˊ' },
            { character: '葉', initials: '', media: 'ㄧ', vowel: 'ㄝ', tone: 'ˋ' },
            { character: '知', initials: 'ㄓ', media: '', vowel: '', tone: '' },
            { character: '秋', initials: 'ㄑ', media: 'ㄧ', vowel: 'ㄡ', tone: '' }
        ])
            .layout()

        var characters = word.getElement('characters');
        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            var gameObject = characters[i];
            gameObject
                .on('startedit', function (gameObject) {
                    gameObject.getElement('background').setStrokeStyle(2, 0xffffff)
                })
                .on('stopedit', function (gameObject) {
                    gameObject.getElement('background').setStrokeStyle()
                })

            this.rexUI.add.click(gameObject)
                .on('click', function (button, gameObject, pointer, event) {
                    gameObject.startEdit()
                })
        }
    }

    update() { }
}

export default Test;