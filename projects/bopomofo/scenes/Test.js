import 'phaser';
import CreatePanel from '../samples/CreatePanel.js';


class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {
        var panel = CreatePanel(this)
            .setPosition(400, 300)
            .layout()

        console.log(`${panel.width}x${panel.height}`)

        panel
            .setWord([
                { character: '一', initials: '', media: '一', vowel: '', tone: '' },
                { character: '葉', initials: '', media: '一', vowel: 'ㄝ', tone: 'ˋ' },
                { character: '知', initials: 'ㄓ', media: '', vowel: '', tone: '' },
                { character: '秋', initials: 'ㄑ', media: '一', vowel: 'ㄡ', tone: '' }
            ])
            .setChoicesText(
                {
                    initials: ['ㄐ', 'ㄑ', 'ㄒ', 'ㄓ'],
                    media: ['一', 'ㄨ', 'ㄩ', ' '],
                    vowel: ['ㄠ', 'ㄡ', 'ㄢ', 'ㄤ'],
                    tone: ['˙', 'ˊ', 'ˇ', 'ˋ']
                }
            )
    }

    update() { }
}

export default Test;