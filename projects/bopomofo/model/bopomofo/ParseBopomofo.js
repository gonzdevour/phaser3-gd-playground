import { bopomofo } from './Bopomofo.js';

var ParseBopomofo = function (s, out) {
    if (out === undefined) {
        out = {};
    }

    for (var typeName in bopomofo) {
        out[typeName] = '';
    }

    for (var i = 0, cnt = s.length; i < cnt; i++) {
        var char = s.charAt(i);
        for (var typeName in bopomofo) {
            if (bopomofo[typeName].indexOf(char) !== -1) {
                out[typeName] = char;
            }
        }
    }

    return out;
}

export default ParseBopomofo;