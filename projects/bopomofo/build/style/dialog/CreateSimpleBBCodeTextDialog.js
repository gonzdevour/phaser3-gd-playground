import CreateRoundRectangleBackground from '../CreateRoundRectangleBackground.js';
import CreateActionButtons from './CreateActionButtons.js';
import { TransitionIn, TransitionOut } from '../TransitionMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateSimpleBBCodeTextDialog = function (parent, config) {
    var scene = parent.scene;
    var parentTopUI = parent.getTopmostSizer();
    var gameConfig = scene.game.config;
    var gameWindowWidth = gameConfig.width;
    var gameWindowHeight = gameConfig.height;
    var x = GetValue(config, 'x', gameWindowWidth / 2);
    var y = GetValue(config, 'y', gameWindowHeight / 2);
    var width = GetValue(config, 'width', 0);
    var height = GetValue(config, 'height', 0);
    var title = GetValue(config, 'title');
    var content = GetValue(config, 'content');
    var transitionDuration = GetValue(config, 'transitionDuration', 500);
    var okCallback = GetValue(config, 'okCallback', false);
    var cancelCallback = GetValue(config, 'cancelCallback', false);
    var dialog;

    // Build UI
    dialog = scene.rexUI.add.sizer({
        x: x, y: y,
        width: width, height: height,
        orientation: 'y',
        space: { left: 40, right: 40, top: 40, bottom: 40, item: 20 }
    })
        .addBackground(CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2))

    if (title) {
        if (typeof (title) === 'string') {
            title = scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: 'DFKai-SB', fontSize: 60 });
        }
        dialog.add(title);
    }

    if (content) {
        if (typeof (content) === 'string') {
            content = scene.rexUI.add.BBCodeText(0, 0, content, { fontFamily: 'DFKai-SB', fontSize: 60 });
        }
        dialog.add(content);
    }

    var buttons = CreateActionButtons(scene, !!okCallback, !!cancelCallback)
    dialog.add(buttons, { expand: true, });

    // Layout UI
    dialog.layout();
    // Transition-in
    TransitionIn(dialog, parentTopUI, transitionDuration);

    // Add button callback
    var yesButton = buttons.getElement('yes');
    if (yesButton) {
        yesButton.onClick(function () {
            okCallback();
            TransitionOut(dialog, parentTopUI, transitionDuration)
        });
    }

    var noButton = buttons.getElement('no');
    if (noButton) {
        noButton.onClick(function () {
            cancelCallback();
            TransitionOut(dialog, parentTopUI, transitionDuration)
        });
    }

    return dialog;
}

export default CreateSimpleBBCodeTextDialog;