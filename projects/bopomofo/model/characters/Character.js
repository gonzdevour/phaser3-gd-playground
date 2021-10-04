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
    constructor(model, doc) {
        this.model = model;
        this.doc = doc;

        this.character = doc.character;
        this.initials = doc.initials;
        this.media = doc.media;
        this.vowel = doc.vowel;
        this.tone = doc.tone;
    }

    createQuestion() {
        var question = new Question();
        question.setAnswer(this);
        return question;
    }
}

export default Character;