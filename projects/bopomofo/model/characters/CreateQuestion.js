import { bopomofo } from "../bopomofo/Bopomofo";
const initialsList = bopomofo.initials.slice();
const mediaList = bopomofo.media.slice();
const vowelList = bopomofo.vowel.slice();
const toneList = bopomofo.tone.slice();

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateQuestion = function (config) {
    var character = GetValue(config, 'character');
    var initialsCount = GetValue(config, 'initialsCount', 5);
    var mediaCount = GetValue(config, 'mediaCount', 3);
    var vowelCount = GetValue(config, 'vowelCount', 5);
    var toneCount = GetValue(config, 'toneCount', 5);

    var result = {
        character: character.character,
        initials: GetItems(character.initials, initialsList, initialsCount),
        media: GetItems(character.media, mediaList, mediaCount),
        vowel: GetItems(character.vowel, vowelList, vowelCount),
        tone: GetItems(character.tone, toneList, toneCount),
    }

    return result;
}

const Shuffle = Phaser.Utils.Array.Shuffle;
var GetItems = function (preserveItem, items, count) {
    var out = [];
    if (preserveItem !== '') {
        out.push(preserveItem);
    }

    items = Shuffle(items);
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        var item = items[i];
        if (item === preserveItem) {
            continue;
        }
        out.push(item);

        if (out.length === count) {
            break;
        }
    }

    return out;
}

export default CreateQuestion;