import 'phaser';
import CreateModel from '../build/CreateModel';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })

    }

    preload() {
        // Load csv file
        this.load.text('characters', 'assets/data/characters.csv');
    }

    create() {
        var model = CreateModel({
            characters: this.cache.text.get('characters')
        })

        var docArray = model.queryCharacter('的');
        console.log(docArray);
    }

    update() { }
}

export default Test;