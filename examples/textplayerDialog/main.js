import phaser from 'phaser/src/phaser.js';
import AllPlugins from '../../plugins/AllPlugins.js';
import CSVToHashTable from '../../../phaser3-rex-notes/plugins/csvtohashtable.js';
//gdk
import { DialogSelect } from './gdk/modaldialog/DialogType';
import { DialogMultiSelect } from './gdk/modaldialog/DialogType';
import { TransitionChoicesUpScaleDown } from './gdk/modaldialog/TransistionType.js';
import { TransitionBT } from './gdk/modaldialog/TransistionType.js';
import dialogButtonClickCallback from './gdk/modaldialog/dialogButtonClickCallback.js';
//proj
import CreateQuiz from './CreateQuiz.js';
import CreateTextplayer from './CreateTextplayer.js';
import CreateChar from './CreateChar.js';
//utils
import addImageFromUrl from '../../plugins/utils/image/addImageFromUrl.js';
import { WaitEvent } from '../../../phaser3-rex-notes/plugins/eventpromise.js';
import { Delay } from '../../../phaser3-rex-notes/plugins/eventpromise.js';
import GetValue from '../../plugins/utils/object/GetValue.js';
import GetRandom from '../../plugins/utils/array/GetRandom.js';
import SetViewportDisplaySize from '../../plugins/utils/viewport/SetDisplaySize.js';

const cors = window.location.hostname == 'localhost'?'https://cors-anywhere-playone.herokuapp.com/':'';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    init() {
        this.rexScaleOuter.scale();
        this.viewport = this.rexScaleOuter.outerViewport; //on resize時this.viewport不隨之變動
        SetViewportDisplaySize(this.viewport);
        //this.viewport = this.cameras.main; 
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

        //測試外部讀取image(似乎必須透過cors-anywhere)
        var loadImgPromise = async function(scene, config){
            var x = GetValue(config, 'x', 0);
            var y = GetValue(config, 'y', 0);
            var imgKey = GetValue(config, 'imgKey', undefined);
            var url = GetValue(config, 'url', undefined);
            var img = await addImageFromUrl(scene, x, y, imgKey, url);
            //在這裡設定img的其他屬性或功能
            return img;
        }
        var testImg = loadImgPromise(this, {
            x: this.viewport.centerX, 
            y: this.viewport.centerY, 
            imgKey: 'test', 
            url: cors + 'https://playoneapps.com.tw/File/Stand/Hero/image09.png'
        })

        //建立camera跟隨的center物件(使用sizer以便直接套用easeMove的功能)
        this.center = this.rexUI.add.label({
            x: this.viewport.centerX,
            y: this.viewport.centerY,
            icon: this.add.image(0, 0, 'no'),
        }).layout()
        this.cameras.main.startFollow(this.center, true, 0.5, 0.5);

        //建立測試結果列表資料
        var tbIntroHeroes = new CSVToHashTable().loadCSV(this.cache.text.get('introHeroes'));
        //console.log(tbIntroHeroes.get('12', 'name'))//測試CSVToHashTable是否讀取成功

        //建立題庫
        var csvstring = this.cache.text.get('questions');
        var quizArr = CreateQuiz(csvstring,10); //將csv轉taffydb並從中取出10題
        quizArr.forEach(function(item, index, arr){
            console.log(JSON.stringify(item['A1']));
        })

        //建立透明觸控板
        this.touchArea = this.rexUI.add.overlapSizer({
            x: this.viewport.centerX,
            y: this.viewport.centerY,
            width: this.viewport.width,
            height: this.viewport.height,
        })
        .layout()

        //建立背景
        // var bg = this.add.image(this.viewport.centerX, this.viewport.centerY, 'bgPCRoom')
        // bg.setScale(this.viewport.height/bg.height).setAlpha(0.3);
        var bgSet = [];
        for (let index = 6; index >= 0; index--) {
            var bg = this.add.image(this.viewport.centerX, this.viewport.centerY, 'bgSetForestZ'+index);
            bg.setScale(2);
            bg.setScrollFactor(1-0.1*index);
            //bg.setScale(this.viewport.height/bg.height).setScrollFactor(1-0.1*index);
            bgSet.push(bg);
        }

        //建立textplayer
        var textPlayer = CreateTextplayer(this);
        textPlayer.popTween = this.tweens.add({
            targets: textPlayer,
            x: {from:textPlayer.x-20, to:textPlayer.x},
            y: {from:textPlayer.y+20, to:textPlayer.y},
            alpha: {from: 0, to:1},
            ease: 'cubic',
            //duration: textPlayer.typingSpeed,
            duration: 500,
            paused: true,
        });

        //建立character
        var character = CreateChar(this, 'Haru');

        textPlayer.character = character;
        textPlayer.character.lipTween = this.tweens.add({
            targets: textPlayer.character,
            lipSyncValue: {from:0, to:1},
            ease: 'Linear',
            //duration: textPlayer.typingSpeed,
            duration: 150,
            yoyo: true,
            paused: true,
        });

        textPlayer
            .on('wait.timeout', function(Callback){
                var waitTime = async function(ms){
                    await new Promise(resolve => setTimeout(resolve, ms));
                    Callback();
                }
                waitTime(2000);
            })
            .on('typing', function(child) {
                if (child.type === 'text') {
                    textPlayer.character.lipTween.play();
                }
            })
            .on('complete', function() {
                textPlayer.popTween.stop();
                textPlayer.character.lipTween.stop();
                textPlayer.character.lipSyncValue = 0;
            })

        //啟動問答
        this.input.once('pointerup', function () {
            textPlayer.setVisible(true);
            QuizPromise(textPlayer, quizArr, tbIntroHeroes)
                .then(function(tbOut){
                    textPlayer.playPromise(tbOut.get(tbOut.curChampKey, 'say'))
                })
        })
        this.textPlayer = textPlayer;
    }

    update(){
        eyeTracking(this);
    }
}

