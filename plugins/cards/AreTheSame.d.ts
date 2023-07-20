import Common from './Common';
import Card from './card';

export default AreTheSame;

declare namespace AreTheSame {
    interface IOutput extends Common.IOutput {
    }
}

declare function AreTheSame(
    cards: Card.ICardBase[],
    config: Common.IConfig,
): AreTheSame.IOutput;