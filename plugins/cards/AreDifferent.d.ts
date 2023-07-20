import Common from './Common';
import Card from './card';

export default AreDifferent;

declare namespace AreDifferent {
    interface IOutput extends Common.IOutput {
    }
}

declare function AreDifferent(
    cards: Card.ICardBase[],
    config: Common.IConfig,
): AreDifferent.IOutput;