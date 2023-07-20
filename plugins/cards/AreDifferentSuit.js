import AreDifferent from './AreDifferent.js';

var AreDifferentSuits = function (cards, returnDetail) {
    return AreDifferent(cards, 'suit', returnDetail);
}

export default AreDifferentSuits;