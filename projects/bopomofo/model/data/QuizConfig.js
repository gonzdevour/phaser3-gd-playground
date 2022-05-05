import Base from './Base.js';

const DefaultQuizConfig = {
    database: '高頻詞庫',
    enhancement: '無',
    mode: '隨機'
}

class QuizConfig extends Base {
    constructor() {
        super('bopomofo.quizConfig', DefaultQuizConfig);
    }
}

export default QuizConfig;