import Card from './card';
import AreDifferent from './AreDifferent';

export default AreDifferentSuits;

declare function AreDifferentSuits(
    cards: Card.ICard[],
    returnDetail?: boolean,
    wildcard?: string,
): AreDifferent.IOutput;