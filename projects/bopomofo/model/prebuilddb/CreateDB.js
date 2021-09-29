import loki from 'lokijs/src/lokijs.js';
import { CharactersCollectionName, WordsCollectionName } from './Const.js';

/*
characters: [
    {character, initials, media, vowel, tone, wid:[...]}.
    ...
]

words: [
    {word, freq, pid:[[...], [...]]},
    ...
]
*/

var CreateDB = function () {
    var db = new loki('bopomofo.db', {
        env: 'BROWSER'
    });

    db.addCollection(CharactersCollectionName, {
        indices: ['character', 'initials', 'media', 'vowel', 'tone']
    });

    db.addCollection(WordsCollectionName, {
        indices: ['word', 'freq']
    })

    return db;
}

export default CreateDB;