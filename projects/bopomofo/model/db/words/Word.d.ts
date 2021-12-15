import Character from '../characters/Character';

export default Word;

declare class Word {
    readonly word: string;
    readonly polyphonyCount: number;

    getCharacters(
        polyphonyIndex?: number
    ): Character[];

    getCharacterIndex(
        character: Character
    ): number;
}