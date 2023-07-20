import Card from './card';
import AreContinuous from './AreContinuous';

export default AreContinuousNumber;

declare function AreContinuousNumber(
    cards: Card.ICard[],
    returnDetail?: boolean,
): AreContinuous.IOutput;