var idGen = function () {
    window.idGenStartNumber = window.idGenStartNumber?window.idGenStartNumber:Date.now();
    window.idGenStartNumber++;
    return window.idGenStartNumber.toString();
};

module.exports = idGen;
