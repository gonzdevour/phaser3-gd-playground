import AreTheSame from './AreTheSame.js';

var AreTheSameSuit = function (cards, returnDetail) {
    return AreTheSame(cards, 'suit', returnDetail);
}

export default AreTheSameSuit;