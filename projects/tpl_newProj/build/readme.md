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
  + 首頁面板 - mainmenupanel  
    + CreateMainMenuPanel.js
    ```
    建立首頁面板，註冊按鈕onClick-emit事件，回傳overlapSizer到MainMenu scene再用on接收事件後處理start scene
    ``` 
  + 彈出式對話框 - modaldialog
    + CreateModalDialog.js
    ```
    被ModalDialogPromise呼叫，
    建立dialog子元件群後組成rexUI dialog
    ``` 
    + ModalDialogPromise.js
    ```
    將dialog再包裝為modal，並建立promise
    (dialog收到button.click事件後，執行關閉modal的指令)
    ``` 
  + 選擇面板 - quizconfigpanel
    + CreateDatabaseSelectPanel.js
    ```
    題庫選擇面板：
    建立database buttons，以buttons.value = button.name觸發button的setValueCallback，執行改變button外觀。同時buttons.value也代表選中了哪個選項。
    ``` 
    + CreateEnhancementSelectPanel.js
    ```
    強化練習模式選擇面板：
    同上，建立enhancement buttons
    ``` 
    + CreateQuizModelPanel.js
    ```
    出題模式選擇面板：
    同上，建立mode buttons
    ``` 
    + CreateQuizConfigPanel.js
    ```
    組合上面三個面板，建立開始練習按鈕以回傳面板選擇結果給scene/QuizConfig.js
    ``` 
    + CreateTitleLabel.js
    ```
    輔助三面板上方建立title和help按鈕，help按鈕會在各面板建立時用getElement('help').onClick來褂上ModalDialogPromise(彈出式訊息面板)
    ``` 
    + Option.js
    ```
    三面板的所有可能選項，預設值放在model/DefaultData.js
    ``` 
  + 題目與作答面板 - quizpanel
    + CreateActions.js
    ```
    建立橫向左右對齊的清除與送出按鈕
    ``` 
    + CreateTitle.js
    ```
    建立標題label組件
        
    ``` 
    + CreateCharacter.js
    ```
    建立字與注音的label群後，透過gameobjects/Character.js的new Character(包含new Bopomofo)進行排列。
    
    ※注意Create階段並不給予text內容，而只是將組件排版，以下同。
    但為了避免bopomofo空值時Character區域被擠壓，所以在這裡給組件一個常數來設定MinSize
    ``` 
    + CreateWord.js
    ``` 
    建立character群後存入config array，再以config建立new Word並layout
    為了避免字數少於4時word區域被擠壓，所以在這裡給組件一個常數來設定MinHeight
    ``` 
    + CreateChoices.js
    ```
    先依常數建立choices組件，如需增減按鈕數如強化模式僅指定2或3個initials/vowels時，會在choice class執行setChoicesText時判斷是否有值來控制組件的hide/show，接著在SetupQuizPanel時，執行quizPanel.layout()就會看到組件增減變化
    ``` 
    + CreateQuizPanel.js
    ```
    將title, word, choices, actions組合起來成為quizPanel，同時在上述各組件掛上操作與數值變化事件。
    ``` 
    + QuizResultModalPromise.js
    ```
    答對回傳打勾圖片，答錯回傳正確答案的character物件，以Modal形式顯示
    ``` 
  + 輔助樣式 - style
    + CreateButtonBackground.js
    ```
    用canvas技巧畫出choices按鈕的裝飾
    ``` 
    + CreateRoundRectangleBackground.js
    ```
    圓角按鈕底圖
    ``` 
    + CreateText.js
    ```
    沒用到
    ``` 
    + Style.js
    ```
    panel在create階段用到的樣式表
    ``` 