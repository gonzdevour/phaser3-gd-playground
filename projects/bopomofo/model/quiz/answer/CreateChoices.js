import {
    Bopomofo,
    Media as ConstMedia,
    Tone as ConstTone
} from '../../bopomofo/Bopomofo.js';

const initialsList = Bopomofo.initials.slice();
const mediaList = Bopomofo.media.slice();
const vowelList = Bopomofo.vowel.slice();
const toneList = Bopomofo.tone.slice();

const GetValue = Phaser.Utils.Objects.GetValue;
const Shuffle = Phaser.Utils.Array.Shuffle;

var CreateChoices = function (config) {
    var answer = GetValue(config, 'answer');
    var initials = GetValue(config, 'initials', 5);
    var media = GetValue(config, 'media', ConstMedia);
    var vowel = GetValue(config, 'vowel', 5);
    var tone = GetValue(config, 'tone', ConstTone);
    var shuffleInitials = GetValue(config, 'shuffleInitials', true);
    var shuffleMedia = GetValue(config, 'shuffleMedia', false);
    var shuffleVowel = GetValue(config, 'shuffleVowel', true);
    var shuffleTone = GetValue(config, 'shuffleTone', false);

    var choices = {
        initials: GetItems(answer.initials, initialsList, initials),
        media: GetItems(answer.media, mediaList, media),
        vowel: GetItems(answer.vowel, vowelList, vowel),
        tone: GetItems(answer.tone, toneList, tone),
    }

    if (shuffleInitials) {
        Shuffle(choices.initials);
    }
    if (shuffleMedia) {
        Shuffle(choices.media);
    }
    if (shuffleVowel) {
        Shuffle(choices.vowel);
    }
    if (shuffleTone) {
        Shuffle(choices.tone);
    }

    return choices;
}

var GetItems = function (preserveItem, items, count, shuffle) {
    var out = [];
    if (typeof (count) === 'number') {
        // Pick random n items
        // Put preserveItem as first item
        if (preserveItem !== '') {
            out.push(preserveItem);
        }
        // Pick more random items
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

    } else {
        // Special mode: bypass items
        // cout is string, split string into character array as result
        out = [...count];
    }

    return out;
}

export default CreateChoices;