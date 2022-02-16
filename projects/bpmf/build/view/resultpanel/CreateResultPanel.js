import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';
import CreateWord from '../quizpanel/CreateWord.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

//建立首頁面板，註冊按鈕onClick-emit事件，回傳overlapSizer，在MainMenu scene用on接收事件後處理start scene
var CreateResultPanel = function (scene, config) {
    var viewport = scene.rexScaleOuter.outerViewport;
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
    var logo = scene.rexUI.add.BBCodeText(0, 0, 'Logo', { fontFamily: 'DFKai-SB', fontSize: 60 });

    // TODO: style
    
    //建立標題字(使用quiz中的注音排版)
    var word = CreateWord(scene)
        .setWord([
            { character: '注', initials: 'ㄓ', media: 'ㄨ', vowel: '', tone: 'ˋ' },
            { character: '音', initials: '', media: 'ㄧ', vowel: 'ㄣ', tone: '' },
            { character: '習', initials: 'ㄒ', media: 'ㄧ', vowel: '', tone: 'ˊ' },
            { character: '作', initials: 'ㄗ', media: 'ㄨ', vowel: 'ㄛ', tone: 'ˋ' }
        ])

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
            word,
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
    var btnConfig = CreateHelpLabel(scene, '', 'cfg', {tl:0,tr:10,bl:10,br:0});
    var btnHelp = CreateHelpLabel(scene, '', 'info', {tl:0,tr:10,bl:10,br:0});

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
    //RouteClickEvent(gameObject, eventName, eventEmitter)
    //※注意overlapSizer是eventEmitter
    RouteClickEvent(btnModeSelect, 'button.mode-select', backgroundOverlapSizer);
    RouteClickEvent(btnContinue, 'button.continue', backgroundOverlapSizer);
    RouteClickEvent(btnConfig, 'button.config', backgroundOverlapSizer);
    RouteClickEvent(btnHelp, 'button.help', backgroundOverlapSizer);

    //建立ChildrenMap，讓backgroundOverlapSizer.getElement('key')可以取得這個sizer的子物件
    backgroundOverlapSizer
        .addChildrenMap('logo', logo)
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
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

var CreateHelpLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
        icon: !img?undefined:scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

//onClick是sizer的method，Label是一種sizer
//emit是所有p3 gameObject都有的method，從ee3導入
//※這裡設計成：按下Label時，觸發backgroundOverlapSizery在MainMenu scene掛載的.on('eventName', callback)
var RouteClickEvent = function (gameObject, eventName, eventEmitter) {
    gameObject.onClick(function (button, gameObject, pointer, event) {
        eventEmitter.emit(eventName, gameObject, pointer, event);
    })
}

export default CreateResultPanel;