import AreDifferent from './AreDifferent.js';

var AreDifferentSuits = function (
    cards,
    returnDetail = false,
    wildcard = '*') {

    return AreDifferent(cards, {
        property: 'suit',
        returnDetail,
        wildcard
    });
}

export default AreDifferentSuits;