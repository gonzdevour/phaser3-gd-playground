import CreateRoundRectangleBackground from '../CreateRoundRectangleBackground.js';
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
    var title = GetValue(config, 'title', '');
    var content = GetValue(config, 'content', '');
    var okCallback = GetValue(config, 'okCallback', false);
    var cancelCallback = GetValue(config, 'cancelCallback', false);    
    var dialog;

    if (okCallback) {
        var _okCallback = okCallback;
        okCallback = function () {
            _okCallback();
            TransitionOut(dialog, parentTopUI);
        }
    }
    if (cancelCallback) {
        var _cancelCallback = cancelCallback;
        cancelCallback = function () {
            _cancelCallback();
            TransitionOut(dialog, parent.getTopmostSizer());
        }
    }

    dialog = scene.rexUI.add.sizer({
        x: x, y: y,
        width: width, height: height,
        orientation: 'y',
        space: { left: 40, right: 40, top: 40, bottom: 40, item: 20 }
    })
        .addBackground(CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2))
        .add(
            scene.rexUI.add.BBCodeText(0, 0, title, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        )
        .add(
            scene.rexUI.add.BBCodeText(0, 0, content, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        )
        .add(
            CreateActionButtons(scene, okCallback, cancelCallback),
            { expand: true, }
        )
        .layout();

    TransitionIn(dialog, parentTopUI);

    return dialog;
}

var CreateActionButtons = function (scene, okCallback, cancelCallback) {
    var oneButtonMode = !!okCallback && !cancelCallback;
    var buttons = scene.rexUI.add.sizer({
        orientation: 'x'
    })

    if (oneButtonMode) {
        buttons
            .addSpace()
            .add(
                CreateLabel(scene, 'yes').onClick(okCallback),
            )
            .addSpace()
    } else {
        buttons
            .add(
                CreateLabel(scene, 'yes').onClick(okCallback),
            )
            .addSpace()
            .add(
                CreateLabel(scene, 'yes').onClick(okCallback),
            )
    }

    return buttons;
}
var CreateLabel = function (scene, img) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        // text: scene.rexUI.add.BBCodeText(0, 0, 'X', { fontFamily: 'DFKai-SB', fontSize: 60 }),
        // space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },
    })
}

export default CreateSimpleBBCodeTextDialog;