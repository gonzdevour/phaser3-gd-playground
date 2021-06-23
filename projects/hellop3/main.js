import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

import Boot from './scenes/Boot.js';
import Game1 from './scenes/Game1.js';
import Game2 from './scenes/Game2.js';

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 616,
    height: 1334,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Boot, Game1, Game2]
};

var game = new Phaser.Game(config);