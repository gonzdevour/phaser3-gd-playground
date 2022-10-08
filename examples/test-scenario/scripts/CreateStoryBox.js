import TextPlayer from "../../../../phaser3-rex-notes/plugins/textplayer";
import ContainerLite from '../../../../phaser3-rex-notes/plugins/containerlite.js';
import AutoRemoveTween from '../../../../phaser3-rex-notes/plugins/utils/tween/AutoRemoveTween';
import CreateRoundRectangleBackground from "../gdk/templates/CreateRoundRectangleBackground";

class StoryBox extends ContainerLite {
    constructor(scene, storyBoxID, vpx, vpy, width, height) {

        if(vpx == undefined){vpx = 0.5};
        if(vpy == undefined){vpy = 0.9};
        if(width == undefined){width = scene.scenario.viewport.width*0.95};
        if(height == undefined){height = scene.scenario.viewport.height*0.3};

        var textPlayer = CreateTextPlayer(scene, 0, 0, width, height);
        var nameLabel = createNameLabel(scene, 0-0.5*width, 0-0.5*height);
        var background = CreateCustomShape(scene, width+100, height+100)
            .setFillStyle(0x0, 0.7)
            .setStrokeStyle(3, 0xffffff, 1)
            .setPosition(0, 0);
        //var marker = scene.rexUI.add.roundRectangle(x, y, 500, 500, 10, 0xff0000);

        super(scene, 0, 0, [background, textPlayer, textPlayer.triangle, nameLabel]);
        scene.add.existing(this);

        if(storyBoxID == 'story'){
            scene.scenario.director.storyBox = this; //通用storyBox, tagPlayer代號text.story
        }
        textPlayer.on('complete', function(){
            this.scenario.isPlayingText = false;
          },scene);

        background.setAlpha(0.5);
        this.moveDepthBelow(background);

        scene.layerManager.addToLayer('story', this);
        scene.vpc.add(this, scene.scenario.viewport, vpx, vpy);

        this.background = background;
        this.textPlayer = textPlayer;
        this.nameLabel = nameLabel;

        this.scene = scene;
        this.scenario = scene.scenario;
        this.director = scene.scenario.director;
        this.tagPlayer = scene.scenario.director.tagPlayer;

        this.speakerName = '';

        this.close();
    }
    setTypingSpeed(speed){
        this.textPlayer.setTypingSpeed(speed);
    }
    tell(displayName, expression, speed, waitTyping) {

        console.log('storyBox start to tell');
        if (!this.visible){
            this.pop()
        }

        if (displayName) {
            this.nameLabel.setText(displayName);
            if (displayName = this.speakerName){

            } else {
                this.speakerName = displayName;
                this.nameLabelBounce()
            }
        }
        if (typeof (speed) === 'boolean') {
            waitTyping = speed;
            speed = undefined;
        }
        if (waitTyping === undefined) {
            waitTyping = true;
        }
        this.waitTyping = waitTyping;

        if (speed !== undefined) {
            this.textPlayer.setTypingSpeed(speed); //指定語氣速度
        } else {
            this.textPlayer.setTypingSpeed(this.director.typingSpeed); //如不指定則使用預設速度
        }

        this.tagPlayer.setContentCallback(this.storyBoxTyping, this);
    }
    storyBoxTyping(content) {
        if (this.waitTyping) {
            this.scenario.isPlayingText = true;
            this.tagPlayer.pauseUntilEvent(this.textPlayer, 'complete');
        }
        this.textPlayer.playPromise(content);
        return this;
    }
    setDisplayName(displayName){
        this.displayName = displayName;
    }
    nameLabelBounce() {
        this.setVisible(true);
        AutoRemoveTween(this.nameLabel, {
            y: '-=20',
            ease: 'Cubic',
            duration: 250,
            yoyo: true,
        })
    }
    close() {
        this.setVisible(false);
    }
    pop() {
        this.setVisible(true);
        this.textPlayerPop();
        this.backgroundPop();
    }
    backgroundPop() {
        AutoRemoveTween(this.background, {
            scale: {from:0.8, to:1},
            alpha: 1,
            ease: 'Cubic',
            duration: 500,
        })
    }
    nameLabelPop() {
        AutoRemoveTween(this.nameLabel, {
            alpha: 1,
            ease: 'Cubic',
            duration: 500,
        })
    }
    textPlayerPop() {
        AutoRemoveTween(this.textPlayer, {
            x: {from:this.textPlayer.x-20, to:this.textPlayer.x},
            y: {from:this.textPlayer.y+20, to:this.textPlayer.y},
            alpha: {from: 0, to:1},
            ease: 'cubic',
            duration: 600, //duration: this.textPlayer.typingSpeed,
        })
    }
}

var createNameLabel = function (scene, x, y) {
    return scene.rexUI.add.label({
        x: x, y: y,
        background: CreateRoundRectangleBackground(scene, 20, 0x999933, 0xffffff, 3),//scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x999933),
        text: scene.add.text(0, 0, 'Leonardo Dicapio', {fontSize: 48, testString: '|MÉqgy回',}),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
        align: 'left',
        space: { left: 15, right: 15, top: 10, bottom: 20, icon: 10},
    })
    .setOrigin(0,1)
    .layout();
}

