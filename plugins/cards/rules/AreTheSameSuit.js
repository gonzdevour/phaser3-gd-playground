import AreTheSame from './AreTheSame.js';
import { Wildcard } from '../Const.js';

var AreTheSameSuit = function (
    cards,
    returnDetail = false,
    wildcard = Wildcard) {

    return AreTheSame(cards, {
        property: 'suit',
        wildcard,
        returnDetail
    });
}

export default AreTheSameSuit;