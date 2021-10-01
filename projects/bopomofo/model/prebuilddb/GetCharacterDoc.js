var GetCharacterDoc = function (characterData, collection) {
    var doc = collection.findOne(characterData)
    if (!doc) {
        characterData.wid = [];
        doc = collection.insert(characterData);
    }
    return doc;
}

export default GetCharacterDoc;