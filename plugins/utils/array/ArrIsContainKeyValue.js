/**
 * @param {array} array - The array may contains the key-value.
 * @param {any} key - key.
 * @param {any} value - value.
 * @return {boolean} result - array contains key-value or not.
 */
var ArrIfContainKeyValue = function (array, key, value)
{
    var result = false;
    array.forEach(function(element,idx,arr){
        if (element[key] == value){
            result = true;
        }
    });
    return result;
};

module.exports = ArrIfContainKeyValue;
