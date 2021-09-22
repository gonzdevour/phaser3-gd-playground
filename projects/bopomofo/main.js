import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

import Boot from './scenes/Boot.js';
import Game from './scenes/Game.js';

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Boot, Game]
};

var game = new Phaser.Game(config);