export default Card;

declare namespace Card {
    interface ICard {
        suit: string | number,
        number: number,
    }
}