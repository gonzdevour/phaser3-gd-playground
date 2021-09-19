import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

import Test from './scenes/Test.js';

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scale: {
        // mode: Phaser.Scale.ENVELOP,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

var game = new Phaser.Game(config);