var AreTheSame = function (cards, config) {
    var {
        property,
        wildcard = '*',
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

    var targetValue = cards[0][property];
    for (var i = 1, cnt = cards.length; i < cnt; i++) {
        var card = cards[i];

        // Skip wildcard
        if (card[property] === wildcard) {
            continue;
        }

        if (card[property] !== targetValue) {
            output.result = false;
            output.catch = [card];
            return (returnDetail) ? output : false;
        }
    }

    output.result = true;
    output.catch = null;
    return (returnDetail) ? output : true;
}

export default AreTheSame;