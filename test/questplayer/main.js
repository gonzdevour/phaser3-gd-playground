import phaser from 'phaser/src/phaser.js';
import tfdb from '../../plugins/taffydb/taffy-min.js';
import TextPlayer from '../../../phaser3-rex-notes/plugins/textplayer.js';

//utils
import Papa from 'papaparse';
import Shuffle from '../../plugins/utils/array/Shuffle.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { 
        this.load.text('questions','https://docs.google.com/spreadsheets/d/e/2PACX-1vQjdECX4kOj4uvdr_5w7iP5P8h-7m1QBr5XoOXy7Hn6PpAsSXtqPBwrc94uvBOzWOPUB7q7TSciAKku/pub?gid=0&single=true&output=csv')
    }

    create() {
        var _scene = this;
        //取得csv
        var csvstring = this.cache.text.get('questions');
        //csv轉json array
        var data = csvToJSONArr(csvstring);
        //taffy建立db(注意db是一個函數，要用db()才會回傳db物件)
        var db = tfdb.taffy(data);
        // get first/last record
        var quizArr = makeQuiz(db,10);

        var Cubic = Phaser.Math.Easing.Cubic.Out;
        var Linear = Phaser.Math.Linear;
        var textPlayer = new TextPlayer(_scene,
            {
                x: 400, y: 300,
                width: 400, height: 200,  // Fixed width and height

                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },

                innerBounds: {
                    stroke: '#A52A2A'
                },

                padding: 20,

                style: {
                    fontSize: '16px',
                    stroke: 'green',
                    strokeThickness: 3,

                    shadowColor: 'red',
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    shadowBlur: 3
                },

                wrap: {
                    maxLines: 5,
                    padding: { bottom: 10 },
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
                clickTarget: _scene,
                nextPageInput: 'click|2000'
                // nextPageInput: function(callback) {
                //     console.log('Custom next-page-input')
                //     callback();
                // }

            }
        )
        this.add.existing(textPlayer);

        this.input.once('pointerdown', function () {
            textPlayer.playPromise('hello textplayer')
                .then(function () {
                    console.log('Play complete');
                })

            // text.showPage();  // Show all characters in this page
        })

        //QuizPromise(textPlayer, quizArr);
        console.log(db().first());
        console.log(db().last());
        //更新資料
        //db1({name:'Rick'}).update({name:'Green'})
        //get:將obj轉json
        //console.log('db get:' + db().get()[0].name);
        //console.log('db1 get:' + db1().get()[0].name);

        //loop
        print(db, cond, 'hp', 'asc');

        // where mp is equal to 40
        console.log('where mp is equal to 40')
        var cond = {mp:40};
        print(db, cond);

        // where gold is less than 150
        console.log('where mp<40, hp>80')
        var cond = {mp:{lt:40},hp:{gt:80}}; //大小寫敏感
        print(db, cond);

        // where name is like "Re"
        console.log('where name is like "Re"')
        var cond = {name:{like:"Re"}}; //大小寫敏感
        print(db, cond);


    }
}

var csvToJSONArr = function(csvstring){
    return Papa.parse(csvstring, { header: true, dynamicTyping: true }).data //.data取出json array
}

var print = function(db, cond, orderBy, asc){
    var sorter = orderBy + ' ' + (asc?'asec':'desc'); //注意升序是asec而非asc或asce
    db(cond).order(sorter).each(function (obj) { //注意order()和sort()不同，sort()會改變db內的順序
        console.log(obj.Index);
    });
}

var makeQuiz = function(db, qCnt){
    var randomQArr = Shuffle(db({FixIndex:'R'}).get());
    var fixedQDB = db({FixIndex:{'!is':'R'}})
    var fixedQArr = fixedQDB.get(); //取得固定題號的題目
    var fixedQArrIdxs = fixedQDB.select('Index'); //取得固定題號array
    var quizArr = [];
    for (let i = 0; i < qCnt; i++) {
        //此題號如果不是固定題號則隨機出題
        if (fixedQArrIdxs.indexOf(i) == -1){ 
            var quiz = randomQArr.pop();
            quizArr.push(quiz);
        }else{
            //此題號如果是固定題號則出固定題號的題目
            fixedQArr.forEach(function(fixedQ, index, arr){
                if(fixedQ['Index'] == i){
                    var quiz = fixedQ;
                    quizArr.push(quiz);
                }
            })
        }
    }
    console.log(JSON.stringify(quizArr));
    return quizArr;
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
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);