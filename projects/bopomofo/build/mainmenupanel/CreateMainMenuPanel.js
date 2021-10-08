import { Style } from '../style/style.js';
import CreateWord from '../quizpanel/CreateWord.js';

var CreateMainMenuPanel = function (scene) {
    var mainMenuPanel = scene.rexUI.add.sizer({
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
    AddButtonBehavior(btnModeSelect, 'button.mode-select', mainMenuPanel);

    var btnContinue = CreateLabel(scene, '繼續練習');
    AddButtonBehavior(btnContinue, 'button.continue', mainMenuPanel);

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
    AddButtonBehavior(btnConfig, 'button.config', mainMenuPanel);

    var btnHelp = CreateLabel(scene, '?');
    AddButtonBehavior(btnHelp, 'button.help', mainMenuPanel);

    // Add an overlap sizer, with full page size
    var gameConfig = scene.game.config;
    var gameWindowWidth = gameConfig.width;
    var gameWindowHeight = gameConfig.height;
    var backgroundOverlapSizer = scene.rexUI.add.overlapSizer({
        x: gameWindowWidth / 2, y: gameWindowHeight / 2,
        width: gameWindowWidth, height: gameWindowHeight,
    })
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
        .layout();

    mainMenuPanel
        .addChildrenMap('logo', logo)
        .addChildrenMap('btnModeSelect', btnModeSelect)
        .addChildrenMap('btnContinue', btnContinue)
        .addChildrenMap('btnConfig', btnConfig)
        .addChildrenMap('btnHelp', btnHelp)

    return mainMenuPanel;
}

var CreateLabel = function (scene, text, img, pos) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 20).setStrokeStyle(2, 0xffffff),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

var AddButtonBehavior = function (gameObject, eventName, eventEmitter) {
    var scene = gameObject.scene;
    scene.rexUI.add.click(gameObject, {})
        .on('click', function (button, gameObject, pointer, event) {
            eventEmitter.emit(eventName, gameObject, pointer, event);
        })
}

export default CreateMainMenuPanel;