import CSVToHashTable from '../../../../phaser3-rex-notes/plugins/csvtohashtable.js';
import { DefaultAppConfig } from '../DefaultData.js';
//proj
import CreateQuiz from './CreateQuiz.js';
import CreateWaitingDialog from './CreateWaitingDialog.js';
import CreateCard from './CreateCard.js';
//utils
import GetRandom from '../../../plugins/utils/array/GetRandom.js';

//每次答題後計算結果並回傳

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

//quiz流程

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

var SetupTextPlayer = async function (textPlayer, question, onSubmit) { //清理上一題，並將新題目與panel組合起來，以作答callback回傳給QuizPromise
  textPlayer.question = question;
  var result = await CreateWaitingDialog(textPlayer);
  if (onSubmit) { //如果有傳入callback function
      onSubmit(result); //呼叫callback，完成QuizPanelPromise，讓QuizPromise吐出next question循環
  }
  return textPlayer;
}

var result = async function(scene, textPlayer, tbOut){
    textPlayer.backTween.play();
    var cardText = {
        name: tbOut.get(tbOut.curChampKey, 'name'),
        slogan: tbOut.get(tbOut.curChampKey, 'slogan'),
        say: tbOut.get(tbOut.curChampKey, 'say'),
        description: tbOut.get(tbOut.curChampKey, 'description')
    }
    var imgUrl = 'https://playoneapps.com.tw/File/Stand/Hero/image0' + tbOut.get(tbOut.curChampKey, 'img') + '.png';
    var card = await CreateCard(scene, {
        x: scene.viewport.centerX,
        y: scene.viewport.centerY,
        text: cardText,
        imgKey: 'resultHero',
        url: DefaultAppConfig.cors + imgUrl
    })
    textPlayer.height = 200;
    textPlayer.y = textPlayer.y -200;
    await textPlayer.playPromise('您的獸魂鑒定結果是：')
}

//執行quiz

var StartQuiz = function(scene, textPlayer){
  //建立測試結果列表資料
  var tbIntroHeroes = new CSVToHashTable().loadCSV(scene.cache.text.get('introHeroes'));
  //console.log(tbIntroHeroes.get('12', 'name'))//測試CSVToHashTable是否讀取成功

  //建立題庫
  var csvstring = scene.cache.text.get('questions');
  var quizArr = CreateQuiz(csvstring,1); //將csv轉taffydb並從中取出10題
  quizArr.forEach(function(item, index, arr){
      console.log(JSON.stringify(item['A1']));
  })

  //啟動問答
  QuizPromise(textPlayer, quizArr, tbIntroHeroes)
  .then(function(tbOut){
    result(scene, textPlayer, tbOut)//問答結束

  })
}

export default StartQuiz;