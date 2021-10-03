import { TypeNames } from "../bopomofo/Bopomofo";
import CreateChoices from "./CreateChoices";

class Question {
    constructor() {
        this.answer = {
            character: '',
            initials: '', media: '', vowel: '', tone: ''
        };
    }

    setAnswer(character) {
        var answer = this.answer;
        answer.character = character.character;
        answer.initials = character.initials;
        answer.media = character.media;
        answer.vowel = character.vowel;
        answer.tone = character.tone;
        return this;
    }

    createChoices(config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('answer')) {
            config.answer = this.answer;
        }
        return CreateChoices(config);
    }

    verify(input) {
        var answer = this.answer;
        for (var i = 0, cnt = TypeNames.length; i < cnt; i++) {
            var typeName = TypeNames[i];
            if (answer[typeName] !== input[typeName]) {
                return false;
            }
        }
        return true;
    }

}

export default Question;