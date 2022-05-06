import CreateLsData from "./CreateLsData";
import CreateAppData from "./CreateAppData";
import CreateLocalization from "./CreateLocalization";

var ToolsPrepare = function (scene) {
  scene.lsData = CreateLsData();
  scene.appData = CreateAppData(scene.lsData);
  scene.localization = CreateLocalization(scene.lsData);
  scene.api = {}; //在loading中讀完後處理為scene.game.api
  return scene;
}

export default ToolsPrepare;
