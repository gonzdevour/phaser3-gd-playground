import AreTheSame from './AreTheSame.js';
import { Wildcard } from '../Const.js';

var AreTheSameNumber = function (cards, returnDetail = false, wildcard = Wildcard) {
    return AreTheSame(cards, 'number',
        {
            returnDetail,
            wildcard
        }
    );
}

export default AreTheSameNumber;