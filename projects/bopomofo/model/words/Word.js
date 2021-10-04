/*
- words
    - word
    - freq
    - pid : 
        - 0 : ID list of characterDoc
        - 1 : ID list of characterDoc
*/

import Character from '../characters/Character.js';

class Word {
    constructor(model, doc) {
        this.model = model;
        this.doc = doc;
        this.word = this.doc.word;
    }

    get polyphonyCount() {
        return this.doc.pid.length;
    }

    getCharacters(polyphonyIndex) {
        if (polyphonyIndex === undefined) {
            polyphonyIndex = 0;
        }
        if (polyphonyIndex >= this.polyphonyCount) {
            return null;
        }

        var pid = this.doc.pid[polyphonyIndex];
        var characterCollection = this.model.characterCollection;
        var characters = [];
        for (var i = 0, cnt = pid.length; i < cnt; i++) {
            var characterDoc = characterCollection.get(pid[i]);
            characters.push(new Character(this.model, characterDoc));
        }
        return characters;
    }
}

export default Word;