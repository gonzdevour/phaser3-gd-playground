import 'phaser';
import CreateModel from '../build/CreateModel';
import ParseBopomofo from '../model/bopomofo/ParseBopomofo';

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

        console.log(ParseBopomofo('ㄛ'));
        console.log(ParseBopomofo('ㄑㄧㄡ'));
        console.log(ParseBopomofo('ㄌㄜˋ'));
    }

    update() { }
}

export default Test;