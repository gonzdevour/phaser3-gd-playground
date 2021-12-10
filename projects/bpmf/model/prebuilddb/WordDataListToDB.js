import ParseBopomofo from "../bopomofo/ParseBopomofo.js";

import { GetWordCollection, GetCharacterCollection } from "../db/GetCollectionMethods.js";
import GetCharacterDoc from "./GetCharacterDoc.js";

/* 
wordDataList: 
[
  {
    word:詞條, 
    pinyins:[[p1,p2,p3,p4],[q1,q2,q3,q4]], 
    freq: index
  },
...] 
*/

// Collections will be set later
var WordsCollection;
var CharactersCollection;

var WordDataListToDB = function (wordDataList, db) {
  WordsCollection = GetWordCollection(db); //從db取出word collection
  CharactersCollection = GetCharacterCollection(db); //從db取出character collection

  for (var i = 0, cnt = wordDataList.length; i < cnt; i++) {
    WordDataToDB(wordDataList[i]);
  }
};

var WordDataToDB = function (wordData) {
  var word = wordData.word;        // word: 詞條
  var pinyins = wordData.pinyins;  // pinyins:[[p1,p2,p3,p4],[q1,q2,q3,q4]]
  delete wordData.pinyins; // pinyins不用存在wordDoc裡所以取完後就刪除屬性

  var hasValidPinyin = false;
  wordData.pid = []; //wordData.pid : [[ID list of characterDoc],[ID list of characterDoc]]
  var characterDocSet = new Phaser.Structs.Set(); // Will be used to bind wordDocID to characterDoc
  for (var p = 0, pcnt = pinyins.length; p < pcnt; p++) { //對每組破音

    //偵測這組破音是否其中任一音為空值，任一音為空值即不合法，
    //因為csv中pinyins的空值會先被清除過，見CSVToWordDataList.js的說明
    if (!IsValidPinyin(pinyins[p])) {
      continue;
    }

    var characterDocIDList = []; //一組破音有一組characterDocIDList，以便用詞取字
    wordData.pid.push(characterDocIDList); //先給空array，等loki回傳doc id再補進去
    
    for (var c = 0, ccnt = word.length; c < ccnt; c++) { //對此詞的每個字
      var pinyin = pinyins[p][c]; //此詞第p組破音的第c個字的拼音
      if (pinyin === "") {
        // 防呆：如果沒填拼音就用此詞第1組破音的第c的字的拼音來取代
        pinyin = pinyins[0][c];
      }

      //characterData = { character: 此詞第p組破音的第c個字, initial:, media:, vowel:, tone: }
      var characterData = ParseBopomofo(pinyin, { character: word.charAt(c) });
      
      //以詞條建立字庫：
      //如果db的character collection中沒有這條characterData，就加入這條characterData
      //如果已經存在就不要加，防止重覆。不管有沒有加都會回傳這條由loki處理過的doc
      var characterDoc = GetCharacterDoc(characterData, CharactersCollection);

      //將這條字doc的id存入這組破音的characterDocIDList array中
      characterDocIDList.push(characterDoc.$loki);

      //freq越小表示頻率越高或順序愈前面，一個character會在多個word裡出現但本身沒有freq值，
      //所以就用freq最小的那個word freq作為character freq。
      //由於出題模式是以字庫為主的以字查詞方法，所以「依序模式」會用到character freq。
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
    // 在上面的code中，將原始的wordData加上pid屬性(巢狀存入字ID列表)後，建立詞庫
    var wordDoc = WordsCollection.insert(wordData);

    // 取得此詞doc id後，for此詞用到的字doc，把詞doc的id push進wid裡，以便以字查詢用到此字的詞群
    var wordDocId = wordDoc.$loki;
    characterDocSet.iterate(function (characterDoc) {
      characterDoc.wid.push(wordDocId);
    });
  }
};

var IsValidPinyin = function (pinyin) {
  for (var i = 0, cnt = pinyin.length; i < cnt; i++) {
    if (pinyin[i] !== "") {
      return true;
    }
  }
  return false;
};

export default WordDataListToDB;
