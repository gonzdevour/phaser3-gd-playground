import PrebuildDB from '../../model/prebuilddb/PrebuildDB';
import DBToFile from '../../model/prebuilddb/DBToFile';
import { CompressionMode } from '../../model/prebuilddb/Const.js'

//utils
import GetValue from '../../../../plugins/utils/object/GetValue.js';

//在build-db.js被呼叫，將csv重組後建立db並壓縮後另存為.compress檔，提供boot scene讀入
//※注意PrebuildDB相關功能雖然屬於model資料夾，但methods並未納入model物件下。
var PreBuildDB = function (config) {
    var csvString = GetValue(config, 'csv', '');
    var fileName = GetValue(config, 'fileName', 'bopomofo');

    var db = PrebuildDB(csvString)
    DBToFile(db, `${fileName}.json`, false);
    DBToFile(db, `${fileName}.compress`, CompressionMode);
}

export default PreBuildDB;