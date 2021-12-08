import { Bopomofo } from '../../../bopomofo/Bopomofo.js';

/* Bopomofo = {
    initials: initialsList,
    media: mediaList,
    vowel: vowelList,
    tone: toneList,
} */

var GetBopomofoFilter = function (bopomofo, out) {
    if (out === undefined) {
        out = {};
    }

    for (var i = 0, cnt = bopomofo.length; i < cnt; i++) {
        var char = bopomofo.charAt(i);//對每個符號
        for (var typeName in Bopomofo) {//依據符號類型
            if (Bopomofo[typeName].indexOf(char) !== -1) {//若此符號屬於此類型
                if (!out.hasOwnProperty(typeName)) {
                    out[typeName] = []; //沒有這個類型就push空值
                }
                out[typeName].push(char);//有此類型就push此符號給array
            }
        }
    }

    for (var typeName in out) {
        //如果out[typename]只有一個，就以這個符號為此類型的filter，例如{initials:'ㄅ'}
        if (out[typeName].length === 1) {
            out[typeName] = out[typeName][0];
        } else {
            //如果out[typename]為複數(例如'ㄜㄛ'都屬於vowel)
            //loki支援用array做matching any的查找，例如{vowel: {'$in':['ㄛ','ㄜ']}}
            //var docArray = collection.find({key: {'$in': [value0, value1, ...]});
            out[typeName] = { '$in': out[typeName] };
        }
    }

    return out;
}

export default GetBopomofoFilter;