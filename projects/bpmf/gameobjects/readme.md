### gameobjects
+ Bopomofo.js
```
Bopomofo Sizer，將注音排版(注意輕聲與其他聲調的排版軸向)。提供設定注音的函數。
``` 
+ Character.js
```
Character Sizer，以字label和bopomofo組成字，提供設定字與注音的函數。
``` 
+ Word.js
```
Word Sizer，以Characters組成詞。提供依字序控制字等函數。
``` 
+ Choices.js
```
Choices Sizer，對initials, media, vowel, tone各給一組橫排buttons，並將每組buttons豎排進sizer裡。提供設定與取出選項選擇狀態等函數。
``` 
+ QuizPanel.js
```
將上述各元件組為面板，整合函數呼叫
``` 
+ quizpanel.js
```
整理gameobjects用的index，以便匯入時使用import {OOO} from <path>/quizpanel.js
``` 