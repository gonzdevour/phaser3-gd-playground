import phaser from 'phaser/src/phaser.js';
import AllPlugins from '../../plugins/AllPlugins.js';
import CSVToHashTable from '../../../phaser3-rex-notes/plugins/csvtohashtable.js';
//gdk
import { DialogSelect } from './gdk/modaldialog/DialogType';
import { DialogMultiSelect } from './gdk/modaldialog/DialogType';
import { TransitionChoicesUpScaleDown } from './gdk/modaldialog/TransistionType.js';
import { TransitionLR } from './gdk/modaldialog/TransistionType.js';
import dialogButtonClickCallback from './gdk/modaldialog/dialogButtonClickCallback.js';
//proj
import CreateQuiz from './CreateQuiz.js';
import CreateTextplayer from './CreateTextplayer.js';
import CreateChar from './CreateChar.js';
//utils
import GetValue from '../../plugins/utils/object/GetValue.js';
import GetRandom from '../../plugins/utils/array/GetRandom.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    init() {
        this.viewport = this.cameras.main; 
    }

    preload() {
        this.load.text('questions','https://docs.google.com/spreadsheets/d/e/2PACX-1vQjdECX4kOj4uvdr_5w7iP5P8h-7m1QBr5XoOXy7Hn6PpAsSXtqPBwrc94uvBOzWOPUB7q7TSciAKku/pub?gid=0&single=true&output=csv')
        this.load.text('introHeroes', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQzW9q8TTKhWlHxsi4PnhSpwo3PacMcZRX6O_YURwbQ7N6hAqRZgMwsRXg6ilakRLkBAt381wM1jvv6/pub?gid=1348914508&single=true&output=csv')
        this.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');
        this.load.rexLive2d('Haru', 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/destiny_child_kr%20%E5%A4%A9%E5%91%BD%E4%B9%8B%E5%AD%90/c000_10/model.json')
        //this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
        //load pack
        this.load.pack('pack', 'assets/pack.json'); 
    }

    create() {
        var _scene = this;

        //建立角色
        var character = CreateChar(this);

        //建立測試結果列表資料
        var tbIntroHeroes = new CSVToHashTable().loadCSV(this.cache.text.get('introHeroes'));
        //console.log(tbIntroHeroes.get('12', 'name'))

        //建立題庫
        var csvstring = this.cache.text.get('questions');
        var quizArr = CreateQuiz(csvstring,10); //將csv轉taffydb並從中取出10題
        quizArr.forEach(function(item, index, arr){
            console.log(JSON.stringify(item['A1']));
        })

        //建立textplayer
        var textPlayer = CreateTextplayer(this);
        textPlayer
            .on('wait.timeout', function(Callback){
                var waitTime = async function(ms){
                    await new Promise(resolve => setTimeout(resolve, ms));
                    Callback();
                }
                waitTime(2000);
            })

        //啟動問答
        textPlayer.once('pointerup', function () {
            QuizPromise(textPlayer, quizArr, tbIntroHeroes)
                .then(function(tbOut){
                    textPlayer.playPromise(tbOut.get(tbOut.curChampKey, 'say'))
                })
            // text.showPage();  // Show all characters in this page
        })
    }
}

var waitDialog = async function(textPlayer){
    var _scene = textPlayer.scene;
    var question = textPlayer.question;
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
            y: _scene.viewport.centerY-200, 
            cover: {color:0x663030, alpha: 0.1},
            transitIn: TransitionLR,
            transitOut: TransitionChoicesUpScaleDown,
            duration:{ in: 600, out: 1400 },
            dialogButtonClickCallback: dialogButtonClickCallback,
        }
    })
    //console.log('dialogResult:' + JSON.stringify(result))
    await textPlayer.playPromise(question['Say' + GetValue(result, 'singleSelectedName', 1) ]+'[wait=click][wait=500]')
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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Demo,
};

var game = new Phaser.Game(config);