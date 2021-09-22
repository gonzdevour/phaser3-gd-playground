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
            .setPosition(384, 667)
            .layout()

        console.log(`${panel.width}x${panel.height}`)

        panel
            .on('submit', function (result) {
                console.log(result)
            })
            .setTitle('2021教育部高頻字詞600注音練習')
            .setWord([
                { character: '萬', initials: '', media: 'ㄧ', vowel: '', tone: 'ˊ' },
                { character: '葉', initials: '', media: 'ㄧ', vowel: 'ㄝ', tone: 'ˋ' },
                { character: '知', initials: 'ㄓ', media: '', vowel: '', tone: '' },
                { character: '秋', initials: 'ㄑ', media: 'ㄧ', vowel: 'ㄡ', tone: '' }
            ])
            .setChoicesText(
                {
                    initials: ['ㄐ', 'ㄑ', 'ㄒ', 'ㄓ', 'ㄔ'],
                    media: ['一', 'ㄨ', 'ㄩ', ' '],
                    vowel: ['ㄠ', 'ㄡ', 'ㄢ', 'ㄤ', 'ㄣ'],
                    tone: [' ', '˙', 'ˊ', 'ˇ', 'ˋ']
                }
            )
            .layout()
         //.drawBounds(this.add.graphics(), 0xff0000)

        console.log(`${panel.width}x${panel.height}`)
    }

    update() { }
}

export default Test;