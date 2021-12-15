import Character from '../../db/characters/Character';
import Word from '../../db/words/Word';

export default Question;

declare namespace Question {

    interface IChoice {
        initials: string[],
        media: string[],
        vowel: string[],
        tone: string[],
    }

    interface IConfig {
        title?: string,
        word?: Word,
        character?: Character | number,
        choices?: string | Question.IChoice
    }

    interface IVerify {
        initials: string,
        media: string,
        vowel: string,
        tone: string
    }
}

declare class Question {

    title: string;
    word: Word;
    characters: any;
    character: Character;
    characterIndex: number;

    getPolyphonyCharacter(): Character;
    createChoices(): Question.IChoice;

    setAnswer(character: Character): this;

    verify(
        input: Question.IVerify
    ): boolean;

}