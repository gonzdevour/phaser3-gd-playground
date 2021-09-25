import { Initials, Media, Vowel, Tone } from '../../model/bopomofo/Bopomofo.js'

const Bopomofo = `${Initials}${Media}${Vowel}${Tone}`;
const Keys = '1qaz2wsxedcrfv5tgbyhnujm8ik,9ol.0p;/-7 634';

const Map = {};
for (var i = 0, cnt = Keys.length; i < cnt; i++) {
    Map[Keys.charAt(i)] = Bopomofo.charAt(i);
}

export default Map;
