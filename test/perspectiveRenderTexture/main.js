import phaser from 'phaser/src/phaser.js';
import Base from './Base.js';
import AllPlugins from '../../plugins/AllPlugins.js';
//gdk
import LoadingProgressUI from './gdk/loading/LoadingProgressUI.js';
//proj
import loadImageFromUrl from '../../plugins/utils/image/loadImageFromUrl.js';
import GetValue from '../../plugins/utils/object/GetValue.js';
import { TextStyle } from 'phaser/src/gameobjects';

const cors = window.location.hostname == 'localhost'?'https://cors-anywhere-playone.herokuapp.com/':'';

class Demo extends Base {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }

    create() {

        //測試外部讀取image(似乎必須透過cors-anywhere)
        var loadOnlineImagePromise = async function(scene, config){
            var x = GetValue(config, 'x', 0);
            var y = GetValue(config, 'y', 0);
            var imgKey = GetValue(config, 'imgKey', undefined);
            var url = GetValue(config, 'url', undefined);
            await loadImageFromUrl(scene, imgKey, url, LoadingProgressUI, 1000);

            var cardKey = 'cardFrontWithImage';
            DrawCard(scene, cardKey, 'cardBg', imgKey, 'cardFront');

            var card = scene.rexUI.add.perspectiveCard({
                x:x,
                y:y,    
                front: CreateLabel(scene, 'cardFrontWithImage', 'super rate card which every player want to get no matter what will happen.'),
                back: CreateLabel(scene, 'cardBack'),
                face: 'back',
        
                flip: {
                    frontToBack: 'right',
                    backToFront: 'left',
                    duration: 1000,
                    ease: 'Cubic-easeIn'
                }
            })
                .layout()
                // .setFace(0)
                // .setInteractive()
                // .on('pointerdown', function (pointer, localX, localY) {
                //     if (localX <= (this.width / 2)) {
                //         this.flip.flipLeft();
                //     } else {
                //         this.flip.flipRight(2000, 3);
                //     }
                // })

            // card.flip.on('complete', function(){
            //     card.flip.flipLeft();
            // })
            card.flip.flipRight(4000, 2);

            scene.tweens.timeline({
                targets: card,
                tweens:[
                {props:{
                    y:{value: {from: card.y-800, to: card.y}, ease: 'back'},
                    angle:{value: {from: 0, to: 362}, ease: 'cubic'},
                    scale:{value: {from:0, to:1}, ease: 'linear'},
                }, duration: 4000},
                {props:{
                    y: {value: {from: card.y, to: card.y-30}, ease: 'cubic-easeIn', duration: 1000},
                }, yoyo: true, repeat: -1},
                ]   
            })
            return card;
        }

        this.input.once('wheel', function () {
            var Card = loadOnlineImagePromise(this, {
                x: this.viewport.centerX, 
                y: this.viewport.centerY, 
                imgKey: 'resultHero', 
                url: cors + 'https://playoneapps.com.tw/File/Stand/Hero/image09.png'
            })
        },this)

    }

    update(){
        //eyeTracking(this);
    }
}

var Test = function(card){
    //debugger
    //card.angleY = 0;
    console.log('test card')
}

var DrawCard = function(scene, cardKey, bgKey, imgKey, frontKey){
    var bgFrame = scene.textures.getFrame(bgKey,0);
    var width = bgFrame.width;
    var height = bgFrame.height;
    var centerX = bgFrame.centerX;
    var centerY = bgFrame.centerY;
    var rt = scene.add.renderTexture(0, 0, width, height).setVisible(false);

    DrawFrame(rt, bgKey, centerX, centerY);
    DrawFrame(rt, imgKey, centerX, centerY);
    DrawFrame(rt, frontKey, centerX, centerY);

    rt.saveTexture(cardKey);
    rt.destroy();
}

var DrawFrame = function(rt, imgKey, x, y){
    var scene = rt.scene;
    var imgFrame = scene.textures.getFrame(imgKey,0);
    rt.draw(imgKey, x-0.5*imgFrame.width, y-0.5*imgFrame.height);
}

var CreateLabel = function(scene, imgKey, text){
    var label = scene.rexUI.add.label({
        icon: scene.add.image(0, 0, imgKey),
    })
    return label;
}

// var CreateLabel = function(scene, imgKey, text){
//     var label = scene.rexUI.add.label({
//         orientation:'y',
//         text: text?scene.add.text(0,0,text,{
//             fontSize:36,
//             //color: '0x0',
//             wordWrap: { width: 600 - 20 - 20 }
//         }):undefined,
//         icon: scene.add.image(0, 0, imgKey),
//         space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10, }
//     })
//     return label;
// }

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 768,
    height: 1334,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Demo,
};

var game = new Phaser.Game(config);