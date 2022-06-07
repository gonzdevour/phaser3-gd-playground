let IsPlainObject = require('./IsPlainObject.js');

var IsPlainObjectArray = function (objArray)
{
    var result = true;
    if ( Array.isArray(objArray) ){
        objArray.forEach(function(obj, idx, arr){
            if (!IsPlainObject(obj)){
                result = false;
            }
        });
    } else {
        result = false;
    }

    return result;
};

module.exports = IsPlainObjectArray;
