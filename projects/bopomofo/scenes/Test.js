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
            .layout()

        console.log(`${panel.width}x${panel.height}`)
    }

    update() { }
}

export default Test;