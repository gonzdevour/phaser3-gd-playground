import Card from './card';
import AreTheSame from './AreTheSame';

export default AreTheSameSuit;

declare function AreTheSameSuit(
    cards: Card.ICard[],
    returnDetail?: boolean,
): AreTheSame.IOutput;