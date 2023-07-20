import { Wildcard } from '../Const.js';

var AreDifferent = function (cards, config) {
    var {
        property,
        wildcard = Wildcard,
        returnDetail = false
    } = config;

    var output = {
        property: property
    };

    if (cards.length === 0) {
        output.result = false;
        output.catch = [];
        return (returnDetail) ? output : false;
    }

    // Put wildcard at end of cards
    cards.sort(function (cardA, cardB) {
        var valueA = cardA[property];
        var valueB = cardB[property];

        if (valueA === wildcard) {
            return 1;
        }
        if (valueB === wildcard) {
            return -1;
        }
        return 0;
    });

    var targetValues = {};
    for (var i = 0, cnt = cards.length; i < cnt; i++) {
        var card = cards[i];
        var targetValue = card[property];

        // Skip wildcard
        if (targetValue === wildcard) {
            continue;
        }

        if (targetValues[targetValue]) {
            output.result = false;
            output.catch = [card];
            return (returnDetail) ? output : false;
        }
        targetValues[targetValue] = true;
    }

    output.result = true;
    output.catch = null;
    return (returnDetail) ? output : true;
}

export default AreDifferent;