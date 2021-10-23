import { Bopomofo } from '../../../bopomofo/Bopomofo.js';

var GetBopomofoFilter = function (bopomofo, out) {
    if (out === undefined) {
        out = {};
    }

    for (var i = 0, cnt = bopomofo.length; i < cnt; i++) {
        var char = bopomofo.charAt(i);
        for (var typeName in Bopomofo) {
            if (Bopomofo[typeName].indexOf(char) !== -1) {
                if (!out.hasOwnProperty(typeName)) {
                    out[typeName] = [];
                }
                out[typeName].push(char);
            }
        }
    }

    for (var typeName in out) {
        if (out[typeName].length === 1) {
            out[typeName] = out[typeName][0];
        } else {
            out[typeName] = { '$in': out[typeName] };
        }
    }

    return out;
}

export default GetBopomofoFilter;