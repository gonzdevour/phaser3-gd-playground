import Style from '../../../settings/Style.js';
import * as Dialog from '../modaldialog/DialogType.js';
//ui components
import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateDatabaseSelectPanel from './CreateDatabaseSelectPanel.js'; //詞庫選單
import CreateEnhancementSelectPanel from './CreateEnhancementSelectPanel.js'; //強化練習模式選單
import CreateQuizModePanel from "./CreateQuizModePanel.js"; //出題模式選單

//button behaviors
import RegisterLabelAsButton from '../../../behavior/Button/RegisterLabelAsButton.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

/*
QuizConfig.js:
    var quizConfigPanel = CreateQuizConfigPanel(this, {
        radio: this.model.appData.loadQuizConfig() //這裡的config，從model的現存參數來
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
    var buttonLabel = CreateTextLabel(scene, '開始練習'); //開始按鈕

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
                padding: { left: 80, right: 80, bottom:40 } //label在sizer子區塊中的天地
            }
        )

    //隱藏暫時不用的panel(但是需要它們的選項設定值所以還是要建立)
    //databaseSelectPanel.hide();
    //quizModePanel.hide();

    //幫按鈕註冊onClick時要發射的事件，以及over/out時的反應
    //RegisterLabelAsButton(label, eventName, eventEmitter)
    //※注意mainPanel是eventEmitter
    RegisterLabelAsButton(buttonLabel, 'button.startQuiz', mainPanel);
    var subPanels = [databaseSelectPanel, enhancementSelectPanel, quizModePanel];
    for (var i = 0, cnt = subPanels.length; i < cnt; i++) {
        var subPanel = subPanels[i];
        subPanel.getElement('choices').buttons.forEach(function(btn,index,array){
            RegisterLabelAsButton(btn);
        })
        var btnHelp = subPanel.getElement('title.help');
        RegisterLabelAsButton(btnHelp,'button.help', subPanel);
    }

    // button callback
    
    // content原本用``樣版字面值。``的\可以取消換行，但會把空格也帶進來。用\n比較清爽
    // 注意width只有設定最小寬度的功能，如果排版後大於width，會以排版大小為準
    var tb = scene.model.localization;  
    databaseSelectPanel.on('button.help', function(gameObject, pointer, event){
        Dialog.TypeY(scene, tb.loc('select-db-title'), tb.loc('select-db-content'))
    });

    //databaseSelectPanel.on('button.help', function(gameObject, pointer, event){
    //    Dialog.TypeY(scene, '詞庫選擇', '高頻：參照教育部之詞頻總表\n常用：分類整理生活常見用詞')
    //});

    enhancementSelectPanel.on('button.help', function(gameObject, pointer, event){
        Dialog.TypeY(scene, '強化練習', '針對容易混淆的讀音加強練習')
    });

    quizModePanel.on('button.help', function(gameObject, pointer, event){
        Dialog.TypeY(scene, '出題模式', '隨機：詞庫隨機出題\n頻次：依常用度出題\n測驗：指定範圍進行測驗\n\n[color=gray]※測驗模式施工中[/color]')
    });   


    mainPanel.on('button.startQuiz', function (gameObject, pointer, event) { //按下開始按鈕
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
                mode: '隨機' //頻次|隨機|測驗
            }
            */
            var choiceValue =  subPanel.getElement('choices').value;
            if (choiceValue != undefined){ //選項無值時(例如subPanel沒建立時)，禁止傳入undefined，應以預設值為準
                result[subPanel.name] = choiceValue; //取得各選單的選擇
            }
        }
        result.qcount = config.radio.qcount; //題數設定
        //debugger;
        //startQuiz掛在scene/QuizConfig.js
        mainPanel.emit('startQuiz', result); //回傳各選單的選擇結果，加上題數設定，呼叫測驗開始
    })

    return mainPanel;
}

var CreateTextLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: Style.fontFamilyName, fontSize: 60 }),
        align: 'center',
        space: { top: 20, bottom: 20 } //text在label中的天地
    });
}

export default CreateQuizConfigPanel;