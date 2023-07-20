import { Wildcard } from '../Const.js';

var AreDifferent = function (cards, config) {
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

    var cardCopy = [...cards];
    // Put wildcard at end of cards
    cardCopy.sort(function (cardA, cardB) {
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
    for (var i = 0, cnt = cardCopy.length; i < cnt; i++) {
        var card = cardCopy[i];
        var cardValue = card[property];

        // Skip wildcard
        if (cardValue === wildcard) {
            continue;
        }

        if (targetValues[cardValue]) {
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
        targetValues[cardValue] = true;
    }

    if (returnDetail) {
        return {
            property: property,
            result: true,
            cards: [...cards],
        }
    } else {
        return true;
    }
}

export default AreDifferent;