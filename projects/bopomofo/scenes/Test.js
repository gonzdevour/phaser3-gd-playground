import 'phaser';
import CreateWord from '../samples/CreateWord.js';


class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
        var word = CreateWord(this)
            .layout()

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

export default Test;