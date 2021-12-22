import Word from '../words/Word';

export default Character;

declare class Character {
    readonly character: string;
    readonly initials: string;
    readonly media: string;
    readonly vowel: string;
    readonly tone: string;
    readonly freq: number;

    getWords(
        wordCount?: number
    ): Word[];

    getRandomWord(): Word;
}