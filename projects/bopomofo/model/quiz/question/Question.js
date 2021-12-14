import Answer from '../answer/Answer.js';
import ParseChoiceConfig from './ParseChoiceConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Question {
    constructor(config) {
        var title = GetValue(config, 'title', '');
        var word = GetValue(config, 'word');
        var character = GetValue(config, 'character');
        var characterIndex;

        if (character && (word === undefined)) {
            // Create word from given character
            word = character.getRandomWord();
            characterIndex = word.getCharacterIndex(character);
        } else if (word && (character === undefined)) {
            // Create character from given word
            // TODO: Weight of character in a word
            var characters = word.getCharacters();
            characterIndex = Phaser.Math.Between(0, characters.length - 1);
            character = characters[characterIndex];
        } else if (word && (typeof (character) === 'number')) {
            // Get character according to index
            characterIndex = character;
            var characters = word.getCharacters();
            character = characters[characterIndex];
        } else if (word && character) {
            // Check if word contains character
            characterIndex = word.getCharacterIndex(character);
            if (characterIndex === -1) {
                // Error : Character is not in Word
            }
        }

        // Question
        this.title = title;
        this.word = word;
        this.characters = word.getCharacters();
        this.character = character;
        this.characterIndex = characterIndex;
        // Answer, choices
        this.answer = (new Answer()).setAnswer(character);
        this.choicesConfig = ParseChoiceConfig(GetValue(config, 'choices'));
    }

    toJSON() {
        return {
            word: this.word.id,
            character: this.character.id,
            db: this.character.dbId,
            title: this.title,
            choices: this.choicesConfig
        }
    }

    getPolyphonyCharacter() {
        var characters = this.word.getCharacters(1);
        return (characters) ? characters[this.characterIndex] : null;
    }

    createChoices() {
        return this.answer.createChoices(this.choicesConfig);
    }

    setAnswer(character) {
        this.answer.setAnswer(character);
        return this;
    }

    verify(input) {
        return this.answer.verify(input);
    }
}

export default Question;