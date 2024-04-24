//gdk
import CreateKnob from '../gdk/templates/CreateKnob.js';
import LoadingProgress from '../gdk/loading/LoadingProgress.js';
//effects
import CreateSlash from './CreateSlash.js';
import dat from 'rexnotePlugins/utils/dat.gui/dat.gui.min.js';
import AddUpdateEvent from 'rexnotePlugins/utils/gameobject/addevent/AddUpdateEvent';
//utils
import loadImageFromUrl from 'gdkPlugins/utils/image/loadImageFromUrl.js';
import GetValue from 'gdkPlugins/utils/object/GetValue.js';
import { Delay } from 'rexnotePlugins/eventpromise.js';
import DrawToTexture from 'gdkPlugins/utils/image/DrawToTexture.js';
import Locate from '../gdk/layer/Locate.js';

//測試外部讀取image(似乎必須透過cors-anywhere)
var loadOnlineImagePromise = async function(scene, config){

    var imgKey = GetValue(config, 'imgKey', undefined);
    var url = GetValue(config, 'url', undefined);
    var progressUI = CreateKnob(scene).layout();
    var loadImageResult = await loadImageFromUrl(scene, imgKey, url, LoadingProgress, progressUI, 1000) //success, error判斷是否讀取成功

    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var cardInfoText = GetValue(config, 'text', '');

    var card = scene.add.rexPerspectiveCard({
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
    })

    card.flip.flipRight(4000, 2);

    scene.tweens.add({
        targets: card,
        y: {from: card.y-800, to: card.y},
        ease: 'back',
        duration: 4000, 
    })
    scene.tweens.add({
        targets: card,
        angle: {from: 0, to: 362},
        ease: 'cubic',
        duration: 4000, 
    })
    scene.tweens.add({
        targets: card,
        scale: {from:0, to:1},
        ease: 'linear',
        duration: 4000, 
    })
    scene.tweens.add({
        targets: card,
        y: {from: card.y, to: card.y-30},
        ease: 'cubic-easeIn',
        duration: 1000, 
        yoyo: true, 
        repeat: -1
    })

    return card;
}


