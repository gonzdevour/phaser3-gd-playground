import AreContinuous from './AreContinuous.js';

var AreContinuousNumber = function (cards, returnDetail) {
    return AreContinuous(cards, {
        property: 'number',
        returnDetail
    });
}

export default AreContinuousNumber;