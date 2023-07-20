export default Card;

declare namespace Card {
    type IDType = string | number;

    interface ICardBase {

    }

    interface ICard extends ICardBase {
        owner: IDType,
        suit: IDType,
        number: IDType,
    }
}