var GetURL = function (path, relatedPathFrom) {
    if (relatedPathFrom !== '') {
        path = path.replace(relatedPathFrom, '');
    }
    return path.replace(/\\/gi, '/').replace(/^(\/)/,'');
}

module.exports = GetURL;