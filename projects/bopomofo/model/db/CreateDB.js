import loki from 'lokijs/src/lokijs.js';
import { CharactersCollectionName, WordsCollectionName } from './Const.js';

var CreateDB = function () {
    var db = new loki('bopomofo.db', {
        env: 'BROWSER'
    });

    db.addCollection(CharactersCollectionName, {
        disableMeta: true,
        indices: ['character', 'initials', 'media', 'vowel', 'tone']
    });

    db.addCollection(WordsCollectionName, {
        disableMeta: true,
        indices: ['db', 'word', 'freq']
    })

    return db;
}

export default CreateDB;