var eyeTracking = function(scene){
    var pointer = scene.input.activePointer;

    if (pointer.isDown){
        scene.center.moveTo({x:pointer.worldX, y:pointer.worldY, ease: 'linear', speed: 300});
    } else {
        scene.center.moveTo({x:scene.viewport.centerX, y:scene.viewport.centerY, ease: 'linear', speed: 600});
        //scene.center.moveStop();
    } 

    if (scene.touchArea.isInTouching){
        scene.textPlayer.character.lookAt( pointer.worldX, pointer.worldY, {
            // camera: scene.cameras.main,
            // eyeBallX: 1, eyeBallY: 1,
            // angleX: 30, angleY: 30, angleZ: 30,
            // bodyAngleX: 10
        })
    } else {
        scene.textPlayer.character.lookForward();
    }
}

var waitDialog = async function(textPlayer){
    var _scene = textPlayer.scene;
    var question = textPlayer.question;
    var character = textPlayer.character;
    character.timeScale = 1;
    character.setExpression('F01').startMotion('Idle', 0, 'force')
    await textPlayer.playPromise(question['Q']);
    //choicesData:{ifShuffle:1/0, list:[{imgKey:key, text:text, indexFixed:0/1},...]}
    var result = await DialogSelect(_scene, {
        //title: 'test title', 
        //content: 'test content', 
        actions: [
            {imageKey:'no', text: '清空', type: 'clear', callback: undefined},
            {imageKey:'yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
        ],
        choicesData: {
            ifShuffle:0,
            list: CreateChoiceDataList(question),
        },
        extraConfig: {
            x: _scene.viewport.centerX,
            y: _scene.viewport.bottom,
            width: game.config.width-50, 
            cover: {color:0x663030, alpha: 0.1},
            transitIn: TransitionBT,
            transitOut: TransitionChoicesUpScaleDown,
            duration:{ in: 600, out: 1400 },
            dialogButtonClickCallback: dialogButtonClickCallback,
        }
    })
    //console.log('dialogResult:' + JSON.stringify(result))
    //character.timeScale = 1.5;
    //character.setExpression('F06').stopAllMotions().startMotion('TapBody', 0, 'force')
    //await textPlayer.playPromise(question['Say' + GetValue(result, 'singleSelectedName', 1) ]+'[wait=click][wait=500]')
    return result;
}

var CreateChoiceDataList = function(question){
    var result = [];
    for (let index = 0; index < question.Cnt; index++) {
        var data = {
            imageKey: undefined,
            text: question['A'+(index+1)],
            indexFixed: 1,
        };
        result.push(data);
    }
    //console.log(JSON.stringify(result))
    return result;
}

var resultHandler = function(result, curQ, tbIntroHeroes){
    console.log('handling result:\n' + JSON.stringify(result));

    //有正確答案但未答對時重新詢問同一題
    if (curQ['Correct'] != 0){ //有正確答案
        var correct = curQ['Correct'];
        var answer = 'A' + result.singleSelectedName;
        if (answer != correct){
            tbIntroHeroes.ifAskAgain = true;
        } else {
            tbIntroHeroes.ifAskAgain = false;
        }
    } else {
        tbIntroHeroes.ifAskAgain = false;
    }

    console.log(curQ['Score' + result.singleSelectedName])
    //從result取出單選結果對應的加分表，並將字串加分表轉為物件
    var score = JSON.parse(curQ['Score' + result.singleSelectedName]);
    //依加分表對table中的每個加分項目加上分數
    for(var key in score){
        var newValue = tbIntroHeroes.get(key, 'Vote') + score[key]
        tbIntroHeroes.set(key, 'Vote', newValue)
        //tbIntroHeroes.add(key, 'Vote', score[key])
        console.log(tbIntroHeroes.get(key, 'name') + tbIntroHeroes.get(key, 'Vote'))
    }
    //整理加分完成的table，取出最高分的rowKey以得知最高分
    tbIntroHeroes.sortCol('Vote', 'descending');
    var topRowkey = tbIntroHeroes.rowKeys[0];
    var topVoteCnt = tbIntroHeroes.get(topRowkey, 'Vote')

    //取出所有符合最高分的rowKey，隨機決定其中之一為冠軍
    var champions = [];
    tbIntroHeroes.rowKeys.forEach(function(key, idx, arr){
        if(tbIntroHeroes.get(key, 'Vote') == topVoteCnt){
            champions.push(key);
        }
    })
    var curChampKey = GetRandom(champions);
    console.log('curChamp:' + tbIntroHeroes.get(curChampKey, 'name') + tbIntroHeroes.get(curChampKey, 'Vote'))

    //把冠軍rowKey掛在table上回傳
    tbIntroHeroes.curChampKey = curChampKey;

    return tbIntroHeroes;
}

var QuizPromise = async function (textPlayer, quizArr, out) {
    var curQIdx = 0;
    var lastQIdx = quizArr.length;
    while (curQIdx !== lastQIdx) { //如果不是最後一題
        var curQ = quizArr[curQIdx]
        var result = await TextPlayerPromise(textPlayer, curQ);//清理上一題，將下一題與textPlayer組合起來，回傳上一題作答結果
        out = resultHandler(result, curQ, out);
        //await QuizResultModalPromise(textPlayer.scene, result); //顯示上一題作答結果(傳入scene和config給彈出面板Modal)
        if (out.ifAskAgain === false){ //是否要重問同一題
            curQIdx++;
        }
    }
    //最後一題，回傳結束
    return out;
}

var TextPlayerPromise = function (textPlayer, question) { //清理上一題，並將quiz吐出的新question與textPlayer組合起來
    return new Promise(function (resolve, reject) {
        SetupTextPlayer(textPlayer, question, function (result) {
            resolve(result); //回傳作答結果
        })
    });
}

//清理上一題，並將新題目與panel組合起來，以作答callback回傳給QuizPromise
var SetupTextPlayer = async function (textPlayer, question, onSubmit) { 
    textPlayer.question = question;
    var result = await waitDialog(textPlayer);

    if (onSubmit) { //如果有傳入callback function
        onSubmit(result); //呼叫callback，完成QuizPanelPromise，讓QuizPromise吐出next question循環
    }

    return textPlayer;
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