var CreateCardFront = function(scene, bgKey, iconKey, text){
    var bg = scene.add.image(0,0,bgKey);
    var char = scene.add.image(0, 0, iconKey).setScale(2).setOrigin(0.5,0.7);

    var txtName = scene.rexUI.add.BBCodeText(0, 0, '[stroke][b][i]' + text.name + '[/i][/b][/stroke]', { 
        fontFamily: 'arial', fontSize: 64, testString: '回龍', padding: {left:40, right:40, top:20, bottom:20}, 
        color:'#ffd900', stroke:'#666666', strokeThickness: 3,
    }).setOrigin(1)

    var txtSay = scene.rexUI.add.BBCodeText(0, 0, '[stroke][b][i]' + text.say + '[/i][/b][/stroke]', { 
        fontFamily: 'arial', fontSize: 40, testString: '回龍', padding: {left:70, right:70, top:20, bottom:20}, 
        color:'white', stroke:'#242424', strokeThickness: 3, fixedWidth: 600, wrap: { mode: 'character' },
        backgroundColor: 'rgba(0,0,0,0.4)',  // #111111
        backgroundColor2: 'rgba(100,100,100,0.4)',  // #333333
    }).setOrigin(0.5)

    var txtDesc = scene.rexUI.add.BBCodeText(0, 0, '[stroke][b][i]' + text.description + '[/i][/b][/stroke]', { 
        fontFamily: 'arial',
        fontSize: 40, 
        lineSpacing: 8,
        testString: '回龍',
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

    DrawToTexture(scene, 0, 0, bg.width, bg.height, [bg,char], 'cardFrontNewBg', true);
    var newImg = scene.add.image(0, 0, 'cardFrontNewBg');

    var cardBuilder = scene.rexUI.add.overlapSizer({
    })
    .setMinSize(600,800)
    .add(newImg,{ key:'bg', align: 'center', expand: false, })
    .add(txtName,{ align: 'right-top', expand: false, })
    .add(txtSay,{ align: 'center', expand: false, offsetY: 60, })
    .add(txtDesc,{ align: 'bottom', expand: false, })
    .add(cover,{ align: 'center' })
    .moveDepthBelow(newImg)
    .layout()

    cardBuilder.snapshot({padding: 3, saveTexture:'cardFrontNew'});
    cardBuilder.destroy();

    return {key:'cardFrontNew'}
}

var CreateCardBack = function(scene, bgKey, iconKey, text){
    var tempX = 100;
    var tempY = 100;
    var cardBuilder = scene.rexUI.add.label({
        background: bgKey?scene.add.image(tempX,tempY,bgKey):undefined,
        icon: iconKey?scene.add.image(tempX, tempY, iconKey):undefined,
        text: text?scene.rexUI.add.BBCodeText(tempX, tempY, text, { 
            fontSize: 36, 
            color:'red',
        }):undefined
    })

    cardBuilder.snapshot({padding: 3, saveTexture:'cardBackNew'});
    cardBuilder.destroy();

    return {key:'cardBackNew'}
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

    //建立卡背的旋轉光效
    var lightball = scene.add.image(centerX, centerY, 'lightball1')//.setBlendMode(Phaser.BlendModes.ADD);

    card.moveDepthBelow(lightball) //因為card是containerlite所以要用moveDepthBelow做群組移動
    //scene.children.moveBelow(lightball, card)

    scene.tweens.add({
        targets: lightball,
        scale: {from: 0.8, to: 1.2},
        duration: 4000, 
        yoyo: true,
        repeat: -1,
    })
    scene.tweens.add({
        targets: lightball,
        alpha: {from:0.5, to:1},
        duration: 1000, 
        yoyo: true,
        repeat: -1,
    })
    scene.tweens.add({
        targets: lightball,
        angle: '+=360',
        duration: 5000, 
        yoyo: false,
        repeat: -1,
    })

    //在卡面card.frontFace上建立mask內的閃光
    // var cardMask = card.frontFace.createBitmapMask();
    // var cardBlink = scene.rexUI.add.roundRectangle(centerX, centerY, 200, 1000, 0, 0xffffff, 0.1).setAngle(15)//.setBlendMode(Phaser.BlendModes.ADD);//#ffffee
    // cardBlink.setMask(cardMask);
    // scene.tweens.add({
    //     targets: cardBlink,
    //     x: {from:cardBlink.x-450, to:cardBlink.x+450},
    //     alpha: 0.5,
    //     repeat: -1,
    //     duration: 1000,
    //     ease: 'back-easeOutIn',
    //     repeatDelay:5000,
    // })

    //在卡片card.frontFace上用custom progress建立閃光
    var slash = CreateSlash(scene, 130, 100)
    .setSize(200, 400)
    .setFillStyle(0xffffff, 1)
    .setPosition(400, 300)
    .setAlpha(0.1)
    .setBlendMode(Phaser.BlendModes.ADD)

    AddUpdateEvent(slash, function(time, delta){
        slash.width = card.frontFace.width;
        slash.height = card.frontFace.height;
        slash.angle = card.frontFace.angle;
        slash.x = card.frontFace.x;
        slash.y = card.frontFace.y;
    })

    // scene.tweens.add({
    //     targets: slash,
    //     value: 1,
    //     repeat: -1,
    //     duration: 1000,
    //     ease: 'linear',
    //     repeatDelay:5000,
    // })

    scene.tweens.add({
        targets: slash,
        value: 1,
        duration: 1000, 
        yoyo: false,
        repeat: -1,
        repeatDelay: 4000,
    })
    scene.tweens.add({
        targets: slash,
        alpha: {from: 0.1, to: 0.3},
        duration: 500, 
        yoyo: true,
        repeat: -1,
    })

    // var graphics = scene.add.graphics()
    //     .lineStyle(2, 0xff0000, 0.5)
    //     .strokeRectShape(slash.getBounds())

    // var gui = new dat.GUI();
    // gui.add(slash, 'value', 0, 1);

    //點畫面卡片翻轉
    scene.input.on('pointerdown', function(pointer){
        card.flip.flipRight(1500, 3);
    })

    //卡片翻轉時光效關閉
    card.flip
        .on('start', function(flip, card){
            slash.setVisible(false);
        })
        .on('complete', function(flip, card){
            slash.setVisible(true);
        });

    //結合卡片與特效
    var cardwithLight = scene.rexUI.add.container(centerX, centerY);
    cardwithLight.addMultiple([lightball, card, slash]);
    //加入layer與vpc控制
    var viewport = scene.viewport;
    Locate(scene, cardwithLight, {instID: 'cardWithLight', layerName: 'main', viewport: viewport, vpx: 0.5, vpy: 0.5});

    //先播放卡片落下動畫再啟動光效
    lightball.setVisible(false);
    slash.setVisible(false);
    await Delay(4000);
    lightball.setVisible(true);
    slash.setVisible(true);

    return cardwithLight;
}

export default CreateCard;