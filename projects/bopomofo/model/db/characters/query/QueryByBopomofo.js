import Query from './Query.js';
import GetBopomofoFilter from './GetBopomofoFilter.js';

var QueryByBopomofo = function (dbWrap, bopomofo) {
    return Query(dbWrap, GetBopomofoFilter(bopomofo));
}

export default QueryByBopomofo;