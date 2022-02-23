import DBWrap from './db/DBWrap';
import LocalStorageData from '../../../../phaser3-rex-notes/plugins/localstorage-data';
import QuizConfig from './data/QuizConfig';
import Quiz from './quiz/Quiz';

export default Model;

declare namespace Model {
    interface IConfig {
        db?: any
    }

    interface IQuizConfig {
        database: string,
        enhancement: string,
        mode: string
    }
}

declare class Model {
    constructor(
        config?: Model.IConfig
    );

    db: DBWrap[];
    lsData: LocalStorageData;
    quizConfig: QuizConfig;
    quiz: Quiz;
}