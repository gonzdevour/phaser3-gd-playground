/**
 * @param {array} array - The array may contains object(s) with specific key-value.
 * @param {any} key - key.
 * @param {any} value - value.
 * @return {object} result - object array which contains the key-value.
 */
var GetObjByKeyValue = function (array, key, value)
{
    var result = [];
    array.forEach(function(element,idx,arr){
        if (element[key] == value){
            result.push(element);
        }
    });
    return result;
};

module.exports = GetObjByKeyValue;
