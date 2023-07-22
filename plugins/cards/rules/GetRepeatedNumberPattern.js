import GetRepeatedPattern from './GetRepeatedPattern.js';

var GetRepeatedNumberPattern = function (cards, returnDetail = false) {
    return GetRepeatedPattern(cards, 'number',
        {
            secondProperty: 'suit',
            returnDetail,
        }
    )
}

export default GetRepeatedNumberPattern;