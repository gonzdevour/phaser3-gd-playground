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
        var card = CreateCardBack(this, 'cardBg','cardFront', 'love & peace').setScale(0.2)

        // this.tweens.add({
        //     targets: card,
        //     y: '+=100',
        //     ease: 'Cubic',
        //     duration: 1000,
        //     yoyo: true,
        //     repeat: -1,
        // })

        // var txt = card.getElement('text').setColor('blue')
        // card.drawBounds(this.add.graphics(), 0xff0000)
    }
    update ()
    {
    }
}

var CreateCardBack = function(scene, bgKey, iconKey, text){
    var tempX = 500;
    var tempY = 500;
    var cardBuilder = scene.rexUI.add.label({
        background: bgKey?scene.add.image(tempX,tempY,bgKey):undefined,
        icon: iconKey?scene.add.image(tempX, tempY, iconKey):undefined,
        text: text?scene.rexUI.add.BBCodeText(tempX, tempY, text, { 
            fontSize: 36, 
            color:'red',
        }):undefined,
        draggable: true,
    })

    //cardBuilder.snapshot({padding: 3, saveTexture:'cardBackNew'});
    //cardBuilder.destroy();

    return cardBuilder //{key:'cardBackNew'}
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