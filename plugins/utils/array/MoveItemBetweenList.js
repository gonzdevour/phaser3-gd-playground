/**
 * remove item form list A and add same item to list B. 
 * @param {array} fromList - The array to remove item from.
 * @param {array} toList - The array to add item.
 * @param {object} item - The item to be moved.
 */

let ArrAdd = require('./ArrAdd.js');//array push內容不重複的item
let ArrRemove = require('./ArrRemove.js');//array remove item(s)
//import ArrAddOrUpdateItemIfKeyExist from "./ArrAddOrUpdateItemIfKeyExist.js";//傳入object，如果array中物件的indexKey重複則update，未重複則push
//import ArrRemoveItemIfKeyExist from "./ArrRemoveItemIfKeyExist.js";//傳入object，如果array中物件的indexKey重複則remove

var MoveItemBetweenList = function(fromList,toList,item){
    ArrAdd(toList, item);
    ArrRemove(fromList, item);
    return item;
}

module.exports = MoveItemBetweenList;
