/*
- words
    - word
    - freq
    - pid : 
        - 0 : ID list of characterDoc
        - 1 : ID list of characterDoc
*/

class Word {
    constructor(dbWrap, doc) {
        this.dbWrap = dbWrap;
        this.doc = doc;
        this.word = this.doc.word;
    }

    get id() {
        return this.doc.$loki;
    }

    get dbId() {
        return this.dbWrap.id;
    }

    get polyphonyCount() { //此詞有幾組破音
        return this.doc.pid.length;
    }

    getCharacters(polyphonyIndex) { //依序號取得破音詞的每個字組成的doc array
        if (polyphonyIndex === undefined) {
            polyphonyIndex = 0;
        }
        if (polyphonyIndex >= this.polyphonyCount) {
            return null;
        }

        var characterCollectionHelper = this.dbWrap.characters;//query methods

        var pid = this.doc.pid[polyphonyIndex];//pid array儲存該破音詞的每個字的doc id
        var characters = [];
        for (var i = 0, cnt = pid.length; i < cnt; i++) {
            var character = characterCollectionHelper.queryByID(pid[i])
            characters.push(character);
        }
        return characters; //[doc,doc,...]
    }

    getCharacterPolyphonyIndex(character) { //以字來查此字為此詞中的第幾組破音詞
        var characterDocID = character.doc.$loki; //用此字的doc.id來查
        var pidLists = this.doc.pid, //Word.doc.pid是此詞的每一組破音的doc id array
            characterIndex,
            characterPolyphonyIndex;
        for (var p = 0, pcnt = pidLists.length; p < pcnt; p++) {//對此詞的每組破音
            characterIndex = pidLists[p].indexOf(characterDocID);//找出此字的doc.id是這組破音doc id array中的第幾個
            if (characterIndex !== -1) {
                characterPolyphonyIndex == p;//如果有查到則記錄是第幾組破音詞
                break; //有查到就停止
            }
        }
        return characterPolyphonyIndex;
    }

    getCharacterIndex(character) { //以字來查此字為此詞中的第幾個字
        var characterDocID = character.doc.$loki; //用此字的doc.id來查
        var pidLists = this.doc.pid, //Word.doc.pid是此詞的每一組破音的doc id array
            characterIndex;
        for (var p = 0, pcnt = pidLists.length; p < pcnt; p++) {//對此詞的每組破音
            characterIndex = pidLists[p].indexOf(characterDocID);//找出此字的doc.id是這組破音doc id array中的第幾個
            if (characterIndex !== -1) {
                break; //有查到就停止
            }
        }
        return characterIndex;
    }
}

export default Word;