import Common from './Common';

export default AreTheSame;

declare namespace AreTheSame {
    interface IOutput extends Common.IOutput {
    }
}

declare function AreTheSame(
    cards: Object[],
    config: Common.IConfig,
): AreTheSame.IOutput;