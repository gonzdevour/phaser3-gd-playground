import QuizPanel from '../../../gameobjects/quizpanel/QuizPanel';
import Quiz from '../../../model/quiz/Quiz';
import Question from '../../../model/quiz/question/Question';
import Word from '../../../model/db/words/Word';
import Character from '../../../model/db/characters/Character'

export default QuizPromise;

declare namespace QuizPromise {
    interface IVerifyResult {
        result: boolean,
        input: Question.IVerify,
        word: Word,
        character: Character
    }
}

declare var QuizPromise:
    (
        quizPanel: QuizPanel,
        quiz: Quiz
    ) => Promise<QuizPromise.IVerifyResult>

