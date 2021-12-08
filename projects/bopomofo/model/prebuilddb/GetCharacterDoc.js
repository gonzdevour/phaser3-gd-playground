var GetCharacterDoc = function (characterData, collection) {
    var doc = collection.findOne(characterData)
    if (!doc) {
        characterData.wid = [];  // For binding wordDocID
        characterData.freq = Infinity;  // Min wordDoc.freq
        doc = collection.insert(characterData);
    }
    return doc;
}

export default GetCharacterDoc;