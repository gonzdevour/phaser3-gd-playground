import AreContinuous from './AreContinuous.js';
import { Wildcard } from '../Const.js';

var AreContinuousNumber = function (cards, returnDetail = false, wildcard = Wildcard) {
    return AreContinuous(cards, 'number',
        {
            returnDetail,
            wildcard
        }
    );
}

export default AreContinuousNumber;