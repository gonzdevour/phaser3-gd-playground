/* 
characterData = { 
    character: 此詞第p組破音的第c個字, 
    initial:, 
    media:, 
    vowel:, 
    tone: 
} 
*/

//如果db的character collection中沒有這條characterData，就加入這條characterData
//如果已經存在就不要加，防止重覆。加完回傳這條由loki處理過的doc

var GetCharacterDoc = function (characterData, collection) {
    var doc = collection.findOne(characterData)
    if (!doc) {
        characterData.wid = [];  // For binding wordDocID
        doc = collection.insert(characterData);
    }
    return doc;
}

export default GetCharacterDoc;