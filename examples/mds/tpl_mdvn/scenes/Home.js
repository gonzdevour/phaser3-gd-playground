import Base from "./Base.js";
import initMasterScene from "../gdk/scene/InitMasterScene.js";
import { DefaultAppConfig } from "../settings/DefaultData.js";

//map
import map from "../scripts/map.js";

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
    var camera = this.cameras.main;
    camera.scrollX = 500

    var dragScale = scene.rexGestures.add.pinch(this);
    dragScale
        .on('drag1', function (dragScale) {
            var drag1Vector = dragScale.drag1Vector;
            camera.scrollX -= drag1Vector.x / camera.zoom;
            camera.scrollY -= drag1Vector.y / camera.zoom;
        })
        .on('pinch', function (dragScale) {
            var scaleFactor = dragScale.scaleFactor;
            camera.zoom *= scaleFactor;
        }, this)

    camera.setBackgroundColor('#66ccff');
    map.forEach(place => {
      scene.add.image(place.x, place.y, place.key)
      console.log(place.key)
    });

    var mds = CreateMds(scene, memory, scene.cache.text.get("mdsSheets"));
    var mdsControlButtons = CreateMdsControlButtons(scene, mds);
    mds.startGroup("歷史事件");

    // scene.input.on('pointerup', function(pointer){
    //     console.log(mds.getData('coin'));
    // },scene)

    scene.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event){
        //滾輪向上dy為負值，向下dy為正值
        console.log(`--dx:${dx},dy:${dy},dz:${dz}, `);
        //向上減，向下加
        mds.incData('coin', 2*Math.sign(dy))
        console.log(mds.getData('coin'));
    },scene)

    // setInterval(() => {
    //     console.log(mds.getData('coin'));
    // }, 1000); // 间隔1000毫秒，即每秒执行一次

  }
}

export default Home;
