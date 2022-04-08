/**
 * detect if the array contains the object by properties(not by specific object)
 * @param {array} array - The array to be added to.
 * @param {object} [context] - The context in which the callback is invoked.
 *
 * @return {number} 1(contained) | -1(not contained). Make it looks like 'indexOf' return.
 */

let ObjIfValueEqual = require('../object/ObjIfValueEqual.js') //true|false 兩個物件即使屬性完全相同也不會相等，所以需要以屬性判斷是否相等的函式

var ArrIfContain = function(item, arrayToSearch){
    var out = [];
    arrayToSearch.forEach(function(element, index, array){
        //console.log(element);
        //console.log(item);
        if (ObjIfValueEqual(element, item)) {
            //console.log('相等');
            out.push(item);
        } else {
            //console.log('不相等');
        }
    })
    if (out.length > 0) {
        return 1
    } else {
        return -1;
    }
};

module.exports = ArrIfContain;
