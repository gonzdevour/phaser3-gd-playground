import AreTheSame from './AreTheSame.js';

var AreTheSameSuit = function (
    cards,
    returnDetail = false,
    wildcard = '*') {

    return AreTheSame(cards, {
        property: 'suit',
        wildcard,
        returnDetail
    });
}

export default AreTheSameSuit;