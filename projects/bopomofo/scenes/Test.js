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
        // Load csv file
        this.load.text('characters', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQWaeZDoFdraJRJtlfcpOpZ0RaBUHn6hO7VkfgH_RwT_qK1D9nLKWJBcXkyvWw9flaU2mUBlbZhSN-c/pub?gid=1005913310&single=true&output=csv');
    }

    create() {
        var model = CreateModel({
            characters: this.cache.text.get('characters'),
        })

        var panel = CreatePanel(this)
            .setPosition(384, 667)
            .layout()

        console.log(`${panel.width}x${panel.height}`)

        var docArray = model.queryCharacter('的');
        var question = model.createQuestion({
            character: docArray[0]
        })

        panel
            .on('submit', function (result) {
                console.log(result)
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