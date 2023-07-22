import Card from '../card';
import Common from './Common';

export default AreTheSameSuit;

declare function AreTheSameSuit(
    cards: Card.ICard[],
    returnDetail?: boolean,
    wildcard?: string,
): boolean | Common.IOutput;