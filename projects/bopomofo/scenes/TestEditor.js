import 'phaser';
import CreateModel from '../build/CreateModel.js';
import CreateCharactersTable from '../build/CreateCharactersTable.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
        this.load.text('characters', 'assets/data/characters.txt');
    }

    create() {
        var model = CreateModel();
        model.loadCharactersText(this.cache.text.get('characters'));

        var table = CreateCharactersTable(this, {
        })
            .setPosition(960, 540)
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .on('button.click', function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle(2, 0xffffff)
                button.startEdit();
                button.once('stopedit', function (gameObject) {
                    gameObject.getElement('background').setStrokeStyle()
                })
            })

        table
            .setCharacters(model.getCharacterPage(0, table.gridCount));
    }

    update() { }
}

export default Test;