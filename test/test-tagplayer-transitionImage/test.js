import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import TagPlayer from '../../../phaser3-rex-notes/plugins/tagplayer.js';
import CreateChar from './scripts/CreateChar.js';
import CreateTextbox from './scripts/CreateTextbox.js';
import content from './scripts/CreateContent.js';

class Test extends Phaser.Scene { //'#000000'
    constructor() {
        super({
            key: 'test'
        })
    }
    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }
    create() {
        this.add.image(512,400,'house');

        var tagPlayer = new TagPlayer(this ,{
            parser: {
                delimiters: '<>',
                comment: '//'
            },
            texts: {
                createGameObject: CreateTextbox //這是callback，不用先給參數，由content的text tag來呼叫
            },
            sprites: {
                createGameObject: CreateChar //這是callback，不用先給參數，由content的sprite tag來呼叫
            }
        })
            .playPromise(content)
            .then(function () {
                console.log('Complete')
            })
    }
    update() { }
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