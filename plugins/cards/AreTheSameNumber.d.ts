import Card from './card';
import AreTheSame from './AreTheSame';

export default AreTheSameNumber;

declare function AreTheSameNumber(
    cards: Card.ICard[],
    returnDetail?: boolean,
): AreTheSame.IOutput;