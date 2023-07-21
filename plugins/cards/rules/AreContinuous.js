import { Wildcard } from '../Const.js';

var AreContinuous = function (cards, config) {
    var {
        property,
        wildcard = Wildcard,
        returnDetail = false
    } = config;

    if (cards.length === 0) {
        if (returnDetail) {
            return {
                property: property,
                result: false,
                catch: [],
            }
        } else {
            return false;
        }
    }

    var wildcardCards = cards.filter(function (card) {
        return card[property] === wildcard;
    });

    // cards does not have any wildcard card now
    cards = cards.filter(function (card) {
        return card[property] !== wildcard;
    });

    cards.sort(function (cardA, cardB) {
        var valueA = cardA[property];
        var valueB = cardB[property];

        if (valueA > valueB) {
            return 1;
        }
        if (valueA < valueB) {
            return -1;
        }
        return 0;
    });

    var referenceCards = [cards[0]];
    var targetValue = cards[0][property] + 1;
    for (var i = 1, cnt = cards.length; i < cnt; i++) {
        var card = cards[i];
        var cardValue = card[property];

        if (cardValue === targetValue) {
            referenceCards.push(card);
            targetValue++;
            continue;
        }

        // Not continuous
        if (wildcardCards.length > 0) {
            // Use one wildcard card
            referenceCards.push(wildcardCards.pop());
            targetValue++;

            if (cardValue === targetValue) {
                referenceCards.push(card);
                targetValue++;
                continue;
            }
        }

        if (returnDetail) {
            return {
                property: property,
                result: false,
                catch: [card],
            }
        } else {
            return false;
        }
    }

    if (returnDetail) {
        return {
            property: property,
            result: true,
            cards: referenceCards,
        }
    } else {
        return true;
    }
}

export default AreContinuous;