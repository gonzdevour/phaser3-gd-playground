+ db
  + characters
    + query
      + index.js
      ```
      整理所有Query方法 
      //被characters.js引入
      ``` 
      + Query.js
      ```
      用filter條件在characterCollection中查出字docArray後，以sortMode排序，最後map成new Character array。

      sortMode:
      case 1: bopomofo
      case 2: freq //頻次模式
      default

      //被index.js引入
      ```  
      + GetBopomofoFilter.js
      ```
      傳入注音，建立此注音的查找JSON
      //被QuryByBopomofo.js引入並執行
      ``` 
      + GetCombinedRhyme.js
      ```
      以media與vowel皆不為空值為條件的查找JSON
      //被BuildQuiz.js引入並執行
      ``` 
      + QueryByBopomofo.js
      ```
      依注音查找字集合
      //被index.js引入
      ``` 
      + QueryByID.js
      ```
      依ID查找字doc
      //被index.js引入
      ``` 
      + QueryCharacter.js
      ```
      依字查找字doc
      //被index.js引入
      ```        
      + QueryRandomCharacter.js
      ```
      查找隨機字doc
      //被index.js引入
      ```         
    + character.js
    ```
    傳入dbWrap,doc，依doc建立的character class:
    {
      dbWrap: dbWrap,
      doc: doc,
      character: doc.character,
      initials: doc.initials,
      media: doc.media,
      vowel: doc.vowel,
      tone: doc.tone,
      id: doc.$loki, //get
      dbId : dbWrap.id //get
      getWords(wordCount)
      getRandomWord()
    }
    //被Query.js引入
    ```
    + characters.js
    ```
    宣告Characters class，傳入DBWrap建立的query method：
    query(filter, sortMode)
    queryCharacter(character)//取得某字的doc
    queryRandomCharacter()//取得隨機字doc
    queryByID(id)//取得某ID的字doc
    queryByBopomofo(bopomofo)//依注音取字集doc
    getAll(sortMode)
    //被DBWrap.js引入
    //被Question.js呼叫(query)
    ```
  + words
    + Word.js
    ```
    宣告Word class，傳入DBWrap, doc
    {
      dbWrap: dbWrap,
      doc: doc,
      word: doc.word,
      id: doc.$loki,
      dbId: dbWrap.id,
      polyphonyCount() //此詞有幾組破音
      getCharacters(polyphonyIndex) //依序號取得破音詞的每個字組成的doc array
      getCharacterIndex(character) //以字來查此字為此詞中的第幾個字
    }
    //被Query.js引入並呼叫
    ```
    + Query.js
    ```
    宣告functions，將對loki word collection的控制包進functions裡，用來查找並回傳帶有dwWrap和doc的new Word:
    Query(dbWrap, filter)
    QueryWord(dbWrap, word)//取得某詞的doc
    QueryRandomWord(dbWrap)//取得隨機詞的doc
    QueryByID(dbWrap, id)//取得某ID的詞doc
    //被Words.js引入並呼叫
    ```
    + Words.js 
    ```
    宣告Words class，傳入DBWrap，包入以簡化Query.js的query methods：
    queryWord(word)
    queryRandomWord()
    queryByID(id)
    //被DBWrap.js引入
    //被Question.js呼叫(query)
    ```
+ Const.js
```
  const CharactersCollectionName = 'characters';
  const WordsCollectionName = 'words';
  就是db.collection的名字(字庫與詞庫)
//被CreateDB.js引入
```
+ CreateDB.js
```
  引入loki.js
  add字庫collection，欄位(indices)：
  ['character', 'initials', 'media', 'vowel', 'tone']
  add詞庫collection，欄位(indices)：
  ['word', 'freq']
//被DBWrap.js引入
//被PrebuildDB.js引入
```  
+ GetCollectionMethod.js
```
取出loki db collection
//被DBWrap.js引入
```
+ SerializeMethods.js
```
將.compress file(db0,db1)轉回db doc格式
//被DBWrap.js引入
```
+ DBWrap.js
```
宣告DBWrap class，傳入model, .compress，重建完整db物件回傳給model使用。//被Model.js引入
{
    model:model,
    id:db編號,
    db:將compress還原回db,
    wordCollection:GetWordCollection(this.db), //從loki取出word collection的method
    characterCollection:GetCharacterCollection(this.db), //從loki取出character collection的method
    words:class, //class內包含words的query fn
    characters:class //class內包含characters的query fn
}

import 
CreateDB               //CreateDB.js
StringToDB             //SerializeMethods.js //將.compress file(db0,db1)轉回db doc格式
GetWordCollection
GetCharacterCollection //GetCollectionMethods.js//取出loki db collection
Words                  //words/Words.js//內含words db的query fn
Characters             //characters/Characters.js //內含characters db的query fn

```
