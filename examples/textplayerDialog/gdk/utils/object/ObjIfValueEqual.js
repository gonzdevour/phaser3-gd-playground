/**
 * @param {object} element - obj1 to compare.
 * @param {object} item - obj2 to compare.
 *
 * @return {boolean} properties equal or not.
 */

var ObjIfValueEqual = function(element, item) { //true|false 兩個物件即使屬性完全相同也不會相等，所以需要以屬性判斷是否相等的函式
    return Object.keys(element).every(key => item.hasOwnProperty(key) && item[key] === element[key]);
}

module.exports = ObjIfValueEqual;
