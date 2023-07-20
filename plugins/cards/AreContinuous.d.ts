import Common from './Common';
import Card from './card';

export default AreContinuous;

declare namespace AreContinuous {
    interface IOutput extends Common.IOutput { }
}

declare function AreContinuous(
    cards: Card.ICardBase[],
    config: Common.IConfig,
): AreContinuous.IOutput;