import 'phaser';
import CreatePanel from '../build/CreatePanel.js';


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
            .setTitle('波波莫福')
            .setWord([
                { character: '一', initials: '', media: '一', vowel: '', tone: '' },
                { character: '葉', initials: '', media: '一', vowel: 'ㄝ', tone: 'ˋ' },
                { character: '知', initials: 'ㄓ', media: '', vowel: '', tone: '' },
                { character: '秋', initials: 'ㄑ', media: '一', vowel: 'ㄡ', tone: '' }
            ])
            .setChoicesText(
                {
                    initials: ['ㄐ', 'ㄑ', 'ㄒ', 'ㄓ', 'ㄔ'],
                    media: ['一', 'ㄨ', 'ㄩ', ' '],
                    vowel: ['ㄠ', 'ㄡ', 'ㄢ', 'ㄤ', 'ㄣ'],
                    tone: [' ', '˙', 'ˊ', 'ˇ', 'ˋ']
                }
            )
            .on('answer', function (result) {
                console.log(result)
            })
    }

    update() { }
}

export default Test;