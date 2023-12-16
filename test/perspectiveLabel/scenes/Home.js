import Base from './Base.js';
import { DefaultAppConfig } from '../DefaultData';
//gdk
import LoadingProgressUI from '../gdk/loading/LoadingProgressUI.js';
//proj
import loadImageFromUrl from '../../../plugins/utils/image/loadImageFromUrl.js';
import GetValue from '../../../plugins/utils/object/GetValue.js';

const cors = window.location.hostname == 'localhost'?'https://cors-anywhere-playone.herokuapp.com/':'';

class Home extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
    }
    create() {

        //測試外部讀取image(似乎必須透過cors-anywhere)
        var loadOnlineImagePromise = async function(scene, config){
            var x = GetValue(config, 'x', 0);
            var y = GetValue(config, 'y', 0);
            var imgKey = GetValue(config, 'imgKey', undefined);
            var url = GetValue(config, 'url', undefined);
            await loadImageFromUrl(scene, imgKey, url, LoadingProgressUI, 1000);

            var cardInfoText = 
`super rare card which 
every player want to 
get no matter what 
will happen.

超級棒的一張卡，
每個玩家都想擁有！`

            var card = scene.rexUI.add.perspectiveCard({
                x:x,
                y:y,    
                front: CreateCardFront(scene,'cardBg', imgKey, cardInfoText),
                back: CreateCardBack(scene, 'cardBack'),
                face: 'back',
        
                flip: {
                    frontToBack: 'right',
                    backToFront: 'left',
                    duration: 1000,
                    ease: 'Cubic-easeIn'
                }
            }).layout()

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
                url: cors + 'https://playoneapps.com.tw/File/Stand/Hero/image025.png'
            })
        },this)

        this.input.on('pointerup', function(){
            this.game.sound.play(this, 'right');
        }, this)

    }

    update(){
        //eyeTracking(this);
    }
}

var CreateCardFront = function(scene, bgKey, iconKey, text){
    text = '[stroke][b][i]'+text+'[/i][/b][/stroke]';
    var label = scene.rexUI.add.label({
        orientation: 'y',
        background: bgKey?scene.add.image(0,0,bgKey):undefined,
        icon: iconKey?scene.add.image(0, 0, iconKey):undefined,
        text: text?scene.rexUI.add.BBCodeText(0, 0, text, { 
            fontFamily: 'arial',
            fontSize: 32, 
            lineSpacing: 8,
            testString: '|MÉqgy回',
            padding: 40,
            color:'white', 
            fixedWidth: 500, 
            fixedHeight: 500, 
            //wrap: { mode: 'word', width: 500 },
            //align: 'center',
            stroke:'#666666', 
            strokeThickness: 3,
            backgroundColor: '#5a5a5a',  // #111111
            backgroundColor2: '#ebebeb',  // #333333
            backgroundHorizontalGradient: false,
            //backgroundStrokeColor: '#113344',  // #113344
            //backgroundStrokeLineWidth: 2,
            backgroundCornerRadius: 20,
        }):undefined,
        space:{top:100}
    }).layout()

    var cover = scene.add.image(0,0,'cardFront');

    var sizerMain = scene.rexUI.add.overlapSizer({
        // x: 0,
        // y: 0,
        // anchor: undefined,
        // width: undefined,
        // height: undefined,
        // space: { left: 0, right:0, top:0, bottom:0 },
    
        // name: '',
        // draggable: false,
        // sizerEvents: false,
    })
    .add(label,{ align: 'center' })
    .add(cover,{ align: 'center' })
    .setMinSize(600,800)
    .layout()

    return sizerMain;
}

var CreateCardBack = function(scene, bgKey, iconKey, text){
    var label = scene.rexUI.add.label({
        background: bgKey?scene.add.image(0,0,bgKey):undefined,
        icon: iconKey?scene.add.image(0, 0, iconKey):undefined,
        text: text?scene.rexUI.add.BBCodeText(0, 0, text, { 
            fontSize: 36, 
            color:'red',
        }):undefined
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

export default Home;