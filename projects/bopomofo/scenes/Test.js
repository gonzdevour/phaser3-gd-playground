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

        // var word = model.words.queryRandomWord();
        var word = model.words.queryWord('什麼')[0];
        var characters = word.getCharacters();
        var characterIndex = Phaser.Math.Between(0, characters.length - 1);
        var character = characters[characterIndex];
        var question = character.createQuestion();

        panel
            .on('submit', function (result) {
                console.log(result);
                var isPass = question.verify(result);
                if (!isPass) { // Verify polyphonic                     
                    var character = word.getCharacters(1, characterIndex); // Get polyphonic character
                    if (character) { // Has polyphonic
                        isPass = question.setAnswer(character).verify(result);
                        if (isPass) {
                            console.log('Match polyphonic');
                        }
                    }
                }

                console.log((isPass) ? 'Pass' : 'Fail');
            })
            .setTitle('2021教育部高頻字詞600注音練習')
            .setWord(characters)
            .setChoicesText(question.createChoices())
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)

        console.log(`${panel.width}x${panel.height}`)

        // Style question character
        var characterUI = panel.getCharacter(characterIndex);
        characterUI.setBopomofoVisible(false); // Or characterUI.setBopomofo()
        characterUI.getElement('character.text').setColor('chocolate');
    }

    update() { }
}

export default Test;