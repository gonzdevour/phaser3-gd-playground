/*
- characters
    - character
    - initials
    - media
    - vowel
    - tone
    - wid : ID list of wordDoc
*/

const GetRandomItem = Phaser.Utils.Array.GetRandom;

class Character {
    constructor(dbWrap, doc) {
        this.dbWrap = dbWrap;
        this.dbId = this.dbWrap.id;
        this.doc = doc;
        this.id = this.doc.$loki;

        this.character = doc.character;
        this.initials = doc.initials;
        this.media = doc.media;
        this.vowel = doc.vowel;
        this.tone = doc.tone;
        this.freq = doc.freq;
    }

    getWords(wordCount) {
        var wordDocIDList = this.doc.wid;
        var wordDocIDListLength = wordDocIDList.length;
        if (wordCount === undefined) {
            wordCount = wordDocIDListLength;
        } else if (wordCount > wordDocIDListLength) {
            wordCount = wordDocIDListLength;
        }

        var wordCollectionHelper = this.dbWrap.words;
        var words = [];
        for (var i = 0; i < wordCount; i++) {
            var word = wordCollectionHelper.queryByID(wordDocIDList[i]);
            words.push(word);
        }
        return words;
    }

    getRandomWord() {
        var wordDocID = GetRandomItem(this.doc.wid);
        var wordCollectionHelper = this.dbWrap.words;
        return wordCollectionHelper.queryByID(wordDocID);
    }
}

export default Character;