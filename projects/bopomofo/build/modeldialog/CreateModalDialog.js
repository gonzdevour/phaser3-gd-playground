import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateModalDialog = function (scene, config) {
    if (config === undefined) {
        config = {};
    }

    var gameConfig = scene.game.config;
    var gameWindowWidth = gameConfig.width;
    var gameWindowHeight = gameConfig.height;
    config.x = GetValue(config, 'x', gameWindowWidth / 2);
    config.y = GetValue(config, 'y', gameWindowHeight / 2);
    config.width = GetValue(config, 'width', 0);
    config.height = GetValue(config, 'height', 0);

    if (config.background === undefined) {
        // Create default background
        config.background = CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2);
    }

    var title = config.title;
    if (typeof (title) === 'string') {
        config.title = scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: 'DFKai-SB', fontSize: 60 });
    }

    var content = config.content;
    if (typeof (content) === 'string') {
        config.content = scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: 'DFKai-SB', fontSize: 60 });
    }

    var buttons;
    var buttonMode = GetValue(config, 'buttonMode', 0);
    switch (buttonMode) {
        case 2: // OK/Cancel
            buttons = [
                CreateButton(scene, 'yes'),
                scene.rexUI.add.space(),
                CreateButton(scene, 'no')
            ];
            break;
        case 1: // OK
            buttons = [
                scene.rexUI.add.space(),
                CreateButton(scene, 'yes'),
                scene.rexUI.add.space()
            ];
            break;
        default:
            buttons = [];
            break;
    }
    config.actions = buttons;

    var dialog = scene.rexUI.add.dialog(config);

    // Put background at bottom
    if (config.background) {
        dialog.moveDepthBelow(config.background);
    }

    // Layout UI
    dialog.layout();

    return dialog;
}

var CreateButton = function (scene, img) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        // text: scene.rexUI.add.BBCodeText(0, 0, 'X', { fontFamily: 'DFKai-SB', fontSize: 60 }),
        // space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },
    })
}

export default CreateModalDialog;