import CreateRoundRectangleBackground from '../gdk/templates/CreateRoundRectangleBackground.js';
import Style from '../gdk/settings/Style.js';

//utils
import GetValue from 'gdkPlugins/utils/object/GetValue.js';

//建立首頁面板，註冊按鈕onClick-emit事件，回傳overlapSizer，在MainMenu scene用on接收事件後處理start scene
var CreateTitle = function (scene, config) {
    var viewport = scene.viewport;
    //var x = GetValue(config, 'x', viewport.centerX);
    //var y = GetValue(config, 'y', viewport.centerY);
    var width = GetValue(config, 'width', viewport.width);
    var height = GetValue(config, 'height', viewport.height);

    //建立最下層的sizer
    var mainMenuPanel = scene.rexUI.add.sizer({
        orientation: 'y',
    })

    //建立背景物件
    var cover = scene.rexUI.add.transitionImagePack(0,0,'cover').setAlpha(0.5);
    var title = scene.rexUI.add.transitionImagePack(0,0,'title')._resizeByWidth(700);
    var background = scene.rexUI.add.overlapSizer({
        width:1024,
        height:1024,
    })
        .addBackground(CreateRoundRectangleBackground(scene), 20)
        .add( cover, { align: 'center', expand: false, offsetY: -50 } )
        .add( title, { align: 'top', expand: false, offsetY:-100} )
        .layout() //有固定寬高，先layout才排得出offset

    scene.tweens.add({ targets:title, displayWidth: {from:1024, to:700}, duration:3000, ease: 'linear',})
    scene.tweens.add({ targets:title, alpha: {from:0, to:1}, duration:3000, ease: 'linear',})

    // TODO: style
    
    //建立選項按鈕
    // TODO: set width & height in scene.rexUI.add.label({...})

    var buttonsMain = scene.rexUI.add.buttons({
        width: 400,
        orientation: 'y',
        buttons: [
            CreateActionLabel(scene, '繼續遊戲', undefined),
            CreateActionLabel(scene, '重新開始', undefined),
            CreateActionLabel(scene, '讀取進度', undefined),
        ],
        space: { item: 16 },
        buttonsType: undefined,
    })

    mainMenuPanel
        .add( buttonsMain, {} )

    //建立config和help按鈕
    var btnConfig = CreateHelpLabel(scene, '', 'ico_gear', {tl:0,tr:10,bl:10,br:0})
    var btnHelp = CreateHelpLabel(scene, '', 'ico_info', {tl:0,tr:10,bl:10,br:0});

    //將config和help按鈕放在mainMenuPanel上面，整個組成overlapSizer(用來處理align的sizer)
    var backgroundOverlapSizer = scene.rexUI.add.overlapSizer({
    })
        .addBackground(background, 20)
        .add( mainMenuPanel, { align: 'bottom', expand: false, offsetY: -150 } )
        .add( btnConfig, { align: 'left-bottom', expand: false, offsetX:20, offsetY:-20} )
        .add( btnHelp, { align: 'right-top', expand: false, offsetX:-20, offsetY:20 } )

    // //幫按鈕註冊onClick時要發射的事件
    btnConfig._setEE('button.config', backgroundOverlapSizer)._addBehavior(['ninja']) //onClick時讓backgroundOverlapSizer收到'button.config'事件
    btnHelp._setEE('button.help', backgroundOverlapSizer)._addBehavior(['ninja']) //onClick時讓backgroundOverlapSizer收到'button.help'事件
    buttonsMain
        .on('button.click', function (button, index, pointer, event) {
            backgroundOverlapSizer.emit('buttonsMain.click', button, index, pointer, event);
        })
        .on('button.over', function (button, index, pointer, event) {
            button.setAlpha(0.5)
        })
        .on('button.out', function (button, index, pointer, event) {
            button.setAlpha(1)
        })

    //回傳時設定大小

    backgroundOverlapSizer
        .setMinSize(width, height)
        .layout()
        ._setRWD(() => { backgroundOverlapSizer.setMinWidth(scene.viewport.width).layout(); }); //用箭頭函數無法在callback直接使用上下文的this

    return backgroundOverlapSizer;
}

var CreateActionLabel = function (scene, text, img, name) {
    var label = scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        icon: !img?undefined:scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },
        align: 'center', //讓label內的物件置中
    })

    return label;
}

var CreateHelpLabel = function (scene, text, img, radius, pos) {
    var label = scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
        icon: !img?undefined:scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    })
    return label
}

export default CreateTitle;