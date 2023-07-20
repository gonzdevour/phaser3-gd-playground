import AreContinuous from './AreContinuous.js';

var AreContinuousNumber = function (cards, returnDetail = false, wildcard = '*') {
    return AreContinuous(cards, {
        property: 'number',
        returnDetail,
        wildcard
    });
}

export default AreContinuousNumber;