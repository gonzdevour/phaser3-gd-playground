import Card from './card';

export default AreContinuous;

declare namespace AreContinuous {
    interface IOutput {
        property: string,
        result: boolean,
        catch: null | Card.ICardBase[]
    }
}

declare function AreContinuous(
    cards: Card.ICardBase[],
    property: string,
    returnDetail?: boolean,
): AreContinuous.IOutput;