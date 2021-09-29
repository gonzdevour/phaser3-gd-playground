import ParseBopomofo from '../bopomofo/ParseBopomofo.js';
import { CharactersCollectionName, WordsCollectionName } from './Const.js';
import GetCharacterDoc from "./GetCharacterDoc.js";


var WordDataListToDB = function (wordDataList, db) {
    for (var i = 0, cnt = wordDataList.length; i < cnt; i++) {
        WordDataToDB(wordDataList[i], db);
    }
}

var WordDataToDB = function (wordData, db) {
    var word = wordData.word;
    var pinyins = wordData.pinyins;
    delete wordData.pinyins;

    var wordsCollection = db.getCollection(WordsCollectionName);
    var charactersCollection = db.getCollection(CharactersCollectionName)

    var hasValidPinyin = false;
    for (var p = 0, pcnt = pinyins.length; p < pcnt; p++) {
        if (!IsValidPinyin(pinyins[p])) {
            continue;
        }

        var characterDocIDList = [];
        wordData[`p${p}`] = characterDocIDList;
        for (var c = 0, ccnt = word.length; c < ccnt; c++) {
            var pinyin = pinyins[p][c];
            if (pinyin === '') {
                pinyin = pinyins[0][c];
            }

            var characterData = ParseBopomofo(pinyin, { character: word.charAt(c) })
            var characterDoc = GetCharacterDoc(characterData, charactersCollection);
            characterDocIDList.push(characterDoc.$loki)
            hasValidPinyin = true;
        }
    }

    if (hasValidPinyin) {
        wordsCollection.insert(wordData);
    }
}

var IsValidPinyin = function (pinyin) {
    for (var i = 0, cnt = pinyin.length; i < cnt; i++) {
        if (pinyin[i] !== '') {
            return true;
        }
    }
    return false;
}

export default WordDataListToDB;