import { bopomofo } from "../bopomofo/Bopomofo";
const initialsList = bopomofo.initials.slice();
const mediaList = bopomofo.media.slice();
const vowelList = bopomofo.vowel.slice();
const toneList = bopomofo.tone.slice();

const GetValue = Phaser.Utils.Objects.GetValue;
const Shuffle = Phaser.Utils.Array.Shuffle;

var CreateQuestion = function (config, out) {
    if (out === undefined) {
        out = {};
    }

    var character = GetValue(config, 'character');
    var initialsCount = GetValue(config, 'initialsCount', 5);
    var mediaCount = GetValue(config, 'mediaCount', 3);
    var vowelCount = GetValue(config, 'vowelCount', 5);
    var toneCount = GetValue(config, 'toneCount', 5);
    var shuffleChoices = GetValue(config, 'shuffleChoices', true);

    var answer = {
        character: character.character,
        initials: character.initials,
        media: character.media,
        vowel: character.vowel,
        tone: character.tone,
    }

    var choices = {
        initials: GetItems(answer.initials, initialsList, initialsCount),
        media: GetItems(answer.media, mediaList, mediaCount),
        vowel: GetItems(answer.vowel, vowelList, vowelCount),
        tone: GetItems(answer.tone, toneList, toneCount),
    }

    if (shuffleChoices) {
        choices.initials = Shuffle(choices.initials);
        choices.media = Shuffle(choices.media);
        choices.vowel = Shuffle(choices.vowel);
        choices.tone = Shuffle(choices.tone);
    }

    out.choices = choices;
    out.answer = answer;
    return out;
}


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