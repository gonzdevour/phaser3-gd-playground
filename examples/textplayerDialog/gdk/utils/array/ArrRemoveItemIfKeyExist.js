/**
 * remove element of array if indexKey exist. 
 * @param {array} array - The array to be added/updated to.
 * @param {object} item - JSON object to add/update.
 * @param {string} indexKey - Unique key of each object in the array.
 * @return {array} The updated array.
 */

var ArrRemoveItemIfKeyExist = function (array, item, indexKey)
{
    var entriesToRemove = [];
    array.forEach(function(element,idx,arr){
        if (item[indexKey] == element[indexKey]){
            entriesToRemove.push(idx)
        }
    });

    for (var i = entriesToRemove.length -1; i >= 0; i--) //反向loop，讓splice從後面刪到前面，順序才不會出錯
    array.splice(entriesToRemove[i],1);

    return array;
};

module.exports = ArrRemoveItemIfKeyExist;
