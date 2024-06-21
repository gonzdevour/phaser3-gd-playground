import 'phaser/src/phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var scene = this;
        var text = this.rexUI.add.BBCodeText(0,0,'click to play sound')
        var soundFade = scene.plugins.get('rexSoundFade');

        var se = scene.sound.add("right");

        this.input.on("pointerup", function(){
            se.play();
        })

        this.input.on("wheel", function(){
            se.setVolume(1);
            soundFade.fadeOut(se, 100);
        })
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