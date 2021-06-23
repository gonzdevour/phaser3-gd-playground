import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
// STEP 1: Add the libraries with "npm install phaser enable3d"
import enable3d, { Canvas } from 'enable3d';

import Boot from './scenes/Boot.js';
import Game from './scenes/Game.js';

var config = {
    // STEP 2: Set type to Phaser.WEBGL
    type: Phaser.WEBGL,
    parent: 'game',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Boot, Game],
    // STEP 3: Add a custom canvas
    // The default Phaser canvas is not compatible with three.js
    ...Canvas()
};

window.addEventListener('load', () => {
    // STEP 4: Wrap enable3d around your Phaser game.
    // (First copy all ammo file from 'node_modules/enable3d/lib/ammo' to your public folder.)
    enable3d(() => new Phaser.Game(config)).withPhysics('./')
})