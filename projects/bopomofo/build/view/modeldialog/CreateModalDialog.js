import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import SetValue from '../../../../../../phaser3-rex-notes/plugins/utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateModalDialog = function (scene, config) {
    if (config === undefined) {
        config = {};
    }

    var viewport = scene.scale.getViewPort();
    config.x = GetValue(config, 'x', viewport.centerX);
    config.y = GetValue(config, 'y', viewport.centerY);
    config.width = GetValue(config, 'width', 0);
    config.height = GetValue(config, 'height', 0);

    if (config.background === undefined) {
        // Create default background
        config.background = CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2);
    }

    if (typeof (config.title) === 'string') {
        config.title = scene.rexUI.add.BBCodeText(0, 0, config.title, { fontFamily: 'DFKai-SB', fontSize: 60 });
        SetValue(config, 'expand.title', false);
    }

    if (typeof (config.content) === 'string') {
        config.content = scene.rexUI.add.BBCodeText(0, 0, config.content, { fontFamily: 'DFKai-SB', fontSize: 60 });
        SetValue(config, 'expand.content', false);
    }

    if (config.buttonMode === undefined) {
        config.buttonMode = 0;
    }
    switch (config.buttonMode) {
        case 2: // OK/Cancel
            config.actions = [
                CreateButton(scene, 'yes'),
                scene.rexUI.add.space(),
                CreateButton(scene, 'no')
            ];
            break;
        case 1: // OK
            config.actions = [
                scene.rexUI.add.space(),
                CreateButton(scene, 'yes'),
                scene.rexUI.add.space()
            ];
            break;
        default:
            config.actions = [];
            break;
    }

    if (config.space === undefined) {
        config.space = { left: 40, right: 40, top: 40, bottom: 40, item: 20 };
    }

    var dialog = scene.rexUI.add.dialog(config);

    // Put background at bottom
    if (config.background) {
        dialog.moveDepthBelow(config.background);
    }

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