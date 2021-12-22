import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

import Boot from './scenes/Boot.js';
import MainMenu from './scenes/MainMenu.js';
import QuizConfig from './scenes/QuizConfig.js';
import Quiz from './scenes/Quiz.js';

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
    scene: [Boot, MainMenu, QuizConfig, Quiz]
};

var game = new Phaser.Game(config);