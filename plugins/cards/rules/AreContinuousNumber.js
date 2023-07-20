import AreContinuous from './AreContinuous.js';
import { Wildcard } from '../Const.js';

var AreContinuousNumber = function (cards, returnDetail = false, wildcard = Wildcard) {
    return AreContinuous(cards, {
        property: 'number',
        returnDetail,
        wildcard
    });
}

export default AreContinuousNumber;