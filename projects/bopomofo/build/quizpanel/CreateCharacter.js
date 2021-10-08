import { Character } from '../../gameobjects/quizpanel.js';
import { Initials, Media, Vowel } from '../../model/bopomofo/Bopomofo.js'
import { Style } from '../style/style.js';

var CreateCharacter = function (scene,) {
    var characterUI = new Character(scene, {
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),
        character: scene.rexUI.add.label({
            height: (55 * 3) + 2,  // Min height
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),
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
    characterUI.layout().setMinSize(characterUI.width, characterUI.height);

    return characterUI;
}

var CreatePhonologyLabel = function (scene, testString) {
    return scene.rexUI.add.label({
        // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.phonology),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

var CreateToneLabel = function (scene) {
    return scene.rexUI.add.label({
        // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.tone),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'left',
        space: { left: -4, right: 0, top: 0, bottom: 0 }
    })
}

var CreateTone0Label = function (scene) {
    return scene.rexUI.add.label({
        // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.tone0),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 0, right: 0, top: -8, bottom: -4 }
    })
}

export default CreateCharacter;