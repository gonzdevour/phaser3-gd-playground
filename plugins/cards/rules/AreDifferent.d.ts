import Common from './Common';

export default AreDifferent;

declare namespace AreDifferent {
    interface IOutput extends Common.IOutput {
    }
}

declare function AreDifferent(
    cards: Object[],
    config: Common.IConfig,
): AreDifferent.IOutput;