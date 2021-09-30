/*
- words
    - word
    - freq
    - pid : 
        - 0 : ID list of characterDoc
        - 1 : ID list of characterDoc
*/

import { CharactersCollectionName } from '../prebuilddb/Const.js';
import Character from '../characters/Character.js';

class Word {
    constructor(db, doc) {
        this.db = db;
        this.doc = doc;
        this.word = this.doc.word;
    }

    get polyphonicCount() {
        return this.doc.pid.length;
    }

    getCharacters(polyphonicIndex) {
        if (polyphonicIndex === undefined) {
            polyphonicIndex = 0;
        }
        var pid = this.doc.pid[polyphonicIndex];
        var characterCollection = this.db.getCollection(CharactersCollectionName)
        var characters = [];
        for (var i = 0, cnt = pid.length; i < cnt; i++) {
            var characterDoc = characterCollection.get(pid[i]);
            characters.push(new Character(this.db, characterDoc));
        }
        return characters;
    }
}

export default Word;