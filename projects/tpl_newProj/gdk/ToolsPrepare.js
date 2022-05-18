import CreateLsData from "./CreateLsData";
import CreateAppData from "./CreateAppData";
import CreateLocalization from "./CreateLocalization";
import CreateRTTimers from "./CreateRTTimers";
import CreateNRTTimers from "./CreateNRTTimers";
import CreateMsgQueue from "./CreateMsgQueue";

//scene.game在preload時才會存在，所以這條必須放在preload
var ToolsPrepare = function (scene) {
  var lsData = CreateLsData();
  scene.game.lsData = lsData;
  scene.game.appData = CreateAppData(lsData);
  scene.game.localization = CreateLocalization(lsData);
  scene.game.msgQ = CreateMsgQueue('main',lsData);
  scene.game.rttimer = CreateRTTimers('rttimer',lsData, scene.game.msgQ);
  scene.game.storytimer = CreateNRTTimers('storytimer', lsData, scene.game.msgQ, Date.now());
  scene.game.api = {};
  return scene;
}

export default ToolsPrepare;
