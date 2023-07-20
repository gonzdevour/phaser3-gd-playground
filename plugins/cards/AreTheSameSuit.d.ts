import Card from './card';
import AreTheSame from './AreTheSame';

export default AreTheSameSuit;

declare function AreTheSameSuit(
    cards: Card.ICard[],
    returnDetail?: boolean,
    wildcard?: string,
): AreTheSame.IOutput;