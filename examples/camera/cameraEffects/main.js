import 'phaser/src/phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';
import CreateCameraEffectControlButtons from './scripts/CreateCameraEffectControlButtons';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var scene = this;
        var camera = scene.cameras.main;
        var viewport = scene.viewport;

        var bg = scene.add.image(0, 0, 'classroom')
            ._locate({layerName:"bg", vpx:0.5, vpy:0.5,})
            ._resizeByWidth(viewport.width)

        var buttons = CreateCameraEffectControlButtons(scene, camera);
    }
    update ()
    {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);