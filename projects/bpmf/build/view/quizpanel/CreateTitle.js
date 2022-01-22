import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Style } from '../style/style.js';

var CreateTitle = function (scene, config) {
    return scene.rexUI.add.label({
        background: CreateRoundRectangleBackground(scene, Style.quizPanel.top.round, undefined, 0xffffff, 2),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, Config2Text(config), Style.quizPanel.title),
        space: { left: 15, right: 5, top: 10, bottom: 10, icon: 10 }
    })
}

var Config2Text = function (config) {
    var dict = {
        database:    config.database,
        enhancement: config.enhancement == '無' ? '' : ('|強化' + config.enhancement),
        mode:        '|' + config.mode + '模式：',
        count: '1/' + config.count,
    };
    var text = '';
    for(var key in config){
        text += dict[key];
        //console.log(key + ' - ' + config[key])
    }
    return text;
}

export default CreateTitle;