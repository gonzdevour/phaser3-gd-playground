import Word from './Word';

export default Words;

declare class Words {
    queryWord(
        word: string
    ): Word[];

    queryRandomWord(
    ): Word;

    queryByID(
        id: string
    ): Word;

}