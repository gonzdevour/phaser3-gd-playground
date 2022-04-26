import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

//scenes
import Boot from './scenes/Boot.js';
import Home from './scenes/Home.js';
import Menu from './scenes/Menu.js';
import Game from './scenes/Game.js';
import Result from './scenes/Result.js';

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.RESIZE, //scaleOuter plugin需要RESIZE mode
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: [Boot, Home, Menu, Game, Result]
};

var game = new Phaser.Game(config);