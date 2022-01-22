import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateDatabaseSelectPanel from './CreateDatabaseSelectPanel.js'; //詞庫選單
import CreateEnhancementSelectPanel from './CreateEnhancementSelectPanel.js'; //強化練習模式選單
import CreateQuizModePanel from "./CreateQuizModePanel.js"; //出題模式選單

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

/*
QuizConfig.js:
    var quizConfigPanel = CreateQuizConfigPanel(this, {
        radio: this.model.getQuizConfig() //這裡的config，從model的現存參數來
    })
→
CreateQuizConfigPanel.js:
    CreateQuizConfigPanel(scene, config) 
 */
var CreateQuizConfigPanel = function (scene, config) {
    var viewport = scene.rexScaleOuter.outerViewport;
    var x = GetValue(config, 'x', viewport.centerX);
    var y = GetValue(config, 'y', viewport.centerY);
    var width = GetValue(config, 'width', viewport.width);
    var height = GetValue(config, 'height', viewport.height);

    // Build UI
    var databaseSelectPanel = CreateDatabaseSelectPanel(scene, config); //詞庫選單
    var enhancementSelectPanel = CreateEnhancementSelectPanel(scene, config); //強化練習模式選單
    var quizModePanel = CreateQuizModePanel(scene, config); //出題模式選單
    var buttonLabel = CreateLabel(scene, '開始練習'); //開始按鈕

    var mainPanel = scene.rexUI.add.sizer({ //定位與排版
        x: x, y: y,
        width: width, height: height,
        orientation: 'y',
        space: { item: 30 }
    })
        .addBackground(CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2))
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
        .addSpace()
        .add(
            buttonLabel,
            {
                proportion: 0, expand: true, align: 'center',
                padding: { left: 80, right: 80, bottom:80 } //label在sizer子區塊中的天地
            }
        )

    // Add button callback
    var subPanels = [databaseSelectPanel, enhancementSelectPanel, quizModePanel];
    buttonLabel.onClick(function (button, gameObject, pointer, event) { //按下開始按鈕
        var result = {};
        for (var i = 0, cnt = subPanels.length; i < cnt; i++) {
            var subPanel = subPanels[i];
            /* 
            subPanel.name: 'database'|'enhancement'|'mode'
            choices.value: button.name，就是options的各項目
            
            如果是預設值的話：
            result = {
                database: '高頻詞庫', //指定詞庫種類
                enhancement: '無', //強化練習模式
                mode: '隨機' //依序|隨機|測驗
            }
            */
            result[subPanel.name] = subPanel.getElement('choices').value //取得各選單的選擇
        }
        //startQuiz掛在scene/QuizConfig.js
        mainPanel.emit('startQuiz', result); //回傳各選單的選擇結果，呼叫測驗開始
    })

    return mainPanel;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        align: 'center',
        space: { top: 20, bottom: 20 } //text在label中的天地
    });
}

export default CreateQuizConfigPanel;