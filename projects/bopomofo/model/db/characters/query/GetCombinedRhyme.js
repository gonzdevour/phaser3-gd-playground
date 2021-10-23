var GetCombinedRhyme = function (out) {
    if (out === undefined) {
        out = {};
    }

    out.media = { '$ne': '' };
    out.vowel = { '$ne': '' };

    return out;
}

export default GetCombinedRhyme;