var AreContinuous = function (cards, config) {
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

    var wildcardCards = cards.filter(function (card) {
        return card[property] === wildcard;
    });

    // cards does not have any wildcard card now
    cards = cards.filter(function (card) {
        return card[property] !== wildcard;
    });

    cards.sort(function (cardA, cardB) {
        var valueA = parseInt(cardA[property]);
        var valueB = parseInt(cardB[property]);

        if (valueA > valueB) {
            return 1;
        }
        if (valueA < valueB) {
            return -1;
        }
        return 0;
    });

    var targetValue = parseInt(cards[0][property]) + 1;
    for (var i = 1, cnt = cards.length; i < cnt; i++) {
        var card = cards[i];

        if (parseInt(card[property]) === targetValue) {
            targetValue++;
            continue;
        }

        // Not continuous
        if (wildcardCards.length > 0) {
            // Use one wildcard card
            wildcardCards.length --;
            targetValue++;
            continue;
        }

        // No wildcard card
        output.result = false;
        output.catch = [card];
        return (returnDetail) ? output : false;
    }

    output.result = true;
    output.catch = null;
    return (returnDetail) ? output : true;
}

export default AreContinuous;