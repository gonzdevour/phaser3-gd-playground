import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateButtonBackground from '../style/CreateButtonBackground.js';
import { Choices } from '../../gameobjects/quizpanel.js';
import { Style } from '../style/style.js';

const MaxInitialsButtons = 5;
const MaxMediaButtons = 3;
const MaxVowelButtons = 5;
const MaxToneButtons = 5;

var CreateChoices = function (scene) {
    var config = {
        background: CreateRoundRectangleBackground(scene, 0, undefined, 0xffffff, 2),
        initials: [],
        media: [],
        vowel: [],
        tone: [],
        space: {
            left: 10, right: 10, top: 10, bottom: 10, row: 10, column: 10
        }
    }

    var initials = config.initials;
    for (var i = 0; i < MaxInitialsButtons; i++) {
        initials.push(
            CreateLabel(scene, Style.quizPanel.choice.phonology)
        )
    }

    var media = config.media;
    for (var i = 0; i < MaxMediaButtons; i++) {
        media.push(
            CreateLabel(scene, Style.quizPanel.choice.phonology)
        )
    }

    var vowel = config.vowel;
    for (var i = 0; i < MaxVowelButtons; i++) {
        vowel.push(
            CreateLabel(scene, Style.quizPanel.choice.phonology)
        )
    }

    var tone = config.tone;
    for (var i = 0; i < MaxToneButtons; i++) {
        tone.push(
            CreateLabel(scene, Style.quizPanel.choice.tone)
        )
    }

    var choices = new Choices(scene, config);

    choices
        // .on('button.click', function (button, groupName, index, pointer, event) {
        //     console.log(`Click ${groupName}-${index}`)
        // })
        // .on('button.over', function (button, groupName, index, pointer, event) {
        //     button.getElement('background').setStrokeStyle(2, 0xff0000)
        // })
        // .on('button.out', function (button, groupName, index, pointer, event) {
        //     button.getElement('background').setStrokeStyle(2, 0xffffff)
        // })
        .on('select', function (button, groupName) {
            button.getElement('background').setFillStyle(0x333333)
        })
        .on('unselect', function (button, groupName) {
            button.getElement('background').setFillStyle()
        })

    return choices;
}

var CreateLabel = function (scene, style) {
    return scene.rexUI.add.label({
        background: CreateButtonBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', style),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 5, right: 5, top: 5, bottom: 5 }
    })
}

export default CreateChoices;