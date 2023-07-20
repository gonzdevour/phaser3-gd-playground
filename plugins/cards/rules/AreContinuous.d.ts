import Common from './Common';

export default AreContinuous;

declare namespace AreContinuous {
    interface IOutput extends Common.IOutput { }
}

declare function AreContinuous(
    cards: Object[],
    config: Common.IConfig,
): boolean | AreContinuous.IOutput;