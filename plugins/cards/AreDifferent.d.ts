import Card from './card';

export default AreDifferent;

declare namespace AreDifferent {
    interface IOutput {
        property: string,
        result: boolean,
        catch: null | Card.ICardBase[]
    }
}

declare function AreDifferent(
    cards: Card.ICardBase[],
    property: string,
): AreDifferent.IOutput;