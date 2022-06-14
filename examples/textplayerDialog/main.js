import phaser from 'phaser/src/phaser.js';
import AllPlugins from '../../plugins/AllPlugins.js';
import { DialogSelect } from '../../projects/tpl_newProj/build/view/modaldialog/DialogType.js';
import { DialogMultiSelect } from '../../projects/tpl_newProj/build/view/modaldialog/DialogType.js';
import dialogButtonClickCallback from './dialog/dialogButtonClickCallback.js';
//proj
import CreateQuiz from './CreateQuiz.js';
import CreateTextplayer from './CreateTextplayer.js';
//utils
import GetValue from '../../plugins/utils/object/GetValue.js';

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
    }

    create() {
        var _scene = this;

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
        this.input.once('pointerdown', function () {
            QuizPromise(textPlayer, quizArr);
            // text.showPage();  // Show all characters in this page
        })
    }
}

var waitDialog = async function(textPlayer){
    var _scene = textPlayer.scene;
    var question = textPlayer.question;
    await textPlayer.playPromise(question['Q']);
    //choicesData:{ifShuffle:1/0, list:[{imgKey:key, text:text, indexFixed:0/1},...]}
    var result = await DialogMultiSelect(_scene, {
        //title: 'test title', 
        //content: 'test content', 
        actions: [
            {imageKey:'no', text: '清空', type: 'clear', callback: undefined},
            {imageKey:'yes', text: '確定', type: 'confirm', callback: undefined, closeDialog:true},
        ],
        choicesData: {
            ifShuffle:0,
            list: CreateChoiceList(question),
        },
        extraConfig: {
            y: _scene.viewport.centerY-200, 
            cover: {color:0x663030, alpha: 0.1},
            dialogButtonClickCallback: dialogButtonClickCallback,
        }
    })
    console.log('dialogResult:' + JSON.stringify(result))
    await textPlayer.playPromise(question['Say' + GetValue(result, 'singleSelectedName', 1) ]+'[wait=click][wait=500]')
    return result;
}

var CreateChoiceList = function(question){
    var result = [];
    for (let index = 0; index < question.Cnt; index++) {
        var data = {
            imageKey: 'yes',
            text: question['A'+(index+1)],
            indexFixed: 1,
        };
        result.push(data);
    }
    //console.log(JSON.stringify(result))
    return result;
}

//清理上一題，並將新題目與panel組合起來，以作答callback回傳給QuizPromise
var SetupTextPlayer = async function (textPlayer, question, onSubmit) { 
    textPlayer.question = question;
    var result = await waitDialog(textPlayer);
    console.log('Q complete');

    if (onSubmit) { //如果有傳入callback function
        onSubmit(result); //呼叫callback，完成QuizPanelPromise，讓QuizPromise吐出next question循環
    }

    return textPlayer;
}

var QuizPromise = async function (textPlayer, quizArr) {
    var curQIdx = 0;
    var lastQIdx = quizArr.length-1;
    while (curQIdx !== lastQIdx) { //如果不是最後一題
        var result = await TextPlayerPromise(textPlayer, quizArr[curQIdx]);//清理上一題，將下一題與textPlayer組合起來，回傳上一題作答結果
        console.log('quizResult: ' + result);
        //await QuizResultModalPromise(textPlayer.scene, result); //顯示上一題作答結果(傳入scene和config給彈出面板Modal)
        curQIdx++;
    }
    //最後一題，回傳結束
}

var TextPlayerPromise = function (textPlayer, question) { //清理上一題，並將quiz吐出的新question與textPlayer組合起來
    return new Promise(function (resolve, reject) {
        SetupTextPlayer(textPlayer, question, function (result) {
            resolve(result); //回傳作答結果
        })
    });
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