import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateDatabaseSelectPanel from './CreateDatabaseSelectPanel.js';
import CreateEnhancementSelectPanel from './CreateEnhancementSelectPanel.js';
import CreateQuizModePanel from "./CreateQuizModePanel.js";

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateQuizConfigPanel = function (scene, config) {
    var viewport = scene.rexScaleOuter.outerViewport;
    var x = GetValue(config, 'x', viewport.centerX);
    var y = GetValue(config, 'y', viewport.centerY);
    var width = GetValue(config, 'width', viewport.width);
    var height = GetValue(config, 'height', viewport.height);

    // Build UI
    var databaseSelectPanel = CreateDatabaseSelectPanel(scene, config);
    var enhancementSelectPanel = CreateEnhancementSelectPanel(scene, config);
    var quizModePanel = CreateQuizModePanel(scene, config);
    var buttonLabel = CreateLabel(scene, '開始練習');

    var mainPanel = scene.rexUI.add.sizer({
        x: x, y: y,
        width: width, height: height,
        orientation: 'y',
        space: { item: 40 }
    })
        .addSpace()
        .add(
            databaseSelectPanel,
            { proportion: 0, expand: true, align: 'center' }
        )
        .add(
            enhancementSelectPanel,
            { proportion: 0, expand: true, align: 'center', }
        )
        .add(
            quizModePanel,
            { proportion: 0, expand: true, align: 'center', }
        )
        .add(
            buttonLabel,
            {
                proportion: 0, expand: true, align: 'center',
                padding: { left: 80, right: 80 }
            }
        )
        .addSpace()

    // Add button callback
    var subPanels = [databaseSelectPanel, enhancementSelectPanel, quizModePanel];
    buttonLabel.onClick(function (button, gameObject, pointer, event) {
        var result = {};
        for (var i = 0, cnt = subPanels.length; i < cnt; i++) {
            var subPanel = subPanels[i];
            result[subPanel.name] = subPanel.getElement('choices').value
        }
        mainPanel.emit('startQuiz', result);
    })

    return mainPanel;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        align: 'center'
    });
}

export default CreateQuizConfigPanel;