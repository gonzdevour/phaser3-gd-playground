import SerializeMethods from './SerializeMethods.js';
import CreateQuestion from './characters/CreateQuestion.js';

var Methods = {
    createQuestion: CreateQuestion
}

Object.assign(
    Methods,
    SerializeMethods
);

export default Methods;