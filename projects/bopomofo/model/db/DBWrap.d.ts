import Words from './words/Words';
import Characters from './characters/Characters';

export default DBWrap;

declare class DBWrap {
    readonly words: Words;
    readonly characters: Characters;
}