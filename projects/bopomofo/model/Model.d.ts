import DBWrap from './db/DBWrap';
import LocalStorageData from '../../../../phaser3-rex-notes/plugins/localstorage-data';
import Quiz from './quiz/Quiz';

export default Model;

declare namespace Model {
    interface IConfig {
        db?: any
    }
}

declare class Model {
    constructor(
        config?: Model.IConfig
    );

    db: DBWrap[];
    lsData: LocalStorageData;
    quiz: Quiz;
}