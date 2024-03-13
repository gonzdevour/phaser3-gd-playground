import ContainerLite from "rexnotePlugins/containerlite";
import TextPlayer from "rexnotePlugins/textplayer";
import CreateChar from './CreateChar';

//utils
import OnWindowResize from "gdkPlugins/utils/rwd/OnWindowResize";
import CreateTouchArea from "gdkPlugins/utils/ui/touchArea/CreateTouchArea";
import AutoRemoveTween from 'rexnotePlugins/utils/tween/AutoRemoveTween';
import Locate from "../gdk/layer/Locate";

class qMaster extends ContainerLite {
    constructor(scene, masterID, vpx, vpy, width, height) {

        var viewport = scene.viewport;

        if(vpx == undefined){vpx = 0.5};
        if(vpy == undefined){vpy = 1};
        if(width == undefined){width = viewport.width*0.95};
        if(height == undefined){height = viewport.height*0.3};

        var textPlayer = CreateTextplayer(scene);
        var clickWaiter = createClickWaiter(scene, textPlayer.x + 0.5*textPlayer.width - 40, textPlayer.y + 0.5*textPlayer.height - 95)
        var char = CreateChar(scene, 'Haru');
        char.lipTween = scene.tweens.add({
            targets: char,
            lipSyncValue: {from:0, to:1},
            ease: 'Linear',
            //duration: textPlayer.typingSpeed,
            duration: 150,
            yoyo: true,
            repeat: -1,
            paused: true,
            persist: true, //stop, complete都會無視persist直接刪除，所以停下tween的方法為seek(0)+pause
        });
        super(scene, 0, 0, [textPlayer, clickWaiter, char]);
        scene.add.existing(this);
        this.setVisible(false);

        //textPlayer事件與char、clickWaiter的互動
        if (textPlayer){
            textPlayer
            .on('wait.timeout', function(Callback){ //custom tag的範例
                var waitTime = async function(ms){
                    await new Promise(resolve => setTimeout(resolve, ms));
                    Callback();
                }
                waitTime(2000);
            })
            .on('page.start', function() {
                //console.log('typingSpeed: ' + textPlayer.typingSpeed)
                textPlayer.popTween.play();
                textPlayer.setTypingSpeed(100);
                clickWaiter.setVisible(false);
            })
            .on('wait.click', function() {
                console.log('wait click')
                clickWaiter.setVisible(true);
            })
            // .on('typing', function(child) {
            //     if (child.type === 'text') {
            //         char.lipTween.play();
            //     }
            // })
            .on('typing', function(child) {
                if (!char.lipTween.isPlaying()) {
                    char.lipTween.play();
                }
            })
            .on('complete', function() {
                char.lipTween.seek(0);
                char.lipTween.pause();
                char.lipSyncValue = 0;
            })
        }

        //rwd
        var response = function(){
            //取得resize後的viewport狀態
            var v = viewport;
            var vw = v.width;
            var vh = v.height; 
            v.portrait = vh>vw?true:false;
            v.landscape = vh>vw?false:true; 
            var widthRatio = 1.6;   
            v.displayWidth = vw>vh?(vh/widthRatio):vw;
            v.displayHeight = vh;
            v.displayLeft = v.centerX - 0.5*v.displayWidth;
            v.displayRight = v.centerX + 0.5*v.displayWidth;
            v.displayTop = v.centerY - 0.5*v.displayHeight;
            v.displayBottom = v.centerY + 0.5*v.displayHeight;
    
            //重設live2D角色位置與大小
            var modelSizeRatio = 0.85*viewport.height/2688;
            var xAdd = vh>vw?300:0; //如果是豎版，x要調整
            char
                .setPosition(viewport.displayLeft+xAdd, viewport.displayBottom-250)
                .setScale(modelSizeRatio)
        }
        OnWindowResize(scene, response);
        //加入layer與vpc控制
        Locate(scene, this, {instID: 'QMaster', layerName: 'main', viewport: viewport, vpx: vpx, vpy: vpy});

        response(); //因為有setPosition，必須放在vpc add(Locate)之後才會正常運作

        this.touchArea = CreateTouchArea(scene, {instID:'live2DTouchArea', layerName:'main'});
        this.scene = scene;
        this.textPlayer = textPlayer;
        this.clickWaiter = clickWaiter;
        this.char = char;

        this.question = ''; //question屬性會由quizPromise使用
    }
    //textPlayer
    say(content) { 
        var textPlayer = this.textPlayer;
        if (textPlayer){
            return textPlayer.playPromise(content);
        } else {
            return this.dummyPromise('qMaster.textPlayer does not exist');
        }
    }
    quiet(){
        var textPlayer = this.textPlayer;
        if (textPlayer){
            textPlayer.backTween.play();
        }
        return this;
    }
    //char
    setExpression(expName) {
        var char = this.char;
        if (char){
            char.setExpression(expName);
        }
        return this
    }
    setMotionSpeed(speed) { //倍數，初始為1
        var char = this.char;
        if (char){
            char.timeScale = speed;
        }
        return this
    }
    startMotion(motionGroup, idx, priority) { //live2D專用函數。priority: 1|2|3 or 'idle'|'normal'|'force'，高優先權動作播放時執行低優先權動畫無效
        var char = this.char;
        if (char){
            char.stopAllMotions().startMotion(motionGroup, idx, priority);
        }
        return this
    }
    dummyPromise(tag) { 
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(tag);
            }, 300);
          });
    }
}

