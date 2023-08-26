var avg = function (...arr) {
    return arr.reduce((a, b) => a + b) / arr.length;
}

export default avg;