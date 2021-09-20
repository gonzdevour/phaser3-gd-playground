import 'phaser';
import CreateChoices from '../samples/CreateChoices.js';


class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
    }

    create() {        
        var choices = CreateChoices(this)
            .setPosition(400, 300)
            .layout()

        console.log(`${choices.width}x${choices.height}`)

        choices
            .setChoicesText(
                {
                    initials: ['ㄅ', 'ㄆ', 'ㄇ', 'ㄈ'],
                    media: ['一', 'ㄨ', 'ㄩ', ' '],
                    vowel: ['ㄚ', 'ㄛ', 'ㄝ', 'ㄢ'],
                    tone: ['˙', 'ˊ', 'ˇ', 'ˋ']
                }
            )
    }

    update() { }
}

export default Test;