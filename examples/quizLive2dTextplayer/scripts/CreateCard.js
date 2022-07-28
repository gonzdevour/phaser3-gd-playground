//gdk
import CreateKnob from '../gdk/templates/CreateKnob.js';
import LoadingProgress from '../gdk/loading/LoadingProgress.js';
//proj
import loadImageFromUrl from '../../../plugins/utils/image/loadImageFromUrl.js';
import GetValue from '../../../plugins/utils/object/GetValue.js';
import { Delay } from '../../../../phaser3-rex-notes/plugins/eventpromise.js';

//測試外部讀取image(似乎必須透過cors-anywhere)
var loadOnlineImagePromise = async function(scene, config){
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var imgKey = GetValue(config, 'imgKey', undefined);
    var cardInfoText = GetValue(config, 'text', '');
    var url = GetValue(config, 'url', undefined);
    var progressUI = CreateKnob(scene).layout();
    await loadImageFromUrl(scene, imgKey, url, LoadingProgress, progressUI, 1000);
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


var CreateCardFront = function(scene, bgKey, iconKey, text){
    text = '[stroke][b][i]'+text+'[/i][/b][/stroke]';
    var bg = scene.add.image(0,0,bgKey);
    var char = scene.add.image(0, 0, iconKey).setScale(2);
    var txt = scene.rexUI.add.BBCodeText(0, 0, text, { 
        fontFamily: 'arial',
        fontSize: 40, 
        lineSpacing: 8,
        testString: '|MÉqgy回',
        padding: 20,
        color:'white', 
        fixedWidth: 500-2*20, 
        fixedHeight: 500-2*20, 
        wrap: { mode: 'character' },
        //align: 'center',
        stroke:'#666666', 
        strokeThickness: 3,
        backgroundColor: '#5a5a5a',  // #111111
        backgroundColor2: '#ebebeb',  // #333333
        backgroundHorizontalGradient: false,
        //backgroundStrokeColor: '#113344',  // #113344
        //backgroundStrokeLineWidth: 2,
        backgroundCornerRadius: 20,
    }).setOrigin(0.5,0.5)

    // var label = scene.rexUI.add.label({
    //     orientation: 'y',
    //     background: bgKey?scene.add.image(0,0,bgKey):undefined,
    //     icon: iconKey?scene.add.image(0, 0, iconKey).setScale(2):undefined,
    //     text: text?scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'arial'}):undefined,
    //     space:{top:100}
    // }).layout()

    var cover = scene.add.image(0,0,'cardFront');

    // var sizerMain = scene.rexUI.add.overlapSizer({
    // })
    // .setMinSize(600,800)
    // .add(bg,{ align: 'center' })
    // .add(txt,{ align: 'bottom', expand: false, })
    // //.add(char,{ align: 'center', expand: false, })
    // .add(cover,{ align: 'center' })
    // .layout()

    var sizerMain = scene.rexUI.add.container(0,0,600,800)
        .add(bg)
        //.add(txt)
        .add(char)
        .add(cover)

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

var CreateCard = async function(scene, config){
    var centerX = GetValue(config, 'x', scene.viewport.centerX);
    var centerY = GetValue(config, 'y', scene.viewport.centerY);
    var Card = await loadOnlineImagePromise(scene, {
        x: centerX, 
        y: centerY, 
        imgKey: GetValue(config, 'imgKey', 'resultHero'), 
        text: GetValue(config, 'text', 'Unknown Runes'),
        url: GetValue(config, 'url', undefined)
    })
    await Delay(4000);
    var lightball = scene.add.image(centerX, centerY, 'lightball1');
    Card.moveDepthBelow(lightball) //因為Card是containerlite所以要用moveDepthBelow做群組移動
    //scene.children.moveBelow(lightball, Card)
    scene.tweens.timeline({
        targets: lightball,
        repeat: -1,
        tweens:[
            {
                props:{
                    scale:{value: {from: 0.8, to: 1.2}, duration: 2000, yoyo: true},
                    alpha:{value: {from:0.5, to:1}, duration: 1000, yoyo: true},
                    angle:{value: '+=360', duration:5000, yoyo: false},
                }, 
            },
        ],
    })
}

export default CreateCard;