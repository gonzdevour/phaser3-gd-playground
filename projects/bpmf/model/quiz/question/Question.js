import Answer from '../answer/Answer.js';
import ParseChoiceConfig from './ParseChoiceConfig.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

/*     
    在BuildQuiz.js執行：
    model.quiz.addQuestion({
        title: '',
        character: ,
        choices: choices //undefined或模式字串
    }) 
    由new Question接收
*/

class Question {
    constructor(config) {
        var title = GetValue(config, 'title', '');
        var word = GetValue(config, 'word');
        var character = GetValue(config, 'character');
        var characterIndex;

        //出題的模式：給詞取隨機字|給詞&字序號|給字取隨機詞|給詞&字
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
        } else if (word && character) { //若config有詞又有字
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
        //例如強化練習模式'ㄓㄗ'會轉換為config = { initials: 'ㄓㄗ' }
        this.choicesConfig = ParseChoiceConfig(GetValue(config, 'choices'));
    }

    toJSON() { //把Question物件還原回設定值JSON(再存進LS)
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
    static FromJSON(model, json) { //從JSON重建Question物件(再組合回Quiz)
        var db = model.db[json.db]; //指定db。json.db: this.character.dbId

        return new Question({
            title: json.title,
            word: db.words.queryByID(json.word),
            character: db.characters.queryByID(json.character),
            choices: json.choices
        })
    }

    getPolyphonyCharacter() { //取出破音詞的拼音組合
        var characters = this.word.getCharacters(1); //從詞取出第二組拼音組合
        return (characters) ? characters[this.characterIndex] : null;
    }
/* 
    在SetupQuizPanel呼叫question.createChoices()
    var SetupQuizPanel = function (quizPanel, question, onSubmit) {
        // Fill quizPanel
        quizPanel
            .clearChoices()
            .setTitle(question.title)
            .setWord(question.characters)
            .setChoicesText(question.createChoices())
            .layout() 
*/
    createChoices() {
        return this.answer.createChoices( this.choicesConfig ); //例如強化練習模式'ㄓㄗ'會轉換為config = { initials: 'ㄓㄗ' }
        //這裡原本是寫成：
        //return this.answer.createChoices( { ...this.choicesConfig } );
        //因為物件或陣列透過變數直接複製會指向原物件，所以如果createChoices時會修改config值的話，
        //Question.choiceConfig也會一起變動導致往後取值錯誤，
        //透過...將this.choicesConfig「去括號」後再給括號，就會以新物件的形式複製this.choicesConfig
        //就不用擔心在之後的函數中被改動，這是一個防呆的機制。
        //但是因為createChoices並不會修改此config值，所以刪除上述寫法。
    }

    setAnswer(character) {
        this.answer.setAnswer(character); //設定答案
        return this;
    }

    verify(input) {
        return this.answer.verify(input); //比對答案
    }
}

export default Question;