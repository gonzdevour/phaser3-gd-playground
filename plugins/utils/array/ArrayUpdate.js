/**
 * @function ArrayUpdate - update element value of array if indexKey exist, or push new object into array. 
 * @param {array} array - The array to be added/updated to.
 * @param {object} item - JSON object to add/update.
 * @param {string} indexKey - Unique key of each object in the array.
 *
 * @return {array} The updated array.
 */
var ArrayUpdate = function (array, item, indexKey)
{
    if (!Array.isArray(item)) //傳入的item不是array
    {
        var elementToUpdateCnt = 0;
        array.forEach(function(element){
            if (item[indexKey] == element[indexKey]){
                element = Object.assign({},item); //如果item與查到的element有相同的indexKey，則更新此element
                elementToUpdateCnt++;
            }
        });

        if (elementToUpdateCnt == 0){
            array.push(item); //如果item在目標array中找不到任何element有相同的indexKey，則新增item給array
        }
    }
    return array;
};

module.exports = ArrayUpdate;
