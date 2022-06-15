/**
 * remove any item with specific key-value form list A and add a same item to list B. 
 * @param {array} fromList - The array to remove item from.
 * @param {array} toList - The array to add item.
 * @param {object} item - The item to be moved.
 * @param {string} indexKey - The key to detect if any item with same property.
 */

let ArrAdd = require("./ArrAdd.js");
let ArrRemoveItemIfKeyExist = require("./ArrRemoveItemIfKeyExist.js");//傳入object，如果array中物件的indexKey重複則remove

var UpdateItemBetweenListByKey  = function(fromList,toList,item,indexKey){
    //在兩個list裡，移除所有指定key-value相同的item
    ArrRemoveItemIfKeyExist(fromList, item, indexKey);
    ArrRemoveItemIfKeyExist(toList, item, indexKey);
    //在toList裡新增item
    ArrAdd(toList, item);
    return item;
}

module.exports = UpdateItemBetweenListByKey ;
