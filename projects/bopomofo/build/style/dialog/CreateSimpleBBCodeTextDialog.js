import CreateRoundRectangleBackground from '../CreateRoundRectangleBackground.js';
import CreateActionButtons from './CreateActionButtons.js';
import { TransitionIn, TransitionOut } from '../TransitionMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateSimpleBBCodeTextDialog = function (parent, config) {
    var scene = parent.scene;
    var displayList = scene.children;
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
    var background = GetValue(config, 'background', undefined);
    var transitionDuration = GetValue(config, 'transitionDuration', 500);
    var holdDuration = GetValue(config, 'holdDuration', 1000);  // Used in zero-button mode
    var okCallback = GetValue(config, 'okCallback', false);
    var cancelCallback = GetValue(config, 'cancelCallback', false);
    var closeCallback = GetValue(config, 'closeCallback', false);
    var dialog;

    // Build UI
    dialog = scene.rexUI.add.sizer({
        x: x, y: y,
        width: width, height: height,
        orientation: 'y',
        space: { left: 40, right: 40, top: 40, bottom: 40, item: 20 }
    })

    if (background === undefined) {
        // Create default background
        background = CreateRoundRectangleBackground(scene, 20, 0x0, 0xffffff, 2);
        dialog.addBackground(background)
    }

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

    // Put background at bottom
    if (background) {
        dialog.moveDepthBelow(background);
    }

    // Layout UI
    dialog.layout();
    // Transition-in
    TransitionIn(dialog, parentTopUI, transitionDuration);

    // Add button callback
    var CloseDialog = function () {
        TransitionOut(dialog, parentTopUI, transitionDuration);
        if (closeCallback) {
            scene.time.delayedCall(
                transitionDuration + 10, // delay
                closeCallback,           // callback
                [],                      // args
            );
        }
    }

    var yesButton = buttons.getElement('yes');
    if (yesButton) {
        yesButton.onClick(function () {
            okCallback();
            CloseDialog();
        });
    }

    var noButton = buttons.getElement('no');
    if (noButton) {
        noButton.onClick(function () {
            cancelCallback();
            CloseDialog();
        });
    }

    // Zero-button mode
    if (!yesButton && !noButton) {
        scene.time.delayedCall(
            holdDuration,   // delay
            CloseDialog,    // callback
            [],             // args
        );
    }

    return dialog;
}

export default CreateSimpleBBCodeTextDialog;