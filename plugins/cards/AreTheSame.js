var AreTheSame = function (cards, property, returnDetail) {
    var output = {
        property: property
    };

    if (cards.length === 0) {
        output.result = false;
        output.catch = [];
        return (returnDetail) ? output : false;
    }

    var targetValue = cards[0][property];
    for (var i = 1, cnt = cards.length; i < cnt; i++) {
        var card = cards[i];
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