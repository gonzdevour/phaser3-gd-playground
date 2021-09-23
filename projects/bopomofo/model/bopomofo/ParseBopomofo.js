import { bopomofo } from './Bopomofo.js';

var ParseBopomofo = function (s) {
    var result = {};
    for (var typeName in bopomofo) {
        result[typeName] = '';
    }

    for (var i = 0, cnt = s.length; i < cnt; i++) {
        var char = s.charAt(i);
        for (var typeName in bopomofo) {
            if (bopomofo[typeName].indexOf(char) !== -1) {
                result[typeName] = char;
            }
        }
    }

    return result;
}

export default ParseBopomofo;