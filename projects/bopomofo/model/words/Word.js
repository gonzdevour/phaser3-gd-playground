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
    }

    get word() {
        return this.doc.word;
    }

    get characters() {
        var pid0 = this.doc.pid[0];
        var characterCollection =  this.db.getCollection(CharactersCollectionName)
        var characters = [];
        for (var i = 0, cnt = pid0.length; i < cnt; i++) {
            var characterDoc = characterCollection.get(pid0[i]);
            characters.push(new Character(this.db, characterDoc));
        }
        return characters;
    }
}

export default Word;