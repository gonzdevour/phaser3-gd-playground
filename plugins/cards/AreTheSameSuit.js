import AreTheSame from './AreTheSame.js';

var AreTheSameNumber = function (cards, returnDetail) {
    return AreTheSame(cards, 'number', returnDetail);
}

export default AreTheSameNumber;