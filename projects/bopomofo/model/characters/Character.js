import Question from '../question/Question';

class Character {
    constructor(doc) {
        this.doc = doc;
    }

    get character() {
        return this.doc.character;
    }

    get initials() {
        return this.doc.initials;
    }

    get media() {
        return this.doc.media;
    }

    get vowel() {
        return this.doc.vowel;
    }

    get tone() {
        return this.doc.tone;
    }

    createQuestion(config) {
        if (config === undefined) {
            config = {};
        }
        config.character = this;
        return new Question(config);
    }
}

export default Character;