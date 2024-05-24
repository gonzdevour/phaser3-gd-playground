import Base from "./Base.js";
import initMasterScene from "../gdk/scene/InitMasterScene.js";
import { DefaultAppConfig } from "../settings/DefaultData.js";
//camera
import CameraDragScroll from "../gdk/camera/CameraDragScroll.js";
import CameraWheelZoom from "../gdk/camera/CameraWheelZoom.js";
//map
import CreateMap from "../scripts/CreateMap.js";
//mds
import CreateMds from "../scripts/CreateMds.js";
import CreateMdsControlButtons from "../scripts/CreateMdsControlButtons.js";
import GetMdsSheets from "../scripts/GetMdsSheets.js";
import { memory } from '../scripts/memory.js'
//date
import { DateTime, Duration, Interval } from "luxon";

class Home extends Base {
  constructor() {
    super({
      key: DefaultAppConfig.sceneKey.Home,
    });
  }
  init() {
    initMasterScene(this);
  }
  preload() {
    var scene = this;
    scene.load.rexAwait(function (successCallback, failureCallback) {
      GetMdsSheets(scene, "local", true).then((sheetsData) => { //online||local, ifShowThrobber
        console.log(sheetsData);
        scene.cache.text.add("mdsSheets", sheetsData);
        successCallback();
      });
    });
  }
  create() {
    var scene = this;
    var camMain = scene.cameras.main;
        camMain.setBackgroundColor('#66ccff');
    CameraDragScroll(scene);//camMain.enableDragScroll = true/false
    CameraWheelZoom(scene); //camMain.enableWheelZoom = true/false

    var map = CreateMap(scene);

    var mds = CreateMds(scene, "story", memory, scene.cache.text.get("mdsSheets"));
    var mdsControlButtons = CreateMdsControlButtons(scene, mds);
    mds.startGroup("歷史事件");

    scene.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event){
        //滾輪向上dy為負值，向下dy為正值
        //console.log(`--dx:${dx},dy:${dy},dz:${dz}, `);
        //向上減，向下加
        mds.incData('coin', 2*Math.sign(dy))
        //console.log(mds.getData('coin'));
    },scene)

  }
}

export default Home;
