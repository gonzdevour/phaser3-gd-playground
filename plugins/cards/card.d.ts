export default Card;

declare namespace Card {
    type IDType = string | number;

    interface ICard {
        owner: IDType,
        suit: IDType,
        number: IDType,
    }
}