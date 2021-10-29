import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';
import CreateWord from '../quizpanel/CreateWord.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateMainMenuPanel = function (scene, config) {
    var gameConfig = scene.game.config;
    var gameWindowWidth = gameConfig.width;
    var gameWindowHeight = gameConfig.height;
    var x = GetValue(config, 'x', gameWindowWidth / 2);
    var y = GetValue(config, 'y', gameWindowHeight / 2);
    var width = GetValue(config, 'width', gameWindowWidth);
    var height = GetValue(config, 'height', gameWindowHeight);
    var mainMenuPanel = scene.rexUI.add.sizer({
        x: x, y: y,
        width: width, height: height,
        orientation: 'y',
    })

    // Add Logo, replace it.
    var logo = scene.rexUI.add.BBCodeText(0, 0, 'Logo', { fontFamily: 'DFKai-SB', fontSize: 60 });

    // TODO: style
    var word = CreateWord(scene)
        .setWord([
            { character: '注', initials: 'ㄓ', media: 'ㄨ', vowel: '', tone: 'ˋ' },
            { character: '音', initials: '', media: 'ㄧ', vowel: 'ㄣ', tone: '' },
            { character: '習', initials: 'ㄒ', media: 'ㄧ', vowel: '', tone: 'ˊ' },
            { character: '作', initials: 'ㄗ', media: 'ㄨ', vowel: 'ㄛ', tone: 'ˋ' }
        ])

    // Add buttons
    // TODO: set width & height in scene.rexUI.add.label({...})
    var btnModeSelect = CreateLabel(scene, '模式選擇');
    var btnContinue = CreateLabel(scene, '繼續練習');

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

    // More buttons...
    var btnConfig = CreateLabel(scene, '*');
    var btnHelp = CreateLabel(scene, '?');

    var backgroundOverlapSizer = scene.rexUI.add.overlapSizer()
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


    RouteClickEvent(btnModeSelect, 'button.mode-select', backgroundOverlapSizer);
    RouteClickEvent(btnContinue, 'button.continue', backgroundOverlapSizer);
    RouteClickEvent(btnConfig, 'button.config', backgroundOverlapSizer);
    RouteClickEvent(btnHelp, 'button.help', backgroundOverlapSizer);

    backgroundOverlapSizer
        .addChildrenMap('logo', logo)
        .addChildrenMap('btnModeSelect', btnModeSelect)
        .addChildrenMap('btnContinue', btnContinue)
        .addChildrenMap('btnConfig', btnConfig)
        .addChildrenMap('btnHelp', btnHelp)

    return backgroundOverlapSizer;
}

var CreateLabel = function (scene, text, img, pos) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

var RouteClickEvent = function (gameObject, eventName, eventEmitter) {
    gameObject.onClick(function (button, gameObject, pointer, event) {
        eventEmitter.emit(eventName, gameObject, pointer, event);
    })
}

export default CreateMainMenuPanel;