+ bopomofo.js

  1. 建立Bopomofo注音符號分析表
  2. 建立isInitial, isMedia, isVowel, isTone函數，傳入單一符號可判斷其是否屬於initial, media, vowel, tone並回傳boolean
  ```
  //被ParseBopomofo.js引入
  ```

+ ParseBopomofo.js

    ParseBopomofo是WordDataListToDB的子功能。傳入一組拼音，透過Bopomofo分析表，建立out.initial, out.media, out.vowel, out.tone，並回傳out，完成characterData。
    ```
    //被WordDataListToDB引入

    // Build json data of characterDoc
    var characterData = ParseBopomofo(pinyin, { character: word.charAt(c) });
    //處理完的out = { character: 詞條的第c個字, initial:, media:, vowel:, tone: }
    ```