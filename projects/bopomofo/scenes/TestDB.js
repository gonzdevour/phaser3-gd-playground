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
        this.load.text('characters', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQWaeZDoFdraJRJtlfcpOpZ0RaBUHn6hO7VkfgH_RwT_qK1D9nLKWJBcXkyvWw9flaU2mUBlbZhSN-c/pub?gid=1005913310&single=true&output=csv');
    }

    create() {
        var model = CreateModel({
            characters: this.cache.text.get('characters'),

            compress: true
        })

        var docArray = model.queryCharacter('的');
        console.log(docArray);

        var s = model.dbToString();
        console.log(s.length);  // Open compress : 10202 -> 1461

        // Copy to another model
        var testModel = CreateModel({
            data: s
        })
        var docArray = testModel.queryCharacter('的');
        console.log(docArray);
    }

    update() { }
}

export default Test;