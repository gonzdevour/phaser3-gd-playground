import { Bopomofo } from './Bopomofo.js';

var ParseBopomofo = function (s, out) {
    if (out === undefined) {
        out = {};
    }

    for (var typeName in Bopomofo) {
        out[typeName] = '';
    }

    for (var i = 0, cnt = s.length; i < cnt; i++) {
        var char = s.charAt(i);
        for (var typeName in Bopomofo) {
            if (Bopomofo[typeName].indexOf(char) !== -1) {
                out[typeName] = char;
            }
        }
    }

    return out;
}

export default ParseBopomofo;