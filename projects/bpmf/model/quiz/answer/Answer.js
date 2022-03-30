import { TypeNames } from '../../bopomofo/Bopomofo.js';
import CreateChoices from './CreateChoices.js';


//Answer class被Question class使用：

class Answer {
    constructor() { //answer裡包含字與拼音，初始給空值備用
        this.answer = {
            character: '',
            initials: '', media: '', vowel: '', tone: ''
        };
    }

    setAnswer(character) { //設定answer
        var answer = this.answer;
        answer.character = character.character;
        answer.initials = character.initials;
        answer.media = character.media;
        answer.vowel = character.vowel;
        answer.tone = character.tone;
        return this;
    }

    createChoices(config) { //建立選項群
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('answer')) { //如果config沒有answer屬性
            config.answer = this.answer; //讓選項config帶入answer(包含字與拼音)
        }
        return CreateChoices(config); //用import進來的CreateChoices建立選項
    }

    verify(input) {
        var answer = this.answer;
        //console.log('inp: ' + JSON.stringify(input));
        //console.log('ans: ' + JSON.stringify(answer));
        for (var i = 0, cnt = TypeNames.length; i < cnt; i++) {
            var typeName = TypeNames[i];
            if (answer[typeName] !== input[typeName]) { //input任一拼音與answer拼音不同回傳false
                return false;
            }
        }
        return true; //input拼音與answer拼音完全相同
    }

}

export default Answer;