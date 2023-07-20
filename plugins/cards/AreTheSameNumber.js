import AreTheSame from './AreTheSame.js';

var AreTheSameNumber = function (
    cards,
    returnDetail = false,
    wildcard = '*') {

    return AreTheSame(cards, {
        property: 'number',
        returnDetail,
        wildcard
    });
}

export default AreTheSameNumber;