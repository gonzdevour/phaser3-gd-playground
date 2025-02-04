import LocalStorageData from '../../../../phaser3-rex-notes/plugins/localstorage-data.js';
import { DefaultLSData, DefaultAppConfig } from '../settings/DefaultData.js';

var CreateLsData = function () {
  //初始化建立ls(lsd plugin而不是純ls)，如果default:undefined會存入所有ls key-content。
  //否則會依預設值的key存入原本在ls內的值，有key無值時存入預設值。
  var lsData = new LocalStorageData({
    name: DefaultAppConfig.appID,
    default: DefaultLSData, //以defaultData中的key為索引，有值時略過，無值時存入該value為預設值
    reset: DefaultAppConfig.cleanLocalStorage, //初始化時重設lsData為DefaultData，正式版要記得關掉
  })
  return lsData;
}

export default CreateLsData;
