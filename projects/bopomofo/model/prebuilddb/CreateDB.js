import loki from 'lokijs/src/lokijs.js';

var CreateDB = function () {
    var db = new loki('bopomofo.db', {
        env: 'BROWSER'
    });

    db.addCollection('characters', {
        indices: ['character']
    })

    db.addCollection('words', {
        indices: ['word']
    })

    return db;
}

export default CreateDB;