/* 
Model
  .db[0,1]
    .loki的函數群
    .wordsCollection //loki
    .charactersCollection //loki
    .Words
      .dbWrap
      .queryWord(word)
      .queryRandomWord()
      .queryByID(id)
      return Word
        .dbWrap
        .doc //wordsCollection
        .word
        .id //doc.$loki
        .dbId //dbWrap.id
        .polyphonyCount //此詞有幾組破音
        .getCharacters(polyphonyIndex) //依序號取得破音詞的每個字組成的doc array
        .getCharacterIndex(character) //以字來查此字為此詞中的第幾個字
    .Characters
      .dbWrap
      .query(filter, sortMode)
      .queryCharacter(character)
      .queryByID(id)
      .queryByBopomofo(bopomofo)
      .getAll(sortMode)
      return Character
        .dbWrap
        .doc //charactersCollection
        .character
        .initials
        .media
        .vowel
        .tone
        .id //doc.$loki
        .dbId //dbWrap.id
        .getWords(wordCount)
        .getRandomWord()
  .appData
    .loadQuizConfig() //從ls中取出紀錄並重建回QuizConfig
    .save(config) //將JSON(限於DefaultData中的key)存入ls
  .lsData
  .speech
  .sound
  .quiz
    .model
    .questions //題組array
    .questionIndex //題號索引
    .toJSON() //將目前設定好的題組與目前題號轉JSON
    .fromJSON(json) //從JSON讀取，重建題組與目前題號
    .reset() //題號歸0，從頭開始
    .nextQuestion //以屬性形式回傳下一個question
    return question
      .title //題目標題
      .word //詞
      .characters //詞的字array
      .character //字
      .characterIndex //字在詞裡的序號
      .answer //answer class
        .answer //包含字與拼音資料的物件
          .character
          .initials
          .media
          .vowel
          .tone
        .setAnswer(character) //用來設定answer物件的函數
        .createChoices(config) //建立選項群，例如強化練習模式'ㄓㄗ'會轉換為config = { initials: 'ㄓㄗ' }
        .verify(input) //比對答案
      .choiceConfig //選項群的config
      .choices //toJSON時存入的choiceConfig在fromJSON時會存入quiestion.choices
      .toJSON() //將題目轉JSON
      .FromJSON(model, json) //將JSON重建為題目(static function)
      .getPolyphonyCharacter() //從詞取出破音詞(第二組)的拼音組合(用word class)
      .createChoices() //建立選項群(用answer class)
      .setAnswer(character) //設定答案(用answer class)
      .verify(input) //比對答案(用answer class)
    .isLastQuestion //是不是最後一題T/F
    .addQuestion(config) //config可以是JSON(from BuildQuiz)也可以是Question(ls fromJSON)
    .shuffleQuestions() //題庫洗牌
    .clearQuestions() //清空questions array，題號歸0
*/

import Quiz from './quiz/Quiz.js';
import CreateModelDB from '../build/model/CreateModelDB.js';

//utils
import GetValue from '../../../plugins/utils/object/GetValue.js';

class Model {
  constructor(config) {

    //依附在model上以跨scene使用的工具包

    this.lsData = config.lsData;
    this.appData = config.appData;
    this.localization = config.localization; //loc table
    this.rtt = config.rtt; //realTimeTimer
    //this.tableManager = new TableManager(this.lsData);

    //題庫架構
    
    //從CreateModel傳入config: {db: [this.cache.text.get("db0"), this.cache.text.get("db1")];}
    this.db = CreateModelDB(GetValue(config, 'db', []));
    // 同時間只能有一個題組在執行
    this.quiz = new Quiz(this);
  }
  setCurrentDB(config) { //將QuizConfig存入ls
    switch (config.database) { //指定是哪一個題庫(每個題庫都已經prebuild好了)
      case '高頻詞庫':
          this.currentDB = this.db[0];
          this.currentDBIndex = 0;
          break; 
      case '常用詞庫':
          this.currentDB = this.db[1];
          this.currentDBIndex = 1;
          break;
    }
    return this;
  }
}

export default Model;