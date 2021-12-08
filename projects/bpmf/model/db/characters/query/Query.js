import Character from '../Character.js';

var Query = function (dbWrap, filter, sortMode) {
    var characterCollection = dbWrap.characterCollection;

    if (typeof (sortMode) === 'string') {
        sortMode = SortMode[sortMode];
    }

    var docArray;
    switch (sortMode) {
        case 1: // 'bopomofo'
            docArray = characterCollection
                .chain()
                .find(filter)
                .compoundsort(['initials', 'media', 'vowel', 'tone'])
                .data();
            break;
        default:
            docArray = characterCollection.find(filter);
            break;
    }

    var characters = [];
    for (var i = 0, cnt = docArray.length; i < cnt; i++) {
        characters.push(new Character(dbWrap, docArray[i]))
    }
    return characters;
}
const SortMode = {
    'none': 0,
    'bopomofo': 1
}

export default Query;