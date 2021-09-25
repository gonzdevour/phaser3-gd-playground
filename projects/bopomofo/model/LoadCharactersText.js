var LoadCharactersText = function (text) {
    var characters = text.replace(/(\r\n|\n|\r)/gm, '').split('');
    var items = [];
    for (var i = 0, cnt = characters.length; i < cnt; i++) {
        items.push({
            character: characters[i],
            initials: '',
            media: '',
            vowel: '',
            tone: '',
        })
    }

    this.characters.load(items);
    return this;
}

export default LoadCharactersText;