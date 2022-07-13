import phaser from 'phaser/src/phaser.js';
import Base from './Base.js';
import AllPlugins from '../../plugins/AllPlugins.js';
//gdk
import LoadingProgressUI from './gdk/loading/LoadingProgressUI.js';
//proj
import CreateTextplayer from './CreateTextplayer.js';
import CreateParallelBackgrounds from './CreateParallelBackgrounds.js';
import StartQuiz from './StartQuiz.js';
//utils
import zoomFrom from '../../plugins/utils/viewport/zoomFrom.js';
import panFrom from '../../plugins/utils/viewport/panFrom.js';
import loadImageFromUrl from '../../plugins/utils/image/loadImageFromUrl.js';
import GetValue from '../../plugins/utils/object/GetValue.js';
import eyeTracking from './eyeTracking.js';

const cors = window.location.hostname == 'localhost'?'https://cors-anywhere-playone.herokuapp.com/':'';

class Demo extends Base {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('questions','https://docs.google.com/spreadsheets/d/e/2PACX-1vQjdECX4kOj4uvdr_5w7iP5P8h-7m1QBr5XoOXy7Hn6PpAsSXtqPBwrc94uvBOzWOPUB7q7TSciAKku/pub?gid=0&single=true&output=csv')
        this.load.text('introHeroes', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQzW9q8TTKhWlHxsi4PnhSpwo3PacMcZRX6O_YURwbQ7N6hAqRZgMwsRXg6ilakRLkBAt381wM1jvv6/pub?gid=1348914508&single=true&output=csv')
        this.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');
        //this.load.rexLive2d('Haru', 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Live2D/Senko_Normals/senko.model3.json')
        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
        //load pack
        this.load.pack('pack', 'assets/pack.json');
        this.load.json('pkg', 'https://api.github.com/repos/Eikanya/Live2d-model/git/trees/master')
        
    }

    create() {
        var _scene = this;
        console.log(JSON.stringify(this.cache.json.get('pkg')));

        //建立背景
        var bgSet = CreateParallelBackgrounds(this, this.viewport.centerX, this.viewport.centerY, 'bgSetForestZ', 6);

        //cam縮放位移
        zoomFrom(this, 0.9, 2000);
        panFrom(this, 0, -50, 2000);

        //測試外部讀取image(似乎必須透過cors-anywhere)
        var loadOnlineImagePromise = async function(scene, config){
            var x = GetValue(config, 'x', 0);
            var y = GetValue(config, 'y', 0);
            var imgKey = GetValue(config, 'imgKey', undefined);
            var url = GetValue(config, 'url', undefined);
            await loadImageFromUrl(scene, imgKey, url, LoadingProgressUI, 1000);
            var img = scene.rexUI.add.label({
                x: x, y:y,
                icon: scene.add.image(0, 0, imgKey),
            }).layout()
            //var img = await addImageFromUrl(scene, x, y, imgKey, url);
            //在這裡設定img的其他屬性或功能

            var perspective = scene.rexUI.add.perspective(img, {hideCCW: false});
            perspective.enter();  // Snapshot before tween
            scene.tweens.add({
                targets: perspective,
                angleY: { start: 0, to: -180 },
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 2000,
                repeat: 2,            // -1: infinity
                yoyo: true,
    
                onStart: function () {
                    // perspective.enter();
                },
                onComplete: function () {
                    perspective.exit();
                }
            });

            return img;
        }

        var Resultcard;
        this.input.once('wheel', function () {
            var Card = loadOnlineImagePromise(this, {
                x: this.viewport.centerX, 
                y: this.viewport.centerY, 
                imgKey: 'resultHero', 
                url: cors + 'https://playoneapps.com.tw/File/Stand/Hero/image09.png'
            })
        },this)


        //建立textplayer
        this.textPlayer = CreateTextplayer(this);

        //啟動問答
        this.input.once('pointerup', function () {
            this.textPlayer.setVisible(true);
            StartQuiz(this, this.textPlayer);
        },this)
    }

    update(){
        //eyeTracking(this);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Demo,
};

var game = new Phaser.Game(config);