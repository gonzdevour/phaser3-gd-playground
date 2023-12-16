import phaser from 'phaser/src/phaser.js';
import AllPlugins from '../../../plugins/AllPlugins.js';
import { DefaultAppConfig } from '../DefaultData.js';

var config = {
    title: DefaultAppConfig.appID,
    type: Phaser.AUTO,
    parent: 'game',
    width: DefaultAppConfig.width,
    height: DefaultAppConfig.height,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: DefaultAppConfig.scenes,
};

var game = new Phaser.Game(config);