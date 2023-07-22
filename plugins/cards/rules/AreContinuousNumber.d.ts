import Card from '../card';
import Common from './Common';

export default AreContinuousNumber;

declare function AreContinuousNumber(
    cards: Card.ICard[],
    returnDetail?: boolean,
    wildcard?: string,
): boolean | Common.IOutput;