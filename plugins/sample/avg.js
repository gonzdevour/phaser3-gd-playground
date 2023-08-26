import SetValue from '../../../phaser3-rex-notes/plugins/utils/object/SetValue.js';

var avg = function (...arr) {
    return arr.reduce((a, b) => a + b) / arr.length;
}

SetValue(window, 'GD.Average', avg);

export default avg;