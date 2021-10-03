import { Bopomofo } from "../bopomofo/Bopomofo";

const initialsList = Bopomofo.initials.slice();
const mediaList = Bopomofo.media.slice();
const vowelList = Bopomofo.vowel.slice();
const toneList = Bopomofo.tone.slice();

const GetValue = Phaser.Utils.Objects.GetValue;
const Shuffle = Phaser.Utils.Array.Shuffle;

var CreateChoices = function (config) {
    var answer = GetValue(config, 'answer');
    var initialsCount = GetValue(config, 'initialsCount', 5);
    var mediaCount = GetValue(config, 'mediaCount', 3);
    var vowelCount = GetValue(config, 'vowelCount', 5);
    var toneCount = GetValue(config, 'toneCount', 5);
    var shuffleChoices = GetValue(config, 'shuffleChoices', true);

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

    return choices;
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

export default CreateChoices;