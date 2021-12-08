var GetCombinedRhyme = function (out) {
    if (out === undefined) {
        out = {};
    }

    //複合韻 = media不是空值，vowel也不是空值
    //$ne: not equal to
    out.media = { '$ne': '' };
    out.vowel = { '$ne': '' };

    return out;
}

export default GetCombinedRhyme;