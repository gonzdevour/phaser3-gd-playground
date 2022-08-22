import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }
    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }
    create() {
        var image = this.add.rexTransitionImage(512, 950, 'test-normal0', 0, {
            })
            .setOrigin(0.5,1)
            .setData({
                charName:'test',
                charExpressionIndex:0,
                charExpression:'normal',
            })

        image.setData({
            charTextureKey: charGetTextureKey(image)
            })
            .on('changedata-charTextureKey', function(gameObject, value, previousValue){
                image.transit(value, 0);
            })

        this.input.on('pointerup',function(pointer){
            if ( image.getData('charExpression') == 'normal'){
                image.setData({
                    charExpressionIndex:0,
                    charExpression:'angry',
                })
                image.setData('charTextureKey', charGetTextureKey(image))
            } else {
                image.setData({
                    charExpressionIndex:0,
                    charExpression:'normal',
                })
                image.setData('charTextureKey', charGetTextureKey(image))
            }
        },this)
    }
    update() { }
}

var charGetTextureKey = function(char){
    var charName = char.getData('charName');
    var charExpressionIndex = char.getData('charExpressionIndex');
    var charExpression = char.getData('charExpression');
    var key = charName + '-' + charExpression + charExpressionIndex;
    return key;
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

var game = new Phaser.Game(config);