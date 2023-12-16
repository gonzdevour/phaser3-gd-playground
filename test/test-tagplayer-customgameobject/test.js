import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import TagPlayer from '../../../phaser3-rex-notes/plugins/tagplayer.js';
import CreateActor from './scripts/CreateActor.js';
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
            texts: false,  //關閉預設物件
            sprites: false,//關閉預設物件
            parser: {
                delimiters: '<>',
                comment: '//'
            },
        })
        tagPlayer
            .addGameObjectManager({
                name: 'char',
                createGameObject: CreateActor,
                fade:500,
            })
            .on('+fadeOutAllTalk', function(parser, a, b) {
                var allChars = tagPlayer.getGameObject('char');
                for (var key in allChars) {
                    var char = allChars[key];
                    char.stopTalk();
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