import SerializeMethods from './SerializeMethods.js';
import LoadCharactersCSV from './LoadCharactersCSV.js';
import LoadCharactersText from './LoadCharactersText.js';
import SaveLoadDBMethods from './SaveLoadDBMethods.js';
import CreateQuestion from './question/CreateQuestion.js';

var Methods = {
    loadCharactersCSV: LoadCharactersCSV,
    loadCharactersText: LoadCharactersText,

    createQuestion: CreateQuestion
}

Object.assign(
    Methods,
    SerializeMethods,
    SaveLoadDBMethods
);

export default Methods;