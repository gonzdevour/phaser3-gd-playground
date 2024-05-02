import 'phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var sprite = this.add.image(512,400,'right').setScale(0.2,0.2)

        var upDown = this.tweens.add({
            targets: sprite,
            y: sprite.y - 100,
            ease: 'Cubic',
            duration: 300,
            yoyo: true,
            // repeat: -1,
            paused: true,
            persist: true,
        })

        this.input.on("pointerup",function(){
            if (upDown.isPlaying()) {
                //upDown.stop(); //stop後會刪除tween
                //upDown.complete(); //complete後會刪除tween
                //upDown.restart();
                upDown.pause();
                upDown.seek(0); //只有seek(0)等同於restart，所以要先pause起來
            } else {
                upDown.play();
            }
        },this)

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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);