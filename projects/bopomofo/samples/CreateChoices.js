import * as GO from '../gameobjects';

const Choices = GO.Choices;

var CreateChoices = function (scene) {
    var choices = new Choices(scene, {
        width: 200, height: 200,

        initials: [
            CreateLabel(scene), CreateLabel(scene), CreateLabel(scene), CreateLabel(scene)
        ],
        media: [
            CreateLabel(scene), CreateLabel(scene), CreateLabel(scene), CreateLabel(scene)
        ],
        vowel: [
            CreateLabel(scene), CreateLabel(scene), CreateLabel(scene), CreateLabel(scene)
        ],
        tone: [
            CreateLabel(scene), CreateLabel(scene), CreateLabel(scene), CreateLabel(scene)
        ],
    })

    choices
        .on('button.click', function (button, groupName, index, pointer, event) {
            // console.log(`Click ${groupName}-${index}`)
        })
        .on('button.over', function (button, groupName, index, pointer, event) {
            // button.getElement('background').setStrokeStyle(2, 0xff0000)
        })
        .on('button.out', function (button, groupName, index, pointer, event) {
            // button.getElement('background').setStrokeStyle(2, 0xffffff)
        })
        .on('select', function (button, groupName) {
            button.getElement('background').setFillStyle(0x333333)
        })
        .on('unselect', function (button, groupName) {
            button.getElement('background').setFillStyle()
        })

    return choices;
}

var CreateLabel = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '',
            { fontSize: 20, fixedWidth: 24, fixedHeight: 24, halign: 'center', valign: 'center' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 5, right: 5, top: 5, bottom: 5 }
    })
}

export default CreateChoices;