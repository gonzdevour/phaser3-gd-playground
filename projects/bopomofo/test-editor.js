import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

import Test from './scenes/TestEditor.js';

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1920,
    height: 1080,
    scale: {
        // mode: Phaser.Scale.ENVELOP,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

var game = new Phaser.Game(config);