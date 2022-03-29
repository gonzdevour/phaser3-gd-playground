import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import RegisterLabelAsButton from '../../../behavior/Button/RegisterLabelAsButton.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

//建立首頁面板，註冊按鈕onClick-emit事件，回傳overlapSizer，在MainMenu scene用on接收事件後處理start scene
var CreateResultPanel = function (scene, config) {
    var viewport = scene.rexScaleOuter.outerViewport;
    var x = GetValue(config, 'x', viewport.centerX);
    var y = GetValue(config, 'y', viewport.centerY);
    var width = GetValue(config, 'width', viewport.width);
    var height = GetValue(config, 'height', viewport.height);

    //建立最下層的sizer
    var mainMenuPanel = scene.rexUI.add.sizer({
        orientation: 'y',
    })

    //建立背景物件
    var background = CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2);

    //建立logo物件
    //var logo = scene.rexUI.add.BBCodeText(0, 0, 'Logo', { fontFamily: 'DFKai-SB', fontSize: 60 });

    // TODO: style
    
    //建立統計數據
    var appdata = scene.model.appData;
    var result = {};
    result.rightCnt = appdata.curRightCnt;
    result.wrongCnt = appdata.curWrongCnt;
    result.totalCnt = result.rightCnt + result.wrongCnt;
    result.rightPercent = Math.round(100*result.rightCnt/result.totalCnt);
    result.time = appdata.curTimeElapsed;
    //建立統計字串
    var resultTxtQcnt = `${result.rightCnt}/${result.totalCnt}`;
    var resultTxtTElapsed = `${result.time}秒`;
    var resultTxtRPct = `${result.rightPercent}%`;

    //建立統計字串label
    var labelQcnt = CreateTitleLabel(scene, '測驗題數');
    var txtQcnt = CreateTextLabel(scene, resultTxtQcnt);
    var labelTElapsed = CreateTitleLabel(scene, '作答時間');
    var txtTElapsed = CreateTextLabel(scene, resultTxtTElapsed);
    var labelRPct = CreateTitleLabel(scene, '正確率');
    var txtRPct = CreateTextLabel(scene, resultTxtRPct)
        .setData('t', 0)
        .on('changedata-t', function (parent, value, previousValue) {
            parent.setText(`${Math.floor(value * result.rightPercent)}%`);
        })
        .easeDataTo('t', 1, 1000)
    /* 
    scene.tweens.add({
        targets: txtRPct.data.values,
        t: 1,
        ease: 'Linear',
        duration: 1000,
        repeat: 0,
        yoyo: false
    });
     */
    
    //建立選項按鈕
    // TODO: set width & height in scene.rexUI.add.label({...})
    var btnReview = CreateActionLabel(scene, '生字複習', undefined, 20);
    var btnRetry = CreateActionLabel(scene, '重新挑戰', undefined, 20);
    var btnBack = CreateActionLabel(scene, '返回選單', undefined, 20);

    mainMenuPanel
        .add(
            labelQcnt,
            {}
        )
        .add(
            txtQcnt,
            { padding: { bottom: 20 }}
        )
        .add(
            labelTElapsed,
            {}
        )
        .add(
            txtTElapsed,
            { padding: { bottom: 20 }}
        )
        .add(
            labelRPct,
            {}
        )
        .add(
            txtRPct,
            { padding: { bottom: 100 }}
        )
        .add(
            btnReview,
            { padding: { top: 20, bottom: 20 } }
        )
        .add(
            btnRetry,
            { padding: { top: 20, bottom: 20 } }
        )
        .add(
            btnBack,
            { padding: { top: 20, bottom: 20 } }
        )

    //建立config和help按鈕
    //var btnConfig = CreateHelpLabel(scene, '', 'cfg', {tl:0,tr:10,bl:10,br:0});
    //var btnHelp = CreateHelpLabel(scene, '', 'info', {tl:0,tr:10,bl:10,br:0});

    //將config和help按鈕放在mainMenuPanel上面，整個組成overlapSizer(用來處理align的sizer)
    var backgroundOverlapSizer = scene.rexUI.add.overlapSizer({
    })
        .addBackground(background)
        .add(
            mainMenuPanel,
            { align: 'center', expand: false }
        )
/*         .add(
            btnConfig,
            { align: 'left-bottom', expand: false, }
        )
        .add(
            btnHelp,
            { align: 'right-top', expand: false }
        ) */

    //幫按鈕註冊onClick時要發射的事件，以及over/out時的反應
    //RegisterLabelAsButton(gameObject, eventName, eventEmitter)
    //※注意backgroundOverlapSizer是eventEmitter
    RegisterLabelAsButton(btnReview, 'button.review', backgroundOverlapSizer);
    RegisterLabelAsButton(btnRetry, 'button.retry', backgroundOverlapSizer);
    RegisterLabelAsButton(btnBack, 'button.back', backgroundOverlapSizer);

    //建立ChildrenMap，讓backgroundOverlapSizer.getElement('key')可以取得這個sizer的子物件
    backgroundOverlapSizer
        .addChildrenMap('btnReview', btnReview)
        .addChildrenMap('btnRetry', btnRetry)
        .addChildrenMap('btnBack', btnBack)

    //回傳時順便設定位置和大小界限
    return backgroundOverlapSizer.setPosition(x, y).setMinSize(width, height);
}

var CreateActionLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
        icon: !img?undefined:scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

var CreateHelpLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
        icon: !img?undefined:scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

var CreateTextLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, Style.quizPanel.top.round, undefined, 0xffffff, 2),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 , align: 'center', lineSpacing: 10,}),
        space: { left: 15, right: 15, top: 10, bottom: 10, icon: 0 }
    })
}

var CreateTitleLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, radius, undefined, 0xffffff, 2),
        icon: !img?undefined:scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: !text?undefined:scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 10, bottom: 10, icon: 10 }
    });
}

export default CreateResultPanel;