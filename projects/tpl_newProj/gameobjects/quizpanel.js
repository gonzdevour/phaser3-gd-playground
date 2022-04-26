/*

- QuizPanel
    - title
    - Word
        - Character
            - _character : Label
            - _bopomofo : Labels
                - _initials : Label
                - _media : Label
                - _vowel : Label
                - _tone : Label
                - _tone0 : Label
    - Choices
    - actions : Labels

*/

//整理gameobjects用的index，以便匯入時使用import {OOO} from <path>/quizpanel.js
import Character from "./character/Character.js";
import Word from "./word/Word.js";
import Choices from "./choices/Choices.js";
import QuizPanel from "./quizpanel/QuizPanel.js";

export {
    Character,
    Word,
    Choices,
    QuizPanel,
}