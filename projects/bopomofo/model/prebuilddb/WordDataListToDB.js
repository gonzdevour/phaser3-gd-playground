import ParseBopomofo from '../bopomofo/ParseBopomofo.js';

import { GetWordCollection, GetCharacterCollection } from '../db/GetCollectionMethods.js';
import GetCharacterDoc from "./GetCharacterDoc.js";

// Collections will be set later
var WordsCollection;
var CharactersCollection;

var WordDataListToDB = function (wordDataList, db) {
    WordsCollection = GetWordCollection(db);
    CharactersCollection = GetCharacterCollection(db);

    for (var i = 0, cnt = wordDataList.length; i < cnt; i++) {
        WordDataToDB(wordDataList[i]);
    }
}

var WordDataToDB = function (wordData) {
    var word = wordData.word;
    var pinyins = wordData.pinyins;
    // pinyins: A 2d array, contains 2 set of pinyins, each pinyin contains bopomofo of characters
    // [ [c0, c1, ...], [c0, c1, ...] ]
    delete wordData.pinyins;  // pinyins property won't be store into wordDoc

    var hasValidPinyin = false;
    wordData.pid = [];
    var characterDocSet = new Phaser.Structs.Set();  // Will be used to bind wordDocID to characterDoc
    for (var p = 0, pcnt = pinyins.length; p < pcnt; p++) {
        // All bopomofo of characters are empty
        if (!IsValidPinyin(pinyins[p])) {
            continue;
        }

        var characterDocIDList = [];
        wordData.pid.push(characterDocIDList);
        // wordData.pid : A 2d array, map pinyins to characterDocID
        for (var c = 0, ccnt = word.length; c < ccnt; c++) {
            var pinyin = pinyins[p][c];
            if (pinyin === '') {  // Don't have bopomofo? Pick first bopomofo as default value.
                pinyin = pinyins[0][c];
            }

            // Build json data of characterDoc
            var characterData = ParseBopomofo(pinyin, { character: word.charAt(c) });

            // FindOne or insert json data, return characterDoc
            var characterDoc = GetCharacterDoc(characterData, CharactersCollection);

            // Insert characterDocID into wordData.pid[p]
            characterDocIDList.push(characterDoc.$loki);

            // Update characterDoc.freq
            if (characterDoc.freq > wordData.freq) {
                characterDoc.freq = wordData.freq;
                CharactersCollection.update(characterDoc);
            }

            hasValidPinyin = true;

            // Add characterDoc for binding later
            characterDocSet.set(characterDoc);
        }
    }

    if (hasValidPinyin) {
        // Insert json data, return wordDoc
        var wordDoc = WordsCollection.insert(wordData);

        // Bind wordDocID to characterDoc
        var wordDocId = wordDoc.$loki;
        characterDocSet.iterate(function (characterDoc) {
            characterDoc.wid.push(wordDocId);
        });
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