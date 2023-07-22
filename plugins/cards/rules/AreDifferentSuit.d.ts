import Card from '../card';
import Common from './Common';

export default AreDifferentSuits;

declare function AreDifferentSuits(
    cards: Card.ICard[],
    returnDetail?: boolean,
    wildcard?: string,
): boolean | Common.IOutput;