import Card from './card';

export default AreTheSame;

declare namespace AreTheSame {
    interface IOutput {
        property: string,
        result: boolean,
        catch: null | Card.ICardBase[]
    }
}

declare function AreTheSame(
    cards: Card.ICardBase[],
    property: string,
    returnDetail?: boolean,
): AreTheSame.IOutput;