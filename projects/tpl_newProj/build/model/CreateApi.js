import TableManager from '../../model/table/TableManager.js';
import DialogQueue from '../view/modaldialog/DialogQueue.js';

//utils
import GetValue from '../../../../plugins/utils/object/GetValue.js';

var CreateApi = function (scene) {
  scene.game.api = {};
  var api = scene.game.api;
  //將api控制權交給model。因為各api有可能在測試時不存在，所以必須做undefined處理。
  //因為new appData會同時控制api參數，所以必須在new AppData之前建立
  var apiList = scene.api;
  api.browser = GetValue(apiList, 'iab', undefined);//初始化iab
  api.speech = GetValue(apiList, 'speech', undefined);//初始化語音
  api.sound = GetValue(apiList, 'sound', undefined); //初始化音效

  //建立基於lsData的dialog依序彈出機制
  //api.dialogQueue = new DialogQueue(model.lsData);

  return scene;
}

export default CreateApi;
