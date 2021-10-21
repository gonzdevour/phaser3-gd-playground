import { Bopomofo } from "../bopomofo/Bopomofo";

const initialsList = Bopomofo.initials.slice();
const mediaList = Bopomofo.media.slice();
const vowelList = Bopomofo.vowel.slice();
const toneList = Bopomofo.tone.slice();

const GetValue = Phaser.Utils.Objects.GetValue;
const Shuffle = Phaser.Utils.Array.Shuffle;

var CreateChoices = function (config) {
    var answer = GetValue(config, 'answer');
    var initials = GetValue(config, 'initials', 5);
    var media = GetValue(config, 'media', 3);
    var vowel = GetValue(config, 'vowel', 5);
    var tone = GetValue(config, 'tone', 5);
    var shuffleChoices = GetValue(config, 'shuffleChoices', true);

    var choices = {
        initials: GetItems(answer.initials, initialsList, initials, true),
        media: GetItems(answer.media, mediaList, media, false),
        vowel: GetItems(answer.vowel, vowelList, vowel, true),
        tone: GetItems(answer.tone, toneList, tone, false),
    }

    if (shuffleChoices) {
        if (typeof (initials) === 'number') {
            choices.initials = Shuffle(choices.initials);
        }

        //choices.media = Shuffle(choices.media);

        if (typeof (vowel) === 'number') {
            choices.vowel = Shuffle(choices.vowel);
        }

        //choices.tone = Shuffle(choices.tone);
    }

    return choices;
}

var GetItems = function (preserveItem, items, count, shuffle) {
    var out = [];
    if (typeof (count) === 'number') {
        if (shuffle) {
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
        }
        else {
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                var item = items[i];
                out.push(item);
                if (out.length === count) {
                    break;
                }
            }
        }

    } else {
        out = [...count];
    }

    return out;
}

export default CreateChoices;