import AreDifferent from './AreDifferent.js';
import { Wildcard } from '../Const.js';

var AreDifferentSuits = function (cards, returnDetail = false, wildcard = Wildcard) {
    return AreDifferent(cards, 'suit',
        {
            property: 'suit',
            returnDetail,
            wildcard
        }
    );
}

export default AreDifferentSuits;