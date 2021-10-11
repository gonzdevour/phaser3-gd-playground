import CreateDatabaseSelectPanel from './CreateDatabaseSelectPanel.js';
import CreateEnhancementSelectPanel from './CreateEnhancementSelectPanel.js';
import CreateQuizModePanel from "./CreateQuizModePanel.js";

var CreateQuizConfigurationPanel = function (scene, config) {
    var mainPanel = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 40 }
    })

    var databaseSelectPanel = CreateDatabaseSelectPanel(mainPanel);
    var enhancementSelectPanel = CreateEnhancementSelectPanel(mainPanel);
    var quizModePanel = CreateQuizModePanel(mainPanel);

    return mainPanel
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
            CreateLabel(scene, '開始練習'),
            {
                proportion: 0, expand: true, align: 'center',
                padding: { left: 80, right: 80 }
            }
        )
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 20).setStrokeStyle(2, 0xffffff),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        align: 'center'
    });
}

export default CreateQuizConfigurationPanel;