var CreateTextplayer = function(scene){
    var viewport = scene.viewport;
    var Cubic = Phaser.Math.Easing.Cubic.Out;
    var Linear = Phaser.Math.Linear;
    var textPlayer = new TextPlayer(scene,
        {
            x: viewport.centerX+5, y: viewport.top+200+25,
            width: viewport.displayWidth-50, height: 400,  // Fixed width and height

            background: { 
                stroke: 'white', strokeThickness: 6, cornerRadius: 20, 
                color: 'rgba(8, 9, 107, 1)', color2: 'rgba(8, 9, 107, 0.5)', horizontalGradient: true, 
            }, //rgba(8, 9, 107, 0.2)

            //innerBounds: { stroke: '#A52A2A' },
            padding: {left: 40, right: 40, top: 20, bottom: 20},
            style: {
                fontSize: '48px',
                stroke: 'green', strokeThickness: 3,
                shadowColor: 'red', shadowOffsetX: 5, shadowOffsetY: 5, shadowBlur: 3
            },
            typing: {
                speed: 100,  // 0: no-typing
                animation: {
                    duration: 300,
                    yoyo: true,
                    onStart: function (char) {
                        char
                            .setVisible()
                            .setData('y', char.y);
                    },
                    onProgress: function (char, t) {
                        var p0 = char.getData('y');
                        var p1 = p0 - 20;
                        var value = Linear(p0, p1, Cubic(t));
                        char.setY(value);
                    }
                }
            },
            clickTarget: null, //如果要自訂就填null再用setClickTarget設定
            wrap: { charWrap: true, maxLines: 5, padding: { bottom: 10 }, },
            nextPageInput: 'click|2000'
            // nextPageInput: function(callback) {
            //     console.log('Custom next-page-input')
            //     callback();
            // }
        }
    )

    //在scene上畫出inst
    scene.add.existing(textPlayer);
    textPlayer.angle = -2;

    //對話框彈出效果
    textPlayer.popTween = scene.tweens.add({
        targets: textPlayer,
        x: {from:textPlayer.x-20, to:textPlayer.x},
        y: {from:textPlayer.y+20, to:textPlayer.y},
        alpha: {from: 0, to:1},
        ease: 'cubic',
        //duration: textPlayer.typingSpeed,
        duration: 500,
        paused: true,
        persist: true,
    });

    textPlayer.backTween = scene.tweens.add({
        targets: textPlayer,
        x: '-=20',
        y: '+=20',
        alpha: 0,
        ease: 'cubic',
        duration: 500,
        paused: true,
        persist: true,
    });

    //指定click target
    // textPlayer.setClickTarget(scene.toucharea);
    // textPlayer.clickTarget.onClick(function () {
    //     console.log('qM textPlayer target onClick');
    //     if (!textPlayer.isPlaying) {
    //         return;
    //     }

    //     if (textPlayer.isPageTyping) {
    //         textPlayer.setTypingSpeed(0);
    //     } else {
    //         textPlayer.typingNextPage();
    //     }
    // })

    return textPlayer
}

var createClickWaiter = function(scene, x, y){
    //對話斷點的三角形特效
    var clickWaiter = scene.add.triangle(x, y, 0, 36, 36, 36, 18, 72, 0xffffff).setVisible(false); //#ffffff
    clickWaiter.tween = AutoRemoveTween(clickWaiter, {
        y: '+=10',
        ease: 'Linear',
        duration: 500,
        yoyo: true,
        repeat: -1,
        //paused: true,
    })

    return clickWaiter
}

var CreateQMaster = function (scene, masterID, vpx, vpy, width, height) {
    var master = new qMaster(scene, masterID, vpx, vpy, width, height);
    return master;
  }

export default CreateQMaster;