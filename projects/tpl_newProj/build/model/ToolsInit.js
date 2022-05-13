import PrebuildDB from "../../model/prebuilddb/PrebuildDB";
import CreateModel from "./CreateModel";

var ToolsInit = function (scene) {
  var db0 = PrebuildDB(scene.cache.text.get('db0'));
  var db1 = PrebuildDB(scene.cache.text.get('db1'));
  var loccsv = scene.cache.text.get('localization');
  //create model
  scene.model = CreateModel({
    db: [db0, db1],
    lsData: scene.lsData,
    appData: scene.appData,
    rtt: scene.rtt,
    localization: scene.localization.loadCSV(loccsv)
  });
  //init
  //api讀取完成後執行初始化。為了控制scene.game.api的數值(例如已儲存的語系和音量)所以要帶scene
  scene.model.appData.initAPI(scene);
  //遊戲數值初始化
  scene.model.appData.initGame();
  return scene;
}

export default ToolsInit;