var CreateTextPlayer = function(scene, x, y, width, height){
    var Cubic = Phaser.Math.Easing.Cubic.Out;
    var Back = Phaser.Math.Easing.Back.In;
    var Linear = Phaser.Math.Easing.Linear;
    var Lerp = Phaser.Math.Linear;
    var textPlayer = new TextPlayer(scene, 
        {
            x: x, y: y, width: width, height: height,  // Fixed width and height

            background: { 
                stroke: 'white', strokeThickness: 6, cornerRadius: 20, 
                //color: 'rgba(0, 0, 0, 0.7)', //color2: 'rgba(8, 9, 107, 0.5)', horizontalGradient: true, 
            },

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
                            .setData('x', char.x)
                            .setData('y', char.y)
                    },
                    onProgress: function (char, t) {
                        var p0 = char.getData('x');
                        var p1 = p0 + 10;
                        var value = Lerp(p0, p1, Linear(t));
                        char.setX(value);

                        var p0 = char.getData('y');
                        var p1 = p0 - 10;
                        var value = Lerp(p0, p1, Cubic(t));
                        char.setY(value);

                        // var value = Linear(1, 0.5, Cubic(t));
                        // char.setAlpha(value);

                        // var value = Lerp(255, 0, Linear(t));
                        // char.modifyStyle({
                        //     // bold: false,
                        //     // italic: false,
                        //     // fontSize: '16px',
                        //     // fontFamily: 'Courier',
                        //     //color: `rgb(${value},${value},${value})`,
                        //     //color: `rgb(255,${value},${value})`
                        //     // stroke: '#fff',
                        //     // strokeThickness: 0,
                        //     // shaodwColor: null,
                        //     // shadowBlur: 0,
                        //     // shadowOffsetX: 0,
                        //     // shadowOffsetY: 0,
                        //     // backgroundColor: null,
                        //     // offsetX: 0,
                        //     // offsetY: 0
                        // })

                        var value = Lerp(1, 1.2, Cubic(t));
                        char.setScale(value);
                    }
                }
            },
            clickTarget: null, //如果要自訂就填null再用setClickTarget設定
            wrap: { charWrap: true, maxLines: 5, padding: { bottom: 10 }, lineHeight: 60, },

            //nextPageInput: 'click|2000'
            // nextPageInput: function(callback) {
            //     console.log('Custom next-page-input')
            //     callback();
            // }
        }
    )

    //在scene上畫出inst
    scene.add.existing(textPlayer);

    //style
    textPlayer.angle = -2;

    //對話斷點的三角形特效
    textPlayer.triangle = scene.add.triangle(200, 200, 0, 36, 36, 36, 18, 72, 0xffffff).setVisible(false); //#ffffff
    textPlayer.triangle.setPosition(textPlayer.x + 0.5*textPlayer.width - 40, textPlayer.y + 0.5*textPlayer.height - 95); //-85
    textPlayer.triangle.tween = AutoRemoveTween(textPlayer.triangle, {
        y: '+=10',
        ease: 'Linear',
        duration: 500,
        yoyo: true,
        repeat: -1,
        //paused: true,
    })

    //指定click target
    // textPlayer.setClickTarget(scene.toucharea);
    // textPlayer.clickTarget.onClick(function () {
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

var CreateCustomShape = function (scene, width, height, speaker) {
    var shape = scene.rexUI.add.customShapes({
        create: { lines: 1 },
        update: function () {
            var radius = 20;
            var tailHeight = 30;
            var tailWidth = 40;

            var left = -0.5*width, right = 0.5*width,
                top = -0.5*height, bottom = 0.5*height, 
                boxBottom = bottom - tailHeight,
                tailCenterX = 0,
                //沒有指定speaker的時候尾巴置中
                indentRight = 0.5*tailWidth,
                indentBottom = 0,
                indentLeft = 0.5*tailWidth;

            if(speaker){
                var centerX = speaker.stageCenter?speaker.stageCenter:512;
                if(speaker.x > centerX){
                    //speaker在舞台右方，尾巴朝左
                    indentRight = left + tailCenterX+0.5*tailWidth,
                    indentBottom = left + tailCenterX+0.5*tailWidth+10;
                    indentLeft = left + tailCenterX-0.5*tailWidth;
                }else if(speaker.x < centerX){
                    //speaker在舞台左方，尾巴朝右
                    indentRight = left + tailCenterX+0.5*tailWidth,
                    indentBottom = left + tailCenterX-0.5*tailWidth-10;
                    indentLeft = left + tailCenterX-0.5*tailWidth;
                }
            }

            this.getShapes()[0]
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .fillStyle(this.fillColor, this.fillAlpha)
                // top line, right arc
                .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                // right line, bottom arc
                .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
                // bottom indent                    
                .lineTo(indentRight, boxBottom).lineTo(indentBottom, bottom).lineTo(indentLeft, boxBottom)
                // bottom line, left arc
                .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
                // left line, top arc
                .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
                .close();

            // this.getShapes()[0]
            //     .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
            //     .fillStyle(this.fillColor, this.fillAlpha)
            //     .startAt(left, top)
            //     .lineTo(right, top)
            //     .lineTo(right, bottom)
            //     .lineTo(left, bottom)
            //     .lineTo(left, top)
            //     .close()
        }
    })

    return shape;
}

var CreateStoryBox = function (scene, storyBoxID, vpx, vpy, width, height) {
    var storyBox = new StoryBox(scene, storyBoxID, vpx, vpy, width, height);
    var textPlayer = storyBox.textPlayer;
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
            storyBox.textPlayerPop();
            textPlayer.setTypingSpeed(scene.scenario.director.typingSpeed);
            textPlayer.triangle.setVisible(false);
        })
        .on('wait.click', function() {
            console.log('wait click')
            textPlayer.triangle.setVisible(true);
        })
        .on('typing', function(child) {
            if (child.type === 'text') {
                //textPlayer.character.lipTween.play();
            }
        })
        .on('complete', function() {
            //storyBox.textPlayerClose();
        })
    return storyBox;
  }

export default CreateStoryBox;