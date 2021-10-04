import 'phaser';
import CreateModel from '../build/CreateModel.js';
import CharacterCellSizer from '../gameobjects/charactertable/CharacterCellSizer.js';
import CreateCharacter from '../build/CreateCharacter.js';

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

        var ui = new CharacterCellSizer(this, {
            x: 400, y: 300,
            width: 500,

            background: function (scene) {
                return scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0);
            },

            character: CreateCharacter,

            word: function (scene) {
                return scene.rexUI.add.label({
                    background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 5).setStrokeStyle(2, 0xffffff),
                    text: scene.rexUI.add.BBCodeText(0, 0, '',
                        { fontSize: 40, halign: 'center', valign: 'center', testString: '回' }
                    ),

                    space: { left: 5, right: 5, top: 5, bottom: 5 }
                })
            }
        })
            .layout()

        var character = model.characters.queryCharacter('我')[0];
        ui
            .showCharacter(character)
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)

        console.log(`${ui.width}x${ui.height}`)
    }

    update() { }
}

export default Test;