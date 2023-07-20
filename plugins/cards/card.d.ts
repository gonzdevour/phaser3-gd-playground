export default Card;

declare namespace Card {
    type IDType = string | number;

    interface ICard {
        suit: IDType,
        number: IDType,
    }
}