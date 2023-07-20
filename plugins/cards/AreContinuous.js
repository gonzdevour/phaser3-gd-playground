var AreContinuous = function (cards, property, returnDetail) {
    var output = {
        property: property
    };

    if (cards.length === 0) {
        output.result = false;
        output.catch = [];
        return (returnDetail) ? output : false;
    }

    var sordCards = [...cards];
    sordCards.sort(function (cardA, cardB) {
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

    var targetValue = parseInt(sordCards[0][property]) + 1;
    for (var i = 1, cnt = sordCards.length; i < cnt; i++) {
        var card = sordCards[i];
        if (parseInt(card[property]) !== targetValue) {
            output.result = false;
            output.catch = [card];
            return (returnDetail) ? output : false;
        }

        targetValue++;
    }

    output.result = true;
    output.catch = null;
    return (returnDetail) ? output : true;
}

export default AreContinuous;