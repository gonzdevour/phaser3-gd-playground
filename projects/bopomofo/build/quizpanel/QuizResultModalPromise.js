import ModalDialogPromise from '../modeldialog/ModalDialogPromise.js';
import Character from '../../gameobjects/character/Character.js'
import { Initials, Media, Vowel } from '../../model/bopomofo/Bopomofo.js'
import { Style } from '../style/style.js';

var QuizResultModalPromise = function (scene, result, onCloseCallback) {
    if (result.result) {  // Pass
        return ModalDialogPromise(scene, {
            content: scene.add.image(0, 0, 'yes').setDisplaySize(540, 540),
            background: null
        })

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

        return ModalDialogPromise(scene, {
            content: characterUI,
        })
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

export default QuizResultModalPromise;