import * as Rules from '../../plugins/cards/index';

var cards = [
    { suit: 'A', number: 5 },
    { suit: 'B', number: 4 },
    { suit: 'C', number: 3 },
]

console.log(cards)

var result = Rules.AreContinuousNumber(cards);
console.log('AreContinuousNumber', result);

var result = Rules.AreContinuousNumber(cards, true);
console.log('AreContinuousNumber', result);

var result = Rules.AreTheSameSuit(cards);
console.log('AreTheSameSuit', result);

var result = Rules.AreDifferentSuit(cards);
console.log('AreDifferentSuit', result);

var result = Rules.AreDifferentSuit(cards) && Rules.AreTheSameNumber(cards);
console.log('AreDifferentSuit and AreTheSameNumber', result);

var result = Rules.AreTheSameNumber(cards, true);
console.log('AreTheSameNumber', result);

// Wildcard
var cards = [
    { suit: 'A', number: 5 },
    { suit: 'A', number: 4 },
    { suit: '*', number: '*' },
]

console.log(cards)

var result = Rules.AreTheSameSuit(cards);
console.log('AreTheSameSuit', result);

var result = Rules.AreDifferentSuit(cards);
console.log('AreDifferentSuit', result);


var cards = [
    { suit: 'A', number: 5 },
    { suit: 'B', number: 4 },
    { suit: '*', number: '*' },
]

console.log(cards)

var result = Rules.AreTheSameSuit(cards);
console.log('AreTheSameSuit', result);

var result = Rules.AreDifferentSuit(cards);
console.log('AreDifferentSuit', result);



var cards = [
    { suit: 'A', number: 5 },
    { suit: 'A', number: 7 },
    { suit: '*', number: '*' },
]

console.log(cards)

var result = Rules.AreContinuousNumber(cards);
console.log('AreContinuousNumber', result);

var result = Rules.AreContinuousNumber(cards, true);
console.log('AreContinuousNumber', result);

var cards = [
    { suit: 'A', number: 5 },
    { suit: 'A', number: 10 },
    { suit: '*', number: '*' },
]

console.log(cards)

var result = Rules.AreContinuousNumber(cards);
console.log('AreContinuousNumber', result);


// Repeated patterns
var cards = [
    { suit: 'A', number: 5 },
    { suit: 'B', number: 8 },
    { suit: 'C', number: 5 },
    { suit: 'D', number: 5 },
    { suit: 'B', number: 5 },
]

console.log(cards)

var result = Rules.GetRepeatedNumberPattern(cards, true);
console.log('GetRepeatedNumberPattern', result);


var cards = [
    { suit: 'A', number: 5 },
    { suit: 'B', number: 8 },
    { suit: 'C', number: 8 },
    { suit: 'C', number: 5 },
    { suit: 'B', number: 5 },
]

console.log(cards)

var result = Rules.GetRepeatedNumberPattern(cards, true);
console.log('GetRepeatedNumberPattern', result);


var cards = [
    { suit: 'A', number: 6 },
    { suit: 'B', number: 8 },
    { suit: 'C', number: 8 },
    { suit: 'C', number: 5 },
    { suit: 'B', number: 5 },
]

console.log(cards)

var result = Rules.GetRepeatedNumberPattern(cards, true);
console.log('GetRepeatedNumberPattern', result);