import SerializeMethods from './SerializeMethods.js';
import CreateQuestion from './question/CreateQuestion.js';

var Methods = {
    createQuestion: CreateQuestion
}

Object.assign(
    Methods,
    SerializeMethods
);

export default Methods;