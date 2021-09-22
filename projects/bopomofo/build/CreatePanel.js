import CreateWord from "./CreateWord";
import CreateChoices from "./CreateChoices";
import { Panel } from '../gameobjects';

var CreatePanel = function (scene) {
    var panel = new Panel(scene, {
        width: 700,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, {tl:10,tr:10,bl:0,br:0}).setStrokeStyle(2, 0xffffff),
            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
            text: scene.rexUI.add.BBCodeText(0, 0, '',
                { fontFamily:'Arial', fontSize: 32, fixedHeight: 48, valign: 'center', testString:'回' }
            ),
            space: { left: 15, right: 5, top: 5, bottom: 5, icon: 10 }
        }),

        word: CreateWord(scene),
        choices: CreateChoices(scene),

        actions: [
            CreateOKButton(scene)
        ]
    });

    panel
        .on('button.click', function (button, index, pointer, event) {
            if (index === 0) {  // OK button
                var result = panel.getChoiceResult();                
                panel.emit('submit', result)
            }
        })

    return panel;
}

var CreateOKButton = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, {tl:0,tr:0,bl:0,br:10}).setStrokeStyle(2, 0xffffff),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, '下一題',
            { fontSize: 32, fixedWidth:48*2, fixedHeight: 48, valign: 'center', testString:'回' }
        ),
        space: { left: 15, right: 5, top: 5, bottom: 5, icon: 10 }
    });
}

export default CreatePanel;