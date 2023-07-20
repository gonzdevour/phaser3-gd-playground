import GetRepeatedPattern from './GetRepeatedPattern.js';

var GetRepeatedNumberPattern = function (cards, returnDetail = false) {
    return GetRepeatedPattern(cards, {
        property: 'number',
        returnDetail
    })
}

export default GetRepeatedNumberPattern;