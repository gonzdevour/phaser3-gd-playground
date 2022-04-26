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
        this.doc = doc;

        this.character = doc.character;
        this.polyphonyIndex = doc.polyphonyIndex;
        this.initials = doc.initials;
        this.media = doc.media;
        this.vowel = doc.vowel;
        this.tone = doc.tone;
    }

    //get用在：自己無權更新目標變數，而目標變數可能會被其他物件更新時。
    //get不可傳入參數，所以不適合複雜運算。
    //這個例子中，取id、dbId可以使用成員變數、成員函數、get，其實都可以。
    //採用get可以想成是防呆功能。
    get id() {
        return this.doc.$loki;
    }

    get dbId() {
        return this.dbWrap.id;
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

    getRandomWord() { //被Question.js使用
        var wordDocID = GetRandomItem(this.doc.wid);
        var wordCollectionHelper = this.dbWrap.words;
        return wordCollectionHelper.queryByID(wordDocID);
    }
}

export default Character;