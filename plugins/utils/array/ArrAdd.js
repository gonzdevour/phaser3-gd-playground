/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Adds the given item, or array of items, to the array.
 *
 * Each item must be unique within the array.
 *
 * The array is modified in-place and returned.
 *
 * You can optionally specify a limit to the maximum size of the array. If the quantity of items being
 * added will take the array length over this limit, it will stop adding once the limit is reached.
 *
 * You can optionally specify a callback to be invoked for each item successfully added to the array.
 *
 * @function Phaser.Utils.Array.Add
 * @since 3.4.0
 *
 * @param {array} array - The array to be added to.
 * @param {any|any[]} item - The item, or array of items, to add to the array. Each item must be unique within the array.
 * @param {number} [limit] - Optional limit which caps the size of the array.
 * @param {function} [callback] - A callback to be invoked for each item successfully added to the array.
 * @param {object} [context] - The context in which the callback is invoked.
 *
 * @return {array} The input array.
 */
var ArrAdd = function (array, item, limit, callback, context)
{
    if (context === undefined) { context = array; }

    if (limit > 0) //如果個數上限大於0，上限數 - 目標array數 = 剩餘空間數(還可以添加幾個item)
    {
        var remaining = limit - array.length;

        if (remaining <= 0)//如果沒有剩餘空間就不處理
        {
            return null;
        }
    }

    if (!Array.isArray(item)) //第一回合：傳入的item不是array
    {
        if (array.indexOf(item) === -1) //如果item不存在array裡，則存入此item
        {
            array.push(item);

            if (callback)
            {
                callback.call(context, item);
            }

            return item;
        }
        else
        {
            return null;
        }
    }

    var itemLength = item.length - 1; //第二回合：傳入的item是array

    while (itemLength >= 0) //逐一檢查item中的每個element是否重複
    {
        if (array.indexOf(item[itemLength]) !== -1)
        {
            item.splice(itemLength, 1); //若重複則剔除
        }

        itemLength--;
    }

    itemLength = item.length; //剔除完成後，要把剩下的item array加入array

    if (itemLength === 0) //如果剔除完成後item array什麼都不剩，則回傳null
    {
        return null;
    }

    if (limit > 0 && itemLength > remaining) //如果剩下的item array個數比剩餘空間多
    {
        item.splice(remaining);//把item array多出來的裁掉，讓item array的個數等於剩餘空間數

        itemLength = remaining;
    }

    for (var i = 0; i < itemLength; i++) //將剩下的item array存入array裡
    {
        var entry = item[i];

        array.push(entry);

        if (callback)
        {
            callback.call(context, entry);
        }
    }

    return item;
};

module.exports = ArrAdd;
