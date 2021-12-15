import Question from './question/Question';

export default Quiz;

declare class Quiz {
    questionIndex: number;
    reset(): this;

    clearQuestions(): this;

    addQuestion(
        config: Question.IConfig
    ): this;

    shuffleQuestions(): this;

    questions: Question[];
    nextQuestion: Question;
    isLastQuestion: boolean;
}