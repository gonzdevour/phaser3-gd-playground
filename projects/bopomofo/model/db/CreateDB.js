import loki from 'lokijs/src/lokijs.js';
import { CharactersCollectionName, WordsCollectionName } from './Const.js';

var CreateDB = function () {
    var db = new loki('bopomofo.db', {
        env: 'BROWSER'
    });

    db.addCollection(CharactersCollectionName, {
        disableMeta: true,
        indices: ['character', 'initials', 'media', 'vowel', 'tone', 'freq']
    });

    db.addCollection(WordsCollectionName, {
        disableMeta: true,
        indices: ['word', 'freq']
    })

    return db;
}

export default CreateDB;