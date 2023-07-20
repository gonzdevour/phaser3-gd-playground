var AreDifferent = function (cards, property, returnDetail) {
    var output = {
        property: property
    };

    if (cards.length === 0) {
        output.result = false;
        output.catch = [];
        return (returnDetail) ? output : false;
    }

    var targetValues = {};
    for (var i = 0, cnt = cards.length; i < cnt; i++) {
        var card = cards[i];
        var targetValue = card[property];
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