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

        var characterCollectionHelper = this.model.characters;

        var pid = this.doc.pid[polyphonyIndex];
        var characters = [];
        for (var i = 0, cnt = pid.length; i < cnt; i++) {
            var character = characterCollectionHelper.queryByID(pid[i])
            characters.push(character);
        }
        return characters;
    }
}

export default Word;