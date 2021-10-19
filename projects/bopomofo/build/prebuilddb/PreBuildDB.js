import PrebuildDB from '../../model/prebuilddb/PrebuildDB';
import DBToFile from '../../model/prebuilddb/DBToFile';
import { CompressionMode } from '../../model/prebuilddb/Const.js'

const GetValue = Phaser.Utils.Objects.GetValue;

var PreBuildDB = function (config) {
    var csvStrings = GetValue(config, 'csv', '');
    var fileName = GetValue(config, 'fileName', 'bopomofo');

    var db = PrebuildDB(csvStrings)
    DBToFile(db, `${fileName}.json`, false);
    DBToFile(db, `${fileName}.compress`, CompressionMode);
}

export default PreBuildDB;