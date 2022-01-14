import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';

//建立首頁面板，註冊按鈕onClick-emit事件，回傳overlapSizer，在MainMenu scene用on接收事件後處理start scene
var CreateQuizHelperPanel = function (scene, config) {
    var viewport = scene.rexScaleOuter.outerViewport;
    var x = GetValue(config, 'x', viewport.centerX);
    var y = GetValue(config, 'y', viewport.centerY);
    var width = GetValue(config, 'width', viewport.width);
    var height = GetValue(config, 'height', viewport.height);

    //建立overlapSizer
    var helperOverlapSizer = scene.rexUI.add.overlapSizer({
        orientation: 'y',
    })

    //建立選項按鈕
    var btnSpeak = CreateLabel(scene, '發音');

    helperOverlapSizer
        .add(
            btnSpeak,
            { padding: { top: 20, bottom: 20 }, align: 'left-top', expand: false }
        )

    //幫按鈕註冊onClick時要發射的事件
    //RouteClickEvent(gameObject, eventName, eventEmitter)
    //※注意overlapSizer是eventEmitter
    RouteClickEvent(btnSpeak, 'button.speak', helperOverlapSizer);

    //建立ChildrenMap，讓backgroundOverlapSizer.getElement('key')可以取得這個sizer的子物件
    helperOverlapSizer
        .addChildrenMap('btnSpeak', btnSpeak)

    //回傳時順便設定位置和大小界限
    return helperOverlapSizer.setPosition(x, y).setMinSize(width, height);
}

var CreateLabel = function (scene, text, img, pos) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

//onClick是sizer的method，Label是一種sizer
//emit是所有p3 gameObject都有的method，從ee3導入
//※這裡設計成：按下Label時，觸發backgroundOverlapSizery在MainMenu scene掛載的.on('eventName', callback)
var RouteClickEvent = function (gameObject, eventName, eventEmitter) {
    gameObject.onClick(function (button, gameObject, pointer, event) {
        eventEmitter.emit(eventName, gameObject, pointer, event);
    })
}

export default CreateQuizHelperPanel;