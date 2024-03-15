import 'phaser';
import DisplayListMethods from 'rexnotePlugins/utils/gameobject/displaylist/DisplayListMethods';
import AllPlugins from 'gdkPlugins/AllPlugins.js';
import TagPlayer from "rexnotePlugins/tagplayer.js";
import ContainerLite from 'rexnotePlugins/containerlite.js';

import GetValue from "gdkPlugins/utils/object/GetValue";

Object.assign(
    Phaser.GameObjects.GameObject.prototype,
    DisplayListMethods
);//讓所有gameObject都有bringToTop這個method

class Actor extends ContainerLite {
    constructor(scene, actorID, x, y) {
        var sprite = scene.add.rexTransitionImage(0, 0, `char-${actorID}-normal0`, 0, {})
        super(scene, 0, 0, [sprite]); 
        Locate(scene, this, {instID: actorID, layerName: 'scenario_stage', viewport: scene.viewport, vpx: x, vpy: y})
    }
}

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var scene = this;
        var layerList = ['scenario_stage']
        scene.layerManager = scene.plugins.get('rexLayerManager').add(scene, layerList);
        scene.vpc = scene.plugins.get('rexViewportCoordinate');

        scene.rexScaleOuter.scale(); //scaleOuter在進入scene時不會自動執行
        scene.viewport = scene.rexScaleOuter.outerViewport; //on resize時scene.viewport不隨之變動

        var content = `<bg.家=家,0.5,0.5>
<char.Spring=Spring,0.3,0.5>
<wait=click>
<char.Jade=Jade,0.35,0.6>
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
            createGameObject: CreateBg,
            fade:500,
            })
            .playPromise(content);

    this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        var character = tagPlayer.getGameObject('char', 'Spring');
        console.log(`滾輪: deltaX=${deltaX}, deltaY=${deltaY}, deltaZ=${deltaZ}`);
    });

    }
}

var CreateBg = function (scene, bgID, x, y) {
    var bg = scene.add.rexTransitionImage(0, 0, bgID)
    Locate(scene, bg, {instID: 'scenario background', layerName: 'scenario_stage', viewport: scene.viewport, vpx: x, vpy: y})
    return bg;
}

var CreateText = function (scene, txtID,x,y) {
    var textObject = scene.add.text(0, 0, '', {});
    if (txtID) {
        var sprite = this.getSprite(txtID);  // this = tagPlayer
        textObject.setPosition(sprite.x, sprite.y - 20);
    }
    return textObject;
}

var CreateActor = function (scene, actorID, x, y) {
    //var newActor = new Actor(scene, actorID, x, y); //用containerLite包過，不影響結果
    var newActor = scene.add.rexTransitionImage(0, 0, `char-${actorID}-normal0`, 0, {}) //Locate後無法bringMeToTop
    //var newActor = scene.add.image(0, 0, `char-${actorID}-normal0`) //純的image，Locate後可以正常bringMeToTop
    Locate(scene, newActor, {instID: actorID, layerName: 'scenario_stage', viewport: scene.viewport, vpx: x, vpy: y})
    
    newActor.tagPlayer = this;
    scene.add.existing(newActor); //因為layer.add會將物件放進displayList中並排序，scene.add.exsiting也會，同時使用會導致順序錯亂
    //newActor.changeOrigin(200,200);
    return newActor;
}

var Locate = function(scene, target, config){

    var instID = GetValue(config, 'instID', undefined);
    if (target.instID == undefined){
      target.instID = instID;
    }
  
    var layerManager = scene.layerManager;
    var vpc = scene.vpc;

    var layerName = GetValue(config, 'layerName', 'main');
    var viewport = GetValue(config, 'viewport', scene.viewport);
    var vpx = GetValue(config, 'vpx', 0.5);
    var vpy = GetValue(config, 'vpy', 0.5);
    var vpxOffset = GetValue(config, 'vpxOffset', 0);
    var vpyOffset = GetValue(config, 'vpyOffset', 0);
  
    layerManager.addToLayer(layerName, target);
    vpc.add(target, viewport, vpx, vpy);
    target.vpxOffset = vpxOffset;
    target.vpyOffset = vpyOffset;
  
    return target; 
  }

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);