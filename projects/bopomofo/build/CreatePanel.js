import CreateWord from "./CreateWord";
import CreateChoices from "./CreateChoices";
import { Panel } from '../gameobjects';

var CreatePanel = function (scene) {
    var panel = new Panel(scene, {
        width: 400,
        orientation: 'y',

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
            text: scene.rexUI.add.BBCodeText(0, 0, '',
                { fontSize: 20, fixedHeight: 24, valign: 'center' }
            ),
            space: { left: 5, right: 5, top: 5, bottom: 5, icon: 10 }
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
                panel.emit('answer', result)
            }
        })

    return panel;
}

var CreateOKButton = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10).setStrokeStyle(2, 0x0000ff),
        text: scene.rexUI.add.BBCodeText(0, 0, 'OK',
            { fontSize: 20, fixedHeight: 24, valign: 'center' }
        ),
        space: { left: 5, right: 5, top: 5, bottom: 5, icon: 10 }
    });
}

export default CreatePanel;