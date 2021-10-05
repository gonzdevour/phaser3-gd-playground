/*
- words
    - word
    - freq
    - pid : 
        - 0 : ID list of characterDoc
        - 1 : ID list of characterDoc
*/

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

    getCharacterIndex(character) {
        var characterDocID = character.doc.$loki;
        var pidLists = this.doc.pid,
            characterIndex;
        for (var p = 0, pcnt = pidLists.length; p < pcnt; p++) {
            characterIndex = pidLists.indexOf(characterDocID);
            if (characterIndex !== -1) {
                break;
            }
        }
        return characterIndex;
    }
}

export default Word;