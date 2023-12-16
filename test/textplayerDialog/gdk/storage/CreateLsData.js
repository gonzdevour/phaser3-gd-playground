import LocalStorageData from '../../../../../phaser3-rex-notes/plugins/localstorage-data.js';
import AppLang from '../../../../plugins/utils/language/AppLang.js';
import DeviceLang from '../../../../plugins/utils/language/DeviceLang.js';

var CreateLsData = function (appID, defaultLSData, IfCleanStorage) {

  if (typeof(appID) !== 'string'){
    appID = 'playoneapptest';
  }

  if (typeof(defaultLSData) !== 'object'){
    defaultLSData = {};
  }

  if (typeof(IfCleanStorage) !== 'boolean'){
    IfCleanStorage = false;
  }

  var config = {
    appID: appID,
    appLang: DeviceLang(),
    appLangAlias: AppLang(),
  }

  var initLSData = Object.assign(
    {},
    defaultLSData,
    config,
  );

  //初始化建立ls(lsd plugin而不是純ls)，如果default:undefined會存入所有ls key-content。
  //否則會依預設值的key存入原本在ls內的值，有key無值時存入預設值。
  var lsData = new LocalStorageData({
    name: appID,
    default: initLSData, //以defaultData中的key為索引，有值時略過，無值時存入該value為預設值
    reset: IfCleanStorage, //初始化時是否重設lsData為DefaultData
  })

  return lsData;
}

export default CreateLsData;
