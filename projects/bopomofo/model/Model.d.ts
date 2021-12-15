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
    
    lsData: LocalStorageData;
    quiz: Quiz;
}