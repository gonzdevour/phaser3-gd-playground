import Base from './Base.js';
import { DefaultAppConfig } from '../settings/DefaultData.js';
//scripts
import CreateScenario from '../gdk/ScenarioDirector/CreateScenario.js';
import CreateParallelBackgrounds from '../scripts/CreateParallelBackgrounds.js';
import CreateQMaster from '../scripts/CreateQMaster.js';
import StartQuiz from '../scripts/StartQuiz.js';
import eyeTracking from '../scripts/eyeTracking.js';
//utils
import zoomFrom from '../gdk/viewport/zoomFrom.js';
import { Delay } from '../../../../phaser3-rex-notes/plugins/eventpromise.js';

class Home extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
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

        //console.log(JSON.stringify(this.cache.json.get('pkg')));

        //建立背景
        var bgSet = CreateParallelBackgrounds(this, this.viewport.centerX, this.viewport.centerY, 'bgSetForestZ', 6);
        this.layerManager.addToLayer('bg', bgSet);

        //播放故事
        this.scenario = CreateScenario(this) //x,y,maxWidth,maxHeight
        this.scenario.load(this.cache.text.get('story'), this.scenario.director, {timeUnit: 'sec'});


        var director = this.scenario.director;
        director.start('範例')
            .then(function(){
                console.log('scenario promise complete')
                return gameInit();
            })
            .then(function(){
                console.log('game complete')
            })
        
        //啟動問答
        var scene = this;
        var gameInit = async function(){
            //鏡頭控制
            scene.rexScaleOuter.stop().scale();//停止scaleOuter plugin在進入scene時的那一次自動scale()，讓create時camera.scroll能正常運作
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

            scene.qMaster = CreateQMaster(scene); //建立textplayer
            scene.qMaster.char.setVisible(true);
            await Delay(3000);
            scene.qMaster.setVisible(true);
            return StartQuiz(scene, scene.qMaster);
        }

    }

    update(){
        //eyeTracking(this);
    }
}

export default Home;