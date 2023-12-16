//gdk
import CreateKnob from '../gdk/templates/CreateKnob.js';
import LoadingProgress from '../gdk/loading/LoadingProgress.js';
//utils
import loadImageFromUrl from '../../../plugins/utils/image/loadImageFromUrl.js';
import GetValue from '../../../plugins/utils/object/GetValue.js';
import { Delay } from '../../../../phaser3-rex-notes/plugins/eventpromise.js';
import DrawToTexture from '../../../plugins/utils/image/DrawToTexture.js';

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
    var bg = scene.add.image(0,0,bgKey);
    var char = scene.add.image(0, 0, iconKey).setScale(2).setOrigin(0.5,0.7);

    var txtName = scene.rexUI.add.BBCodeText(0, 0, '[stroke][b][i]' + text.name + '[/i][/b][/stroke]', { 
        fontFamily: 'arial', fontSize: 64, testString: '|MÉqgy回', padding: {left:40, right:40, top:20, bottom:20}, 
        color:'#ffd900', stroke:'#666666', strokeThickness: 3,
    }).setOrigin(1)

    var txtSay = scene.rexUI.add.BBCodeText(0, 0, '[stroke][b][i]' + text.say + '[/i][/b][/stroke]', { 
        fontFamily: 'arial', fontSize: 40, testString: '|MÉqgy回', padding: {left:70, right:70, top:20, bottom:20}, 
        color:'white', stroke:'#242424', strokeThickness: 3, fixedWidth: 600, wrap: { mode: 'character' },
        backgroundColor: 'rgba(0,0,0,0.4)',  // #111111
        backgroundColor2: 'rgba(100,100,100,0.4)',  // #333333
    }).setOrigin(0.5)

    var txtDesc = scene.rexUI.add.BBCodeText(0, 0, '[stroke][b][i]' + text.description + '[/i][/b][/stroke]', { 
        fontFamily: 'arial',
        fontSize: 40, 
        lineSpacing: 8,
        testString: '|MÉqgy回',
        padding: 20,
        color:'white', 
        fixedWidth: 500-2*20, 
        fixedHeight: 300-2*20, 
        wrap: { mode: 'character' },
        //align: 'center',
        stroke:'#666666', 
        strokeThickness: 3,
        backgroundColor: '#111111',  // #111111
        backgroundColor2: '#777777',  // #333333
        backgroundHorizontalGradient: false,
        //backgroundStrokeColor: '#113344',  // #113344
        //backgroundStrokeLineWidth: 2,
        backgroundCornerRadius: 20,
    }).setOrigin(0.5)

    var cover = scene.add.image(0,0,'cardFront');

    DrawToTexture(scene, 0, 0, bg.width, bg.height, [bg,char], 'newImg', true);
    var newImg = scene.add.image(0, 0, 'newImg');

    // var cardFront = scene.rexUI.add.label({
    //     icon: newImg
    // }).layout()

    // var cardFront = scene.rexUI.add.label({
    //     orientation: 'y',
    //     background: bgKey?scene.add.image(0,0,bgKey):undefined,
    //     icon: iconKey?scene.add.image(0, 0, iconKey).setScale(2):undefined,
    //     text: text?scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'arial'}):undefined,
    //     space:{top:100}
    // }).layout()

    var cardMaskShape = scene.add.image(0, 0, 'cardBack').setVisible(true)//.createBitmapMask();

    var cardFront = scene.rexUI.add.overlapSizer({
    })
    .setMinSize(600,800)
    .add(newImg,{ key:'bg', align: 'center', expand: false, })
    .add(txtName,{ align: 'right-top', expand: false, })
    .add(txtSay,{ align: 'center', expand: false, offsetY: 60, })
    .add(txtDesc,{ align: 'bottom', expand: false, })
    .add(cover,{ align: 'center' })
    .add(cardMaskShape,{ key:'cardMaskShape', align: 'center', })
    .moveDepthBelow(newImg)
    .layout()

    // var sizerMain = scene.rexUI.add.container(0,0,600,800)
    //     .add(bg)
    //     .add(txt)
    //     .add(char)
    //     .add(cover)

    cardFront.name = 'cardFront'
    return cardFront;
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
    var card = await loadOnlineImagePromise(scene, {
        x: centerX, 
        y: centerY, 
        imgKey: GetValue(config, 'imgKey', 'resultHero'), 
        text: GetValue(config, 'text', {description: 'Unknown Runes'}),
        url: GetValue(config, 'url', undefined)
    })
    await Delay(4000);
    var lightball = scene.add.image(centerX, centerY, 'lightball1');
    card.moveDepthBelow(lightball) //因為card是containerlite所以要用moveDepthBelow做群組移動
    card.setInteractive().on('pointerup', function(pointer){
        card.flip.flipRight(2000, 3);
    })
    var cardMask = card.getElement('front.cardMaskShape').createBitmapMask();
    var cardLight = scene.rexUI.add.roundRectangle();
    lightball.setMask(cardMask);

    scene.children.moveBelow(lightball, card)
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
    return card;
}

export default CreateCard;