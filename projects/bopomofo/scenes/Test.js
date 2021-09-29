import 'phaser';
import CreatePanel from '../build/CreatePanel.js';
import CreateModel from '../build/CreateModel.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
        // Load db file
        this.load.text('db', '/assets/data/bopomofo.compress');
    }

    create() {
        var model = CreateModel({
            db: this.cache.text.get('db'),
        })

        var panel = CreatePanel(this)
            .setPosition(384, 667)
            .layout()

        console.log(`${panel.width}x${panel.height}`)

        var docArray = model.queryCharacter('我');
        var question = model.createQuestion({
            character: docArray[0]
        })

        panel
            .on('submit', function (result) {
                console.log(result);
                console.log((question.verify(result)) ? 'Pass' : 'Fail');
            })
            .setTitle('2021教育部高頻字詞600注音練習')
            .setWord([
                question.answer
            ])
            .setChoicesText(question.choices)
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)

        console.log(`${panel.width}x${panel.height}`)
    }

    update() { }
}

export default Test;