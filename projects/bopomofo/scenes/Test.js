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
        var characters = model.characters.getAll('bopomofo');
        debugger;
    }

    update() { }
}

export default Test;