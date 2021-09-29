/*
- characters
    - character
    - initials
    - media
    - vowel
    - tone
    - wid : ID list of wordDoc
*/

import Question from '../question/Question';

class Character {
    constructor(db, doc) {
        this.db = db;
        this.doc = doc;

        this.character = doc.character;
        this.initials = doc.initials;
        this.media = doc.media;
        this.vowel = doc.vowel;
        this.tone = doc.tone;
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