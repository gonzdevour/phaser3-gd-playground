import Card from '../card';
import Common from './Common';

export default AreTheSameNumber;

declare function AreTheSameNumber(
    cards: Card.ICard[],
    returnDetail?: boolean,
    wildcard?: string,
): boolean | Common.IOutput;