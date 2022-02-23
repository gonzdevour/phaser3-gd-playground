import { DefaultQuizConfig } from '../DefaultData.js';
import Base from './Base.js';

class QuizConfig extends Base {
    constructor(model, dataManager) {
        super(model, dataManager, DefaultQuizConfig);
    }
}

export default QuizConfig;