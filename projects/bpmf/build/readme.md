### control\quiz
  + BuildQuiz.js
  ```
  從題庫建立題組回傳quiz，送到QuizPromise跟quizpanel組合。被Quiz scene呼叫。
  ``` 
  + QuizPromise.js
  ```
  將QuizPanelPromise和QuizResultModalPromise包在QuizPromise裡面，形成三階段生命循環。被Quiz scene呼叫。

  QuizPromise: 
  是題組的大循環，功能包含：
  1.判斷是否最後一題決定大循環是否結束
  2.如果不是最後一題，執行QuizPanelPromise
  3.QuizResultModalPromise顯示上一題作答結果，並等待被確認
  
  QuizPanelPromise:
  執行SetupQuizPanel(組合quiz吐出的新question和quizpanel)並等待作答結果回傳

  QuizResultModalPromise:
  顯示/確認專用的訊息彈出工具的promise
  ``` 
  + SetupQuizPanel.js
  ``` 
  組合question和quizpanel，設定標題、選項、答案驗證callback
  ``` 
### model
  + CreateModel.js
  ```
  在boot scene呼叫，用db cache array建立model，並透過base scene class將model存入Model變數。model集合專案中的各種邏輯功能，是所有method與屬性的核心。
  ``` 
### prebuilddb
  + PrebuildDB.js
  ```
  在build-db.js被呼叫，將csv重組後建立db並壓縮後另存為.compress檔，提供boot scene讀入。※注意PrebuildDB相關功能雖然屬於model資料夾，但methods並未納入model物件下。
  ``` 
### view
  + mainmenupanel 
    + CreateMainMenuPanel.js
    ```
    建立首頁面板，註冊按鈕onClick-emit事件，回傳overlapSizer到MainMenu scene再用on接收事件後處理start scene
    ``` 
  + modeldialog
    + CreateModalDialog.js
    + ModalDialogPromise.js
  + quizconfigpanel
    + CreateDatabaseSelectPanel.js
    + CreateEnhancementSelectPanel.js
    + CreateQuizConfigPanel.js
    + CreateQuizModelPanel.js
    + CreateTitleLabel.js
    + Option.js
  + quizpanel
    + CreateActions.js
    + CreateCharacter.js
    + CreateChoices.js
    + CreateQuizPanel.js
    + CreateTitle.js
    + CreateWord.js
    + QuizResultModalPromise.js
  + style
    + CreateButtonBackground.js
    + CreateRoundRectangleBackground.js
    + CreateText.js
    + Style.js