import 'phaser/src/phaser';
import { DefaultAppConfig } from '../settings/DefaultData.js';

var config = {
    title: DefaultAppConfig.appID,
    type: Phaser.AUTO,
    parent: 'game',
    width: DefaultAppConfig.width,
    height: DefaultAppConfig.height,
    scale: {
        mode: DefaultAppConfig.scaleMode,
        autoCenter: DefaultAppConfig.scaleAutoCenter,
    },
    plugins: DefaultAppConfig.plugins,
    scene: DefaultAppConfig.scenes,
};

var game = new Phaser.Game(config);