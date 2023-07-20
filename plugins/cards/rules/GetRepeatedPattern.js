var GetRepeatedPattern = function (cards, config) {
    var {
        property,
        returnDetail = false,
    } = config;

    var symbolCount = {};
    for (var i = 0, cnt = cards.length; i < cnt; i++) {
        var card = cards[i];
        var cardValue = card[property];
        if (!symbolCount.hasOwnProperty(cardValue)) {
            symbolCount[cardValue] = 1;
        } else {
            symbolCount[cardValue]++;
        }
    }

    var cardCopy = [...cards];
    cardCopy.sort(function (cardA, cardB) {
        var valueA = cardA[property];
        var valueB = cardB[property];
        var symbolCountValueA = symbolCount[valueA];
        var symbolCountValueB = symbolCount[valueB];

        if (symbolCountValueA > symbolCountValueB) {
            return -1;
        }

        if (symbolCountValueA < symbolCountValueB) {
            return 1;
        }

        // The same symbolCount
        if (valueA > valueB) {
            return -1;
        }
        if (valueA < valueB) {
            return 1;
        }

        return 0;
    });

    var prevPattern = 'A';
    var prevValue = cardCopy[0][property];
    var patterns = [prevPattern];
    for (var i = 1, cnt = cardCopy.length; i < cnt; i++) {
        var card = cardCopy[i];
        var cardValue = card[property];

        if (cardValue !== prevValue) {
            prevPattern = String.fromCharCode(prevPattern.charCodeAt(0) + 1);
            prevValue = cardValue;
        }

        patterns.push(prevPattern);
    }

    var pattern = patterns.join('');

    if (returnDetail) {
        return {
            property: property,
            pattern: pattern,
            cards: cardCopy
        }
    } else {
        return pattern;
    }
}

export default GetRepeatedPattern;