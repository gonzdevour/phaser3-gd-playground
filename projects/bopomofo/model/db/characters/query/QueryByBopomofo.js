import Query from './Query.js';
import { Bopomofo } from '../../../bopomofo/Bopomofo.js';

var QueryByBopomofo = function (dbWrap, bopomofo) {
    var filter = {}
    for (var i = 0, cnt = bopomofo.length; i < cnt; i++) {
        var char = bopomofo.charAt(i);
        for (var typeName in Bopomofo) {
            if (Bopomofo[typeName].indexOf(char) !== -1) {
                if (!filter.hasOwnProperty(typeName)) {
                    filter[typeName] = [];
                }
                filter[typeName].push(char);
            }
        }
    }

    for (var typeName in filter) {
        if (filter[typeName].length === 1) {
            filter[typeName] = filter[typeName][0];
        } else {
            filter[typeName] = { '$in': filter[typeName] };
        }
    }

    return Query(dbWrap, filter);
}

export default QueryByBopomofo;