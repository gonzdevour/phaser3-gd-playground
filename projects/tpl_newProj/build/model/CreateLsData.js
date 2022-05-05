import LocalStorageData from '../../../../../phaser3-rex-notes/plugins/localstorage-data.js';
import { DefaultData } from '../../model/DefaultData.js';

var CreateLsData = function () {
  var lsData = new LocalStorageData({
    name: DefaultData.appID,
    default: DefaultData, //以defaultData中的key為索引，有值時略過，無值時存入該value為預設值
    reset: DefaultData.cleanLocalStorage, //初始化時重設lsData為DefaultData，正式版要記得關掉
  })
  return lsData;
}

export default CreateLsData;
