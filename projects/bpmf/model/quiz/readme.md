quiz
+ answer
  + Answer.js
  ```
  設定答案、建立選項群、驗證答案的class
  ``` 
  + CreateChoices.js
  ```
  依條件建立選項群並將正確答案塞入選項中，
  判斷是否洗牌，將選項群回傳給Answer物件備用。
  ``` 
+ question
  + ParseChoiceConfig.js
  ```
  將強化模式參數如'ㄓㄗ'轉換為config = { initials: 'ㄓㄗ' }
  再回傳給Question.answer.createChoices用來建立選項群
  ``` 
  + Question.js 
  ```
  -出題：給詞取隨機字|給詞&字序號|給字取隨機詞|給詞&字
  -使用Answer設定答案、驗證答案
  -toJSON, fromJSON的存讀功能
  -取出破音詞的拼音組合
  ``` 
+ Quiz.js
```
題組控制器：
-可轉JSON儲存、可從JSON讀取重建題組
-新增題目、洗牌題目、清除題組、取得下一題、判斷是否最後一題
```