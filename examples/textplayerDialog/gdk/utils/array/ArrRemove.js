/**
 * @param {array} array - The array to be remove from.
 * @param {any|any[]} item - The item, or array of items, ref to remove from the array.
 * @param {function} [callback] - A callback to be invoked for each item successfully removed to the array.
 * @param {object} [context] - The context in which the callback is invoked.
 *
 * @return {array} The input array.
 */
let ObjIfValueEqual = require('../object/ObjIfValueEqual.js');

var ArrRemove = function (array, item, callback, context)
{
    if (context === undefined) { context = array; }

    if (!Array.isArray(item)) //第一回合：傳入的item不是array
    {
        var itemsToRemove = [];
        array.forEach(function(element,idx,arr){
            if (ObjIfValueEqual(element, item)){
                itemsToRemove.push(idx)
            }
        });
        removeFromArrayByIndexArray(array, itemsToRemove, callback, context);

        return array;
    }

    var itemLength = item.length - 1; //第二回合：傳入的item是array

    var itemsToRemove = [];
    while (itemLength >= 0) //逐一檢查item array中的每個item是否在目標array中重複，將目標array中重複的element加入刪除列表
    {
        array.forEach(function(element,idx,arr){
            if (item[itemLength] == element){
                itemsToRemove.push(idx)
            }
        });
        itemLength--;
    }
    removeFromArrayByIndexArray(array, itemsToRemove, callback, context);

    return array;
};

var removeFromArrayByIndexArray = function(array, indexArray, callback, context){
    for (var i = indexArray.length -1; i >= 0; i--){ //反向loop，讓splice從後面刪到前面，順序才不會出錯
        array.splice(indexArray[i],1);

        if (callback)
        {
            callback.call(context, indexArray[i]);
        }
    }    
};

module.exports = ArrRemove;
