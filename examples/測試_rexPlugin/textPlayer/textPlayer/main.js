import 'phaser';
import DisplayListMethods from 'rexnotePlugins/utils/gameobject/displaylist/DisplayListMethods';
import AllPlugins from 'gdkPlugins/AllPlugins.js';
import TagPlayer from "rexnotePlugins/tagplayer.js";

Object.assign(
    Phaser.GameObjects.GameObject.prototype,
    DisplayListMethods
);//讓所有gameObject都有bringToTop這個method

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var scene = this;
        var content = `<char.Spring=Spring,300,300>
<wait=click>
<char.Jade=Jade,400,400>
<wait=click>
<char.Spring.bringMeToTop>`

        var tagPlayer = new TagPlayer(scene ,{
            texts: false,  //關閉預設物件
            sprites: false,//關閉預設物件
            parser: {
                delimiters: '<>',
                comment: '//'
            },
            sounds: {
              bgm: { 
                  initial: undefined,
                  loop: true,
                  fade: 500
              },
              bgm2: { //語音專用
                  initial: undefined,
                  loop: false,
                  fade: 0
              }
            },
        })

        tagPlayer
            .addGameObjectManager({
            name: 'char',
            createGameObject: CreateActor,
            fade:500,
            })
            .addGameObjectManager({
                name: 'text',
                createGameObject: CreateText,
                fade:500,
            })
            .addGameObjectManager({
            name: 'bg',
            createGameObject: scene.add.rexTransitionImage(0, 0, '家'),
            fade:500,
            })
            .playPromise(content);

    this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        var character = tagPlayer.getGameObject('char', 'Spring');
        console.log(`滾輪: deltaX=${deltaX}, deltaY=${deltaY}, deltaZ=${deltaZ}`);
    });

    }
}

var CreateText = function (scene, spriteName) {
    var textObject = scene.add.text(0, 0, '', {});
    if (spriteName) {
        var sprite = this.getSprite(spriteName);  // this = tagPlayer
        textObject.setPosition(sprite.x, sprite.y - 20);
    }
    return textObject;
}

var CreateActor = function (scene, actorID, x, y) {
    var newActor = scene.add.image(x, y, `char-${actorID}-normal0`);
    newActor.tagPlayer = this;
    scene.add.existing(newActor); //因為layer.add會將物件放進displayList中並排序，scene.add.exsiting也會，同時使用會導致順序錯亂
    //newActor.changeOrigin(200,200);
    return newActor;
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