import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';
import { DefaultAppConfig } from '../settings/DefaultData.js';
//scripts
import CreateParallelBackgrounds from '../scripts/CreateParallelBackgrounds.js';
import CreateQMaster from '../scripts/CreateQMaster.js';
import StartQuiz from '../scripts/StartQuiz.js';
//utils
import zoomFrom from '../gdk/viewport/zoomFrom.js';
import { Delay } from 'rexnotePlugins/eventpromise.js';

class Home extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
    }
    init(){
        initMasterScene(this);
    }
    preload(){
        var scene = this;
        scene.load.text('questions','https://docs.google.com/spreadsheets/d/e/2PACX-1vQjdECX4kOj4uvdr_5w7iP5P8h-7m1QBr5XoOXy7Hn6PpAsSXtqPBwrc94uvBOzWOPUB7q7TSciAKku/pub?gid=0&single=true&output=csv')
        scene.load.text('introHeroes', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQzW9q8TTKhWlHxsi4PnhSpwo3PacMcZRX6O_YURwbQ7N6hAqRZgMwsRXg6ilakRLkBAt381wM1jvv6/pub?gid=1348914508&single=true&output=csv')
        scene.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');
        //scene.load.rexLive2d('Haru', 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Live2D/Senko_Normals/senko.model3.json')
        scene.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
        scene.load.json('pkg', 'https://api.github.com/repos/Eikanya/Live2d-model/git/trees/master')
    }
    create() {
        var scene = this;
        //console.log(JSON.stringify(this.cache.json.get('pkg')));

        //建立背景
        var bgSet = CreateParallelBackgrounds(this, this.viewport.centerX, this.viewport.centerY, 'bgSetForestZ', 6);
        this.layerManager.addToLayer('bg', bgSet);

        //安排流程

        //建立scenario
        var director;
        launchStoryScene(scene)
            .then(function(storyScene){
                console.log('story init')
                director = storyScene.scenario.director;
                return director.init()
            })
            .then(function(){
                console.log('story start')
                return director.start('範例')
            })
            .then(function(){
                scene.scene.pause('Story'); //刪除scenario專用scene，這樣clickArea才不會蓋住問答UI
                console.log('game init')
                return gameInit(scene);
            })
            .then(function(){
                scene.scene.resume('Story'); //刪除scenario專用scene，這樣clickArea才不會蓋住問答UI
                console.log('game complete')
                return director.start('鑒定結果')
            })
    }
}

var launchStoryScene = async function(mainScene){
    await Delay(0);//等待淡入?
    mainScene.scene.launch(DefaultAppConfig.sceneKey.Story, 'data2Pass');
    var storyScene = mainScene.scene.get(DefaultAppConfig.sceneKey.Story)
    return new Promise(function(resolve, reject){
        storyScene.events.once('scenarioCreated', function(){
            console.log('story scene is launched')
            resolve(storyScene);
        });
    })
}

var gameInit = async function(scene){
    CameraGo(scene); //鏡頭控制
    scene.qMaster = CreateQMaster(scene); //建立textplayer
    var char = scene.qMaster.char;
    var touchArea = scene.qMaster.touchArea;
    char.setVisible(true);
    EnableLive2DEyeTracking(scene, char, touchArea, true)
    await Delay(3000);
    scene.qMaster.setVisible(true);
    return StartQuiz(scene, scene.qMaster); //啟動問答
}

var CameraGo = function(scene){
    //scene.rexScaleOuter.stop().scale(); //停止scaleOuter plugin在進入scene時的那一次自動scale()，讓create時camera.scroll能正常運作
    //scene.time.delayedCall(delay, callback, args, scope); //也可以create後等待0ms再執行
    zoomFrom(scene, 0.9, 3000);//cam縮放
    scene.cameras.main.stopFollow();
    scene.center.setPosition(scene.center.x, scene.center.y+300)//cam從下方lerp+back上移
    scene.cameras.main.setScroll(scene.center.x, scene.center.y);
    scene.cameras.main.startFollow(scene.center, true, 0.5, 0.5);
    scene.tweens.add({
        targets: scene.center,
        y: '-=300',
        ease: 'back-easeOutIn',
        duration: 2000,
        //yoyo: true,
        //repeat: -1,
    })
}

var EnableLive2DEyeTracking = function(scene, live2DCharacter, live2DTouchArea, isCamTracking){
    var pointer = scene.input.activePointer;
    var centerObject = scene.center; //CreateCameraCenter(scene)
    var backX = scene.viewport.centerX;
    var backY = scene.viewport.centerY;
    if (isCamTracking == undefined){
        isCamTracking = false;
    }
    var live2DEyeTracking = function(){
        //console.log('is in touch')
        if (isCamTracking){
            centerObject.moveTo({x:pointer.worldX, y:pointer.worldY, ease: 'linear', speed: 300});
        }
        live2DCharacter.lookAt( pointer.worldX, pointer.worldY, {
            // camera: scene.cameras.main,
            // eyeBallX: 1, eyeBallY: 1,
            // angleX: 30, angleY: 30, angleZ: 30,
            // bodyAngleX: 10
        })
    }
    var live2DEyeTrackingEnd = function(){
        //console.log('on touching end')
        if (isCamTracking){
            centerObject.moveTo({x:backX, y:backY, ease: 'linear', speed: 600});
        }
        live2DCharacter.lookForward();
    }
    live2DTouchArea.onTouching(live2DEyeTracking)
    live2DTouchArea.onTouchingEnd(live2DEyeTrackingEnd)
    live2DTouchArea.on('destroy', function() {
        live2DTouchArea.offTouching(live2DEyeTracking)
        live2DTouchArea.offTouchingEnd(live2DEyeTrackingEnd)
    })
}

export default Home;