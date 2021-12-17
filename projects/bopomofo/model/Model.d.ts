import DBWrap from './db/DBWrap';
import LocalStorageData from '../../../../phaser3-rex-notes/plugins/localstorage-data';
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
    quiz: Quiz;

    getQuizConfig(): Model.IQuizConfig;

    setQuizConfig(
        config: Model.IQuizConfig
    ): this;
}