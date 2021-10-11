import CreateTitleLabel from './CreateTitleLabel.js';

var CreateEnhancementSelectPanel = function (parent) {
    var scene = parent.scene;
    var title = CreateTitleLabel(scene, '強化練習');

    var buttons = [
        CreateOptionLabel(scene, 'ㄓㄗ'),
        CreateOptionLabel(scene, 'ㄔㄘ'),
        CreateOptionLabel(scene, 'ㄕㄙ'),
        CreateOptionLabel(scene, 'ㄛㄡ'),
        CreateOptionLabel(scene, 'ㄝㄟ'),
        CreateOptionLabel(scene, 'ㄢㄣ'),
        CreateOptionLabel(scene, 'ㄣㄥ'),
        CreateOptionLabel(scene, '結合韻'),
        CreateOptionLabel(scene, '無'),
    ]
    var choices = scene.rexUI.add.fixWidthButtons({
        align: 'justify',
        // justifyPercentage: 1,
        space: { line: 30, item: 30 },
        type: 'radio',
        buttons: buttons,
        setValueCallback: function (button, value, previousValue) {
        }
    })

    return scene.rexUI.add.sizer({
        orientation: 'y',
    })
        .add(
            title,
            { proportion: 0, align: 'center', expand: true }
        )
        .add(
            choices,
            {
                proportion: 0, align: 'center', expand: true,
                padding: { left: 80, right: 80, top: 40 }
            }
        )
}

var CreateOptionLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 20).setStrokeStyle(2, 0xffffff),
        // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontFamily: 'DFKai-SB', fontSize: 60 }),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
    });
}

export default CreateEnhancementSelectPanel;