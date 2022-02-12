import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';

var CreateTitle = function (scene, config) {
    var title = scene.rexUI.add.sizer({
        orientation: 'x',
    })
    var background = CreateRoundRectangleBackground(scene, Style.quizPanel.top.round, undefined, 0xffffff, 2);
    var configtext = CreateTextLabel(scene, Config2Text(config));

    //var qidxtext = CreateTextLabel(scene, '');
    title
        .addBackground(background)
        .addSpace()
        .add( configtext,{ align: 'center' })
    title
        .addChildrenMap('configtext', configtext)

    return title;
}

var Config2Text = function (config) {
    var dict = {
        database:    config.database,
        enhancement: config.enhancement == '無' ? '' : ('|強化' + config.enhancement),
        mode:        '|' + config.mode + '模式',
        count: '',
        //count: '1/' + config.count,
    };
    var text = '';
    for(var key in config){
        text += dict[key];
        //console.log(key + ' - ' + config[key])
    }
    return text;
}

var CreateTextLabel = function (scene, text, img, radius, pos) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, Style.quizPanel.top.round, undefined, 0xffffff, 2),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, text, Style.quizPanel.title),
        space: { left: 15, right: 15, top: 10, bottom: 10, icon: 0 }
    })
}

export default CreateTitle;