import phaser from 'phaser/src/phaser.js';
import AllPlugins from '../../plugins/AllPlugins.js';
//proj
import CreateQuiz from './CreateQuiz.js';
import CreateTextplayer from './CreateTextplayer.js';

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
        //建立題庫
        var csvstring = this.cache.text.get('questions');
        var quizArr = CreateQuiz(csvstring,10);
        quizArr.forEach(function(item, index, arr){
            console.log(JSON.stringify(item['A1']));
        })

        //建立textplayer
        var textPlayer = CreateTextplayer(this);

        this.input.once('pointerdown', function () {
            textPlayer.playPromise('hello [wait=dialog]textplayer')
                .then(function () {
                    console.log('Play complete');
                })
            
            // text.showPage();  // Show all characters in this page
        })
    }
}

//清理上一題，並將新題目與panel組合起來，以作答callback回傳給QuizPromise
var SetupTextPlayer = function (textPlayer, question, onSubmit) { 
    textPlayer
        .once('submit', function (result) { //callback回傳答案
            if (onSubmit) { //如果有傳入callback function
                onSubmit(result); //呼叫callback，完成QuizPanelPromise，讓QuizPromise吐出next question循環
            }
        })
    return textPlayer;
}

var QuizPromise = async function (textPlayer, quizArr) {
    var curQIdx = 0;
    var lastQIdx = quizArr.length-1;
    while (curQIdx !== lastQIdx) { //如果不是最後一題
        var result = await TextPlayerPromise(textPlayer, quizArr[curQIdx]);//清理上一題，將下一題與textPlayer組合起來，回傳上一題作答結果
        //console.log(result);
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