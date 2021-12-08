import Answer from '../answer/Answer.js';
import ParseChoiceConfig from './ParseChoiceConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Question {
    constructor(config) {
        var title = GetValue(config, 'title', '');
        var word = GetValue(config, 'word');
        var character = GetValue(config, 'character');
        var characterIndex;

        if (character && (word === undefined)) { //若config有字無詞
            // Create word from given character //以字找詞
            word = character.getRandomWord(); //以字找隨機詞
            characterIndex = word.getCharacterIndex(character); //設定字在詞裡的序號
        } else if (word && (character === undefined)) { //若config有詞無字
            // Create character from given word //以詞找字
            // TODO: Weight of character in a word(weight未完成)
            var characters = word.getCharacters(); //以詞取出所有字
            characterIndex = Phaser.Math.Between(0, characters.length - 1);//隨機取一字
            character = characters[characterIndex];//取得題目字
        } else if (word && (typeof (character) === 'number')) { //若config有詞，字參數給數字
            // Get character according to index//依字序取字
            characterIndex = character;
            var characters = word.getCharacters();//以詞取出所有字
            character = characters[characterIndex];//取得題目字
        } else if (word && character) { //若config有字又有詞
            // Check if word contains character
            characterIndex = word.getCharacterIndex(character);//設定字在詞裡的序號
            if (characterIndex === -1) { //如果字沒有在詞裡面
                // Error : Character is not in Word//報錯
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

    //static是一種把class當function用的方法，
    //在Quiz.js引入class後用var question = Question.FromJSON()呼叫，回傳question物件。
    //這是因為new Querion和Question.FromJSON()傳入的參數不一致，
    //所以需要static來重組內外物件。
    static FromJSON(model, json) {
        var db = model.db[json.db];

        return new Question({
            title: json.title,
            word: db.words.queryByID(json.word),
            character: db.characters.queryByID(json.character),
            choices: json.choices
        })
    }

    getPolyphonyCharacter() { //取出破音字
        var characters = this.word.getCharacters(1); //取出
        return (characters) ? characters[this.characterIndex] : null;
    }

    createChoices() {
        return this.answer.createChoices({ ...this.choicesConfig });
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