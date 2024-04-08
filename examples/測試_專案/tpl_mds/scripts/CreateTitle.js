import CreateRoundRectangleBackground from '../gdk/templates/CreateRoundRectangleBackground.js';
import RegisterClickEmitter from '../gdk/behaviors/RegisterClickEmitter.js';
import Style from '../settings/Style.js';

//utils
import GetValue from 'gdkPlugins/utils/object/GetValue.js';

//建立首頁面板，註冊按鈕onClick-emit事件，回傳overlapSizer，在MainMenu scene用on接收事件後處理start scene
var CreateTitle = function (scene, config) {
    var viewport = scene.viewport;
    var x = GetValue(config, 'x', viewport.centerX);
    var y = GetValue(config, 'y', viewport.centerY);
    var width = GetValue(config, 'width', viewport.width);
    var height = GetValue(config, 'height', viewport.height);

    //建立最下層的sizer
    var mainMenuPanel = scene.rexUI.add.sizer({
        orientation: 'y',
    })

    //建立背景物件
    var background = CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2);

    //建立logo物件
    var logo = scene.rexUI.add.BBCodeText(0, 0, 'Logo', { fontFamily: Style.fontFamilyName, fontSize: 60 });
    //scene.rexUI.easeMoveFrom(logo, 1000, undefined, '-=200', 'Cubic'); //排好版之後再開始tween

    scene.tweens.add({
        targets:logo,
        y: 200,
        duration:2000,
        ease: 'linear',
      })

    // TODO: style
    
    //建立選項按鈕
    // TODO: set width & height in scene.rexUI.add.label({...})
    var btnModeSelect = CreateActionLabel(scene, '模式選擇', undefined, 20);
    var btnContinue = CreateActionLabel(scene, '繼續練習', undefined, 20);

    mainMenuPanel
        .add(
            logo,
            {}
        )
        .add(
            btnModeSelect,
            { padding: { top: 20, bottom: 20 } }
        )
        .add(
            btnContinue,
            {}
        )

    //建立config和help按鈕
    var btnConfig = CreateHelpLabel(scene, '', 'ico_gear', {tl:0,tr:10,bl:10,br:0});
    var btnHelp = CreateHelpLabel(scene, '', 'ico_info', {tl:0,tr:10,bl:10,br:0});

    //將config和help按鈕放在mainMenuPanel上面，整個組成overlapSizer(用來處理align的sizer)
    var backgroundOverlapSizer = scene.rexUI.add.overlapSizer({
    })
        .addBackground(background)
        .add(
            mainMenuPanel,
            { align: 'center', expand: false }
        )
        .add(
            btnConfig,
            { align: 'left-bottom', expand: false, }
        )
        .add(
            btnHelp,
            { align: 'right-top', expand: false }
        )

    //幫按鈕註冊onClick時要發射的事件
    //※注意overlapSizer是eventEmitter
    RegisterClickEmitter(btnModeSelect, 'button.mode-select', backgroundOverlapSizer, ['ninja']);
    RegisterClickEmitter(btnContinue, 'button.continue', backgroundOverlapSizer, ['ninja']);
    RegisterClickEmitter(btnConfig, 'button.config', backgroundOverlapSizer, ['ninja']);
    RegisterClickEmitter(btnHelp, 'button.help', backgroundOverlapSizer, ['ninja']);

    //建立ChildrenMap，讓backgroundOverlapSizer.getElement('key')可以取得這個sizer的子物件
    backgroundOverlapSizer
        .addChildrenMap('btnModeSelect', btnModeSelect)
        .addChildrenMap('btnContinue', btnContinue)
        .addChildrenMap('btnConfig', btnConfig)
        .addChildrenMap('btnHelp', btnHelp)

    //回傳時順便設定位置和大小界限
    return backgroundOverlapSizer.setPosition(x, y).setMinSize(width, height);
}

var CreateActionLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
        icon: !img?undefined:scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    })
}

var CreateHelpLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
        icon: !img?undefined:scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

export default CreateTitle;