const MaxPolyphonicCount = 4;

// For editor
var LoadCharactersText = function (text) {
    var characters = text.replace(/(\r\n|\n|\r)/gm, '').split('');
    var items = [];
    for (var i = 0, cnt = characters.length; i < cnt; i++) {
        var character = characters[i];
        var startIndex = this.queryCharacter(character).length;
        var itemCount = MaxPolyphonicCount - startIndex;
        for (var j = 0; j < itemCount; j++) {
            items.push({
                character: character,
                index: (j + startIndex),
                initials: '',
                media: '',
                vowel: '',
                tone: '',
            })
        }
    }

    this.characters.load(items);
    return this;
}

export default LoadCharactersText;