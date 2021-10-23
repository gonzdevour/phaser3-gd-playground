import CreateSimpleBBCodeTextDialog from '../style/dialog/CreateSimpleBBCodeTextDialog.js';
import Character from '../../gameobjects/character/Character.js'
import { Initials, Media, Vowel } from '../../model/bopomofo/Bopomofo.js'
import { Style } from '../style/style.js';

var CreateQuizResultDialog = function (parent, result, onCloseCallback) {
    var scene = parent.scene;
    if (result.result) {  // Pass
        return CreateSimpleBBCodeTextDialog(parent, {
            content: scene.add.image(0, 0, 'yes').setDisplaySize(540, 540),
            background: null,
            okCallback: false,
            cancelCallback: false,
            holdDuration: 500,
            closeCallback: onCloseCallback
        });

    } else {  // Fails
        // TODO: Style Character
        var characterUI = new Character(scene, {
            // background: CreateRoundRectangleBackground(scene),
            character: scene.rexUI.add.label({
                height: (55 * 3) + 2,  // Min height
                // background: CreateRoundRectangleBackground(scene),
                text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.character),
                align: 'right',
                space: { left: 5, right: 5, top: 5, bottom: 5 }
            }),

            bopomofo: {
                initials: CreatePhonologyLabel(scene, Initials),
                media: CreatePhonologyLabel(scene, Media),
                vowel: CreatePhonologyLabel(scene, Vowel),
                tone: CreateToneLabel(scene),
                tone0: CreateTone0Label(scene),
            }
        })
            .setCharacter(result.character)

        return CreateSimpleBBCodeTextDialog(parent, {
            content: characterUI,
            // background: null,
            okCallback: false,
            cancelCallback: false,
            holdDuration: 1200,
            closeCallback: onCloseCallback
        });

    }
}

var CreatePhonologyLabel = function (scene, testString) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.phonology),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

var CreateToneLabel = function (scene) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.tone),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'left',
        space: { left: 0, right: 0, top: 0, bottom: 0 }
    })
}

var CreateTone0Label = function (scene) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.tone0),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 0, right: 0, top: -8, bottom: 0 }
    })
}

export default CreateQuizResultDialog;